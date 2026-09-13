create extension if not exists pgcrypto;

create type public.user_role as enum ('customer','admin');
create type public.order_status as enum ('received','processing','shipped','completed','cancelled');

create table public.profiles(
 id uuid primary key references auth.users(id) on delete cascade,
 full_name text,
 phone text,
 role public.user_role not null default 'customer',
 created_at timestamptz not null default now()
);

create table public.products(
 id uuid primary key default gen_random_uuid(),
 name text not null,
 slug text unique not null,
 category text not null default 'Basic Tee',
 description text not null default '',
 price integer not null check(price>=0),
 stock integer not null default 0 check(stock>=0),
 image_url text,
 rating numeric(2,1) default 0,
 sales integer not null default 0,
 active boolean not null default true,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table public.orders(
 id uuid primary key default gen_random_uuid(),
 order_no text unique not null default ('STG-'||to_char(now(),'YYYYMMDDHH24MISS')||'-'||substr(gen_random_uuid()::text,1,4)),
 user_id uuid not null references auth.users(id) on delete cascade,
 total integer not null check(total>=0),
 status public.order_status not null default 'received',
 payment_method text,
 shipping_address jsonb,
 tracking_number text,
 created_at timestamptz not null default now()
);

create table public.order_items(
 id uuid primary key default gen_random_uuid(),
 order_id uuid not null references public.orders(id) on delete cascade,
 product_id uuid references public.products(id) on delete set null,
 product_name text not null,
 size text not null,
 qty integer not null check(qty>0),
 price integer not null check(price>=0)
);

create table public.reviews(
 id uuid primary key default gen_random_uuid(),
 product_id uuid not null references public.products(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade,
 rating integer not null check(rating between 1 and 5),
 body text not null,
 approved boolean not null default false,
 created_at timestamptz not null default now(),
 unique(product_id,user_id)
);

create or replace function public.is_admin()
returns boolean language sql security definer set search_path=public
as $$ select exists(select 1 from public.profiles where id=auth.uid() and role='admin'); $$;

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.reviews enable row level security;

create policy "public read active products" on public.products for select using(active=true or public.is_admin());
create policy "admin manage products" on public.products for all using(public.is_admin()) with check(public.is_admin());

create policy "users read own orders" on public.orders for select using(auth.uid()=user_id or public.is_admin());
create policy "users create own orders" on public.orders for insert with check(auth.uid()=user_id);
create policy "admin manage orders" on public.orders for update using(public.is_admin()) with check(public.is_admin());

create policy "users read own order items" on public.order_items for select using(exists(select 1 from public.orders o where o.id=order_id and (o.user_id=auth.uid() or public.is_admin())));
create policy "users insert own order items" on public.order_items for insert with check(exists(select 1 from public.orders o where o.id=order_id and o.user_id=auth.uid()));
create policy "admin read all order items" on public.order_items for select using(public.is_admin());

create policy "read approved reviews" on public.reviews for select using(approved=true or user_id=auth.uid() or public.is_admin());
create policy "customers create reviews" on public.reviews for insert with check(auth.uid()=user_id);
create policy "admin manage reviews" on public.reviews for all using(public.is_admin()) with check(public.is_admin());

create policy "profile self read" on public.profiles for select using(auth.uid()=id or public.is_admin());
create policy "profile self update" on public.profiles for update using(auth.uid()=id) with check(auth.uid()=id);
