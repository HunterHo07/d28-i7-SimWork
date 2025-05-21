# SimWork Development Guide

## Tech Stack

### Frontend
- **Framework**: Next.js 15.3.2 (App Router)
- **Styling**: Tailwind CSS
- **Animation Libraries**:
  - GSAP (GreenSock Animation Platform) - For homepage animations and transitions
  - Three.js - For 3D office environment in the Demo page
  - Framer Motion - For UI component animations
  - Lottie - For loading animations

### State Management
- **Local Storage** - For persisting user progress and settings
- **React Context API** - For global state management

### Assets
- **UI Components**: Custom components with Tailwind
- **3D Assets**: Kenney Assets for office environment and characters
- **Icons**: Heroicons and custom SVGs
- **Images**: Local assets (no external dependencies)

## Project Structure

```
simwork/
├── src/
│   ├── app/
│   │   ├── page.js                 # Homepage
│   │   ├── demo/                   # Demo page
│   │   ├── pitch-deck/             # Pitch deck page
│   │   ├── why-us/                 # Why us page
│   │   ├── roadmap/                # Roadmap page
│   │   ├── showcase/               # Showcase page
│   │   └── layout.js               # Root layout
│   ├── components/
│   │   ├── common/                 # Shared components
│   │   ├── home/                   # Homepage-specific components
│   │   ├── demo/                   # Demo-specific components
│   │   └── ui/                     # UI components
│   ├── lib/
│   │   ├── animations.js           # Animation utilities
│   │   ├── three-scene.js          # Three.js setup
│   │   └── data.js                 # Dummy data
│   ├── hooks/
│   │   └── useSimulation.js        # Custom hooks
│   ├── context/
│   │   └── SimulationContext.js    # Global state
│   └── assets/
│       ├── images/                 # Static images
│       ├── models/                 # 3D models
│       └── animations/             # Lottie files
├── public/
│   ├── favicon.webp               # Favicon
│   └── assets/                    # Public assets
└── package.json
```

## Development Roadmap

### Phase 1: MVP Setup (Current)
1. ✅ Initialize Next.js project
2. ✅ Set up Tailwind CSS
3. ✅ Create basic documentation
4. ⬜ Implement responsive layout and navigation
5. ⬜ Develop homepage with GSAP animations
6. ⬜ Create demo page with Three.js simulation

### Phase 2: Core Features
1. ⬜ Implement 2.5D office environment
2. ⬜ Add character selection and movement
3. ⬜ Create task stations (Developer, Designer, etc.)
4. ⬜ Implement basic task simulation
5. ⬜ Add progress tracking and feedback system

### Phase 3: Polish and Optimization
1. ⬜ Optimize performance
2. ⬜ Enhance visual effects
3. ⬜ Implement responsive design for all devices
4. ⬜ Add accessibility features
5. ⬜ Prepare for deployment

## Usage Guide

### Local Development

1. Clone the repository
```bash
git clone https://github.com/your-username/simwork.git
cd simwork
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm run start
```

## Animation Guidelines

### GSAP Usage
- Use GSAP for complex timeline animations on the homepage
- Implement scroll-triggered animations for section transitions
- Create smooth hover effects for interactive elements

### Three.js Implementation
- Use Three.js for the 3D office environment in the demo page
- Implement low-poly models for optimal performance
- Add interactive elements that respond to user input

### Framer Motion
- Use for component animations (page transitions, modals, etc.)
- Implement gesture-based interactions
- Create micro-interactions for UI elements

## Performance Considerations

1. **Asset Optimization**
   - Compress images and textures
   - Use appropriate model LODs (Level of Detail)
   - Implement lazy loading for non-critical assets

2. **Code Splitting**
   - Use dynamic imports for heavy libraries
   - Implement component-level code splitting
   - Optimize bundle size

3. **Rendering Optimization**
   - Use React.memo for expensive components
   - Implement virtualization for long lists
   - Optimize Three.js rendering with proper techniques
