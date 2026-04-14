# Mapinhos 🗺️

> Family activity map for Portugal — built with React 19, TypeScript, Supabase & Leaflet.

---

## Stack

| Layer     | Tech                          |
|-----------|-------------------------------|
| Frontend  | React 19 + TypeScript         |
| Bundler   | Vite 6                        |
| Linting   | ESLint 9 (flat config)        |
| Map       | Leaflet + react-leaflet       |
| Database  | Supabase (Postgres + RLS)     |
| Hosting   | Vercel / Netlify (free tier)  |

---

## 1. Supabase setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor → New Query**, paste the contents of `supabase-schema.sql`, and run it
3. Go to **Settings → API** and copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

---

## 2. Local development

```bash
# Clone / download the project
cd mapinhos

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# → Edit .env.local with your Supabase credentials

# Start dev server
npm run dev
# → http://localhost:3000
```

---

## 3. Available scripts

```bash
npm run dev        # Start dev server (hot reload)
npm run build      # Type-check + production build → dist/
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
npm run lint:fix   # Auto-fix ESLint issues
npm run type-check # TypeScript check without building
```

---

## 4. Adding your own places

### Option A — Supabase dashboard
Go to **Table Editor → places → Insert row** and fill in the fields.

### Option B — Import from Google Sheets
1. Export your sheet as CSV
2. Go to **Supabase → Table Editor → places → Import data**
3. Map columns:

| Spreadsheet column       | Supabase column |
|--------------------------|-----------------|
| Name / Nome              | `name`          |
| Description              | `description`   |
| City / Cidade            | `city`          |
| Coordinates (lat)        | `lat`           |
| Coordinates (lng)        | `lng`           |
| Everyday / Event         | `type`          |
| Date                     | `event_date`    |
| Child age min            | `age_min`       |
| Child age max            | `age_max`       |
| Shade/Tent               | `shade`         |
| WC                       | `wc`            |
| Languages (pt,en,ru)     | `languages`     |

### Option C — Direct SQL
```sql
insert into places (name, city, lat, lng, type, age_min, age_max, shade, wc, languages)
values ('My Place', 'Lisboa', 38.7139, -9.1590, 'everyday', 0, 12, true, true, '{pt,en}');
```

---

## 5. Deploy to Vercel (free)

```bash
npm install -g vercel
vercel
# Follow prompts — add env vars when asked
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) and it deploys automatically on every push.

Add environment variables in **Vercel → Project → Settings → Environment Variables**:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

## 6. Project structure

```
mapinhos/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── FilterPanel.tsx   # All 5 filters
│   │   ├── MapView.tsx       # Leaflet map + pins
│   │   └── PlacePopup.tsx    # Pin popup card
│   ├── hooks/
│   │   ├── useFilters.ts     # Filter state management
│   │   └── usePlaces.ts      # Supabase data fetching
│   ├── lib/
│   │   └── supabase.ts       # Supabase client singleton
│   ├── types/
│   │   └── index.ts          # All TypeScript types
│   ├── App.tsx               # Root component
│   ├── index.css             # Global styles
│   └── main.tsx              # Entry point
├── supabase-schema.sql       # Run this in Supabase SQL Editor
├── .env.example              # Copy to .env.local
├── vite.config.ts
├── tsconfig.json
├── eslint.config.ts
└── package.json
```

---

## 7. Multilingual support (next step)

The app is structured for i18n. To add PT/EN/RU switching:
```bash
npm install react-i18next i18next
```
Then wrap `<App>` with `<I18nextProvider>` and replace hardcoded strings with `t('key')`.
