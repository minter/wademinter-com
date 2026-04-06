# wademinter.com

Personal website for H. Wade Minter. Built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/), deployed to GitHub Pages.

## Project Structure

```
/
├── public/
│   ├── images/              # Static images (site, blog, gallery)
│   ├── CNAME                # GitHub Pages custom domain
│   ├── favicon.svg          # SVG favicon (WM initials)
│   └── robots.txt           # Search engine directives
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── Header.astro     # Site header, nav, dark mode toggle
│   │   ├── Footer.astro     # Site footer + social links
│   │   ├── Hero.astro       # Hero banner with image overlay
│   │   ├── ProjectCard.astro # Image-overlay card for homepage
│   │   └── Socials.astro    # Social media icon links
│   ├── content/
│   │   ├── blog/            # Blog posts (Markdown)
│   │   └── projects/        # Project pages (Markdown)
│   ├── layouts/
│   │   ├── BaseLayout.astro # Root HTML layout (head, SEO, analytics, dark mode)
│   │   ├── PageLayout.astro # Static pages (hero + prose content)
│   │   └── ProjectLayout.astro # Project pages (hero + prose content)
│   ├── pages/               # Route pages (each file = a URL)
│   ├── styles/
│   │   └── global.css       # Tailwind imports, theme colors, prose styles, dark mode
│   └── content.config.ts    # Content collection schemas
├── functions/               # DigitalOcean serverless functions
│   ├── packages/site/contact/ # Contact form handler (Mailgun)
│   ├── project.yml          # DO Functions config
│   └── README.md            # Function deployment instructions
├── astro.config.mjs         # Astro + Tailwind + sitemap config
├── .npmrc                   # npm config (legacy-peer-deps)
└── .github/workflows/
    ├── deploy.yml           # Build + deploy to GitHub Pages on push to main
    ├── verify.yml           # Build check on pull requests
    ├── lighthouse.yml       # Lighthouse audit on pull requests
    └── link-checker.yml     # Weekly broken link check
```

## Development

```sh
npm install        # Install dependencies
npm run dev        # Start dev server at localhost:4321
npm run build      # Build production site to ./dist/
npm run preview    # Preview production build locally
```

## Adding Content

### Blog Posts

Create a Markdown file in `src/content/blog/`:

```markdown
---
title: 'Your Post Title'
date: 2026-04-05
description: A short summary for previews and SEO.
featured_image: '/images/blog/your-image.jpg'
bskyPostUri: 'at://did:plc:your-did/app.bsky.feed.post/abc123def'  # optional
---

Your content here.
```

The post will automatically appear on the `/blog/` index page, sorted by date (newest first). The URL will be `/blog/<filename>/` (e.g., `src/content/blog/my-new-post.md` becomes `/blog/my-new-post/`).

If `bskyPostUri` is provided, Bluesky replies to that post will appear as comments on the blog post (via `@bryanguffey/astro-standard-site`).

### Project Pages

Project pages require two files:

**1. Content file** -- create a Markdown file in `src/content/projects/`:

```markdown
---
title: 'Project Name'
subtitle: 'A short tagline'
date: 2026-04-05
description: Description shown on the homepage card.
featured_image: '/images/site/your-image.jpg'
image_position: center  # optional: top, center, bottom, or any CSS object-position
permalink: '/my-project'
sort_order: 5
---

Your content here.
```

- `sort_order` controls the display order on the homepage (lower numbers appear first).
- `permalink` defines the URL path for the project page.
- `featured_image` is used for both the homepage card and the hero banner.
- `image_position` adjusts how the hero image is cropped (default: `center`).

**2. Route page** -- create a matching `.astro` file in `src/pages/`:

```astro
---
import ProjectLayout from '../layouts/ProjectLayout.astro'
import { getCollection, render } from 'astro:content'

const projects = await getCollection('projects')
const project = projects.find(p => p.data.permalink === '/my-project')!
const { Content } = await render(project)
---

<ProjectLayout {...project.data}>
  <Content />
</ProjectLayout>
```

The filename determines the URL (e.g., `src/pages/my-project.astro` serves at `/my-project`).

### Static Pages

For simple pages (like About or Contact), create an `.astro` file in `src/pages/` using `PageLayout`:

```astro
---
import PageLayout from '../layouts/PageLayout.astro'
---

<PageLayout
  title="Page Title"
  subtitle="Optional subtitle"
  description="SEO description."
  featured_image="/images/site/hero-image.jpg"
>
  <h2>Your content here</h2>
  <p>HTML content goes in the slot.</p>
</PageLayout>
```

### Images

Place image files in `public/images/` and reference them with absolute paths starting with `/images/`. Subdirectories are fine (e.g., `/images/blog/`, `/images/site/canes-gallery/`).

**Hero images**: The hero banner displays as a full-width strip roughly **1600x400px** (4:1 aspect ratio). Landscape-oriented images work best. To avoid important content being cropped, either:
- Crop source images to approximately 1600x400 (or any 4:1 ratio) with the subject centered.
- Use the `image_position` frontmatter field (for projects) or `imagePosition` prop (for pages) to adjust alignment. Values: `top`, `center` (default), `bottom`, or any CSS `object-position` value like `center 30%`.

### Photo Galleries

Use a `<div class="gallery">` in Markdown content to create a responsive grid with lightbox:

```markdown
<div class="gallery">

![Alt text](/images/site/gallery/photo1.jpg)

![Alt text](/images/site/gallery/photo2.jpg)

![Alt text](/images/site/gallery/photo3.jpg)

</div>
```

The gallery displays as 3 columns on desktop, 2 on tablet, and 1 on mobile. Clicking an image opens a full-screen lightbox.

### Bluesky Comments

Blog posts can display Bluesky replies as comments. To enable:

1. Publish your blog post and share it on Bluesky
2. Get the AT-URI of your Bluesky post (click `...` > "Copy post link", then convert to AT-URI format: `at://did:plc:YOUR_DID/app.bsky.feed.post/POST_ID`)
3. Add it to your post's frontmatter:

```yaml
---
title: 'My Post'
date: 2026-04-05
description: ...
featured_image: ...
bskyPostUri: 'at://did:plc:your-did/app.bsky.feed.post/abc123def'
---
```

4. Rebuild the site -- replies to that Bluesky post will appear as comments

Find your DID at [bsky.app/settings](https://bsky.app/settings).

## Configuration

### Site Settings

- **Site URL**: Set in `astro.config.mjs` (`site` property)
- **Navigation menu**: Edit the `menuItems` array in `src/components/Header.astro`
- **Social links**: Edit the `socials` array in `src/components/Socials.astro`
- **Footer tagline**: Edit directly in `src/components/Footer.astro`
- **Analytics**: Google Analytics (GA4) is configured in `src/layouts/BaseLayout.astro`

### Contact Form

The contact form submits to a DigitalOcean serverless function that sends email via Mailgun. See `functions/README.md` for deployment and configuration details.

### Dark Mode

Dark mode is toggled via the sun/moon icon in the header. It respects the visitor's system preference on first visit and persists their choice in `localStorage`. The theme is applied before render to prevent flash of wrong theme, and re-applied on view transitions.

Dark mode colors are defined alongside light mode in `src/styles/global.css` and component-level Tailwind `dark:` variants.

### Theming

Colors, fonts, and prose typography are defined in `src/styles/global.css`. The site uses the Muli font from Google Fonts and Tailwind CSS for utility classes. Theme colors are registered as CSS custom properties under `@theme` so they can be referenced in Tailwind classes (e.g., `text-[var(--color-accent)]`).

### SEO

Meta tags are managed by the `astro-seo` package via a single `<SEO />` component in `BaseLayout.astro`. Open Graph, Twitter Cards, canonical URLs, and a default social sharing image (`/images/social.jpg`) are handled automatically based on page props.

## Deployment

The site deploys automatically to GitHub Pages when changes are pushed to `main`. The workflow is defined in `.github/workflows/deploy.yml`. Pull requests run:
- **Build check** (`verify.yml`)
- **Lighthouse audit** (`lighthouse.yml`) — errors if accessibility or SEO scores drop below 0.9

A weekly **link checker** (`link-checker.yml`) scans for broken links every Monday.

**Dependabot** checks for npm dependency updates weekly.
