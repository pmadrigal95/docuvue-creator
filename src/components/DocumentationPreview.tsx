
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DocPreviewProps {
  componentCode: string;
  description: string;
  isLoading?: boolean;
}

const DocumentationPreview: React.FC<DocPreviewProps> = ({ 
  componentCode, 
  description,
  isLoading = false
}) => {
  const [componentName, setComponentName] = useState('');
  const [props, setProps] = useState<string[]>([]);
  const [emits, setEmits] = useState<string[]>([]);
  
  useEffect(() => {
    if (componentCode) {
      // Extract component name
      const nameMatch = componentCode.match(/name:\s*['"](.+?)['"]/);
      setComponentName(nameMatch ? nameMatch[1] : 'MyComponent');
      
      // Extract props
      const propsMatch = componentCode.match(/props:\s*{([^}]+)}/s);
      if (propsMatch) {
        const propsStr = propsMatch[1];
        const propsList = propsStr.split(',')
          .map(p => p.trim())
          .filter(p => p.length > 0)
          .map(p => {
            const nameMatch = p.match(/(\w+):/);
            return nameMatch ? nameMatch[1] : p;
          });
        setProps(propsList);
      } else {
        setProps([]);
      }
      
      // Extract emits
      const emitsMatch = componentCode.match(/emits:\s*\[([^\]]+)\]/s);
      if (emitsMatch) {
        const emitsStr = emitsMatch[1];
        const emitsList = emitsStr.split(',')
          .map(e => e.trim().replace(/['"]/g, ''))
          .filter(e => e.length > 0);
        setEmits(emitsList);
      } else {
        setEmits([]);
      }
    }
  }, [componentCode]);

  if (!componentCode && !description && !isLoading) {
    return (
      <motion.div 
        className="w-full h-[500px] rounded-lg border border-dashed border-border flex flex-col items-center justify-center p-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-1">No Documentation Yet</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Enter your Vue component code and a description, then click "Generate Documentation" to create the documentation.
        </p>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="w-full border border-border rounded-lg overflow-hidden bg-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="border-b border-border p-4 bg-muted/30">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">{componentName}</h2>
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
            Vue 3
          </span>
        </div>
      </div>
      
      <AnimatePresence>
        {isLoading ? (
          <motion.div 
            key="loading"
            className="p-8 flex flex-col items-center justify-center h-[400px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm text-muted-foreground">Generating documentation...</p>
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            className="p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <section className="mb-6">
              <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-3">
                Description
              </h3>
              <p className="text-sm leading-relaxed">
                {description || "No description provided."}
              </p>
            </section>
            
            <section className="mb-6">
              <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-3">
                Props
              </h3>
              {props.length > 0 ? (
                <div className="grid gap-2">
                  {props.map((prop, i) => (
                    <motion.div 
                      key={prop}
                      className="p-3 bg-muted/50 rounded-md"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{prop}</span>
                        <span className="text-xs text-muted-foreground px-2 py-0.5 bg-background rounded-full">
                          Prop
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground italic">
                  No props defined.
                </div>
              )}
            </section>
            
            <section className="mb-6">
              <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-3">
                Events
              </h3>
              {emits.length > 0 ? (
                <div className="grid gap-2">
                  {emits.map((emit, i) => (
                    <motion.div 
                      key={emit}
                      className="p-3 bg-muted/50 rounded-md"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{emit}</span>
                        <span className="text-xs text-muted-foreground px-2 py-0.5 bg-background rounded-full">
                          Event
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground italic">
                  No events defined.
                </div>
              )}
            </section>
            
            <section>
              <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-3">
                Usage Example
              </h3>
              <pre className="p-4 bg-muted/50 rounded-md overflow-x-auto text-xs font-mono">
                {`<template>
  <${componentName} ${props.length > 0 ? `\n    ${props.map(p => `:${p}="${p}"`).join('\n    ')}` : ''}${emits.length > 0 ? `\n    ${emits.map(e => `@${e}="handle${e.charAt(0).toUpperCase() + e.slice(1)}"`).join('\n    ')}` : ''}
  />
</template>`}
              </pre>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DocumentationPreview;
