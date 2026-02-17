# FAR Researchers Website

A modern, responsive website for FAR Researchers - a research and consulting company offering corporate and academic research solutions.

## Features

- ✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- ✅ **Dynamic Content** - Testimonials, portfolio, and blog managed via Supabase
- ✅ **Admin Dashboard** - Full CRUD interface for content management
- ✅ **Contact Forms** - Submissions saved to database
- ✅ **Modern UI/UX** - Clean, professional design with smooth animations

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, TailwindCSS
- **Backend**: Supabase (PostgreSQL database + real-time API)
- **Authentication**: Simple admin authentication (no signup required)

## Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env.local
```

Update `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Database Setup
1. Go to your Supabase project
2. Open the SQL Editor
3. Copy and run the entire contents of `database/schema.sql`
4. This will create all tables, insert initial data, and set up security policies

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Admin Access

### Login Credentials
- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@fresearchers.org`
- **Password**: `admin123`

### Admin Dashboard Features
- **Testimonials**: Add, edit, activate/deactivate client testimonials
- **Portfolio**: Manage research projects and portfolio items
- **Blog**: Create and publish blog posts
- **Contact Submissions**: View contact form submissions

## Database Structure

### Tables Created
- `testimonials` - Client testimonials and reviews
- `portfolio` - Research projects and case studies
- `blog_posts` - Blog articles and content
- `contact_submissions` - Contact form submissions
- `admin_users` - Admin user accounts

### Security Features
- Row Level Security (RLS) enabled on all tables
- Public read access for active content only
- Admin-only write access
- Automatic timestamp updates

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── admin/          # Admin dashboard and login
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   └── lib/
│       └── supabase.ts     # Supabase client configuration
├── database/
│   └── schema.sql          # Database schema and initial data
├── public/                 # Static assets
└── README.md
```

## Customization

### Adding New Services
Edit the `services` array in `src/app/page.tsx` to add or modify services.

### Changing Colors
Update the CSS variables in `src/app/globals.css`:
```css
:root {
  --background: #f4ede6;
  --foreground: #1f2428;
  --accent: #7fd1b9;
  --primary: #5c1f2d;
}
```

### Admin Password
Change the admin password by updating the `admin_users` table in Supabase or modify the schema before running it.

## Deployment

### Build for Production
```bash
npm run build
npm start
```

### Vercel Deployment
1. **Environment Variables** - Set in Vercel dashboard:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://kytriaaeqjsjgvdkcajn.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5dHJpYWFlcWpzamd2ZGtjYWpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNDE5MTQsImV4cCI6MjA4NjkxNzkxNH0.O-xMKxDMTahY-bxJZ0h2qIN7lbEJN9rXNWkIsQpsKk4
   ```

2. **Database Setup** - Run SQL in order:
   - `database/schema.sql`
   - `database/add_portfolio_link.sql`
   - `database/disable_rls_temp.sql`

3. **Deploy** - Connect GitHub repo to Vercel

### Production Status
✅ **Ready for Vercel deployment**
✅ **Build passes without errors**
✅ **Admin credentials secured**
✅ **All routes configured properly**
✅ **Static pages optimized**
✅ **Dynamic routes configured**

See `DEPLOYMENT.md` for detailed deployment guide.

## Support

For issues or questions:
1. Check the console for any error messages
2. Verify Supabase connection in the browser network tab
3. Ensure the database schema was executed correctly
4. Confirm environment variables are set correctly

## License

This project is proprietary to FAR Researchers.
