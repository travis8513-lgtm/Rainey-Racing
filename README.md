# Rainey Racing Website

🏁 **Rainey Racing** - Driven to Win. Built to Represent.

## About Rainey Racing

Rainey Racing is a family-driven dirt go-kart team built on hard work, determination, and the passion to compete. We race as a brother team, representing dedication, sportsmanship, and the competitive spirit of grassroots motorsports.

## Website Features

✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
✅ **Professional Color Scheme** - Yellow, Purple, and Blue racing theme
✅ **Multiple Sections:**
  - Hero/Landing Section
  - About Team & Mission
  - Sponsorship Opportunities
  - Benefits Display
  - Photo Gallery
  - Contact/Sponsorship Form
  - Footer

✅ **Interactive Elements:**
  - Smooth Navigation
  - Hover Effects
  - Form Validation
  - Scroll Animations

## File Structure

```
├── index.html      # Main HTML file with all content
├── styles.css      # CSS styling and layout
├── script.js       # JavaScript for interactivity
└── README.md       # This file
```

## How to Use

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Edit the content in `index.html` to customize for your needs
4. Modify colors in `styles.css` by changing the `:root` CSS variables
5. Deploy to your hosting service (GitHub Pages, Netlify, Vercel, etc.)

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-yellow: #FFD700;
    --primary-purple: #6B2D5C;
    --primary-blue: #1E3A8A;
}
```

### Content
Simply edit the text in `index.html`. The structure is clearly labeled with comments.

### Images
Replace placeholder images in the gallery section with your actual race photos.

## Contact Form

The contact form currently:
- Validates required fields
- Validates email format
- Shows success/error messages
- Logs form data to browser console

To send emails, you'll need to:
1. Set up a backend service (Node.js, Python, etc.)
2. Use a service like Formspree, EmailJS, or similar
3. Update the form submission handling in `script.js`

## Deployment

### GitHub Pages
1. Push to GitHub
2. Go to Settings > Pages
3. Select the branch to deploy
4. Your site will be live at `https://yourusername.github.io/rainey-racing`

### Netlify
1. Connect your GitHub repository
2. Netlify will automatically deploy on every push

### Vercel
1. Import your repository
2. Configure and deploy

## Future Enhancements

- Add real photo gallery with lightbox
- Integrate email backend for form submissions
- Add team member profiles/bios
- Add race results/statistics
- Create blog section for race updates
- Add sponsor logos section
- Integrate social media feeds

## License

This website is built for Rainey Racing.

---

**Driven to Win. Built to Represent.** 🏁