import React from 'react';
import { Sparkles } from 'lucide-react';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-dotted flex flex-col relative overflow-hidden font-sans">
      {/* Navbar matching reference design */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-brand-dark text-white p-1.5 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="font-display font-bold text-xl tracking-tight text-brand-dark">synapse.ai</h1>
          </div>
          
          {/* Centered Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-brand-dark transition-colors"></a>
            <a href="#" className="hover:text-brand-dark transition-colors"></a>
            <a href="#" className="hover:text-brand-dark transition-colors"></a>
            <a href="#" className="hover:text-brand-dark transition-colors"></a>
          </nav>
          
          {/* Right Actions */}
          <div className="flex items-center gap-4">
            
            <button 
              onClick={() => {
                document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className="text-sm font-medium text-white bg-brand-purple hover:bg-[#5b3ce0] px-5 py-2.5 rounded-full shadow-lg shadow-brand-purple/25 transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col items-center">
        {children}
      </main>

      {/* Simplified Footer */}
      <footer className="mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} Synapse.ai. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
