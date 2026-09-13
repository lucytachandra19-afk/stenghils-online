# STENGHILS Online Store

Full-stack-ready e-commerce starter using **Next.js + Supabase**.

## Fitur
- Customer storefront
- Product catalog/search/category
- Cart + wishlist
- Customer authentication
- Orders + order history
- Reviews
- Admin authentication by Supabase Auth
- Admin-only product/order/customer/review management
- Product image upload via Supabase Storage
- Dark/light mode
- SEO metadata
- Responsive mobile/desktop
- Database with Row Level Security (RLS)

## 1. Install
```bash
npm install
```

## 2. Environment
Copy `.env.example` to `.env.local` and fill:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

## 3. Database
Create a Supabase project, then run `supabase/schema.sql` in SQL Editor.

Create a Storage bucket named `product-images` and run `supabase/storage.sql`.

After creating your admin user in Supabase Auth, run:
```sql
update public.profiles
set role = 'admin'
where id = 'YOUR_AUTH_USER_UUID';
```

## 4. Run
```bash
npm run dev
```

## 5. Deploy
Recommended: Vercel.
- Push this folder to GitHub
- Import the repository into Vercel
- Add the two environment variables
- Deploy

This project intentionally does NOT put an admin password in frontend code. Admin access is enforced by Supabase Auth + RLS.

## Payment
Checkout currently creates an order with a selected payment method. For real money collection, connect a production Indonesian gateway (e.g. Midtrans/Xendit) and create server-side payment endpoints/webhooks. Do not put secret gateway keys in browser code.
