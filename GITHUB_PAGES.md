# Deploying to GitHub Pages

This guide will help you deploy your Panda Diary to GitHub Pages for free hosting.

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository (e.g., `my-panda-diary`)
4. Make it public (required for free GitHub Pages)
5. Don't initialize with README (since we already have one)
6. Click "Create repository"

## Step 2: Upload Your Files

### Option A: Using GitHub Web Interface
1. In your new repository, click "uploading an existing file"
2. Drag and drop all your files:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
   - `assets/` folder (with images and music)
3. Add a commit message like "Initial commit"
4. Click "Commit changes"

### Option B: Using Git Command Line
```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section (in the left sidebar)
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"

## Step 4: Wait for Deployment

- GitHub will build and deploy your site
- This usually takes 1-2 minutes
- You'll see a green checkmark when it's ready
- Your site will be available at: `https://yourusername.github.io/your-repo-name`

## Step 5: Custom Domain (Optional)

If you want a custom domain:

1. In the Pages settings, enter your domain name
2. Add a CNAME file to your repository with your domain
3. Configure your DNS provider to point to GitHub Pages

## Adding Music Files

To add your own music:

1. Upload your music files to the `assets/music/` folder
2. Update the playlist in `script.js`:

```javascript
const playlist = [
    {
        title: "Your Song Title",
        artist: "Artist Name", 
        src: "assets/music/your-song.mp3"
    }
];
```

## Troubleshooting

### Site Not Loading
- Check that all files are in the correct locations
- Ensure `index.html` is in the root directory
- Verify the repository is public

### Music Not Playing
- Make sure music files are in the correct format (MP3, WAV, etc.)
- Check that file paths in the playlist are correct
- Some browsers may block autoplay

### Styling Issues
- Clear your browser cache
- Check that `style.css` is properly linked in `index.html`
- Verify all font imports are working

## Updating Your Site

To update your site:

1. Make changes to your local files
2. Commit and push to GitHub:
```bash
git add .
git commit -m "Update description"
git push
```
3. GitHub Pages will automatically rebuild and deploy

## Security Notes

- GitHub Pages sites are public by default
- Your diary entries are stored locally in your browser
- No server-side data is stored on GitHub
- Consider this when writing personal entries

---

Your Panda Diary is now live on the web! 🐼✨
