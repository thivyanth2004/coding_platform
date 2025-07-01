
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Code, FlameKindling, Menu, User, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = false; // This would come from auth context in a real app

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <FlameKindling className="h-8 w-8 text-primary animate-pulse-light" />
              <span className="font-bold text-xl text-gradient">JSR Coders</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link to="/problems" className="text-gray-300 hover:text-white hover:bg-primary/10 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Problems
              </Link>
              <Link to="/submissions" className="text-gray-300 hover:text-white hover:bg-primary/10 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Submissions
              </Link>
              
              {isLoggedIn ? (
                <Link to="/profile" className="relative ml-2">
                  <div className="p-1 rounded-full bg-gradient-to-r from-primary to-secondary">
                    <div className="bg-background rounded-full p-0.5">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent rounded-full border-2 border-background"></span>
                </Link>
              ) : (
                <div className="flex space-x-2">
                  <Button variant="ghost" asChild className="text-gray-300 hover:text-white">
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                    <Link to="/signup">Sign up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-primary/20 focus:outline-none"
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden glass-effect ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            to="/problems"
            onClick={() => setIsOpen(false)}
            className="block text-gray-300 hover:text-white hover:bg-primary/10 px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            Problems
          </Link>
          <Link 
            to="/submissions"
            onClick={() => setIsOpen(false)}
            className="block text-gray-300 hover:text-white hover:bg-primary/10 px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            Submissions
          </Link>
          
          {isLoggedIn ? (
            <Link 
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-white hover:bg-primary/10 px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Profile
            </Link>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-700">
              <Link 
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-primary/10"
              >
                Log in
              </Link>
              <Link 
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary/20 hover:bg-primary/30 mt-1"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
