
import { Button } from "@/components/ui/button";
import { Brain, Menu } from "lucide-react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { user, signOut } = useFirebaseAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AdOptimize AI
            </span>
          </div>
          
          {user ? (
            <nav className="hidden md:flex items-center gap-8">
              <a href="#dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">Dashboard</a>
              <a href="#campaigns" className="text-gray-600 hover:text-gray-900 transition-colors">Campaigns</a>
              <a href="#insights" className="text-gray-600 hover:text-gray-900 transition-colors">AI Insights</a>
              <a href="#automation" className="text-gray-600 hover:text-gray-900 transition-colors">Automation</a>
            </nav>
          ) : (
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </nav>
          )}
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600 hidden md:inline">
                  {user.name || user.email}
                </span>
                <Button variant="ghost" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="hidden md:inline-flex" onClick={() => navigate('/auth')}>
                  Sign In
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={() => navigate('/auth')}>
                  Get Started
                </Button>
              </>
            )}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
