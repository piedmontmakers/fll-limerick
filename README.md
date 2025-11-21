# FIRST LEGO League Limerick Generator

A web application for generating celebratory limericks for FIRST LEGO League award presentations. Built with React, TypeScript, and Tailwind CSS based on Figma designs.

## Features

- **Award Selection**: Choose from required and optional FIRST LEGO League awards
- **Team Information**: Enter team name and judge details
- **AI-Powered Generation**: Uses GPT-5-mini via Vercel AI Gateway to create unique, celebratory limericks
- **Fallback Mode**: Works offline with template limericks if API key is not configured
- **Selection Interface**: Review and select the best limerick for presentation
- **Responsive Design**: Works on desktop and mobile devices
- **FLL Unearthed Theme**: Matches the official FIRST LEGO League Unearthed season branding

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icons
- **Vercel AI Gateway** - Direct API access to GPT-5-mini for limerick generation

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Vercel AI Gateway API key (for AI-generated limericks)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your Vercel AI Gateway API key
# Get your key from: https://vercel.com/dashboard
VITE_AI_GATEWAY_API_KEY=your_api_key_here
```

**Note:** The app will work without an API key but will use fallback template limericks instead of AI-generated ones.

### Development

```bash
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) to view the app.

### Build

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components (buttons, cards, inputs, etc.)
│   └── LimerickGenerator.tsx  # Main limerick generator component
├── data/
│   └── awards.ts     # FIRST LEGO League award data
├── lib/
│   └── utils.ts      # Utility functions
├── App.tsx           # Main app component
├── main.tsx          # App entry point
└── index.css         # Global styles with Tailwind
```

## Awards Included

### Required Awards
- Champion's Award
- Core Values Award
- Innovation Project Award
- Robot Design Award
- Robot Performance Award
- Coach/Mentor Award

### Optional Awards
- Engineering Excellence Award
- Breakthrough Award
- Rising All-Star Award
- Motivate Award
- Peer Award

## Future Enhancements

- Export limericks to PDF
- Save favorite limericks
- Custom award creation
- Multi-language support
- Print formatting for award presentations

## License

This project was created for FIRST LEGO League Limerick event support.
