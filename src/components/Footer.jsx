import React from 'react';
import { motion } from 'framer-motion';
import { Music2Icon, Instagram, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

const socialLinks = [
  { name: 'Tiktok', icon: Music2Icon, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' }
];

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-[hsl(var(--primary))] text-white mt-auto pb-5 sm:pb-6"
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Copyright Text - Left */}
          <p className="text-xs sm:text-sm whitespace-nowrap">
            © 2025 Kadangu. Hak Cipta Dilindungi.
          </p>
          
          {/* Social Media Icons - Right */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {socialLinks.map((social) => (
              <a 
                key={social.name} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-[hsl(var(--accent))] transition-colors duration-200"
              >
                <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;