# Vercel Deployment Guide for Anime Girl Unlocker

This guide will walk you through deploying your Next.js anime girl unlocker application to Vercel.

## Prerequisites

- A GitHub, GitLab, or Bitbucket account
- A Vercel account (free tier available)
- Your project code pushed to a Git repository

## Step 1: Prepare Your Repository

### 1.1 Ensure Your Code is Ready
Make sure your project is working locally:
```bash
npm run dev
# or
bun dev
```

### 1.2 Push to Git Repository
If you haven't already, initialize and push your code to a Git repository:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: Anime Girl Unlocker app"

# Add your remote repository (replace with your actual repository URL)
git remote add origin https://github.com/yourusername/anime-girl-unlocker.git

# Push to your repository
git push -u origin main
```

## Step 2: Create Vercel Account and Connect Repository

### 2.1 Sign Up for Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and choose your preferred method:
   - GitHub (recommended)
   - GitLab
   - Bitbucket
   - Email

### 2.2 Import Your Project
1. After signing in, click "New Project"
2. Import your Git repository:
   - If using GitHub: Click "Import" next to your repository
   - If using other Git providers: Click "Import Git Repository" and enter your repository URL

## Step 3: Configure Deployment Settings

### 3.1 Project Configuration
Vercel will automatically detect this is a Next.js project. Configure the following:

**Framework Preset:** Next.js (auto-detected)
**Root Directory:** `./` (default)
**Build Command:** `npm run build` (auto-detected)
**Output Directory:** `.next` (auto-detected)
**Install Command:** `npm install` (auto-detected)

### 3.2 Environment Variables (if needed)
If your app uses environment variables, add them in the Vercel dashboard:

1. Go to your project dashboard
2. Click on "Settings" tab
3. Click on "Environment Variables"
4. Add any required variables:
   - `NEXT_PUBLIC_API_URL` (if you have an API)
   - `DATABASE_URL` (if using a database)
   - Any other environment variables your app needs

### 3.3 Build Settings
Since your project uses custom loaders and configurations, ensure these are properly set:

**Node.js Version:** 18.x or 20.x (recommended)
**Build Command:** `npm run build`
**Install Command:** `npm install`

## Step 4: Deploy Your Application

### 4.1 Initial Deployment
1. Click "Deploy" to start the deployment process
2. Vercel will:
   - Install dependencies
   - Run the build command
   - Deploy your application
   - Provide you with a live URL

### 4.2 Monitor Deployment
- Watch the build logs for any errors
- If there are issues, check the build logs and fix them
- Common issues might include:
  - Missing environment variables
  - Build errors in your code
  - Dependency conflicts

## Step 5: Post-Deployment Configuration

### 5.1 Custom Domain (Optional)
1. Go to your project dashboard
2. Click on "Domains" tab
3. Add your custom domain if you have one
4. Follow the DNS configuration instructions

### 5.2 Performance Optimization
Your app includes several performance optimizations:
- Next.js 15 with App Router
- Tailwind CSS for styling
- Optimized images
- Turbopack for faster builds

### 5.3 Monitoring and Analytics
1. Enable Vercel Analytics (optional)
2. Monitor your app's performance
3. Check for any runtime errors

## Step 6: Continuous Deployment

### 6.1 Automatic Deployments
Once connected, Vercel will automatically deploy:
- Every push to your main branch
- Pull request previews for feature branches

### 6.2 Manual Deployments
You can also trigger manual deployments:
1. Go to your project dashboard
2. Click "Deployments" tab
3. Click "Redeploy" for any previous deployment

## Troubleshooting Common Issues

### Build Failures
If your build fails, check:
1. **Dependencies:** Ensure all dependencies are in `package.json`
2. **TypeScript errors:** Fix any TypeScript compilation errors
3. **Environment variables:** Add missing environment variables
4. **Build output:** Check if the build command produces the expected output

### Runtime Errors
If your app runs but has runtime errors:
1. Check the function logs in Vercel dashboard
2. Verify environment variables are set correctly
3. Check browser console for client-side errors

### Performance Issues
1. Enable Vercel Analytics to monitor performance
2. Optimize images and assets
3. Use Vercel's Edge Functions if needed

## Project-Specific Considerations

### Custom Loader Configuration
Your project uses a custom loader (`component-tagger-loader.js`). Ensure:
1. The loader file is included in your repository
2. The path in `next.config.ts` is correct
3. The loader doesn't cause build issues

### Dependencies
Your project has many dependencies. Ensure:
1. All dependencies are compatible with Node.js 18+
2. No deprecated packages are causing issues
3. Build process completes within Vercel's time limits

### Static Assets
Your `public` folder contains character images. These will be served as static assets:
- Images in `public/Character-card/` will be accessible at `/Character-card/[filename]`
- SVG icons will be accessible at their respective paths

## Deployment Checklist

- [ ] Code is pushed to Git repository
- [ ] Vercel account created and connected
- [ ] Project imported successfully
- [ ] Build configuration is correct
- [ ] Environment variables set (if needed)
- [ ] Initial deployment successful
- [ ] App is accessible via provided URL
- [ ] All features working correctly
- [ ] Performance is acceptable

## Useful Commands

### Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Git Commands
```bash
# Add changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to repository
git push origin main
```

## Support and Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/app/building-your-application/deploying)
- [Vercel Support](https://vercel.com/support)

## Next Steps After Deployment

1. **Test your application** thoroughly on the live URL
2. **Set up monitoring** and error tracking
3. **Configure custom domain** if needed
4. **Optimize performance** based on real usage
5. **Set up CI/CD** for automated testing and deployment

Your anime girl unlocker application should now be successfully deployed on Vercel! 🚀
