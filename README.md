# 🏏 Khel.ai Clone - Advanced Analytics Platform

A modern, responsive clone of Khel.ai - a cricket analytics platform built with Next.js 14, featuring advanced UI components, YouTube integration, and real-time analytics capabilities.

![Khel.ai Clone](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🚀 Live Demo

- **GitHub Repository**: [https://github.com/vivekjoshi873/khelai](https://github.com/vivekjoshi873/khelai)
- **YouTube Channel**: [@khel.ai.cricket](https://www.youtube.com/@khel.ai.cricket)

## ✨ Features

### 🎯 Core Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI Components**: Custom shadcn/ui components with dark/light theme support
- **YouTube Integration**: Live video feeds and embedded content
- **Advanced Analytics Dashboard**: Real-time cricket data visualization
- **Interactive Navigation**: Blurred navbar with smooth scroll effects
- **Newsletter Subscription**: Email collection with validation
- **Social Media Integration**: Instagram, LinkedIn, and YouTube links

### 🎥 YouTube Features
- **Live Video Feed**: Latest videos from @khel.ai.cricket channel
- **Embedded Video Player**: Single video showcase with setup guidelines
- **API Integration**: YouTube Data API v3 for dynamic content
- **Responsive Embeds**: Mobile-optimized video players

### 🎨 UI/UX Features
- **Smooth Animations**: Fade-in, scale, and transition effects
- **Interactive Elements**: Hover states, loading skeletons, and micro-interactions
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Performance Optimized**: Image optimization, lazy loading, and code splitting

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **API**: YouTube Data API v3
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vivekjoshi873/khelai.git
   cd khelai
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
   
   Add your YouTube API key:
   ```env
   YOUTUBE_API_KEY=your_youtube_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### YouTube API Setup

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable YouTube Data API v3**
   - Navigate to APIs & Services → Library
   - Search for "YouTube Data API v3"
   - Click "Enable"

3. **Create API Key**
   - Go to APIs & Services → Credentials
   - Click "Create Credentials" → "API Key"
   - Copy the generated key


### Customization

- **Change YouTube Channel**: Update `handle` prop in `src/app/page.tsx`
- **Modify Video Count**: Adjust `maxResults` parameter
- **Update Social Links**: Edit `src/components/sections/footer.tsx`
- **Customize Colors**: Modify Tailwind config in `tailwind.config.js`

## 📁 Project Structure

```
src/
├── app/
│   ├── api/youtube/          # YouTube API routes
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   ├── features/             # Feature components
│   │   ├── youtube-feed.tsx  # YouTube video feed
│   │   └── ...
│   ├── sections/             # Page sections
│   │   ├── hero.tsx          # Hero section
│   │   ├── navigation.tsx    # Navigation bar
│   │   ├── footer.tsx        # Footer
│   │   └── ...
│   └── ui/                   # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
└── lib/
    └── utils.ts              # Utility functions
```

## 🎯 Key Components

### YouTube Integration
- **`/api/youtube`**: Fetches latest videos from channel
- **`YouTubeFeed`**: Displays video grid with pagination
- **`YouTubeSingle`**: Embedded video with setup notes

### Navigation
- **Blurred Background**: Semi-transparent with backdrop blur
- **Smooth Scrolling**: CSS transitions and scroll effects
- **Mobile Responsive**: Collapsible mobile menu

### Analytics Dashboard
- **Real-time Data**: Live cricket statistics
- **Interactive Charts**: Data visualization components
- **Filter System**: Advanced search and filtering

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Compatible with static export
- **Railway**: Full-stack deployment
- **AWS Amplify**: Scalable hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Khel.ai**: Original inspiration and design
- **shadcn/ui**: Beautiful UI components
- **Next.js Team**: Amazing React framework
- **Tailwind CSS**: Utility-first CSS framework


⭐ **Star this repository if you found it helpful!**

Made with ❤️ for the cricket community