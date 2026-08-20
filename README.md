# Mini Fox Labs website

Static, GitHub Pages-ready website.

## Included
- Light theme by default + dark mode
- Browser language detection + EN/RU/UA/DE/ES/PT/FR/PL/ZH/HI selector
- Mini Fox Labs branding and application icons
- App catalog + individual product pages
- Support / FAQ
- Changelog
- Privacy Policy / Terms
- Suggest-an-app mailto form (no backend)
- Open Graph social preview
- favicon + PWA manifest + service worker
- robots.txt + sitemap.xml
- responsive mobile design

## Publish
Upload the CONTENTS of this folder to the root of a public GitHub repository.
Then Settings → Pages → Deploy from a branch → main → /(root).

## When minifoxlabs.com is purchased
1. Rename `CNAME.example` to `CNAME`.
2. GitHub Settings → Pages → Custom domain → `minifoxlabs.com`.
3. Add the GitHub Pages DNS records at your domain registrar.
4. Enable Enforce HTTPS after DNS verification.

## Before final public launch
- Replace Google Play placeholders with the real listing URL.
- Configure `hello@minifoxlabs.com` or change the email in HTML files.
- Replace preview phone mockups with real screenshots.
- Review legal text before relying on it as final legal advice.

## Google Play links
- Developer page: https://play.google.com/store/apps/dev?id=6887978606017988674
- Work Time Tracker testing: https://play.google.com/apps/testing/com.minifoxlabs.worktimer
- Work Time Tracker store listing: https://play.google.com/store/apps/details?id=com.minifoxlabs.worktimer

## v5 GitHub Pages fix
Main visible images (brand logo and app icons) are embedded directly into HTML.
This means the visual website no longer depends on the `assets` folder loading correctly.
The assets folder is still included for future domain/PWA/social-preview use.
