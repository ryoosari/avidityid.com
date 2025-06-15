# Deployment Guide

This guide covers deploying the Avidity Id website framework to various hosting providers, with a focus on shared hosting like Bluehost.

## 🎯 Deployment Options

### 1. Shared Hosting (Recommended)

Perfect for small to medium sites with moderate traffic.

**Supported Providers:**
- Bluehost
- SiteGround  
- GoDaddy
- HostGator
- Any provider with file manager access

**Requirements:**
- PHP 7.4+ (for .htaccess support)
- File manager or FTP access
- Custom domain support

### 2. CDN/Static Hosting

For high-performance global distribution.

**Supported Providers:**
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

## 🚀 Automated Deployment (GitHub Actions)

### Setup Process

1. **Configure Repository**
   ```bash
   # Create production branch
   git checkout -b production
   git push origin production
   git checkout main
   ```

2. **Set Repository Secrets**
   
   Go to your GitHub repository → Settings → Secrets and Variables → Actions
   
   Add these secrets:
   ```
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   PAYPAL_CLIENT_SECRET=your_secret
   ```

3. **Configure Bluehost Integration**
   
   In your Bluehost cPanel:
   - Go to Git Version Control
   - Create new repository linked to your GitHub
   - Set branch to `production`
   - Set deployment path to `public_html`

### Workflow Triggers

The deployment workflow runs automatically on:
- Push to `main` branch
- Pull request to `main` branch

### Manual Deployment Trigger

```bash
# Force a deployment
git commit --allow-empty -m "Trigger deployment"
git push origin main
```

## 🔧 Manual Deployment

### Step 1: Build the Site

```bash
# Install dependencies
npm install

# Process content
npm run process-content

# Build static site
npm run static-export
```

### Step 2: Upload Files

**Via File Manager:**
1. Log into your hosting cPanel
2. Open File Manager
3. Navigate to `public_html`
4. Upload all files from the `out` folder
5. Upload `.htaccess` file

**Via FTP:**
```bash
# Using FileZilla or similar FTP client
# Upload entire 'out' folder contents to public_html
# Don't forget the .htaccess file
```

**Via Terminal (if you have SSH access):**
```bash
# SCP upload
scp -r out/* username@yoursite.com:public_html/
scp .htaccess username@yoursite.com:public_html/
```

### Step 3: Set File Permissions

Ensure proper permissions are set:
- Directories: 755
- Files: 644
- .htaccess: 644

```bash
find public_html -type d -exec chmod 755 {} \;
find public_html -type f -exec chmod 644 {} \;
```

## 🏗 Bluehost Specific Setup

### 1. Domain Configuration

In Bluehost cPanel:
1. Go to **Subdomains** (if using subdomain) or ensure main domain points to `public_html`
2. Set up **SSL certificate** (Let's Encrypt is free)
3. Enable **Force HTTPS** redirect

### 2. File Manager Setup

1. **Access File Manager**: cPanel → Files → File Manager
2. **Navigate to public_html**: This is your web root
3. **Upload method**: Use either File Manager upload or extract ZIP files

### 3. Git Integration (Recommended)

1. **Enable Git**: cPanel → Git Version Control
2. **Create Repository**: Link to your GitHub production branch
3. **Set Path**: `/public_html` 
4. **Auto-deploy**: Enable automatic pulls from production branch

### 4. Database (if needed in future)

1. **Create MySQL Database**: cPanel → MySQL Databases
2. **Add user and permissions**
3. **Note connection details** for environment variables

## 🔐 Environment Variables

### Production Environment

Create these in your hosting environment:

```bash
# Stripe Live Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PayPal Live
NEXT_PUBLIC_PAYPAL_CLIENT_ID=live_client_id
PAYPAL_CLIENT_SECRET=live_client_secret

# Email
EMAIL_FROM=orders@avidityid.com
SMTP_HOST=mail.avidityid.com
SMTP_USER=orders@avidityid.com
SMTP_PASS=your_email_password

# Analytics
NEXT_PUBLIC_GA_ID=G-LIVE123456
```

### Bluehost Environment Variables

In most shared hosting, environment variables are set via:
1. `.htaccess` file (limited)
2. PHP scripts (if needed)
3. Hosting provider panels (premium feature)

## 📈 Performance Optimization

### 1. Caching Strategy

The `.htaccess` file includes:
- **Browser caching**: 1 year for images, 1 month for CSS/JS
- **Gzip compression**: All text files
- **ETags**: For cache validation

### 2. Image Optimization

Before deployment:
```bash
# Optimize images (optional)
npm install -g imagemin-cli
imagemin public/images/* --out-dir=public/images-optimized
```

### 3. CDN Integration

Consider using a CDN for global performance:
- **Cloudflare**: Free tier available
- **BunnyCDN**: Cost-effective option
- **Amazon CloudFront**: Enterprise solution

## 🔍 Monitoring & Analytics

### 1. Google Analytics Setup

1. Create GA4 property
2. Add tracking ID to environment variables
3. Verify tracking in GA dashboard

### 2. Search Console

1. Add property to Google Search Console
2. Verify ownership via HTML file or DNS
3. Submit sitemap: `https://avidityid.com/sitemap.xml`

### 3. Error Monitoring

Monitor for:
- 404 errors (broken links)
- Payment processing errors
- Download delivery issues

## 🛠 Troubleshooting

### Common Issues

1. **404 Errors**
   - Check .htaccess file is uploaded
   - Verify URL rewriting is enabled
   - Ensure trailing slashes match Next.js export

2. **CSS/JS Not Loading**
   - Check file paths in HTML
   - Verify MIME types in hosting
   - Clear browser cache

3. **Images Not Displaying**
   - Check image paths and file names
   - Verify image files are uploaded
   - Check file permissions (644)

4. **Payment Integration Issues**
   - Verify Stripe/PayPal keys are correct
   - Check webhook endpoints
   - Test in sandbox mode first

### Debug Mode

Enable debugging in development:
```bash
# Build with source maps
npm run build -- --debug

# Check build output
ls -la out/
```

## 🔄 Update Process

### Content Updates

1. **Edit content files** (markdown/JSON)
2. **Commit and push** to main branch
3. **Automatic deployment** via GitHub Actions
4. **Verify changes** on live site

### Code Updates

1. **Test locally** with `npm run dev`
2. **Build and test** with `npm run static-export`
3. **Commit changes** to main branch
4. **Monitor deployment** via GitHub Actions

### Rollback Process

If issues occur after deployment:

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or checkout specific commit
git checkout abc123
git checkout -b hotfix
git push origin hotfix
# Then merge hotfix to main
```

## 📋 Deployment Checklist

Before going live:

- [ ] Content processed and validated
- [ ] Environment variables configured
- [ ] SSL certificate installed
- [ ] Domain/DNS configured
- [ ] Payment integration tested
- [ ] Contact forms working
- [ ] Analytics tracking verified
- [ ] SEO tags populated
- [ ] Sitemap accessible
- [ ] 404 page working
- [ ] Performance tested
- [ ] Mobile responsiveness checked
- [ ] Download delivery tested
- [ ] Backup plan established

## 🆘 Support

If you encounter deployment issues:

1. **Check logs**: GitHub Actions build logs
2. **Review errors**: Browser console and network tab
3. **Test locally**: Reproduce issues in development
4. **Contact hosting**: Provider-specific issues
5. **Community help**: GitHub Discussions or Issues

---

Remember to always test deployments on a staging environment before going live! 