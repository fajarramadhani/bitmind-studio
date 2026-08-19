-- Initial Phase 5 CMS schema. Apply to a new Supabase project.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  display_name text,
  role text not null default 'admin',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_email_check check (email = lower(email) and position('@' in email) > 1),
  constraint profiles_role_check check (role = 'admin')
);

create unique index if not exists profiles_email_unique_idx on public.profiles (lower(email));

create table if not exists public.projects (
  id uuid primary key default extensions.gen_random_uuid(),
  slug text not null unique,
  title text not null,
  project_kind text not null default 'client',
  client text,
  category text not null,
  year integer not null,
  short_description text not null,
  description text,
  services text[] not null default '{}',
  roles text[] not null default '{}',
  technologies text[] not null default '{}',
  thumbnail_url text,
  cover_image_url text,
  featured boolean not null default false,
  sort_order integer not null default 0,
  live_url text,
  repository_url text,
  overview text,
  challenge text,
  approach text,
  solution text,
  outcome text,
  next_project_slug text references public.projects (slug)
    on update cascade on delete set null deferrable initially deferred,
  publish_status text not null default 'draft',
  published_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_slug_check check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint projects_kind_check check (project_kind in ('client', 'internal', 'concept')),
  constraint projects_client_check check (project_kind <> 'client' or nullif(btrim(client), '') is not null),
  constraint projects_year_check check (year between 1900 and 2200),
  constraint projects_sort_order_check check (sort_order >= 0),
  constraint projects_publish_status_check check (publish_status in ('draft', 'published', 'archived')),
  constraint projects_publication_check check (publish_status <> 'published' or published_at is not null),
  constraint projects_thumbnail_url_check check (thumbnail_url is null or thumbnail_url ~ '^(https?://|storage://project-media/)'),
  constraint projects_cover_image_url_check check (cover_image_url is null or cover_image_url ~ '^(https?://|storage://project-media/)'),
  constraint projects_live_url_check check (live_url is null or live_url ~ '^https?://'),
  constraint projects_repository_url_check check (repository_url is null or repository_url ~ '^https?://')
);

create table if not exists public.project_media (
  id uuid primary key default extensions.gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  storage_path text not null unique,
  public_url text,
  media_type text not null default 'image',
  layout text not null default 'full',
  alt_text text not null,
  caption text,
  aspect_ratio text,
  object_fit text not null default 'cover',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint project_media_storage_path_check check (
    storage_path ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(png|jpe?g|webp|avif)$'
    and split_part(storage_path, '/', 1) = project_id::text
  ),
  constraint project_media_public_url_check check (public_url is null or public_url ~ '^https?://'),
  constraint project_media_type_check check (media_type = 'image'),
  constraint project_media_layout_check check (layout in ('full', 'half', 'mobile', 'cover')),
  constraint project_media_aspect_ratio_check check (aspect_ratio is null or aspect_ratio ~ '^[1-9][0-9]*:[1-9][0-9]*$'),
  constraint project_media_object_fit_check check (object_fit in ('cover', 'contain')),
  constraint project_media_sort_order_check check (sort_order >= 0)
);

create table if not exists public.products (
  id uuid primary key default extensions.gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  short_description text not null,
  description text,
  availability_status text not null default 'coming-soon',
  publish_status text not null default 'draft',
  price numeric(12, 2),
  currency text not null default 'IDR',
  featured boolean not null default false,
  sort_order integer not null default 0,
  thumbnail_url text,
  cover_image_url text,
  demo_url text,
  purchase_url text,
  published_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint products_slug_check check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint products_availability_check check (availability_status in ('coming-soon', 'available', 'unavailable')),
  constraint products_publish_status_check check (publish_status in ('draft', 'published', 'archived')),
  constraint products_publication_check check (publish_status <> 'published' or published_at is not null),
  constraint products_price_check check (price is null or price >= 0),
  constraint products_currency_check check (currency ~ '^[A-Z]{3}$'),
  constraint products_sort_order_check check (sort_order >= 0),
  constraint products_thumbnail_url_check check (thumbnail_url is null or thumbnail_url ~ '^(https?://|storage://product-media/)'),
  constraint products_cover_image_url_check check (cover_image_url is null or cover_image_url ~ '^(https?://|storage://product-media/)'),
  constraint products_demo_url_check check (demo_url is null or demo_url ~ '^https?://'),
  constraint products_purchase_url_check check (purchase_url is null or purchase_url ~ '^https?://')
);

create table if not exists public.product_media (
  id uuid primary key default extensions.gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  storage_path text not null unique,
  public_url text,
  media_type text not null default 'image',
  layout text not null default 'full',
  alt_text text not null,
  caption text,
  aspect_ratio text,
  object_fit text not null default 'cover',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint product_media_storage_path_check check (
    storage_path ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(png|jpe?g|webp|avif)$'
    and split_part(storage_path, '/', 1) = product_id::text
  ),
  constraint product_media_public_url_check check (public_url is null or public_url ~ '^https?://'),
  constraint product_media_type_check check (media_type = 'image'),
  constraint product_media_layout_check check (layout in ('full', 'half', 'mobile', 'cover')),
  constraint product_media_aspect_ratio_check check (aspect_ratio is null or aspect_ratio ~ '^[1-9][0-9]*:[1-9][0-9]*$'),
  constraint product_media_object_fit_check check (object_fit in ('cover', 'contain')),
  constraint product_media_sort_order_check check (sort_order >= 0)
);

create index if not exists projects_public_listing_idx
  on public.projects (featured desc, sort_order, published_at desc) where publish_status = 'published';
create index if not exists projects_kind_idx on public.projects (project_kind);
create index if not exists projects_category_idx on public.projects (category);
create index if not exists project_media_project_sort_idx on public.project_media (project_id, sort_order, id);
create index if not exists products_public_listing_idx
  on public.products (featured desc, sort_order, published_at desc) where publish_status = 'published';
create index if not exists products_availability_idx on public.products (availability_status);
create index if not exists products_category_idx on public.products (category);
create index if not exists product_media_product_sort_idx on public.product_media (product_id, sort_order, id);

create or replace function public.set_cms_audit_fields()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  actor uuid := auth.uid();
begin
  new.updated_at = now();
  if tg_op = 'INSERT' then
    new.created_at = coalesce(new.created_at, now());
    new.created_by = coalesce(actor, new.created_by);
  else
    new.created_at = old.created_at;
    new.created_by = old.created_by;
  end if;
  new.updated_by = coalesce(actor, new.updated_by, new.created_by);
  return new;
end;
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();
drop trigger if exists projects_set_audit_fields on public.projects;
create trigger projects_set_audit_fields before insert or update on public.projects
for each row execute function public.set_cms_audit_fields();
drop trigger if exists project_media_set_updated_at on public.project_media;
create trigger project_media_set_updated_at before update on public.project_media
for each row execute function public.set_updated_at();
drop trigger if exists products_set_audit_fields on public.products;
create trigger products_set_audit_fields before insert or update on public.products
for each row execute function public.set_cms_audit_fields();
drop trigger if exists product_media_set_updated_at on public.product_media;
create trigger product_media_set_updated_at before update on public.product_media
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.project_media enable row level security;
alter table public.products enable row level security;
alter table public.product_media enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.projects, public.project_media, public.products, public.product_media to anon;
grant select, insert, update, delete
  on public.profiles, public.projects, public.project_media, public.products, public.product_media
  to authenticated;

drop policy if exists "Admins can manage profiles" on public.profiles;
create policy "Admins can manage profiles" on public.profiles for all to authenticated
using ((select public.is_admin())) with check ((select public.is_admin()));

drop policy if exists "Published projects are publicly readable" on public.projects;
create policy "Published projects are publicly readable" on public.projects for select to anon, authenticated
using (publish_status = 'published');
drop policy if exists "Admins can manage projects" on public.projects;
create policy "Admins can manage projects" on public.projects for all to authenticated
using ((select public.is_admin())) with check ((select public.is_admin()));

drop policy if exists "Published project media are publicly readable" on public.project_media;
create policy "Published project media are publicly readable" on public.project_media for select to anon, authenticated
using (exists (
  select 1 from public.projects
  where projects.id = project_media.project_id and projects.publish_status = 'published'
));
drop policy if exists "Admins can manage project media" on public.project_media;
create policy "Admins can manage project media" on public.project_media for all to authenticated
using ((select public.is_admin())) with check ((select public.is_admin()));

drop policy if exists "Published products are publicly readable" on public.products;
create policy "Published products are publicly readable" on public.products for select to anon, authenticated
using (publish_status = 'published');
drop policy if exists "Admins can manage products" on public.products;
create policy "Admins can manage products" on public.products for all to authenticated
using ((select public.is_admin())) with check ((select public.is_admin()));

drop policy if exists "Published product media are publicly readable" on public.product_media;
create policy "Published product media are publicly readable" on public.product_media for select to anon, authenticated
using (exists (
  select 1 from public.products
  where products.id = product_media.product_id and products.publish_status = 'published'
));
drop policy if exists "Admins can manage product media" on public.product_media;
create policy "Admins can manage product media" on public.product_media for all to authenticated
using ((select public.is_admin())) with check ((select public.is_admin()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('project-media', 'project-media', false, 8388608, array['image/png', 'image/jpeg', 'image/webp', 'image/avif']),
  ('product-media', 'product-media', false, 8388608, array['image/png', 'image/jpeg', 'image/webp', 'image/avif'])
on conflict (id) do update set
  name = excluded.name,
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Private buckets intentionally have no anon/authenticated SELECT policy. Signed URLs
-- must be generated by trusted server code; admins can manage source objects directly.
drop policy if exists "CMS media are publicly readable" on storage.objects;
drop policy if exists "Admins can read CMS media" on storage.objects;
create policy "Admins can read CMS media" on storage.objects for select to authenticated
using (bucket_id in ('project-media', 'product-media') and (select public.is_admin()));

drop policy if exists "Admins can upload CMS media" on storage.objects;
create policy "Admins can upload CMS media" on storage.objects for insert to authenticated
with check (
  bucket_id in ('project-media', 'product-media')
  and (select public.is_admin())
  and name ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(png|jpe?g|webp|avif)$'
  and (
    (bucket_id = 'project-media' and exists (
      select 1 from public.projects where projects.id::text = split_part(name, '/', 1)
    ))
    or
    (bucket_id = 'product-media' and exists (
      select 1 from public.products where products.id::text = split_part(name, '/', 1)
    ))
  )
);

drop policy if exists "Admins can update CMS media" on storage.objects;
create policy "Admins can update CMS media" on storage.objects for update to authenticated
using (bucket_id in ('project-media', 'product-media') and (select public.is_admin()))
with check (
  bucket_id in ('project-media', 'product-media')
  and (select public.is_admin())
  and name ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(png|jpe?g|webp|avif)$'
  and (
    (bucket_id = 'project-media' and exists (
      select 1 from public.projects where projects.id::text = split_part(name, '/', 1)
    ))
    or
    (bucket_id = 'product-media' and exists (
      select 1 from public.products where products.id::text = split_part(name, '/', 1)
    ))
  )
);

drop policy if exists "Admins can delete CMS media" on storage.objects;
create policy "Admins can delete CMS media" on storage.objects for delete to authenticated
using (bucket_id in ('project-media', 'product-media') and (select public.is_admin()));
