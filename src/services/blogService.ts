import { marked } from 'marked';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // We'll need to install this

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorBio?: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured: boolean;
  relatedPosts?: string[];
  html?: string; // Rendered HTML from markdown
}

// Directory where markdown files will be stored
const POSTS_DIRECTORY = path.join(process.cwd(), 'content/blog');

// Ensure the blog directory exists
const ensureBlogDirectory = () => {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    fs.mkdirSync(POSTS_DIRECTORY, { recursive: true });
  }
};

// Calculate read time based on content length
const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Save a blog post as a markdown file with frontmatter
export const saveBlogPost = async (postData: Omit<BlogPost, 'id' | 'readTime' | 'html'>): Promise<{ success: boolean; id: string }> => {
  try {
    ensureBlogDirectory();
    
    const id = Date.now().toString();
    const readTime = calculateReadTime(postData.content);
    
    // Create frontmatter
    const frontmatter = {
      id,
      title: postData.title,
      slug: postData.slug,
      excerpt: postData.excerpt,
      author: postData.author,
      authorRole: postData.authorRole,
      authorBio: postData.authorBio || '',
      date: postData.date,
      readTime,
      category: postData.category,
      image: postData.image,
      featured: postData.featured,
      relatedPosts: postData.relatedPosts || []
    };
    
    // Create markdown file with frontmatter
    const fileContent = matter.stringify(postData.content, frontmatter);
    
    // Save to file
    const filePath = path.join(POSTS_DIRECTORY, `${postData.slug}.md`);
    fs.writeFileSync(filePath, fileContent);
    
    return { success: true, id };
  } catch (error) {
    console.error('Error saving blog post:', error);
    return { success: false, id: '' };
  }
};

// Get all blog posts
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  ensureBlogDirectory();
  
  try {
    const fileNames = fs.readdirSync(POSTS_DIRECTORY);
    
    const posts = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        // Read file content
        const filePath = path.join(POSTS_DIRECTORY, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Parse frontmatter and content
        const { data, content } = matter(fileContent);
        
        // Convert markdown to HTML
        const html = marked.parse(content);
        
        // Return blog post object
        return {
          id: data.id,
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content,
          author: data.author,
          authorRole: data.authorRole,
          authorBio: data.authorBio,
          date: data.date,
          readTime: data.readTime,
          category: data.category,
          image: data.image,
          featured: data.featured,
          relatedPosts: data.relatedPosts,
          html
        } as BlogPost;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date, newest first
    
    return posts;
  } catch (error) {
    console.error('Error getting blog posts:', error);
    return [];
  }
};

// Get a single blog post by slug
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  ensureBlogDirectory();
  
  try {
    const filePath = path.join(POSTS_DIRECTORY, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const html = marked.parse(content);
    
    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content,
      author: data.author,
      authorRole: data.authorRole,
      authorBio: data.authorBio,
      date: data.date,
      readTime: data.readTime,
      category: data.category,
      image: data.image,
      featured: data.featured,
      relatedPosts: data.relatedPosts,
      html
    } as BlogPost;
  } catch (error) {
    console.error(`Error getting blog post with slug ${slug}:`, error);
    return null;
  }
};

// Get related blog posts
export const getRelatedBlogPosts = async (postId: string): Promise<BlogPost[]> => {
  const allPosts = await getAllBlogPosts();
  const currentPost = allPosts.find(post => post.id === postId);
  
  if (!currentPost || !currentPost.relatedPosts || currentPost.relatedPosts.length === 0) {
    return [];
  }
  
  return allPosts.filter(post => currentPost.relatedPosts?.includes(post.id));
};

// Update an existing blog post
export const updateBlogPost = async (slug: string, postData: Partial<BlogPost>): Promise<{ success: boolean }> => {
  try {
    const existingPost = await getBlogPostBySlug(slug);
    
    if (!existingPost) {
      return { success: false };
    }
    
    // Merge existing post with updates
    const updatedPost = {
      ...existingPost,
      ...postData,
      // Recalculate read time if content was updated
      readTime: postData.content 
        ? calculateReadTime(postData.content) 
        : existingPost.readTime
    };
    
    // Create frontmatter
    const frontmatter = {
      id: updatedPost.id,
      title: updatedPost.title,
      slug: updatedPost.slug,
      excerpt: updatedPost.excerpt,
      author: updatedPost.author,
      authorRole: updatedPost.authorRole,
      authorBio: updatedPost.authorBio || '',
      date: updatedPost.date,
      readTime: updatedPost.readTime,
      category: updatedPost.category,
      image: updatedPost.image,
      featured: updatedPost.featured,
      relatedPosts: updatedPost.relatedPosts || []
    };
    
    // Create markdown file with frontmatter
    const fileContent = matter.stringify(updatedPost.content, frontmatter);
    
    // Save to file
    const filePath = path.join(POSTS_DIRECTORY, `${updatedPost.slug}.md`);
    fs.writeFileSync(filePath, fileContent);
    
    return { success: true };
  } catch (error) {
    console.error(`Error updating blog post with slug ${slug}:`, error);
    return { success: false };
  }
};

// Delete a blog post
export const deleteBlogPost = async (slug: string): Promise<{ success: boolean }> => {
  try {
    const filePath = path.join(POSTS_DIRECTORY, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return { success: false };
    }
    
    fs.unlinkSync(filePath);
    return { success: true };
  } catch (error) {
    console.error(`Error deleting blog post with slug ${slug}:`, error);
    return { success: false };
  }
};

// Get featured blog posts
export const getFeaturedBlogPosts = async (): Promise<BlogPost[]> => {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter(post => post.featured);
};

// Get blog posts by category
export const getBlogPostsByCategory = async (category: string): Promise<BlogPost[]> => {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter(post => post.category === category);
};

// Search blog posts
export const searchBlogPosts = async (query: string): Promise<BlogPost[]> => {
  const allPosts = await getAllBlogPosts();
  const searchTerms = query.toLowerCase().split(' ');
  
  return allPosts.filter(post => {
    const searchableText = `${post.title} ${post.excerpt} ${post.content} ${post.author} ${post.category}`.toLowerCase();
    return searchTerms.every(term => searchableText.includes(term));
  });
};
