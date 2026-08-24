# Eve Plants

Static multi-page brand site for Eve Plants, a personal home plant-care service grounded in ecology.

## Site structure

- `/`, service landing page
- `/blog/`, journal index with ten launch articles
- `/plants/`, plant-care wiki index with 27 launch profiles
- `/store/`, upcoming online shop
- `/templates/`, copyable HTML templates for future blog posts and plant guides

## Before launch

- Replace the disabled WhatsApp placeholder in `index.html` with a `https://wa.me/` link. Use the full number with country code and without `+` or spaces.
- Confirm any future expansion beyond Amsterdam, Noord-Holland by arrangement, and online sessions before changing the published service area.
- Confirm permission and attribution requirements for the selected footage.
- Review the final business wording with the owner.

## Adding content

Copy `templates/blog-post.html` to `blog/your-post-slug.html` for a new article. Copy `templates/plant-guide.html` to `plants/plant-name.html` for a new care guide. Update each page's title, description, canonical URL, Open Graph metadata, structured data, and links. Then add the URL to `sitemap.xml` and a card to the relevant index page.

The current plant profiles are generated from `data/plant-guides.json`. After editing or adding profile data, run `node scripts/build-plant-guides.js`, review the generated HTML, and update `sitemap.xml`.

Keep the answer box concise and self-contained, cite primary or official sources, and connect every new page to at least one relevant existing guide. Update `feed.xml` for journal articles. The `llms.txt` file gives search and answer engines a plain-language map of the publication.

## Local preview

Run a static server from the repository root, for example `python -m http.server 4173`, then open `http://localhost:4173`. Avoid opening HTML files directly because root-relative links and the custom 404 page need a server.

## Visual sources

- Hero time-lapse: [Monstera leaf unfurling by Super Lunar on Pexels](https://www.pexels.com/video/a-time-lapse-of-a-plant-6175654/)
- Plant-care footage: [Woman taking care of houseplants by Los Muertos Crew on Pexels](https://www.pexels.com/video/woman-taking-care-of-her-houseplants-7616923/)

The logo, layout, brand palette, and written content are original to Eve Plants.

See `MEDIA.md` for the complete source register, exact YouTube URLs, creator names, edits and pre-launch permission checklist.
