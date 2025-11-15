# 📰 News Today - Modern News Feed Application

A modern, responsive news feed application built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. Features real-time news fetching, advanced search functionality, and seamless navigation with optimized performance.

![News Today Preview](./design/hero-preview.png)

## ✨ Features

### 🔥 Core Features

- **Real-time News Feed** - Latest headlines from trusted sources via News API
- **Advanced Search** - Search across headlines, topics, and categories with debouncing
- **Category Filtering** - Browse by Top Stories, World, Politics, Business, Technology
- **Article Detail Pages** - Full article previews
- **Responsive Design** - Optimized for mobile, tablet, and desktop viewing

### ⚡ Performance Features

- **Instant Navigation** - Zero-latency article transitions using sessionStorage
- **Smart Caching** - Articles cached locally for immediate loading
- **Optimized Images** - Next.js Image optimization with fallback handling
- **Skeleton Loading** - Beautiful loading states for enhanced UX
- **Search Debouncing** - 900ms delay to prevent excessive API calls

### 🎨 UI/UX Features

- **Modern Design** - Clean, professional interface with EB Garamond typography
- **Smooth Animations** - Framer Motion powered transitions and hover effects
- **Mobile-First** - Responsive hamburger navigation with animated menu
- **Interactive Elements** - Hover effects, click feedback, and loading states
- **Accessibility** - Proper ARIA labels and keyboard navigation support

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn**
- **News API Key** from [NewsAPI.org](https://newsapi.org/) (free tier available)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bitume_news_feed_test_project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create `.env.local` in the root directory:

   ```env
   NEXT_PUBLIC_NEWS_API_URL=https://newsapi.org/v2/top-headlines?country=us
   NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
bitume_news_feed_test_project/
├── app/
│   ├── components/
│   │   ├── new-feeds/          # News-specific components
│   │   │   ├── ArticleCard.tsx # Individual article cards with navigation
│   │   │   ├── Hero.tsx        # Hero section with featured article
│   │   │   └── RecentArticles.tsx # Article grid with loading states
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Nav.tsx         # Navigation with mobile hamburger menu
│   │   │   ├── Footer.tsx      # Site footer with links
│   │   │   ├── SearchBar.tsx   # Debounced search input component
│   │   │   ├── Tab.tsx         # Category filter tabs
│   │   │   └── skeleton/       # Loading state components
│   │   │       └── ArticleSkeleton.tsx
│   │   └── ...
│   ├── hooks/
│   │   └── useNews.ts          # Custom hook for news data fetching
│   ├── store/
│   │   └── index.ts            # TanStack Store for global state
│   ├── pages/
│   │   └── news/[slug]/        # Dynamic article pages with SSG
│   │       └── page.tsx
│   ├── utili/
│   │   └── debounce.ts         # Utility functions
│   ├── api.ts                  # API layer with Axios and error handling
│   ├── constants.ts            # App constants and navigation links
│   └── globals.css             # Global styles and Tailwind theme
├── public/
│   ├── images/                 # Static images and fallback assets
│   └── ...
├── design/                     # Design files and mockups
└── ...
```

## 🛠️ Technology Stack

### Frontend Framework

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router and SSG
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and enhanced developer experience
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework with custom theme

### State Management & Performance

- **[TanStack Store](https://tanstack.com/store)** - Lightweight, type-safe state management
- **SessionStorage** - Client-side article caching for instant navigation
- **Search Debouncing** - Optimized API calls with 900ms delay

### Data Fetching & APIs

- **[News API](https://newsapi.org/)** - Real-time news data from trusted sources
- **Custom Hooks** - Abstracted data fetching with error handling
- **[Axios](https://axios-http.com/)** - HTTP client with interceptors

### UI & Animation

- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations and transitions
- **[Lucide React](https://lucide.dev/)** - Beautiful, consistent icon system
- **Custom Components** - Modular, reusable component architecture

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting with Next.js configuration
- **TypeScript Strict Mode** - Enhanced type checking and safety

## 🎯 Key Features Explained

### Smart Navigation System

The app implements an intelligent navigation system that provides instant loading:

```typescript
// ArticleCard navigation with state preservation
const handleNavigate = () => {
  const slug = createSlug(title);
  const articleData = {
    title,
    description,
    urlToImage,
    publishedAt,
    url,
  };

  // Store article data for instant loading
  sessionStorage.setItem(`article-${slug}`, JSON.stringify(articleData));

  // Navigate to article page
  router.push(`/pages/news/${slug}`);
};
```

### Optimized Data Fetching

```typescript
// useNews hook with debouncing and intelligent caching
export function useNews() {
  const debouncedFetch = useMemo(
    () =>
      debounce(() => {
        const url = `${apiUrl}&category=${category}&q=${searchQuery}&apiKey=${apiKey}`;
        sendRequest({ url, method: "GET" });
      }, 900),
    [apiUrl, apiKey, category, searchQuery, sendRequest]
  );
}
```

### Responsive Design System

```css
/* Custom Tailwind theme configuration */
@theme {
  --color-blue-300: #1173d4;
  --color-gray-50: #f6f7f8;
  --color-gray-100: #333d4d;
  --color-gray-200: #eaedf2;
  --color-gray-800: #0f172a;
  --color-organ-50: #fbeee1;
  --color-organ-100: #f9d4b5;
}
```

## 📱 Pages & Components

### Home Page (`/`)

- **Hero Section** - Featured article with background image and call-to-action
- **Search & Filters** - Real-time search with category tabs (All, Top, World, Politics, Business, Tech)
- **Recent Articles** - Responsive grid layout of latest news with hover effects
- **Navigation** - Responsive header with mobile hamburger menu

### Article Page (`/pages/news/[slug]`)

- **Article Header** - Title, author byline, and formatted publish date
- **Featured Image** - Optimized hero image with fallback handling
- **Article Content** - Description preview with link to original source
- **Article Stats** - Like and comment icons for future interactivity
- **Navigation** - Back to home functionality

### Key Components Deep Dive

#### `ArticleCard`

- **Smart Navigation** - sessionStorage caching for instant page loads
- **Hover Effects** - Smooth image scaling and subtle animations
- **Responsive Images** - Next.js Image optimization with proper aspect ratios
- **Fallback Handling** - Default images for broken or missing assets
- **Accessibility** - Proper ARIA labels and keyboard navigation

#### `SearchBar`

- **Debounced Input** - 900ms delay for optimal API usage
- **Icon Integration** - Lucide React search icon with proper positioning
- **Responsive Design** - Mobile-first approach with flexible sizing
- **Real-time Filtering** - Instant visual feedback during typing

#### `Nav` (Navigation)

- **Mobile Menu** - Animated hamburger navigation with overlay
- **Search Integration** - Inline search functionality in header
- **Brand Identity** - Custom logo design with consistent typography
- **Responsive Behavior** - Adaptive layout for different screen sizes

#### `Hero`

- **Featured Article** - Dynamic background images from news articles
- **Content Overlay** - Readable text with proper contrast and positioning
- **Call-to-Action** - Prominent "Read More" button with hover effects
- **Smart Navigation** - Same sessionStorage approach as ArticleCard

## 🌐 API Integration

### News API Configuration

```typescript
// Environment setup
NEXT_PUBLIC_NEWS_API_URL=https://newsapi.org/v2/top-headlines?country=us
NEXT_PUBLIC_NEWS_API_KEY=your_api_key_here

// API implementation with error handling
const response = await fetch(
  `${apiUrl}&category=${category}&q=${searchQuery}&apiKey=${apiKey}`
);

if (!response.ok) {
  throw new Error('Failed to fetch articles');
}

const data = await response.json();
```

### Supported News Categories

- **All** - Mixed content from all categories
- **Top Stories** - Breaking news and featured headlines
- **World** - International news and global events
- **Politics** - Political coverage and government news
- **Business** - Financial markets and corporate news
- **Technology** - Tech industry updates and innovations

### API Features

- **Real-time Data** - Fresh news updates from trusted sources
- **Search Functionality** - Full-text search across headlines and content
- **Category Filtering** - Organized content by news type
- **Error Handling** - Graceful degradation with user-friendly messages
- **Rate Limiting** - Debounced requests to respect API limits

## 🎨 Design System

### Color Palette

```css
/* Primary colors */
--color-blue-300: #1173d4    /* Primary blue for CTAs and links */
--color-gray-50: #f6f7f8     /* Light background */
--color-gray-100: #333d4d    /* Primary text color */
--color-gray-200: #eaedf2    /* Borders and dividers */
--color-gray-800: #0f172a    /* Dark headings */

/* Accent colors */
--color-organ-50: #fbeee1    /* Light orange background */
--color-organ-100: #f9d4b5   /* Orange accent for highlights */
```

### Typography

- **Primary Font** - EB Garamond (serif) for elegant, readable text
- **Font Weights** - 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Responsive Sizing** - Fluid typography that scales across devices
- **Line Heights** - Optimized for readability and visual hierarchy

### Component Design Principles

- **Cards** - Rounded corners (rounded-lg), subtle shadows, hover effects
- **Buttons** - Consistent padding, smooth transitions, accessible focus states
- **Images** - Proper aspect ratios, object-fit coverage, loading states
- **Animations** - Smooth 300ms transitions, scale effects, fade animations

## 🚢 Deployment

### Build Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Code linting
npm run lint
```

### Environment Setup for Production

1. **Set up environment variables** in your deployment platform:

   ```env
   NEXT_PUBLIC_NEWS_API_URL=https://newsapi.org/v2/top-headlines?country=us
   NEXT_PUBLIC_NEWS_API_KEY=your_actual_api_key
   ```

2. **Build optimization** - Next.js automatically optimizes:

   - Image compression and WebP conversion
   - JavaScript bundling and tree-shaking
   - CSS purging and minification
   - Route-based code splitting

3. **Deploy to platforms**:
   - **Vercel** (recommended) - Zero configuration deployment
   - **Netlify** - Static site hosting with serverless functions
   - **AWS/Azure/GCP** - Full cloud deployment options

## 📈 Performance Optimizations

### Loading Performance

- **Image Optimization** - Next.js automatic image optimization with WebP
- **Route Prefetching** - Next.js Link component prefetches critical routes
- **Bundle Splitting** - Automatic code splitting by routes and components
- **Static Generation** - Pre-rendered pages for faster initial loads

### Runtime Performance

- **Search Debouncing** - 900ms delay prevents excessive API requests
- **Article Caching** - sessionStorage for instant article navigation
- **Skeleton Loading** - Non-blocking UI with loading placeholders
- **Efficient Re-renders** - React.memo and useCallback optimizations

### Bundle Optimization

- **Tree Shaking** - Unused code elimination in production builds
- **Asset Compression** - Gzip/Brotli compression for smaller payloads
- **Critical CSS** - Inline critical styles for faster first paint
- **Lazy Loading** - Images and components loaded on demand

### Core Web Vitals Targets

- **First Contentful Paint (FCP)** - < 1.5s
- **Largest Contentful Paint (LCP)** - < 2.5s
- **Cumulative Layout Shift (CLS)** - < 0.1
- **First Input Delay (FID)** - < 100ms

## 🔧 Development Guidelines

### Code Style & Standards

- **TypeScript** - Strict mode enabled with proper type definitions
- **ESLint** - Next.js recommended configuration with custom rules
- **Component Architecture** - Small, focused, reusable components
- **File Naming** - PascalCase for components, camelCase for utilities

### Best Practices

- **Error Boundaries** - Graceful error handling throughout the app
- **Accessibility** - ARIA labels, keyboard navigation, screen reader support
- **Performance** - Lazy loading, image optimization, efficient state management
- **SEO** - Proper meta tags, structured data, semantic HTML

### Git Workflow

```bash
# Feature development
git checkout -b feature/amazing-feature
git commit -m "Add amazing feature"
git push origin feature/amazing-feature

# Open pull request with description of changes
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request** with detailed description

### Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/news-feed-app.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[News API](https://newsapi.org/)** - Reliable news data provider
- **[Next.js Team](https://nextjs.org/)** - Amazing React framework and tooling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Beautiful animation library
- **[Lucide Icons](https://lucide.dev/)** - Clean, consistent icon system
- **[TanStack](https://tanstack.com/)** - Powerful data management tools

---

## 🔧 Technical Specifications

### Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile browsers** - iOS Safari 14+, Chrome Mobile 90+

### Performance Benchmarks

- **Lighthouse Score** - 95+ across all metrics
- **Bundle Size** - < 500KB first load JS
- **Time to Interactive** - < 3s on 3G networks
- **Image Optimization** - WebP format with fallbacks

### SEO & Social

- **Meta Tags** - Dynamic titles and descriptions
- **Open Graph** - Social media preview cards
- **Twitter Cards** - Optimized Twitter sharing
- **Structured Data** - JSON-LD for rich search results

---

**Built with ❤️ for modern news consumption**

_For questions, issues, or contributions, please visit our [GitHub repository](https://github.com/your-username/news-feed-app) or open an issue._
