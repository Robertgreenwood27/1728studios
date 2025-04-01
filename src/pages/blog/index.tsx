import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { getAllBlogPosts, BlogPost } from '../../services/blogService';

export async function getStaticProps() {
  const allPosts = await getAllBlogPosts();
  
  // Extract unique categories
  const categoriesSet = new Set(allPosts.map(post => post.category));
  const categories = Array.from(categoriesSet);
  
  return {
    props: {
      posts: allPosts,
      categories
    },
    // Revalidate every hour
    revalidate: 3600
  };
}

const BlogPage = ({ posts, categories }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);
  
  // Featured post is the first post marked as featured, or the first post if none are featured
  const featuredPost = posts.find(post => post.featured) || posts[0];
  
  // Filter posts based on search query and selected category
  useEffect(() => {
    let filtered = [...posts];
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory, posts]);
  
  return (
    <div className="text-white min-h-screen">
      {/* Header */}
      <header className="relative border-b border-blue-500 py-16 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-blue-900/30 z-10"></div>
          <div className="w-full h-full bg-black opacity-80 absolute"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-300">Blog</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Insights, case studies, and thought leadership from the 1728 Studios team
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-16">
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-blue-300">Featured Article</h2>
            
            <div className="bg-gradient-to-br from-black to-blue-900/30 border border-blue-900 rounded-xl overflow-hidden group hover:border-blue-500 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className="lg:col-span-3 p-8 lg:p-12">
                  <div className="flex items-center text-sm text-blue-300 mb-4">
                    <span className="bg-blue-900/50 px-3 py-1 rounded-full">{featuredPost.category}</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-blue-300" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{featuredPost.author}</p>
                        <p className="text-sm text-gray-400">{featuredPost.authorRole}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="w-4 h-4 mr-1 text-blue-400" />
                      {new Date(featuredPost.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Link href={`/blog/${featuredPost.slug}`} className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                      Read article <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
                
                <div className="lg:col-span-2 relative min-h-[300px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-black z-10"></div>
                  {featuredPost.image && (
                    <div className="relative h-full w-full">
                      <Image 
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between mb-12 space-y-4 md:space-y-0">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/70 border border-blue-900 rounded-lg py-2 pl-10 pr-4 w-full text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === 'All'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-900/30 text-gray-300 hover:bg-blue-900/50'
              }`}
            >
              All
            </button>
            
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-900/30 text-gray-300 hover:bg-blue-900/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                <div className="bg-gradient-to-br from-black to-blue-900/30 border border-blue-900 rounded-xl overflow-hidden h-full hover:border-blue-500 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-black z-10"></div>
                    <div className="absolute top-4 left-4 bg-blue-900/70 px-3 py-1 rounded-full text-xs text-blue-100 z-20">
                      {post.category}
                    </div>
                    {post.image && (
                      <div className="relative h-full w-full">
                        <Image 
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center mr-2">
                          <User className="w-4 h-4 text-blue-300" />
                        </div>
                        <p className="text-sm text-gray-400">{post.author}</p>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="w-3 h-3 mr-1 text-blue-400" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl">No articles found matching your criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogPage;
