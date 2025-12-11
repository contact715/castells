# Project Structure

## Directory Layout

```
castells-agency/
├── docs/                     # Project documentation (Master Framework)
├── public/                   # Static assets (images, icons)
├── components/               # React components
│   ├── ui/                   # Reusable UI atoms (Buttons, Cards, Inputs)
│   ├── sections/             # Page sections (Hero, About, Services)
│   ├── layout/               # Global layout (Navbar, Footer)
│   ├── effects/              # Visual effects & backgrounds
│   └── pages/                # Page-level components
├── lib/                      # Utilities and helper functions
├── hooks/                    # Custom React hooks
├── types/                    # TypeScript type definitions
├── styles/                   # Global styles
├── App.tsx                   # Main application entry
├── main.tsx                  # React DOM entry
└── vite.config.ts            # Vite configuration
```

## Component Categories

### UI (`components/ui`)
Small, reusable components that are agnostic to business logic.
- Examples: `Button`, `Card`, `Input`, `Badge`

### Sections (`components/sections`)
Large, distinct parts of a page. Usually composed of multiple UI components.
- Examples: `Hero`, `Features`, `Testimonials`, `ContactForm`

### Layout (`components/layout`)
Components that define the overall page structure.
- Examples: `NavBar`, `Footer`, `Container`

### Effects (`components/effects`)
Specialized visual components, often using Canvas/WebGL or complex animations.
- Examples: `AuroraBackground`, `LightRays`

### Pages (`components/pages`)
Top-level components representing a full route/view.
- Examples: `HomePage`, `AboutPage`
