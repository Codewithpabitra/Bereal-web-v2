# Candid - BeReal Web Clone

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646cff.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

A modern, real-time social media application inspired by BeReal. Share authentic moments that disappear after 24 hours. Built with React, TypeScript, and Tailwind CSS.

![Candid Banner](https://via.placeholder.com/1200x400/6C63FF/ffffff?text=Candid+BeReal+Clone)

## 🌟 Features

### Core Features

- **📸 Ephemeral Posts** - Share photos with captions that automatically expire after 24 hours
- **🔄 Real-time Updates** - Live feed updates using Socket.IO for instant notifications
- **👤 User Authentication** - Secure registration and login system with JWT tokens
- **📱 Progressive Web App (PWA)** - Install on any device for a native-like experience
- **🌙 Dark Mode UI** - Modern, sleek dark theme with Tailwind CSS

### Social Features

- **❤️ Reactions** - Express yourself with emoji reactions on posts
- **💬 Comments** - Engage with friends through comments
- **🔁 Reposts** - Share other users' posts to your network
- **📌 Save Posts** - Bookmark your favorite posts for later
- **👥 Follow System** - Follow and unfollow users to curate your feed
- **🔍 Explore** - Discover trending content and new users
- **#️⃣ Hashtags** - Browse posts by trending hashtags

### User Profile

- **📊 Analytics Dashboard** - Track your posting activity with detailed charts
- **🔥 Streak Tracking** - Maintain daily posting streaks
- **📝 Profile Customization** - Edit your bio, avatar, and personal info
- **📚 Post History** - View your posts, liked posts, and reposts

### Archive & Privacy

- **🗄️ Personal Archive** - Your expired posts are privately saved
- **🚫 Block Users** - Control who can interact with you
- **🚩 Report System** - Report inappropriate content and users

### Notifications

- **🔔 Real-time Alerts** - Get notified for likes, comments, follows, and reposts
- **📱 Push Notifications** - PWA support for native push notifications
- **✅ Read Status** - Mark notifications as read individually or all at once

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library with latest features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router DOM 7** - Client-side routing
- **Socket.IO Client** - Real-time bidirectional communication
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icon library
- **React Hot Toast** - Toast notifications
- **Recharts** - Chart library for analytics
- **Axios** - HTTP client

### PWA

- **Vite Plugin PWA** - Progressive Web App support
- **Workbox** - Service worker caching

## 📁 Project Structure

```
bereal-web/
├── public/                 # Static assets
│   ├── favicon.svg
│   └── icons/             # PWA icons
├── src/
│   ├── api/               # API service layer
│   │   ├── analytics.ts   # Analytics API calls
│   │   ├── auth.ts        # Authentication API
│   │   ├── axios.ts       # Axios configuration
│   │   ├── comments.ts    # Comments API
│   │   ├── notifications.ts
│   │   ├── posts.ts       # Posts API
│   │   ├── reactions.ts   # Reactions API
│   │   ├── reports.ts     # Reporting API
│   │   ├── saved.ts       # Saved posts API
│   │   └── users.ts       # Users API
│   ├── components/        # Reusable UI components
│   │   ├── explore/       # Explore page components
│   │   ├── invite/        # Invite/referral components
│   │   ├── layout/        # Layout components (Navbar, BottomNav)
│   │   ├── notifications/ # Notification components
│   │   ├── onboarding/    # Onboarding slides
│   │   ├── post/          # Post-related components
│   │   ├── profile/       # Profile components
│   │   ├── pwa/           # PWA installation components
│   │   ├── report/        # Reporting components
│   │   ├── search/        # Search components
│   │   └── ui/            # Generic UI components
│   ├── context/           # React Context providers
│   │   ├── AuthContext.tsx    # Authentication state
│   │   └── SocketContext.tsx  # Socket.IO connection
│   ├── hooks/             # Custom React hooks
│   │   ├── useComments.ts
│   │   ├── useCountdown.ts    # 24hr expiry countdown
│   │   ├── useNotifications.ts
│   │   ├── usePosts.ts        # Posts CRUD operations
│   │   ├── usePWAInstall.ts   # PWA installation logic
│   │   ├── useReactions.ts
│   │   ├── useSaved.ts
│   │   └── useSearch.ts
│   ├── pages/             # Page components
│   │   ├── Archive.tsx        # User's expired posts
│   │   ├── BlockedUsers.tsx   # Blocked users management
│   │   ├── EditProfile.tsx    # Profile editing
│   │   ├── Explore.tsx        # Discover content
│   │   ├── Feed.tsx           # Main feed
│   │   ├── Hashtag.tsx        # Hashtag feed
│   │   ├── Login.tsx
│   │   ├── Notifications.tsx
│   │   ├── Onboarding.tsx     # First-time user flow
│   │   ├── Profile.tsx        # User profile
│   │   ├── ProfileSetup.tsx   # Initial profile creation
│   │   ├── Register.tsx
│   │   ├── Saved.tsx          # Saved posts
│   │   └── Splash.tsx         # Landing page
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   ├── index.css          # Global styles
│   └── socket.ts          # Socket.IO configuration
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A running instance of the BeReal backend API

### Installation

1. Clone the repository
```bash
git clone https://github.com/Codewithpabitra/Bereal-web-v2.git
cd Bereal-web-v2
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```env
VITE_API_URL=http://localhost:5000/api
VITE_BASE_URL=http://localhost:5000
```

4. Start the development server
```bash
npm run dev
```

5. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## 📱 PWA Installation

### Desktop (Chrome/Edge)
- Look for the install icon in the address bar
- Click "Install" to add to your desktop

### iOS Safari
- Tap the Share button
- Scroll down and tap "Add to Home Screen"

### Android Chrome
- Tap the menu (three dots)
- Tap "Install app" or "Add to Home screen"

## 🎨 Design System

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#6C63FF` | Buttons, links, accents |
| Background | `#000000` | Main background |
| Card | `#1f2937` | Card backgrounds |
| Text Primary | `#ffffff` | Main text |
| Text Secondary | `#9ca3af` | Secondary text |
| Border | `#374151` | Borders and dividers |

### Typography

- **Headings**: Bold, white text
- **Body**: Regular, gray text
- **Captions**: Small, muted text

### Spacing

- Uses Tailwind's default spacing scale
- Cards have `rounded-2xl` for modern look
- Consistent `gap-4` between elements

## 🔌 API Integration

The app communicates with a REST API backend. Key endpoints include:

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Posts
- `GET /posts/feed` - Get user's feed
- `POST /posts` - Create a new post
- `GET /posts/:id` - Get single post
- `DELETE /posts/:id` - Delete a post
- `POST /posts/:id/like` - Like a post
- `POST /posts/:id/repost` - Repost
- `POST /posts/:id/share` - Share post

### Users
- `GET /users/:id` - Get user profile
- `PUT /users/:id` - Update profile
- `POST /users/:id/follow` - Follow user
- `DELETE /users/:id/follow` - Unfollow user
- `GET /users/:id/posts` - Get user's posts
- `GET /users/:id/liked` - Get user's liked posts
- `GET /users/:id/reposted` - Get user's reposted posts

### Explore
- `GET /posts/explore` - Get explore page posts
- `GET /users/search?q=` - Search users
- `GET /hashtags/trending` - Get trending hashtags

### Notifications
- `GET /notifications` - Get user notifications
- `PUT /notifications/:id/read` - Mark as read
- `PUT /notifications/read-all` - Mark all as read

### Archive
- `GET /posts/archive` - Get user's expired posts

### Analytics
- `GET /analytics` - Get user's posting analytics

## 🔄 Real-time Features (Socket.IO)

The app uses Socket.IO for real-time features:

### Events Emitted by Client
- `user:online` - User came online
- `user:join` - User joined the room

### Events Received by Client
- `users:online-count` - Current online user count
- `notification:new` - New notification received
- `post:created` - New post in feed
- `post:deleted` - Post was deleted

## 🧪 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.2.4 | UI framework |
| react-router-dom | 7.14.1 | Routing |
| tailwindcss | 4.2.2 | Styling |
| socket.io-client | 4.8.3 | Real-time communication |
| axios | 1.15.0 | HTTP client |
| framer-motion | 12.38.0 | Animations |
| lucide-react | 1.8.0 | Icons |
| react-hot-toast | 2.6.0 | Toast notifications |
| recharts | 3.8.1 | Charts |

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is for educational purposes. BeReal is a trademark of its respective owners.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

- **GitHub**: [Codewithpabitra](https://github.com/Codewithpabitra)
- **Project Link**: [Bereal-web-v2](https://github.com/Codewithpabitra/Bereal-web-v2)

---

**Be real. Be you.** ✨