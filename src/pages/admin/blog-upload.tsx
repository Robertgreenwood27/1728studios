import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, Upload, Check, AlertCircle, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { marked } from 'marked'; // We'll need to install this package

// Mock function to simulate saving to a database
// In a real implementation, this would connect to your backend
const saveBlogPost = async (postData) => {
  console.log('Saving blog post:', postData);
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, id: Date.now().toString() });
    }, 1500);
  });
};

const BlogUploadPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [category, setCategory] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [previewHtml, setPreviewHtml] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const fileInputRef = useRef(null);
  
  // Categories for the dropdown
  const categories = [
    'AI Strategy',
    'Ethics',
    'Case Study',
    'Technology',
    'Security',
    'Research',
    'Industry Insights'
  ];
  
  // Generate a preview of the markdown content
  const generatePreview = () => {
    try {
      const html = marked.parse(markdownContent);
      setPreviewHtml(html);
      setIsPreviewMode(true);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error parsing Markdown: ' + error.message);
    }
  };
  
  // Handle file selection for the featured image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setFeaturedImage(file);
        setErrorMessage('');
      } else {
        setErrorMessage('Please select an image file');
        setFeaturedImage(null);
      }
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!title || !author || !authorRole || !category || !markdownContent) {
      setErrorMessage('Please fill in all required fields');
      return;
    }
    
    if (!featuredImage) {
      setErrorMessage('Please upload a featured image');
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // Create form data for API request
      const formData = new FormData();
      formData.append('title', title);
      formData.append('author', author);
      formData.append('authorRole', authorRole);
      formData.append('category', category);
      formData.append('content', markdownContent);
      formData.append('excerpt', markdownContent.substring(0, 150) + '...');
      formData.append('featured', 'false'); // Default to not featured
      formData.append('image', featuredImage);
      
      // Send API request
      const response = await fetch('/api/blog/upload', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSuccessMessage('Blog post saved successfully!');
        
        // Reset the form after a delay
        setTimeout(() => {
          setTitle('');
          setAuthor('');
          setAuthorRole('');
          setCategory('');
          setMarkdownContent('');
          setFeaturedImage(null);
          setPreviewHtml('');
          setIsPreviewMode(false);
          setSuccessMessage('');
        }, 3000);
      } else {
        throw new Error(result.message || 'Failed to save blog post');
      }
    } catch (error) {
      setErrorMessage('Error saving blog post: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="text-white min-h-screen">
      {/* Header */}
      <header className="relative border-b border-blue-500 py-8 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-blue-900/30 z-10"></div>
          <div className="w-full h-full bg-black opacity-80 absolute"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/admin" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Admin
          </Link>
          
          <h1 className="text-3xl font-bold text-blue-300">Upload Blog Post</h1>
          <p className="text-gray-300">Create a new blog post using Markdown format</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-900/30 border border-green-500 rounded-lg p-4 mb-6 flex items-start">
              <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-green-300">{successMessage}</p>
            </div>
          )}
          
          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 mb-6 flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-red-300">{errorMessage}</p>
            </div>
          )}
          
          {/* Toggle between Edit and Preview */}
          <div className="flex mb-6">
            <button
              onClick={() => setIsPreviewMode(false)}
              className={`px-4 py-2 rounded-l-lg ${
                !isPreviewMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-900/30 text-gray-300 hover:bg-blue-900/50'
              }`}
            >
              Edit
            </button>
            <button
              onClick={generatePreview}
              className={`px-4 py-2 rounded-r-lg ${
                isPreviewMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-900/30 text-gray-300 hover:bg-blue-900/50'
              }`}
            >
              Preview
            </button>
          </div>
          
          {!isPreviewMode ? (
            /* Edit Mode */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info Section */}
              <div className="bg-black/50 border border-blue-900 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">Basic Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-gray-300 mb-1">
                      Title <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-black/70 border border-blue-900 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-blue-500"
                      placeholder="Enter blog post title"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="author" className="block text-gray-300 mb-1">
                        Author <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full bg-black/70 border border-blue-900 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-blue-500"
                        placeholder="Author name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="authorRole" className="block text-gray-300 mb-1">
                        Author Role <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="authorRole"
                        value={authorRole}
                        onChange={(e) => setAuthorRole(e.target.value)}
                        className="w-full bg-black/70 border border-blue-900 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-blue-500"
                        placeholder="e.g. Chief AI Strategist"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-gray-300 mb-1">
                      Category <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-black/70 border border-blue-900 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-blue-500"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-1">
                      Featured Image <span className="text-red-400">*</span>
                    </label>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="bg-blue-900/50 hover:bg-blue-900/70 text-blue-300 px-4 py-2 rounded-lg flex items-center transition-colors"
                      >
                        <ImageIcon className="w-5 h-5 mr-2" />
                        {featuredImage ? 'Change Image' : 'Upload Image'}
                      </button>
                      {featuredImage && (
                        <span className="ml-3 text-green-400 flex items-center">
                          <Check className="w-4 h-4 mr-1" />
                          {featuredImage.name}
                        </span>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Markdown Content Section */}
              <div className="bg-black/50 border border-blue-900 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">Content (Markdown)</h2>
                
                <div>
                  <textarea
                    value={markdownContent}
                    onChange={(e) => setMarkdownContent(e.target.value)}
                    className="w-full h-96 bg-black/70 border border-blue-900 rounded-lg py-3 px-4 text-white font-mono text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Write your blog post content in Markdown format..."
                    required
                  ></textarea>
                </div>
                
                <div className="mt-2">
                  <p className="text-sm text-gray-400">
                    Use Markdown syntax for formatting. 
                    <a 
                      href="https://www.markdownguide.org/cheat-sheet/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 ml-1"
                    >
                      Markdown Cheat Sheet
                    </a>
                  </p>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 rounded-lg flex items-center ${
                    isSubmitting
                      ? 'bg-blue-900/50 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  } transition-colors`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-gray-400 border-t-blue-400 rounded-full animate-spin mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 mr-2" />
                      Publish Blog Post
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Preview Mode */
            <div className="bg-black/50 border border-blue-900 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-300">Preview</h2>
              
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">{title || 'Blog Post Title'}</h1>
                
                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <span className="bg-blue-900/50 px-3 py-1 rounded-full text-blue-300">
                    {category || 'Category'}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center mr-3">
                    <ImageIcon className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{author || 'Author Name'}</p>
                    <p className="text-sm text-gray-400">{authorRole || 'Author Role'}</p>
                  </div>
                </div>
              </div>
              
              <div className="prose prose-invert prose-blue max-w-none">
                <div dangerouslySetInnerHTML={{ __html: previewHtml }}></div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BlogUploadPage;
