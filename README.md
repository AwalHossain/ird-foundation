# Dua & Ruqyah Application

<p align="center">
  <img src="public/assets/hand.png" alt="Dua & Ruqyah Logo" width="120">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-13.x-black" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-3.x-38B2AC" alt="Tailwind">
  <img src="https://img.shields.io/badge/SQLite-3-003B57" alt="SQLite">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
</p>

A comprehensive Islamic application for accessing supplications (duas) and ruqyah content from Hisnul Muslim. Built with modern web technologies and featuring a responsive, user-friendly interface.

## ✨ Features

### User Interface
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop views
- **Modern UI** - Clean, intuitive interface based on professional design
- **Smart Navigation** - Collapsible sidebar that adapts to screen size
- **Dynamic Header** - Smart scroll behavior that hides/shows based on scroll direction
- **Three-column Layout** - Optimized content organization on large screens

### Core Functionality
- **Categorized Duas** - Browse duas by categories and subcategories
- **Search** - Find specific duas by name or content
- **Audio Support** - Listen to duas with embedded audio player
- **Arabic Text** - Original Arabic text with beautiful typography
- **Translations** - English translations and transliterations
- **Bookmarks** - Save favorite duas for quick access
- **Memorization Tools** - Features to help memorize duas

### Technical Features
- **Static Site Generation** - Pre-rendered pages for optimal performance
- **Optimized Loading** - Smart caching of dua content to minimize API calls
- **Performance Focused** - Smooth scrolling and transitions
- **Offline Support** - Access duas without internet connection
- **Dark/Light Mode** - Customizable UI theme
- **Custom Scrollbars** - Enhanced scrolling experience

## 🚀 Tech Stack

- **Frontend**:
  - Next.js 13+ with App Router
  - TypeScript for type safety
  - Tailwind CSS for styling
  - Radix UI for accessible components
  - Lucide icons
  - Context API for state management

- **Backend**:
  - Node.js/Express REST API
  - SQLite database for lightweight, portable data storage
  - TypeScript for backend code

## 📋 Project Structure

```
dua-ruqyah/
├── src/                  # Frontend code
│   ├── app/              # Next.js app router pages
│   ├── components/       # Reusable UI components
│   │   ├── dua/          # Dua-specific components
│   │   ├── layout/       # Layout components
│   │   ├── nav/          # Navigation components
│   │   └── ui/           # UI primitives
│   ├── contexts/         # React context providers
│   └── lib/              # Utility functions and API client
├── backend/              # Backend API server
│   ├── src/              # Source code
│   └── dist/             # Compiled JavaScript
├── public/               # Static assets
│   └── assets/           # Images and other media
└── dua_main.sqlite       # SQLite database
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16.x or newer)
- npm or yarn

### Setting up the Backend

1. Install backend dependencies:
   ```bash
   cd backend
   npm install
   npm run build
   ```

2. Start the backend development server:
   ```bash
   npm run dev
   ```

   The API server will run on http://localhost:5000 by default.

### Setting up the Frontend

1. Install frontend dependencies:
   ```bash
   npm install
   ```

2. Set environment variables:
   Create a `.env.local` file in the project root with:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

   The frontend will run on http://localhost:3000 by default.

## 📊 Database Architecture

This project uses SQLite as the database, which offers:

- **Serverless Operation** - No separate database server needed
- **Portable File Storage** - Single file contains all data
- **Zero Configuration** - Works out of the box
- **ACID Compliance** - Reliable transaction support

### Core Tables

- `category` - Main dua categories (e.g., Morning/Evening, Prayer)
- `sub_category` - Subcategories within each category
- `dua` - Individual duas with the following data:
  - Original Arabic text
  - English translation
  - Transliteration
  - Reference information
  - Audio file paths
  - Category relationships

## 🚀 Deployment

### Backend Deployment

1. Build the TypeScript code:
   ```bash
   cd backend
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

### Frontend Deployment

1. Build the Next.js application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

For optimal deployment, consider using Vercel for the Next.js frontend and a NodeJS hosting service for the backend API.

## 🖼️ Asset Management

### Category Icons

The application uses custom icons for categories:

1. Place category icons in the `public/images/` directory
2. Icon filenames should match references in the database
3. Use the API endpoint `/api/category-icons` to retrieve the required icon list

## 🧩 UI Components

The application features several custom component types:

- **DuaCard** - Displays individual dua with translation and audio controls
- **SearchBar** - Advanced search functionality
- **Sidebar** - Navigation for categories and subcategories
- **Header** - Smart scrolling app header
- **PageContainer** - Three-column responsive layout system
- **SettingsDrawer** - User preferences and application settings

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For questions or support, please open an issue in the GitHub repository.
