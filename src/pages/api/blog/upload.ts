import { NextApiRequest, NextApiResponse } from 'next';
import { saveBlogPost } from '../../../services/blogService';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable the default body parser to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public/blog');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Parse the form data
    const form = new formidable.IncomingForm({
      uploadDir: uploadsDir,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
    });

    return new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error('Error parsing form:', err);
          res.status(500).json({ message: 'Error uploading files' });
          return resolve(true);
        }

        try {
          // Extract fields
          const title = fields.title[0];
          const content = fields.content[0];
          const author = fields.author[0];
          const authorRole = fields.authorRole[0];
          const authorBio = fields.authorBio?.[0] || '';
          const category = fields.category[0];
          const excerpt = fields.excerpt?.[0] || content.substring(0, 150) + '...';
          const featured = fields.featured?.[0] === 'true';
          
          // Create slug from title
          const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

          // Handle image upload
          let imageUrl = '/blog/default-post.jpg'; // Default image
          if (files.image) {
            const file = files.image[0];
            const newFilename = `${slug}-${Date.now()}${path.extname(file.originalFilename || '')}`;
            const newPath = path.join(uploadsDir, newFilename);
            
            // Rename the file
            fs.renameSync(file.filepath, newPath);
            imageUrl = `/blog/${newFilename}`;
          }

          // Save blog post
          const result = await saveBlogPost({
            title,
            slug,
            excerpt,
            content,
            author,
            authorRole,
            authorBio,
            date: new Date().toISOString(),
            category,
            image: imageUrl,
            featured,
          });

          if (result.success) {
            res.status(201).json({ 
              message: 'Blog post created successfully', 
              id: result.id,
              slug 
            });
          } else {
            res.status(500).json({ message: 'Error saving blog post' });
          }
          
          return resolve(true);
        } catch (error) {
          console.error('Error processing blog post:', error);
          res.status(500).json({ message: 'Server error' });
          return resolve(true);
        }
      });
    });
  } catch (error) {
    console.error('Error handling request:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
