# LuxEstate — Premium Real Estate Platform

A luxury real estate channel partner platform built with Next.js 16, Framer Motion, and GSAP.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the homepage.

## 🎨 Features Implemented

### ✅ Full Homepage Architecture

1. **Hero Section**
   - Character-by-character headline reveal animation
   - Parallax background with mouse movement
   - Animated search bar with focus states
   - Scroll indicator

2. **Featured Projects**
   - 3D tilt effect on hover (mouse tracking)
   - Image zoom on hover
   - Staggered entrance animations
   - Overlay reveal with CTA button

3. **Special Offers Strip**
   - Infinite marquee scroll animation
   - Click to open modal with lead form
   - Urgency-driven design

4. **Why Choose Us**
   - Animated counters (0 → target value)
   - Scroll-triggered entrance
   - Icon animations
   - Staggered card reveals

5. **Builder Highlights**
   - Grayscale to color on hover
   - Scale animation
   - Fade-in stagger

6. **Testimonials**
   - Carousel with smooth transitions
   - Auto-scroll capability
   - Star ratings with SVG animations

7. **Final CTA Section**
   - Lead form with validation
   - Input focus animations
   - Error shake animation
   - Success state with SVG checkmark draw

### 🎭 Global Animations

- **Navigation**: Sticky behavior, glassmorphism, hover underlines, mobile menu slide-down
- **Page Loader**: Smooth fade with progress bar
- **WhatsApp Button**: Periodic wobble, bounce on hover
- **Smooth Scrolling**: Lenis integration for premium feel
- **Scroll Reveals**: IntersectionObserver-based animations
- **Background**: Subtle noise texture, animated gradients

### 🎯 Animation Types Used

✅ Parallax Animation  
✅ Text Animation (character reveal)  
✅ Entrance Animation  
✅ Scroll Animation  
✅ Hover Animation  
✅ 3D Animation (tilt)  
✅ Microinteraction  
✅ Infinite Loop Animation  
✅ Page Transition  
✅ Mouse Movement Animation  
✅ State Change Animation  
✅ SVG Animation  
✅ Data Animation (counters)  
✅ Gesture Animation  
✅ Reveal Animation  
✅ Exit Animation  

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.jsx          # Root layout with Lenis + scroll observers
│   └── page.jsx            # Homepage composition
├── components/
│   ├── common/             # Reusable components
│   │   ├── Navigation.jsx
│   │   ├── Footer.jsx
│   │   ├── Button.jsx
│   │   ├── Modal.jsx
│   │   ├── LeadForm.jsx
│   │   ├── PageLoader.jsx
│   │   └── WhatsAppButton.jsx
│   └── home/               # Homepage sections
│       ├── Hero.jsx
│       ├── FeaturedProjects.jsx
│       ├── OffersSection.jsx
│       └── WhyChooseUs.jsx
├── sections/               # Additional sections
│   ├── BuilderSection/
│   ├── TestimonialsSection/
│   └── CTASection/
├── hooks/                  # Custom React hooks
│   ├── useInViewAnimation.js
│   ├── useScroll.js
│   └── useLeadForm.js
├── lib/                    # Utilities
│   └── utils.js
└── styles/                 # Global styles
    ├── globals.css
    ├── theme.css
    └── animations.css
```

## 🎨 Design System

- **Colors**: Deep dark luxury theme with gold accents
- **Typography**: Cormorant Garamond (display), DM Serif Display (headings), Jost (body)
- **Animations**: Framer Motion + CSS keyframes
- **Smooth Scroll**: Lenis
- **Icons**: Lucide React

## 🔧 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Animation**: Framer Motion 12, GSAP 3
- **Styling**: CSS Variables + Custom Design System
- **State**: React Hooks
- **Smooth Scroll**: @studio-freight/lenis
- **Icons**: lucide-react

## 📝 Notes

- All animations follow the master blueprint provided
- Premium feel with subtle motion and high-quality transitions
- Fully responsive design
- Accessibility-friendly (reduced motion support)
- Performance-optimized with lazy loading and code splitting

## 🎯 Next Steps

To add images:
1. Place hero background in `/public/images/hero-bg.jpg`
2. Add project images in `/public/images/project-*.jpg`
3. Add builder logos in `/public/images/builders/*.png`

## 📄 License

Private project for LuxEstate.
