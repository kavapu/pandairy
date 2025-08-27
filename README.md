# My Panda Diary - Static Web App

A beautiful, static diary web application that can be hosted on GitHub Pages. No backend required - everything runs in your browser!

## Features

### 🎵 Music Player
- Custom music player with play/pause, next, previous, shuffle, and repeat controls
- Progress bar with click-to-seek functionality
- Time display showing current position and total duration
- Add your own music files to the `assets/music/` folder

### 📅 Live Clock
- Real-time clock that updates every second
- Current date and day of the week display
- Beautiful time formatting

### 📖 Diary
- Handwriting-style font for a personal touch
- Auto-save functionality (saves every 2 seconds while typing)
- Manual save button with panda animation
- Navigate between days with arrow buttons
- View history of all your entries
- All data stored locally in your browser (LocalStorage)

### 🐼 Design
- Two-column layout with glassmorphism design
- Responsive design that works on all devices
- Cute panda mascot in the corner
- Page flip animations when navigating between days
- Beautiful gradient background with cloud animations

## How to Use

### Local Development
1. Simply open `index.html` in your web browser
2. Start writing your diary entries
3. Add music files to `assets/music/` folder and update the playlist in `script.js`

### GitHub Pages Deployment
1. Push this repository to GitHub
2. Go to Settings > Pages
3. Select "Deploy from a branch" and choose your main branch
4. Your diary will be available at `https://yourusername.github.io/your-repo-name`

## Adding Music

To add your own music:

1. Place your music files in the `assets/music/` folder
2. Update the `playlist` array in `script.js`:

```javascript
const playlist = [
    {
        title: "Your Song Title",
        artist: "Artist Name",
        src: "assets/music/your-song.mp3"
    },
    // Add more songs...
];
```

## File Structure

```
/
├── index.html          # Main HTML file
├── style.css           # All styles and responsive design
├── script.js           # All functionality
├── assets/
│   ├── images/
│   │   └── panda-circular-symbol.svg
│   └── music/
│       └── (add your music files here)
└── README.md
```

## Browser Compatibility

- Modern browsers with LocalStorage support
- Works offline once loaded
- Responsive design for mobile, tablet, and desktop

## Data Storage

All diary entries are stored in your browser's LocalStorage. This means:
- ✅ No server required
- ✅ Works completely offline
- ✅ Your data stays private on your device
- ⚠️ Data is tied to your browser/device
- ⚠️ Clearing browser data will delete your entries

## Keyboard Shortcuts

- `Ctrl/Cmd + S`: Save current entry
- `Left/Right Arrow`: Navigate between days (when not typing)
- `Spacebar`: Play/pause music (when not typing)

## Customization

You can easily customize:
- Colors and styling in `style.css`
- Music playlist in `script.js`
- Fonts by changing the Google Fonts import in `index.html`
- Panda image by replacing `assets/images/panda-circular-symbol.svg`

## License

This project is open source and available under the MIT License.

---

Enjoy your personal panda diary! 🐼✨
