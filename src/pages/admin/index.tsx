import React from 'react';
import Link from 'next/link';
import { FileText, Lock, User, Settings } from 'lucide-react';
import { useAuth } from '../../components/AuthContext';
import { useRouter } from 'next/router';

const AdminPage = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  
  // In a real implementation, you would check if the user has admin privileges
  // For now, we'll just use the isAuthenticated state from the AuthContext
  
  // Redirect non-authenticated users
  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }
  
  // If not authenticated, show nothing (will redirect)
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="text-white min-h-screen">
      {/* Header */}
      <header className="relative border-b border-blue-500 py-12 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-blue-900/30 z-10"></div>
          <div className="w-full h-full bg-black opacity-80 absolute"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold text-blue-300 mb-2">Admin Dashboard</h1>
          <p className="text-gray-300">Manage your website content</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Blog Management Card */}
            <Link href="/admin/blog-upload" className="group">
              <div className="bg-gradient-to-br from-black to-blue-900/30 border border-blue-900 rounded-xl p-6 hover:border-blue-500 transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center mb-4 group-hover:bg-blue-800/70 transition-colors">
                  <FileText className="w-6 h-6 text-blue-300" />
                </div>
                
                <h2 className="text-xl font-semibold mb-2 text-blue-300">Blog Management</h2>
                <p className="text-gray-400 mb-4">Upload and manage blog posts in Markdown format</p>
                
                <div className="text-blue-400 group-hover:text-blue-300 transition-colors text-sm">
                  Manage content →
                </div>
              </div>
            </Link>
            
            {/* User Management Card (placeholder) */}
            <div className="bg-gradient-to-br from-black to-blue-900/30 border border-blue-900 rounded-xl p-6 h-full opacity-60">
              <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-blue-300" />
              </div>
              
              <h2 className="text-xl font-semibold mb-2 text-blue-300">User Management</h2>
              <p className="text-gray-400 mb-4">Manage user accounts and permissions</p>
              
              <div className="text-blue-400 text-sm flex items-center">
                <Lock className="w-4 h-4 mr-1" /> Coming soon
              </div>
            </div>
            
            {/* Site Settings Card (placeholder) */}
            <div className="bg-gradient-to-br from-black to-blue-900/30 border border-blue-900 rounded-xl p-6 h-full opacity-60">
              <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-blue-300" />
              </div>
              
              <h2 className="text-xl font-semibold mb-2 text-blue-300">Site Settings</h2>
              <p className="text-gray-400 mb-4">Configure website settings and preferences</p>
              
              <div className="text-blue-400 text-sm flex items-center">
                <Lock className="w-4 h-4 mr-1" /> Coming soon
              </div>
            </div>
          </div>
          
          <div className="mt-12 p-6 bg-blue-900/20 border border-blue-900 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Admin Access Note</h3>
            <p className="text-gray-300">
              This admin area is currently in development. In a production environment, you would implement proper authentication and authorization to restrict access to authorized personnel only.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
