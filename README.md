# macOS Sonoma Portfolio Website

A portfolio website styled after macOS Sonoma 14.16.1, built with Next.js, TypeScript, and Tailwind CSS. This project simulates the macOS desktop environment with functional windows, a dock, and a menu bar.

## Features

- **macOS Sonoma Interface**: Authentic recreation of the macOS Sonoma 14.16.1 UI
- **Interactive Desktop**: Click on desktop icons to open corresponding windows
- **Functional Windows**: Draggable, resizable windows with minimize, maximize, and close buttons
- **Dynamic Dock**: macOS-style dock with app icons and hover effects
- **Menu Bar**: Complete with Apple logo, app menus, and system status icons
- **Dark Mode Toggle**: Switch between light and dark modes
- **Smooth Animations**: Powered by Framer Motion for fluid transitions

## Technologies Used

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For styling and responsive design
- **Framer Motion**: For animations and transitions

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/components/MenuBar`: Contains the top menu bar component
- `src/components/Desktop`: Contains the desktop and window management logic
- `src/components/Dock`: Contains the dock component with app icons
- `src/components/Window`: Contains the window component with controls
- `src/components/Apps`: Contains individual app components (About Me, Projects, Contact)

## Customization

To customize the portfolio content:

1. Edit the files in `src/components/Apps` to update your personal information
2. Modify the desktop icons in `src/components/Desktop/Desktop.tsx`
3. Change the dock icons in `src/components/Dock/Dock.tsx`
4. Update the wallpaper by changing the background image URLs in `src/components/Desktop/Desktop.tsx`

## License

MIT
