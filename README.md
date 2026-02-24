# SportsDash Pro 🏆

A modern, production-ready sports dashboard built with Next.js, TypeScript, and Tailwind CSS. Features real-time score updates, match schedules, user authentication, and a stunning dark-mode UI inspired by leading sports platforms.

![SportsDash Pro](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **🔴 Live Score Updates**: Real-time score tracking with auto-refresh every 10 seconds
- **📅 Match Schedules**: Comprehensive upcoming match listings
- **⭐ Featured Matches**: Highlighted top games and tournaments
- **🔐 User Authentication**: Full login/register system with local storage
- **🌙 Dark Mode UI**: Sleek, modern design optimized for sports content
- **📊 Stats Overview**: Quick view of live matches, leagues, and schedules
- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **🚀 Production Ready**: Built with best practices and scalable architecture
- **🔌 API Integration**: Ready for API-Football, TheSportsDB, or custom APIs

## 🎯 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Data Fetching**: SWR for real-time updates
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm installed

### Installation

1. **Clone or download the project**
   ```bash
   cd your-project-folder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure your API key (Optional)**
   
   Edit `.env.local` and add your sports API key:
   ```env
   # Option 1: API-Football (Get free key at https://www.api-football.com/)
   NEXT_PUBLIC_SPORTS_API_KEY=your_api_key_here
   NEXT_PUBLIC_SPORTS_API_URL=https://v3.football.api-sports.io

   # Option 2: TheSportsDB (Free, no key required)
   # No configuration needed - works out of the box!
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 API Integration

### Using API-Football (Recommended for Production)

1. Sign up at [API-Football](https://www.api-football.com/)
2. Get your free API key (100 requests/day on free tier)
3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_SPORTS_API_KEY=your_key_here
   ```
4. The app will automatically use real data!

### Using TheSportsDB (Free Alternative)

- No API key required
- Works immediately out of the box
- Limited to past and scheduled events
- Great for development and testing

### Using Mock Data (Default)

- No setup required
- Perfect for demonstration and testing
- Updates every 10 seconds with simulated data
- Located in `hooks/useSportsData.ts`

## 📁 Project Structure

```
sportsdash-pro/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── AuthModal.tsx       # Login/Register modal
│   ├── LiveScores.tsx      # Live match scores
│   ├── MatchSchedule.tsx   # Upcoming matches
│   ├── FeaturedMatches.tsx # Featured games
│   └── StatsOverview.tsx   # Statistics cards
├── contexts/
│   └── AuthContext.tsx     # Authentication state
├── hooks/
│   └── useSportsData.ts    # Data fetching logic
├── lib/
│   └── sportsApi.ts        # API integration layer
├── public/                 # Static assets
└── tailwind.config.ts      # Tailwind configuration
```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  'dark-bg': '#0f1419',
  'dark-surface': '#16181d',
  'dark-card': '#1c1f26',
  'accent-green': '#00e676',
  'accent-red': '#ff1744',
  // ... more colors
}
```

### Branding

Update the app name in:
- `app/layout.tsx` (metadata)
- `components/Header.tsx` (logo)
- `.env.example` (app configuration)

## 🔐 Authentication

Currently uses localStorage for demo purposes. For production:

1. Replace the mock auth in `contexts/AuthContext.tsx`
2. Integrate with:
   - NextAuth.js
   - Supabase
   - Firebase
   - Your custom backend

Example users are stored in browser localStorage for demonstration.

## 📊 Features Breakdown

### Live Scores
- Auto-refreshing every 10 seconds
- Live match indicators with pulsing animation
- Score highlighting for leading teams
- League categorization

### Match Schedule
- Organized by date (Today, Tomorrow, This Week)
- Quick view of all upcoming fixtures
- League and time information

### User Dashboard
- Personalized stats when logged in
- Custom greeting and user info
- Quick access to favorites (ready for implementation)

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly interface
- Optimized for all screen sizes

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Netlify

1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Development

### Run in development mode
```bash
npm run dev
```

### Build for production
```bash
npm run build
npm start
```

### Lint code
```bash
npm run lint
```

## 🎯 Roadmap

Future enhancements you can add:

- [ ] Team pages with detailed stats
- [ ] Player profiles and statistics
- [ ] Live commentary and updates
- [ ] Push notifications for favorite teams
- [ ] Multi-sport support (Basketball, Tennis, etc.)
- [ ] Betting odds integration
- [ ] Social features (comments, predictions)
- [ ] PWA support for mobile installation
- [ ] Dark/Light theme toggle
- [ ] Internationalization (i18n)

## 📝 API Endpoints Reference

### API-Football

```typescript
// Live matches
GET /fixtures?live=all

// Fixtures by date
GET /fixtures?date=2024-01-15

// Leagues
GET /leagues

// Team info
GET /teams?id=33
```

### TheSportsDB

```typescript
// Live scores
GET /livescore.php?s=Soccer

// Events by date
GET /eventsday.php?d=2024-01-15&s=Soccer

// Team lookup
GET /lookupteam.php?id=133604
```

## 🤝 Contributing

This is a portfolio/production-ready template. Feel free to:

1. Fork the repository
2. Create feature branches
3. Make improvements
4. Use in your own projects

## 📄 License

This project is open source and available for personal and commercial use.

## 🙏 Acknowledgments

- Design inspired by modern sports platforms
- Icons by [Lucide](https://lucide.dev/)
- Sports data from [API-Football](https://www.api-football.com/) and [TheSportsDB](https://www.thesportsdb.com/)

## 💡 Tips for Production

1. **Security**: Implement proper backend authentication
2. **Performance**: Enable Next.js Image Optimization
3. **SEO**: Add meta tags and Open Graph data
4. **Analytics**: Integrate Google Analytics or similar
5. **Monitoring**: Set up error tracking (Sentry, LogRocket)
6. **Testing**: Add unit and E2E tests
7. **CI/CD**: Set up automated deployment pipeline

## 📧 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review API provider documentation

---

**Built with ❤️ for sports fans worldwide**

Ready to deploy and start tracking your favorite teams! 🏆⚽🏀
