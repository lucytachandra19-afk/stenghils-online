insert into public.products(name,slug,category,description,price,stock,rating,sales)
values
('Classic Logo Tee','classic-logo-tee','Logo Tee','Logo STENGHILS clean dengan potongan regular.',150000,18,4.9,120),
('Love Is Dog Tee','love-is-dog-tee','Graphic Tee','Graphic statement dengan karakter playful.',150000,7,4.8,108),
('Urban Photo Tee','urban-photo-tee','Photo Tee','Foto monokrom bernuansa urban.',170000,4,4.9,96),
('Simple Logo Tee','simple-logo-tee','Basic Tee','Logo minimalis untuk gaya sehari-hari.',140000,22,4.7,82)
on conflict(slug) do nothing;
