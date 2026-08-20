create schema if not exists private;

revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create or replace function private.is_admin()
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

revoke all on function private.is_admin() from public, anon;
grant execute on function private.is_admin() to authenticated;

revoke all on function public.is_admin() from public, anon;

drop policy if exists "Admins can manage profiles" on public.profiles;
create policy "Admins can manage profiles" on public.profiles for all to authenticated
using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy if exists "Admins can manage projects" on public.projects;
create policy "Admins can manage projects" on public.projects for all to authenticated
using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy if exists "Admins can manage project media" on public.project_media;
create policy "Admins can manage project media" on public.project_media for all to authenticated
using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy if exists "Admins can manage products" on public.products;
create policy "Admins can manage products" on public.products for all to authenticated
using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy if exists "Admins can manage product media" on public.product_media;
create policy "Admins can manage product media" on public.product_media for all to authenticated
using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy if exists "Admins can read CMS media" on storage.objects;
create policy "Admins can read CMS media" on storage.objects for select to authenticated
using (bucket_id in ('project-media', 'product-media') and (select private.is_admin()));

drop policy if exists "Admins can upload CMS media" on storage.objects;
create policy "Admins can upload CMS media" on storage.objects for insert to authenticated
with check (
  bucket_id in ('project-media', 'product-media')
  and (select private.is_admin())
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
using (bucket_id in ('project-media', 'product-media') and (select private.is_admin()))
with check (
  bucket_id in ('project-media', 'product-media')
  and (select private.is_admin())
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
using (bucket_id in ('project-media', 'product-media') and (select private.is_admin()));

drop function if exists public.is_admin();
