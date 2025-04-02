# 1728 Studios Website

This is the official website for 1728 Studios, showcasing the company's AI products, services, and thought leadership.

## Website Structure

The website has been reorganized with the following structure:

1. **Home page**: Showcases the company with sections for:
   - Hero section with mission statement
   - About section highlighting company values
   - Projects preview
   - Services preview
   - Call-to-action section

2. **Projects page**: Contains the company's products:
   - The Guide (AI educators)
   - Dark Cloud (AI-driven cybersecurity)

3. **About page**: Company mission and values

4. **Consulting page**: Services offered for AI integration

5. **Contact page**: Contact information

6. **Blog**: A new section featuring thought leadership content:
   - Blog index page with search and filtering capabilities
   - Individual blog post pages with LaTeX support for mathematical expressions
   - Admin interface for uploading and managing blog content

## New Features

### Blog System
- **Blog Index Page**: Lists all blog posts with search and category filtering
- **Blog Post Page**: Displays individual blog posts with related articles
- **Admin Dashboard**: Interface for managing the website
- **Blog Upload Page**: Form for creating and editing blog posts in Markdown format
- **Blog Service**: Backend service for managing blog posts
- **API Endpoints**: Handles blog post uploads and management
- **LaTeX Support**: Renders mathematical expressions in blog posts using KaTeX

### LaTeX Support
The blog system now supports LaTeX mathematical notation:
- **Inline Math**: Use single dollar signs for inline expressions: `$E = mc^2$`
- **Display Math**: Use double dollar signs for block expressions: `$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$`
- **Custom Renderer**: A React component that processes LaTeX expressions and renders them using KaTeX
- **Styling**: Custom CSS for properly displaying both inline and block mathematical expressions

### Authentication
Note: Authentication functionality has been temporarily commented out for development purposes. This should be re-enabled before deploying to production.

## Technical Details

This is a [Next.js](https://nextjs.org/) project with the following key technologies:

- **Next.js**: React framework for server-rendered applications
- **TailwindCSS**: Utility-first CSS framework for styling
- **Markdown**: Blog posts are stored as Markdown files with frontmatter
- **gray-matter**: For parsing frontmatter in Markdown files
- **marked**: For converting Markdown to HTML
- **KaTeX**: For rendering LaTeX mathematical expressions

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Content Management

### Blog Posts
Blog posts are stored as Markdown files in the `content/blog` directory. Each post has frontmatter with metadata such as:
- Title
- Author
- Date
- Category
- Featured image
- Related posts

### Adding a New Blog Post
1. Navigate to `/admin/blog-upload` in the browser
2. Fill out the form with the blog post details
3. Upload a featured image
4. Write or paste the content in Markdown format
5. Include LaTeX expressions using `$...$` for inline math and `$$...$$` for display math
6. Preview the content
7. Submit the form to create the post

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
