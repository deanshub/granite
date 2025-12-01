# Granite

A modern file explorer and editor built with Next.js, featuring a clean interface and powerful editing capabilities.

## Features

- 📁 **File Explorer** - Browse and navigate your project files with a tree view
- ✏️ **Rich Text Editor** - Edit files with a Notion-like editor powered by Tiptap
- 🔍 **Search & Filter** - Quickly find files with the built-in search functionality
- 🌓 **Dark/Light Mode** - Toggle between themes with system preference support
- 🔄 **Auto-save** - Debounced auto-save functionality for seamless editing
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎨 **Modern UI** - Built with shadcn/ui components and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Editor**: Tiptap with markdown support
- **Icons**: Lucide React
- **Package Manager**: Bun
- **Deployment**: Docker with GitHub Actions

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/granite.git
cd granite
```

2. Install dependencies:
```bash
bun install
```

3. Run the development server:
```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Docker

### Build and run locally:
```bash
docker build -t granite .
docker run -p 3000:3000 granite
```

### Pull from GitHub Container Registry:
```bash
docker pull ghcr.io/your-username/granite:main
docker run -p 3000:3000 ghcr.io/your-username/granite:main
```

## Usage

- **Browse Files**: Use the sidebar to navigate through your project structure
- **Create Files**: Click the "New File" button and enter a file path
- **Edit Files**: Click on any file to open it in the editor
- **Search**: Use the search bar in the sidebar to filter files
- **Auto-save**: Changes are automatically saved after 500ms of inactivity
- **Theme Toggle**: Use the theme switcher in the top bar

## Development

The project uses:
- Server Components for file system operations
- Client Components for interactive UI elements
- Server Actions for file creation and saving
- Debounced auto-save for performance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.
