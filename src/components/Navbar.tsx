
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { authService } from "@/services/authService";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    
    // Add event listener for storage changes (for multi-tab sync)
    const handleStorageChange = () => {
      setUser(authService.getCurrentUser());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      authService.signOut();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="glass-dark sticky top-0 z-50 px-4 py-3 mb-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">TV</span>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            TradeVizual
          </h1>
        </div>
        
        <div className="flex gap-4 items-center">
          <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground"
            onClick={() => navigate("/")}>
            Dashboard
          </Button>
          <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground"
            onClick={() => navigate("/stocks")}>
            Stocks
          </Button>
          <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground"
            onClick={() => navigate("/news")}>
            News
          </Button>
        </div>
        
        <div className="flex gap-3">
          {user ? (
            <Button 
              variant="outline" 
              className="glass border-primary/20 hover:border-primary/40"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="glass border-primary/20 hover:border-primary/40"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </Button>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
