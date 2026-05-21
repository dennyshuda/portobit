# 🚀 Portobit - Micro-SaaS Portfolio Builder

**Portobit** adalah aplikasi Software‑as‑a‑Service (SaaS) untuk membuat portofolio online instan. Pengguna mendaftar (gratis atau berlangganan) lalu mengisi data proyek, bio dan tema; perubahan langsung terlihat melalui _Live Preview_. Portobit ditujukan bagi freelancer, developer, dan kreator yang ingin showcase karya tanpa repot setup.

> 📝 Backend multi‑tenant dengan model free/paid, _upgrade ke PRO_ akan membuka fitur kustomisasi dan statistik.

## 🛠️ Tech Stack

_Portobit dibangun dengan fokus skalabilitas dan pengembangan cepat; seluruh komponen cocok untuk multi‑tenant SaaS._

- **Framework:** [Nuxt](https://nuxt.com/) (Vue.js)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Deployment:** Vercel

---

## 🚀 Quickstart (Development)

1. Pastikan Node.js 18+ dan pnpm atau npm terpasang.
2. Clone repositori dan install dependensi:
   ```bash
   git clone https://github.com/dennyshuda/portobit.git
   cd portobit
   pnpm install
   ```
3. Siapkan variabel lingkungan (`.env`) berbasis `.env.example` dengan kredensial Supabase.
4. Jalankan server lokal:
   ```bash
   pnpm dev
   ```
5. Buka http://localhost:3000 dan daftar akun baru untuk mencoba alur SaaS.

## 💡 How It Works (SaaS Flow)

1. **User Sign‑Up:** Pengguna membuat akun via Google atau email.
2. **Portfolio Editor:** Di dashboard, mereka memasukkan info profil, menambahkan proyek, memilih template.
3. **Live Preview:** Setiap perubahan langsung tampil di pratinjau; halaman publik di `/<username>`.
4. **Subscription:** Akun default gratis; opsi `PRO` tersedia untuk fitur tambahan.
5. **Admin & Monitoring:** Backend menyimpan data multi‑tenant; ada tabel `plans`, `subscriptions`, dan `analytics`.

---

## 🤝 Cara Kontribusi

Terima kasih telah berminat berkontribusi pada **Portobit**! Berikut beberapa langkah sederhana untuk membantu kamu memulai:

1. **Fork** repositori ini ke akun GitHub-mu.
2. **Clone** hasil fork ke mesin lokal:
   ```bash
   git clone https://github.com/<username>/portobit.git
   ```
3. **Buat branch** baru berdasarkan fitur/bug yang ingin kamu kerjakan:
   ```bash
   git checkout -b fitur/nama-fitur-atau-bugfix
   ```
4. **Kerjakan perubahan** di branch tersebut. Pastikan untuk menambahkan atau mengupdate dokumen bila diperlukan.
5. **Commit** dengan pesan jelas dan bermakna:
   ```bash
   git add .
   git commit -m "Deskripsi singkat perubahan"
   ```
6. **Push** branch ke GitHub fork-mu:
   ```bash
   git push origin fitur/nama-fitur-atau-bugfix
   ```
7. Buat **Pull Request** ke branch `main` di repositori utama. Jelaskan apa yang kamu ubah dan alasannya.

> ⚠️ Sebelum mengirim PR, pastikan semua perubahan lulus pengecekan (lint/test) dan bahwa kode tetap mengikuti gaya proyek.

### 📌 Aturan tambahan

- Jaga agar commit kecil dan fokus pada satu perubahan.
- Sertakan screenshot atau video jika kontribusimu berhubungan dengan UI.
- Gunakan bahasa Indonesia atau Inggris yang mudah dimengerti.

Kami sangat menghargai setiap kontribusi — baik itu perbaikan bug, fitur baru, dokumentasi, atau ide!

import type * as signalR from "@microsoft/signalr";
import {
    IconActivityHeartbeat,
    IconArrowLeft,
    IconPlug,
    IconRefresh,
} from "@tabler/icons-react";
import {
    CategoryScale,
    Chart as ChartJS,
    type ChartData,
    type ChartOptions,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from "chart.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { useNavigate, useParams } from "react-router";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    createSensorHubConnection,
    joinSensorGroup,
    type SensorResponseDto,
    signalRHubUrl,
} from "@/services/signalr-service";
import { useGetSensor } from "@/services/use-get-sensor";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
);

type HubStatus = "disconnected" | "connecting" | "connected" | "reconnecting";

interface TelemetryPoint {
    id: string;
    receivedAt: string;
    movingTargetDistance: number | null;
    stationaryTargetDistance: number | null;
    isOccupied: boolean | null;
}

const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

const distanceChartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        intersect: false,
        mode: "index",
    },
    plugins: {
        legend: {
            position: "top",
        },
        tooltip: {
            callbacks: {
                label: (context) =>
                    `${context.dataset.label}: ${context.parsed.y} cm`,
            },
        },
    },
    scales: {
        x: {
            ticks: {
                maxRotation: 0,
                autoSkip: true,
                maxTicksLimit: 8,
            },
        },
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: "Distance (cm)",
            },
        },
    },
};

const occupiedChartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        intersect: false,
        mode: "index",
    },
    plugins: {
        legend: {
            position: "top",
        },
    },
    scales: {
        x: {
            ticks: {
                maxRotation: 0,
                autoSkip: true,
                maxTicksLimit: 8,
            },
        },
        y: {
            min: 0,
            max: 1,
            ticks: {
                stepSize: 1,
                callback: (value) =>
                    Number(value) === 1 ? "Occupied" : "Free",
            },
        },
    },
};

const formatTimeLabel = (value: string) =>
    new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).format(new Date(value));

export default function SingleDevicePage() {
    const navigate = useNavigate();
    const { sensorId: routeSensorId } = useParams<{ sensorId?: string }>();
    const sensorId = routeSensorId?.trim() ?? "";
    const token = useMemo(() => localStorage.getItem("authToken") ?? "", []);
    const connectionRef = useRef<signalR.HubConnection | null>(null);
    const [status, setStatus] = useState<HubStatus>("disconnected");
    const [joinedSensorId, setJoinedSensorId] = useState<string | null>(null);
    const [telemetry, setTelemetry] = useState<TelemetryPoint[]>([]);
    const [error, setError] = useState<string | null>(null);

    const {
        data: sensor,
        isLoading: isLoadingSensor,
        isError: isSensorError,
        error: sensorError,
    } = useGetSensor(sensorId || null);

    const appendTelemetry = useCallback((point: TelemetryPoint) => {
        setTelemetry((current) => {
            const cutoff = Date.now() - TWO_HOURS_MS;
            const next = [...current, point].filter(
                (item) => new Date(item.receivedAt).getTime() >= cutoff,
            );

            return next.slice(-720);
        });
    }, []);

    const handleSensorData = useCallback(
        (data: SensorResponseDto) => {
            if (sensorId && data.id !== sensorId) {
                return;
            }

            appendTelemetry({
                id: crypto.randomUUID(),
                receivedAt: data.serverTime || new Date().toISOString(),
                movingTargetDistance: data.movingTargetDistance,
                stationaryTargetDistance: data.stationaryTargetDistance,
                isOccupied: data.isOccupied,
            });
        },
        [appendTelemetry, sensorId],
    );

    const connectToHub = useCallback(async () => {
        if (!sensorId) {
            return;
        }

        if (!token) {
            setError("Login first so this page can connect to SensorHub.");
            return;
        }

        if (connectionRef.current) {
            return;
        }

        setError(null);
        setStatus("connecting");

        try {
            const connection = createSensorHubConnection(
                token,
                handleSensorData,
                (nextStatus) => {
                    setStatus(nextStatus as HubStatus);

                    if (nextStatus === "reconnecting") {
                        setJoinedSensorId(null);
                    }
                },
            );

            await connection.start();
            connectionRef.current = connection;
            setStatus("connected");
        } catch (connectError) {
            setStatus("disconnected");
            setError(
                connectError instanceof Error
                    ? connectError.message
                    : "Failed to connect to SensorHub.",
            );
        }
    }, [handleSensorData, sensorId, token]);

    const joinCurrentSensor = useCallback(async () => {
        const connection = connectionRef.current;

        if (!connection || !sensorId || joinedSensorId === sensorId) {
            return;
        }

        try {
            await joinSensorGroup(connection, sensorId);
            setJoinedSensorId(sensorId);
        } catch (joinError) {
            setError(
                joinError instanceof Error
                    ? joinError.message
                    : "Failed to join sensor group.",
            );
        }
    }, [joinedSensorId, sensorId]);

    useEffect(() => {
        void connectToHub();
    }, [connectToHub]);

    useEffect(() => {
        if (status === "connected") {
            void joinCurrentSensor();
        }
    }, [joinCurrentSensor, status]);

    useEffect(() => {
        return () => {
            void connectionRef.current?.stop();
        };
    }, []);

    const distanceChartData = useMemo<ChartData<"line">>(() => {
        const labels = telemetry.map((point) =>
            formatTimeLabel(point.receivedAt),
        );

        return {
            labels,
            datasets: [
                {
                    label: "Moving target",
                    data: telemetry.map((point) => point.movingTargetDistance),
                    borderColor: "rgb(37, 99, 235)",
                    backgroundColor: "rgba(37, 99, 235, 0.15)",
                    tension: 0.25,
                    spanGaps: true,
                },
                {
                    label: "Stationary target",
                    data: telemetry.map(
                        (point) => point.stationaryTargetDistance,
                    ),
                    borderColor: "rgb(5, 150, 105)",
                    backgroundColor: "rgba(5, 150, 105, 0.15)",
                    tension: 0.25,
                    spanGaps: true,
                },
            ],
        };
    }, [telemetry]);

    const occupiedChartData = useMemo<ChartData<"line">>(() => {
        const labels = telemetry.map((point) =>
            formatTimeLabel(point.receivedAt),
        );

        return {
            labels,
            datasets: [
                {
                    label: "Occupied",
                    data: telemetry.map((point) =>
                        point.isOccupied === null
                            ? null
                            : point.isOccupied
                              ? 1
                              : 0,
                    ),
                    borderColor: "rgb(234, 88, 12)",
                    backgroundColor: "rgba(234, 88, 12, 0.15)",
                    stepped: true,
                    tension: 0,
                    spanGaps: true,
                },
            ],
        };
    }, [telemetry]);

    const latestPoint = telemetry.at(-1);

    const disconnect = async () => {
        setError(null);

        try {
            await connectionRef.current?.stop();
        } finally {
            connectionRef.current = null;
            setJoinedSensorId(null);
            setStatus("disconnected");
        }
    };

    if (!sensorId) {
        return (
            <Card className="p-4 sm:p-5">
                <p className="text-sm text-slate-600">
                    Open this page from a device card so the sensor ID is fixed
                    from the URL.
                </p>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mb-3 gap-1"
                        onClick={() => navigate("/devices")}
                    >
                        <IconArrowLeft size={16} />
                        Back
                    </Button>
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                        Device Live Monitor
                    </h1>
                    <p className="mt-2 break-all text-sm text-slate-600">
                        Sensor ID:{" "}
                        <span className="font-medium">{sensorId}</span>
                    </p>
                </div>
                <div className="flex items-center gap-2 border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
                    <span
                        className={
                            status === "connected"
                                ? "size-2 bg-emerald-500"
                                : status === "connecting" ||
                                    status === "reconnecting"
                                  ? "size-2 bg-amber-500"
                                  : "size-2 bg-slate-300"
                        }
                    />
                    {status}
                </div>
            </div>

            <Card className="p-4 sm:p-5">
                <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <p className="text-xs text-slate-500">Hardware</p>
                            <p className="font-semibold text-slate-900">
                                {isLoadingSensor
                                    ? "Loading..."
                                    : sensor?.hardwareModel || "-"}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Moving</p>
                            <p className="font-semibold text-slate-900">
                                {latestPoint?.movingTargetDistance ??
                                    sensor?.movingTargetDistance ??
                                    "-"}{" "}
                                cm
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Stationary</p>
                            <p className="font-semibold text-slate-900">
                                {latestPoint?.stationaryTargetDistance ??
                                    sensor?.stationaryTargetDistance ??
                                    "-"}{" "}
                                cm
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Occupied</p>
                            <p className="font-semibold text-slate-900">
                                {(latestPoint?.isOccupied ?? sensor?.isOccupied)
                                    ? "Yes"
                                    : "No"}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="gap-1"
                            onClick={() => setTelemetry([])}
                        >
                            <IconRefresh size={16} />
                            Clear
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            className="gap-1"
                            disabled={status === "disconnected"}
                            onClick={disconnect}
                        >
                            <IconPlug size={16} />
                            Disconnect
                        </Button>
                    </div>
                </div>

                {joinedSensorId && (
                    <div className="mt-4 border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
                        <IconActivityHeartbeat
                            size={14}
                            className="mr-1 inline-block"
                        />
                        Listening to sensor-{joinedSensorId}
                    </div>
                )}

                {isSensorError && (
                    <div className="mt-4 border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                        {sensorError instanceof Error
                            ? sensorError.message
                            : "Failed to get sensor"}
                    </div>
                )}

                {error && (
                    <div className="mt-4 border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                        {error}
                    </div>
                )}

                <p className="mt-3 break-all text-xs text-slate-500">
                    Hub: {signalRHubUrl}/sensorHub
                </p>
            </Card>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(360px,0.8fr)]">
                <Card className="p-4 sm:p-5">
                    <div className="mb-4">
                        <h2 className="text-base font-semibold text-slate-900">
                            Moving and Stationary Target
                        </h2>
                        <p className="mt-1 text-xs text-slate-500">
                            Realtime distance data from the last 2 hours.
                        </p>
                    </div>
                    <div className="h-85">
                        <Line
                            options={distanceChartOptions}
                            data={distanceChartData}
                        />
                    </div>
                </Card>

                <Card className="p-4 sm:p-5">
                    <div className="mb-4">
                        <h2 className="text-base font-semibold text-slate-900">
                            Occupancy
                        </h2>
                        <p className="mt-1 text-xs text-slate-500">
                            Occupied state over the last 2 hours.
                        </p>
                    </div>
                    <div className="h-85">
                        <Line
                            options={occupiedChartOptions}
                            data={occupiedChartData}
                        />
                    </div>
                </Card>
            </div>

            {telemetry.length === 0 && (
                <Card className="border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                    Waiting for realtime sensor data.
                </Card>
            )}
        </div>
    );
}

