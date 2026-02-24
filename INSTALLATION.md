# 🚀 Installation & Setup Guide

## Quick Start (Windows PowerShell)

If you encounter execution policy errors on Windows, run PowerShell as Administrator and execute:

```powershell
# Allow script execution for this session
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# Install dependencies
npm install

# Start development server
npm run dev
```

## Alternative: Using Command Prompt (CMD)

```cmd
npm install
npm run dev
```

## Manual Installation Steps

1. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/
   - Version required: 18.x or higher

2. **Navigate to project directory**
   ```bash
   cd path/to/sportsdash-pro
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```
   
   This will install:
   - Next.js 14
   - React 18
   - TypeScript
   - Tailwind CSS
   - Lucide React (icons)
   - SWR (data fetching)
   - Axios
   - All other dependencies

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to: http://localhost:3000
   - The app should be running!

## Environment Setup (Optional)

To use a real sports API:

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your API key (if using API-Football):
   ```bash
   NEXT_PUBLIC_SPORTS_API_KEY=your_api_key_here
   ```

3. For TheSportsDB (no key needed), just uncomment in `lib/sportsApi.ts`

## Troubleshooting

### PowerShell Execution Policy Error
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### Port 3000 Already in Use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Module Not Found Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## Building for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Available Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## System Requirements

- Node.js 18.x or higher
- npm 9.x or higher
- Modern browser (Chrome, Firefox, Safari, Edge)

## What's Included

✅ Next.js 14 with App Router
✅ TypeScript configured
✅ Tailwind CSS with custom theme
✅ Dark mode by default
✅ User authentication system
✅ Live scores component
✅ Match schedules
✅ Betting odds display
✅ User profile pages
✅ Leagues and matches pages
✅ Responsive design
✅ Production-ready code

## Next Steps After Installation

1. Explore the homepage at `http://localhost:3000`
2. Try the authentication system (click "Sign In")
3. Browse leagues at `/leagues`
4. View matches at `/matches`
5. Check user profile at `/profile`
6. Review `API_INFORMATION.md` for API integration options

## Need Help?

Check these files for more information:
- `README.md` - Full project documentation
- `API_INFORMATION.md` - Sports API options
- `PROJECT_OVERVIEW.md` - Technical architecture
- `SETUP_GUIDE.md` - Quick setup guide

---

**Happy coding! 🚀**
