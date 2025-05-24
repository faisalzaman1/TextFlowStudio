import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center">
              <Play className="text-white h-4 w-4 fill-current" />
            </div>
            <span className="text-xl font-bold text-brand-text">VideoGen AI</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => {
                document.querySelector('[data-templates]')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-brand-text hover:text-brand-primary transition-colors"
            >
              Templates
            </button>
            <button 
              onClick={() => alert('Pricing plans: Free (unlimited), Pro ($9/mo), Enterprise ($29/mo)')}
              className="text-brand-text hover:text-brand-primary transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => alert('Need help? Contact us at support@videogen.ai or visit our help center.')}
              className="text-brand-text hover:text-brand-primary transition-colors"
            >
              Support
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-brand-text hover:text-brand-primary"
              onClick={() => alert('Sign in functionality coming soon! For now, you can use all features for free.')}
            >
              Sign In
            </Button>
            <Button 
              className="bg-brand-primary hover:bg-brand-primary/90 text-white"
              onClick={() => {
                document.querySelector('textarea')?.focus();
                alert('Welcome! Start creating your video by entering text in the script area below.');
              }}
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
