# 🏁 Rainey Racing Website

**Driven to Win. Built to Represent.**

A state-of-the-art, racing-themed website built to showcase the Rainey Racing dirt go-kart team and attract sponsors.

---

## 👀 How to see your website

Double-click **`index.html`** and it opens in your web browser. That's it — no internet needed to view it (though the fancy fonts and any online videos need internet to show).

---

## ✍️ How to make it YOURS (plain-English guide)

Everywhere you see gray boxes that say **"Add Photo"**, **"Add Video"**, or **"Your Logo Here"**, that's a spot waiting for your real content. Here's how to fill them in. You edit the text by opening **`index.html`** in Notepad (right-click → Open with → Notepad).

### 1. Add your real photos to the Gallery
1. Put your photo files (JPG or PNG) into the **`images`** folder in this project.
2. In `index.html`, find the **Gallery Section**. You'll see lines like:
   ```html
   <figure class="gallery-item photo-slot" data-label="Race Action"><figcaption>Race Action</figcaption></figure>
   ```
3. Change it to point at your photo, like this:
   ```html
   <figure class="gallery-item"><img src="images/my-race-photo.jpg" alt="Race Action"><figcaption>Race Action</figcaption></figure>
   ```
   (Use your real file name in place of `my-race-photo.jpg`.)

### 2. Add your driver names, numbers, and photos
In the **Team Section** of `index.html`, replace **"Driver Name"**, the **"#1"** numbers, and the bio text with the real info. To add a driver photo, do the same `<img src="images/...">` swap as above.

### 3. Add your race videos (easiest with YouTube)
1. Upload your video to YouTube (free), or find its link.
2. In the **Videos Section**, replace a video slot with an embedded YouTube player:
   ```html
   <div class="video-card"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe></div>
   ```
   Replace `VIDEO_ID` with the code at the end of your YouTube link (the part after `watch?v=`).

### 4. Add your social media links
In the **Footer**, change the `href="#"` in the Facebook / Instagram / YouTube / TikTok links to your real page addresses.

### 5. Adjust sponsorship prices
In the **Sponsorship Packages Section**, change the dollar amounts and perks to whatever fits your team.

> 💡 **Don't want to edit code yourself?** Just ask me (Claude) — tell me the photo file names, driver names, video links, or prices and I'll put them in for you.

---

## 🎨 What's on the site

- Bold racing hero with checkered-flag styling and animated stats
- About / mission cards
- Driver & team profiles
- "Why partner with us" benefits
- Race **video** section
- Photo **gallery** with click-to-enlarge
- Four **sponsorship packages** (Bronze / Silver / Gold / Title)
- "What we need" support list
- Sponsor logo wall
- Sponsorship contact form
- Mobile-friendly menu, scroll animations, back-to-top button

## 🎨 Colors (for the curious)
Edit these in `styles.css` near the top if you ever want to tweak the look:
```css
--red:   #E10600;  /* racing red */
--gold:  #FFC400;  /* trophy gold */
--carbon:#0d0d0f;  /* deep black background */
```

---

## 🌐 Putting it on the real internet (later)
When you're ready for a public web address, free options include **GitHub Pages**, **Netlify**, and **Vercel**. Just ask and I'll walk you through it step by step.

---

**Driven to Win. Built to Represent.** 🏁
