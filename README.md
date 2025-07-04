# Avidity Id Website Framework

A modern website built with Next.js 15, TypeScript, and Tailwind CSS. Features article management, digital downloads, and e-commerce functionality optimized for Netlify deployment.

## 🚀 Features

- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Netlify Optimized**: Zero-config deployment with automatic builds
- **Article Management**: Markdown-based articles with front matter
- **Digital Downloads**: E-commerce functionality for digital products
- **Payment Integration**: Stripe and PayPal support
- **Responsive Design**: Mobile-first, accessible UI components
- **SEO Optimized**: Meta tags, structured data, sitemap generation
- **Content Processing**: Automated markdown to JSON conversion
- **Automatic Deployment**: Push to deploy via Netlify
- **Framer Motion**: Smooth animations and transitions
- **Performance**: CDN, image optimization, edge functions

## 📁 Project Structure

```
avidityid-website/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── articles/     # Article pages and listing
│   │   ├── downloads/    # Digital download pages
│   │   └── checkout/     # Purchase/checkout pages
│   ├── components/       # React components
│   │   ├── articles/     # Article-specific components
│   │   ├── downloads/    # Download-specific components
│   │   └── checkout/     # Payment/checkout components
│   ├── lib/             # Utility libraries
│   ├── utils/           # Helper functions
│   ├── types/           # TypeScript type definitions
│   └── styles/          # CSS/styling files
├── content/
│   ├── articles/        # Markdown files for articles
│   └── downloads/       # JSON files for digital products
├── public/              # Static assets
│   ├── images/
│   ├── downloads/       # Sample files, previews
│   └── articles/        # Article images
├── data/               # Generated JSON data from markdown
├── scripts/            # Build and content processing scripts
├── docs/               # Project documentation
├── .github/workflows/  # GitHub Actions
└── README.md
```

## 🛠 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/avidityid-website.git
   cd avidityid-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   
   # PayPal
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_CLIENT_SECRET=your_paypal_client_secret
   
   # Email (SMTP)
   EMAIL_FROM=hello@avidityid.com
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   
   # Analytics
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   ```

4. **Process content and start development**
   ```bash
   npm run process-content
   npm run dev
   ```

## 📝 Content Management

### Articles

Create articles in `content/articles/` using Markdown with front matter:

```markdown
---
title: "Your Article Title"
excerpt: "Brief description of the article"
author: "Author Name"
date: "2024-01-15"
category: "Technology"
tags: ["nextjs", "web-development"]
featured_image: "/images/articles/article-slug.jpg"
seo_title: "Custom SEO Title"
seo_description: "Custom meta description"
published: true
---

# Your Article Content

Write your article content here using Markdown syntax.
```

### Digital Products

Create products in `content/downloads/` as JSON files:

```json
{
  "id": "product-slug",
  "title": "Product Name",
  "description": "Product description",
  "price": 29.99,
  "currency": "USD",
  "category": "Templates",
  "tags": ["design", "template"],
  "preview_images": ["/images/products/preview.jpg"],
  "download_files": ["product-files.zip"],
  "license": "multiple-use",
  "featured": true,
  "created_at": "2024-01-15",
  "updated_at": "2024-01-15"
}
```

## 🎨 Customization

### Styling

- **Tailwind CSS**: Modify `tailwind.config.js` for custom colors, fonts, and spacing
- **Global Styles**: Edit `src/styles/globals.css` for custom CSS
- **Components**: Pre-built components in `src/components/`

### Configuration

- **Site Config**: Edit `src/lib/config.ts` for site-wide settings
- **Navigation**: Update navigation items in config
- **SEO**: Customize default SEO settings

## 🚀 Deployment

### Development Workflow

1. **Create content** (articles/products)
2. **Process content**: `npm run process-content`
3. **Test locally**: `npm run dev`
4. **Commit changes**: `git add . && git commit -m "Add new content"`
5. **Push to GitHub**: `git push origin main`
6. **Automatic deploy**: Netlify builds and deploys automatically

### Netlify Deployment

The project is optimized for **Netlify** deployment with zero configuration:

#### Features:
- ✅ **Automatic builds** on every push to main
- ✅ **Next.js optimization** via @netlify/plugin-nextjs
- ✅ **Deploy previews** for pull requests
- ✅ **Custom domains** and SSL certificates
- ✅ **Edge functions** and form handling
- ✅ **Image optimization** and CDN

#### Setup:
1. **Connect repository** to Netlify
2. **Configure environment variables** in Netlify dashboard
3. **Deploy automatically** - Netlify handles the rest!

For detailed instructions, see: [Netlify Deployment Guide](docs/netlify-deployment.md)

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (used by Netlify)
- `npm run start` - Start production server locally
- `npm run process-content` - Process markdown and JSON files
- `npm run validate-content` - Validate all content files
- `npm run new-article` - Create new article template
- `npm run new-product` - Create new product template
- `npm run netlify-build` - Build for Netlify deployment
- `npm run preview` - Build and preview locally
- `npm run type-check` - Run TypeScript checks
- `npm run lint` - Run ESLint

## 📦 Dependencies

### Core
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety and better DX
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animations and transitions

### Content
- **gray-matter**: Front matter parsing
- **marked**: Markdown processing
- **reading-time**: Estimate reading time

### E-commerce
- **Stripe**: Payment processing
- **PayPal**: Alternative payment method

### UI Components
- **Headless UI**: Accessible React components
- **Heroicons**: Beautiful SVG icons
- **Lucide React**: Additional icon set

## 🔐 Security

- **Content Security Policy**: Configured in .htaccess
- **HTTPS Enforcement**: Automatic redirect to HTTPS
- **Download Protection**: Secure file access
- **XSS Protection**: Headers and content sanitization

## 🎯 SEO Features

- **Meta Tags**: Automatic generation
- **Open Graph**: Social media previews
- **Twitter Cards**: Twitter-specific metadata
- **JSON-LD**: Structured data for articles/products
- **Sitemap**: Automatic generation
- **RSS Feed**: For articles

## 📱 Performance

- **Static Generation**: Pre-rendered at build time
- **Image Optimization**: Responsive images
- **Code Splitting**: Automatic bundling optimization
- **Caching**: Aggressive caching strategies
- **Lazy Loading**: Components and images

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Join GitHub Discussions for questions

## 🌟 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Heroicons](https://heroicons.com/)
- Animations by [Framer Motion](https://framer.com/motion/)

---

Made with 💜 for creative professionals by the Avidity Id team. 