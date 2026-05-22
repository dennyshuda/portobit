alter table public.profiles
	add column if not exists instagram_url text,
	add column if not exists linkedin_url text,
	add column if not exists github_url text;
