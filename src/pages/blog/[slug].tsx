import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, ArrowLeft, Share2, Linkedin, Twitter } from 'lucide-react';
import { getBlogPostBySlug, getAllBlogPosts, getRelatedBlogPosts } from '../../services/blogService';

export async function getStaticProps({ params }) {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      notFound: true
    };
  }
  
  // Get related posts
  const relatedPosts = post.relatedPosts?.length 
    ? await getRelatedBlogPosts(post.id)
    : [];
  
  return {
    props: {
      post,
      relatedPosts
    },
    // Revalidate every hour
    revalidate: 3600
  };
}

export async function getStaticPaths() {
  const posts = await getAllBlogPosts();
  
  const paths = posts.map((post) => ({
    params: { slug: post.slug }
  }));
  
  return {
    paths,
    fallback: 'blocking'
  };
}

const BlogPostPage = ({ post, relatedPosts }) => {
  const router = useRouter();
  
  // If the page is still generating via fallback, show loading
  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading article...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="text-white min-h-screen">
      {/* Header */}
      <header className="relative border-b border-blue-500 py-16 bg-black bg-opacity-50 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-blue-900/30 z-10"></div>
          <div className="w-full h-full bg-black opacity-80 absolute"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/blog" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
          </Link>
          
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center text-sm text-blue-300 mb-4">
              <span className="bg-blue-900/50 px-3 py-1 rounded-full">{post.category}</span>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{post.title}</h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <p className="text-white font-medium">{post.author}</p>
                  <p className="text-sm text-gray-400">{post.authorRole}</p>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-gray-400">
                <Calendar className="w-4 h-4 mr-1 text-blue-400" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Featured Image */}
          <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-black z-0"></div>
            {post.image && (
              <Image 
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            )}
          </div>
          
          {/* Social Share */}
          <div className="flex items-center justify-end mb-8">
            <span className="text-gray-400 mr-3">Share:</span>
            <div className="flex space-x-2">
              <button className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-300 hover:bg-blue-800/50 transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-300 hover:bg-blue-800/50 transition-colors">
                <Linkedin className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-300 hover:bg-blue-800/50 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Article Content */}
          <article className="prose prose-lg prose-invert prose-blue max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </article>
          
          {/* Author Bio */}
          {post.authorBio && (
            <div className="border-t border-blue-900 pt-8 mb-16">
              <h3 className="text-xl font-semibold mb-4 text-blue-300">About the Author</h3>
              <div className="flex items-start">
                <div className="w-16 h-16 rounded-full bg-blue-900/50 flex items-center justify-center mr-4 flex-shrink-0">
                  <User className="w-8 h-8 text-blue-300" />
                </div>
                <div>
                  <p className="text-white font-medium text-lg mb-1">{post.author}</p>
                  <p className="text-blue-400 text-sm mb-3">{post.authorRole}</p>
                  <p className="text-gray-300">{post.authorBio}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6 text-blue-300">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map(relatedPost => (
                  <div key={relatedPost.id} className="bg-gradient-to-br from-black to-blue-900/30 border border-blue-500 rounded-xl overflow-hidden group hover:border-blue-300 transition-all duration-300">
                    <div className="relative h-40 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-black z-0"></div>
                      {relatedPost.image && (
                        <Image 
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute top-4 left-4 bg-blue-900/70 px-3 py-1 rounded-full text-xs text-blue-100 z-10">
                        {relatedPost.category}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h4 className="text-lg font-semibold mb-2 text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
                        {relatedPost.title}
                      </h4>
                      
                      <p className="text-gray-300 mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      
                      <Link href={`/blog/${relatedPost.slug}`} className="text-blue-400 group-hover:text-blue-300 flex items-center transition-colors">
                        Read article <ArrowLeft className="ml-2 w-4 h-4 rotate-180" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BlogPostPage;
