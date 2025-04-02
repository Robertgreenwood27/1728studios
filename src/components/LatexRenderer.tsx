import React, { useEffect, useRef } from 'react';
import 'katex/dist/katex.min.css';

interface LatexRendererProps {
  content: string;
  className?: string;
}

const LatexRenderer: React.FC<LatexRendererProps> = ({ content, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const processLatex = async () => {
      if (!containerRef.current) return;
      
      try {
        // Dynamically import KaTeX
        const katex = (await import('katex')).default;
        
        // Find all LaTeX expressions in the content
        const inlineRegex = /\$(.*?)\$/g;
        const displayRegex = /\$\$(.*?)\$\$/g;
        
        // Process all elements with LaTeX content
        const elements = containerRef.current.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6');
        
        elements.forEach(element => {
          let html = element.innerHTML;
          
          // Process display mode LaTeX
          html = html.replace(displayRegex, (match, latex) => {
            try {
              return `<div class="katex-display">${katex.renderToString(latex, { displayMode: true })}</div>`;
            } catch (error) {
              console.error('Failed to render display LaTeX:', latex, error);
              return match;
            }
          });
          
          // Process inline LaTeX
          html = html.replace(inlineRegex, (match, latex) => {
            try {
              return katex.renderToString(latex, { displayMode: false });
            } catch (error) {
              console.error('Failed to render inline LaTeX:', latex, error);
              return match;
            }
          });
          
          element.innerHTML = html;
        });
      } catch (error) {
        console.error('Failed to process LaTeX:', error);
      }
    };
    
    processLatex();
  }, [content]);
  
  return (
    <div 
      ref={containerRef} 
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default LatexRenderer;
