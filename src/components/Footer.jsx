
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-16">
      <div className="max-w-content mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img 
                src="/lovable-uploads/b2c9f75d-87a6-4c5e-b1ee-5b184d901781.png" 
                alt="Triimo Logo" 
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-[#919191] text-sm max-w-xs">
              A centralized messaging platform for businesses to connect with customers across multiple channels.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-[#A3A3A3] text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/features" className="text-[#919191] hover:text-gray-900 transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-[#919191] hover:text-gray-900 transition-colors">Pricing</Link></li>
              <li><Link to="/integrations" className="text-[#919191] hover:text-gray-900 transition-colors">Integrations</Link></li>
              <li><Link to="/enterprise" className="text-[#919191] hover:text-gray-900 transition-colors">Enterprise</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-[#A3A3A3] text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/documentation" className="text-[#919191] hover:text-gray-900 transition-colors">Documentation</Link></li>
              <li><Link to="/api" className="text-[#919191] hover:text-gray-900 transition-colors">API Reference</Link></li>
              <li><Link to="/blog" className="text-[#919191] hover:text-gray-900 transition-colors">Blog</Link></li>
              <li><Link to="/help" className="text-[#919191] hover:text-gray-900 transition-colors">Help Center</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-[#A3A3A3] text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-[#919191] hover:text-gray-900 transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-[#919191] hover:text-gray-900 transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-[#919191] hover:text-gray-900 transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-[#919191] hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2023 Triimo. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://twitter.com" className="text-gray-400 hover:text-[#919191]">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-[#919191]">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M3 0h18a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3zm4.675 17.205h2.65V7.915h-2.65v9.29zM5 5.295a1.615 1.615 0 1 0 3.23 0 1.615 1.615 0 0 0-3.23 0zm8.465 1.95a4.61 4.61 0 0 0-3.42 1.435v-1.075h-2.65v9.29h2.65v-4.6c0-1.11.21-2.19 1.585-2.19 1.355 0 1.375 1.27 1.375 2.265v4.525h2.65v-5.1c0-2.295-.495-4.295-3.19-4.55z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://facebook.com" className="text-gray-400 hover:text-[#919191]">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;