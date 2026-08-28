-- Inquiry table migration. Apply after 001_initial_cms.sql

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.inquiries (
  id uuid primary key default extensions.gen_random_uuid(),
  name text not null,
  email text not null,
  whatsapp text,
  company text,
  project_type text not null,
  budget text not null,
  timeline text not null,
  description text not null,
  reference text,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint inquiries_status_check check (status in ('new', 'contacted', 'qualified', 'archived')),
  constraint inquiries_email_check check (email = lower(email) and position('@' in email) > 1),
  constraint inquiries_name_check check (nullif(btrim(name), '') is not null),
  constraint inquiries_project_type_check check (nullif(btrim(project_type), '') is not null),
  constraint inquiries_budget_check check (nullif(btrim(budget), '') is not null),
  constraint inquiries_timeline_check check (nullif(btrim(timeline), '') is not null),
  constraint inquiries_description_check check (nullif(btrim(description), '') is not null)
);

create index if not exists inquiries_status_idx on public.inquiries (status);
create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_email_idx on public.inquiries (email);

drop trigger if exists inquiries_set_audit_fields on public.inquiries;
create trigger inquiries_set_audit_fields before insert or update on public.inquiries
for each row execute function public.set_cms_audit_fields();

alter table public.inquiries enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert on public.inquiries to anon;
grant select, insert, update, delete on public.inquiries to authenticated;

drop policy if exists "Anyone can submit inquiries" on public.inquiries;
create policy "Anyone can submit inquiries" on public.inquiries for insert to anon, authenticated
with check (true);

drop policy if exists "Admins can manage inquiries" on public.inquiries;
create policy "Admins can manage inquiries" on public.inquiries for all to authenticated
using ((select public.is_admin())) with check ((select public.is_admin()));