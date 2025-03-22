
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from './CodeEditor';
import DocumentationPreview from './DocumentationPreview';
import { toast } from '@/components/ui/use-toast';

const CreateDocumentation = () => {
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState({
    code: '',
    description: ''
  });

  const handleGenerate = () => {
    if (!code.trim()) {
      toast({
        title: "Missing component code",
        description: "Please enter your Vue component code before generating documentation.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setGeneratedDoc({
        code,
        description: description || 'A Vue 3 component.'
      });
      setIsGenerating(false);
      
      toast({
        title: "Documentation generated",
        description: "Your component documentation has been created successfully.",
      });
    }, 1500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-6">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div>
              <h2 className="text-2xl font-semibold tracking-tight mb-1">Component Code</h2>
              <p className="text-muted-foreground text-sm">
                Enter your Vue component code below for documentation generation
              </p>
            </div>
            
            <CodeEditor 
              value={code}
              onChange={setCode}
            />
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Component Description
              </label>
              <motion.textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description of what your component does..."
                className="w-full p-3 bg-secondary/50 rounded-lg border-[1.5px] border-border focus:ring-2 focus:ring-primary/20 focus:border-primary/30 outline-none transition-all resize-none min-h-[100px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              />
            </div>
            
            <motion.button
              onClick={handleGenerate}
              className="w-full bg-primary text-primary-foreground font-medium py-2.5 px-4 rounded-lg transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
              disabled={isGenerating || !code.trim()}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                "Generate Documentation"
              )}
            </motion.button>
          </motion.div>
        </div>
        
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h2 className="text-2xl font-semibold tracking-tight mb-1">Documentation Preview</h2>
            <p className="text-muted-foreground text-sm mb-4">
              {generatedDoc.code ? 'Generated documentation for your component' : 'Enter component details and click generate'}
            </p>
            
            <DocumentationPreview 
              componentCode={generatedDoc.code}
              description={generatedDoc.description}
              isLoading={isGenerating}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateDocumentation;
