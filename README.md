# Oak & Chisel — CRM Dashboard

A full-featured **CRM and business management dashboard** built for **Oak & Chisel**, a handcrafted wooden furniture showroom. Designed to manage the complete sales lifecycle — from walk-in clients to delivered orders — with an interactive AR furniture visualizer.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 |
| UI Primitives | Radix UI, MUI (Material UI) |
| Charts | Recharts |
| Canvas / AR | Konva, react-konva, model-viewer |
| Animations | Motion (Framer Motion) |
| Icons | Lucide React |
| Drag & Drop | react-dnd |
| Forms | react-hook-form |
| Package Manager | pnpm |

---

## Features

### Dashboard
- Revenue and cost metric cards with period filters (Today / Week / Month / Year)
- Sales overview line chart (Revenue vs Orders)
- Order status grid and quick stats panel
- Recent projects table

### Clients
- Client directory with lead scores and status tracking
- Filter by status: All, Walk-in, Follow-up Due, Order Placed, Delivered
- Search by name, phone, or interest
- One-click conversion of a client into a Pipeline deal
- Status auto-syncs with the Pipeline stage in real time

### Pipeline (Sales Pipeline)
- Kanban-style deal management across 3 stages: **Walk-in → Order Booked → Deliver**
- Add new deals via modal form with client name, furniture interest, value, and stage
- Click any deal card to move it to a different stage
- Deal counts shown per stage tab

### Quotation Builder
- Create itemized furniture quotations with material specs, quantity, and unit price
- Auto-calculates subtotal, 18% GST, and grand total
- Apply custom discounts
- Save as Draft, send via WhatsApp, or Approve & Book Order
- View and manage Draft / Sent / Approved quotes in separate tabs

### Orders
- Order fulfillment tracker with status: Processing → In Transit → Delivered
- Detailed order panel showing furniture items, shipping address, and estimated delivery
- One-click status progression (Ship Order / Complete Delivery)
- WhatsApp invoice sharing button

### AR Preview (Interactive Visualizer)
- 2D canvas mode: drag, resize, rotate, flip, duplicate, and delete furniture PNGs on a room background
- 3D mode: place GLB models using Google's `<model-viewer>` with AR support
- Upload your own room photo or launch live camera as background
- Upload custom PNG cutouts or `.glb` 3D model files
- Download the composed room design as a PNG
- QR code generation for WebXR / mobile AR sharing

### Triggers (Automation Panel)
- Toggle WhatsApp auto-trigger rules on/off
- Triggers include: New Walk-in Welcome, 3-Day Follow-up, Delay Alert, Delivery Confirmation, Post-delivery Review, Anniversary Offer

### Staff & Workshop
- Staff directory with roles: Sales Representative, Master Carpenter, Showroom Manager, Delivery Coordinator
- Filter by role, view performance stats and star ratings
- Workshop queue with progress bars for active carpentry jobs
- Monthly sales leaderboard

---

## Project Structure

```
src/
├── app/
│   ├── App.tsx                  # Root component, tab routing, shared deal state
│   └── components/
│       ├── Header.tsx           # Top bar with search, notifications, user avatar
│       ├── Sidebar.tsx          # Fixed left navigation
│       ├── MetricCard.tsx       # Revenue / cost KPI cards
│       ├── SalesChart.tsx       # Recharts line chart
│       ├── StatusGrid.tsx       # Order status summary grid
│       ├── ProjectsTable.tsx    # Recent projects table
│       ├── Clients.tsx          # Client management page
│       ├── Pipeline.tsx         # Sales pipeline (Kanban)
│       ├── Quotation.tsx        # Quotation builder & tracker
│       ├── Orders.tsx           # Order fulfillment tracker
│       ├── ARPreview.tsx        # AR / canvas furniture visualizer
│       ├── Triggers.tsx         # WhatsApp automation toggles
│       ├── Staff.tsx            # Staff & workshop management
│       └── ui/
│           ├── Button.tsx       # Reusable button variants
│           ├── Card.tsx         # Card layout primitives
│           ├── Input.tsx        # Styled input field
│           └── Select.tsx       # Styled select dropdown
├── styles/
│   ├── globals.css
│   ├── fonts.css
│   ├── index.css
│   ├── tailwind.css
│   └── theme.css
└── main.tsx                     # React entry point
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [pnpm](https://pnpm.io/) (recommended) or npm

### Installation

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

### Development Server

```bash
# Using pnpm
pnpm dev

# Or using npm
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port). The `--host` flag is included so it's also accessible on your local network.

### Production Build

```bash
pnpm build
# or
npm run build
```

Output is placed in the `dist/` folder.

---

## Path Aliases

The `@` alias maps to the `src/` directory.

```ts
import { Button } from '@/app/components/ui/Button';
```

---

## Brand Colors

| Token | Hex | Usage |
|---|---|---|
| Primary Brown | `#6A4A3C` | Active nav, buttons, accents |
| Dark Brown | `#50372D` | Hover states |
| Deep Brown | `#3d1f0f` | Logo text |
| Background | `#F5F5F7` | App background |
| Border | `#EAEAEA` | Card and input borders |
| Text Primary | `#111111` | Headings |
| Text Muted | `#777777` / `#A0A0A0` | Secondary text |

---

## Original Design

Based on the Figma design: [SaaS Admin Dashboard UI](https://www.figma.com/design/0jwCZeL5uNxd0V8T4L5aK1/SaaS-Admin-Dashboard-UI)
