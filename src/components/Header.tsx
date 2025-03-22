
import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header 
      className="w-full py-6 px-6 md:px-8 flex items-center justify-between border-b border-border"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center space-x-2">
        <motion.div 
          className="h-8 w-8 rounded-full bg-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
        <motion.h1 
          className="text-xl font-medium tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          DocuVue
        </motion.h1>
      </div>
      
      <motion.div 
        className="hidden md:flex items-center space-x-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <a 
          href="#" 
          className="text-sm text-foreground/80 hover:text-foreground transition-colors"
        >
          Documentation
        </a>
        <a 
          href="#" 
          className="text-sm text-foreground/80 hover:text-foreground transition-colors"
        >
          Examples
        </a>
        <a 
          href="#" 
          className="text-sm text-foreground/80 hover:text-foreground transition-colors"
        >
          GitHub
        </a>
      </motion.div>
    </motion.header>
  );
};

export default Header;
