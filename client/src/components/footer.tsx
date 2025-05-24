import { Play } from "lucide-react";
import { FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 gradient-brand rounded-lg flex items-center justify-center">
                <Play className="text-white h-3 w-3 fill-current" />
              </div>
              <span className="text-lg font-bold text-brand-text">VideoGen AI</span>
            </div>
            <p className="text-gray-600 text-sm">
              Create stunning videos from text with AI-powered technology.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-brand-text mb-3">Product</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-brand-primary transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-brand-text mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-brand-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Tutorials</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Status</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-brand-text mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-brand-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex items-center justify-between">
          <p className="text-sm text-gray-600">© 2024 VideoGen AI. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-brand-primary transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-brand-primary transition-colors">
              <FaLinkedin />
            </a>
            <a href="#" className="text-gray-400 hover:text-brand-primary transition-colors">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
