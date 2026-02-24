# 🚀 Quick Setup Guide - SportsDash Pro

Get your sports dashboard running in **5 minutes**!

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, TypeScript, Tailwind CSS, and more.

## Step 2: Start the Development Server

```bash
npm run dev
```

## Step 3: Open Your Browser

Navigate to: **http://localhost:3000**

That's it! 🎉 The app is now running with mock data.

## ✅ What You'll See

- **Live Scores**: Simulated live matches updating every 10 seconds
- **Featured Matches**: Top games highlighted with star badges
- **Match Schedule**: Upcoming fixtures organized by date
- **User Authentication**: Click "Sign In" to create an account

## 🔐 Try the Authentication

1. Click **"Sign In"** in the header
2. Click **"Sign Up"** to create an account
3. Enter any email and password (stored locally in browser)
4. Once logged in, you'll see additional stats and your profile

## 🔌 Optional: Connect Real Sports API

### For API-Football (100 free requests/day)

1. Get free API key: https://www.api-football.com/
2. Open `.env.local`
3. Add your key:
   ```env
   NEXT_PUBLIC_SPORTS_API_KEY=your_key_here
   ```
4. Restart the dev server

### For TheSportsDB (Completely Free)

Already integrated! Just set the environment variable in `.env.local`:
```env
NEXT_PUBLIC_USE_SPORTSDB=true
```

## 📱 Test Responsive Design

- Desktop: Full experience with all features
- Tablet: Optimized grid layouts
- Mobile: Touch-friendly, single column

## 🎨 Customize Your Dashboard

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  'accent-green': '#00e676', // Your color here
}
```

### Change App Name
Edit `components/Header.tsx` and `app/layout.tsx`

### Add More Sports
Extend `hooks/useSportsData.ts` with additional sports data

## 🚀 Deploy to Production

### Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Build Locally
```bash
npm run build
npm start
```

## 📝 Project Features

✅ Next.js 14 with App Router  
✅ TypeScript for type safety  
✅ Tailwind CSS for styling  
✅ User authentication system  
✅ Real-time score updates  
✅ Match schedules  
✅ Responsive design  
✅ Dark mode UI  
✅ API integration ready  
✅ Production optimized  

## 🆘 Troubleshooting

### Port 3000 already in use?
```bash
npm run dev -- -p 3001
```

### Dependencies not installing?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build errors?
```bash
npm run lint
```

## 📚 Next Steps

1. **Customize the design** to match your brand
2. **Add your API key** for real sports data
3. **Deploy to production** on Vercel/Netlify
4. **Add more features** from the roadmap in README.md
5. **Share with the world!** 🌍

---

Need help? Check the full **README.md** for detailed documentation!
