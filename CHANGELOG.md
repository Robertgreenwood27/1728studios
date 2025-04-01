# Changelog

## [Unreleased] - 2025-04-01

### Added
- **Website Structure Reorganization**
  - Redesigned home page with sections for mission statement, company values, projects preview, services preview, and call-to-action
  - Created dedicated Projects page featuring The Guide and Dark Cloud products
  - Added Consulting page for AI integration services
  - Maintained About and Contact pages with updated content

- **Blog System**
  - Created blog index page (`/blog/index.tsx`) with:
    - Featured article section
    - Search functionality
    - Category filtering
    - Responsive grid layout for blog posts
  - Implemented individual blog post page (`/blog/[slug].tsx`) with:
    - Markdown content rendering
    - Author information
    - Related posts
    - Social sharing options
  - Added admin dashboard (`/admin/index.tsx`) with links to:
    - Blog upload page
    - Placeholder for user management
    - Placeholder for site settings
  - Developed blog upload page (`/admin/blog-upload.tsx`) with:
    - Form for title, author, author role, category
    - Markdown editor with preview
    - Featured image upload
    - Submit functionality

- **Backend Services**
  - Created blog service (`/services/blogService.ts`) with functions for:
    - Saving blog posts
    - Retrieving all blog posts
    - Getting a blog post by slug
    - Updating blog posts
    - Deleting blog posts
    - Searching blog posts
    - Getting related posts
  - Implemented API endpoint (`/api/blog/upload.ts`) for:
    - Processing form data
    - Handling image uploads
    - Saving blog posts to the content directory

- **Content Management**
  - Set up content directory structure for blog posts
  - Created sample blog posts in Markdown format with frontmatter
  - Added placeholder images for blog posts

### Modified
- **Authentication**
  - Temporarily commented out authentication functionality for development purposes
  - Authentication should be re-enabled before deploying to production

- **Navigation**
  - Updated Header component to include new pages and blog section
  - Improved mobile navigation

- **Dependencies**
  - Added `marked` for Markdown parsing
  - Added `gray-matter` for frontmatter handling
  - Added `formidable` for file uploads

### Technical Improvements
- Implemented static site generation for blog pages
- Set up incremental static regeneration with a 1-hour revalidation period
- Created responsive layouts for all new pages
- Implemented proper error handling for API endpoints
- Added fallback states for loading content

### Next Steps
- Re-enable authentication for admin pages
- Implement image optimization for blog featured images
- Add pagination for the blog index page
- Create an editor interface for existing blog posts
- Add analytics tracking for blog content
