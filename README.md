# Premium Portfolio

A sleek, modern personal portfolio website with a black background and white typography. Built with Next.js, React, TypeScript, Tailwind CSS, Framer Motion, and Lenis for smooth scrolling.

## ✨ Features

- **Premium Dark Design** - Pure black (#000) background with white typography
- **Smooth Scrolling** - Butter-smooth scroll experience powered by Lenis
- **Cinematic Animations** - Page transitions, scroll reveals, and micro-interactions
- **Center-Focus Project Scroller** - The hero feature with 3D tilt and clip-path reveals
- **Custom Cursor** - Subtle cursor interactions on desktop
- **Mobile-First** - Fully responsive with touch support
- **Accessible** - High contrast, keyboard navigation, reduced motion support
- **60fps Performance** - Optimized animations using GPU acceleration

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Smooth Scroll**: Lenis
- **Fonts**: Inter (body) + Space Grotesk (headings)

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles & design tokens
│   ├── layout.tsx       # Root layout with providers
│   └── page.tsx         # Main page composition
├── components/
│   ├── sections/
│   │   ├── Hero.tsx     # Full viewport hero with text animations
│   │   ├── About.tsx    # Bio section with animated dividers
│   │   ├── Skills.tsx   # Skills grid with hover effects
│   │   ├── Projects.tsx # CENTER-FOCUS HORIZONTAL SCROLLER ⭐
│   │   └── Contact.tsx  # Contact section with social links
│   ├── Header.tsx       # Fixed navigation
│   ├── CustomCursor.tsx # Custom cursor component
│   ├── PageTransition.tsx # Clip-path page transitions
│   └── index.ts         # Barrel exports
└── providers/
    └── SmoothScrollProvider.tsx # Lenis smooth scroll
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🎨 Design System

### Colors

- **Background**: `#000000` (pure black)
- **Primary Text**: `#ffffff` (white)
- **Secondary Text**: Gray scale from `#f5f5f5` to `#171717`

### Typography

- **Headings**: Space Grotesk (600-700 weight)
- **Body**: Inter (300-500 weight)
- **Scale**: Fluid typography using `clamp()`

### Spacing

- **Section Padding**: `clamp(80px, 15vh, 160px)`
- **Container Padding**: `clamp(20px, 5vw, 120px)`

## 🎬 Animation Logic (Projects Section)

The Projects section is the hero feature, implementing several advanced animation techniques:

### 1. Center-Focus Layout

```
← scroll →
[ small ]   [  ACTIVE PROJECT  ]   [ small ]
```

- Center card is dominant (scale: 1.0, opacity: 1.0)
- Side cards are diminished (scale: 0.75-0.9, opacity: 0.4-0.75)
- Transitions use spring physics for natural feel

### 2. Scroll Behavior

- Uses `useScroll` + `useTransform` from Framer Motion
- Active index calculated from scroll progress
- Continuous scale/opacity interpolation

### 3. 3D Tilt Effect (Desktop)

- Mouse position tracked via `useMotionValue`
- Position normalized to card center (-0.5 to 0.5)
- Tilt angles calculated: rotateX (±8°), rotateY (±8°)
- Smoothed with `useSpring` for lag effect

### 4. Project Expansion

- Click captures card's bounding rect
- Circular `clip-path` reveal from click origin
- Animation: `circle(0%)` → `circle(150%)`
- Content fades in with stagger

### 5. Mobile Support

- CSS `snap-x snap-mandatory` for swipe snapping
- Touch-friendly card sizing
- Graceful animation degradation

## 🔧 Customization

### Changing Personal Info

Edit the following files:

- `src/app/layout.tsx` - Metadata (title, description)
- `src/components/sections/Hero.tsx` - Name and tagline
- `src/components/sections/Contact.tsx` - Email and social links

### Adding Projects

Edit `src/components/sections/Projects.tsx`:

```typescript
const projects: Project[] = [
  {
    id: 1,
    title: "Your Project",
    subtitle: "Category",
    description: "Description...",
    tags: ["Tech", "Stack"],
    year: "2024",
    color: "#4F46E5", // Accent color
    image: "/projects/your-image.jpg",
    link: "https://your-link.com",
  },
  // ... more projects
];
```

### Modifying Skills

Edit `src/components/sections/Skills.tsx`:

```typescript
const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript"],
    icon: "◆",
  },
  // ... more categories
];
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility

- High contrast text (WCAG AA compliant)
- Keyboard navigation support
- Focus indicators
- `prefers-reduced-motion` support
- Semantic HTML structure
- ARIA labels on interactive elements

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

Build and deploy the static output:

```bash
npm run build
# Deploy the .next folder
```

## 📄 License

MIT License - feel free to use this for your own portfolio!

---

Built with ❤️ using Next.js, Tailwind CSS, and Framer Motion
