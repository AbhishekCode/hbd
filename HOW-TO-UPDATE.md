# How to Update Your Invitation Website (No Coding Needed)

This guide shows exactly how to change the most common details.

## 1) Change Event Details (date, time, venue)
1. Open `index.html` in any editor (Notepad/VS Code/TextEdit)
2. Find these lines near the top:
   - `<p class="event-date">...`
   - `<p class="event-time">...`
   - `<p class="event-location">...`
3. Edit the text between `>` and `<`.
4. Save the file.

## 2) Update Google Maps Link
1. Search for `id="map"` in `index.html`.
2. Replace `https://maps.google.com` with your venue map URL.

## 3) Replace the Photo
1. Put your photo file in the `images/` folder named `birthday-girl.jpg`.
2. Keep the name the same so it loads automatically.

## 4) Add Your Google Form
1. Create your form at `forms.google.com`.
2. Click Send → `<>` (Embed) → Copy the iframe code.
3. In `index.html`, search for `iframe src="https://docs.google.com/forms`.
4. Replace the `src` with your form URL.

## 5) Change Colors or Fonts
- Open `css/style.css`.
- Change the color variables at the top (yellow, pink, sky, purple).
- Fonts are loaded from Google Fonts in `index.html` head.

## 6) Deploy Updates
- Using GitHub Pages or Vercel: push your changes to GitHub.
- Or upload the updated files in the Vercel dashboard and redeploy.

## 7) Quick Troubleshooting
- Images not loading → check `images/` filenames and paths.
- Form not visible → make sure the Google Form is public/embeddable.
- Layout broken on mobile → keep text lines short; avoid very large images.

Happy celebrating! 🎉
