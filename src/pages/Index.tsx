import { useState } from 'react';
import { URLInput } from '@/components/URLInput';
import { CodeViewer } from '@/components/CodeViewer';
import { AIAssistant } from '@/components/AIAssistant';
import { useToast } from "@/components/ui/use-toast";

interface CodeFile {
  name: string;
  type: 'html' | 'css' | 'js';
  content: string;
  size: string;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [extractedFiles, setExtractedFiles] = useState<CodeFile[]>([]);
  const { toast } = useToast();

  const handleExtract = async (url: string) => {
    setIsLoading(true);
    
    try {
      // Simulate extraction process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock extracted files data
      const mockFiles: CodeFile[] = [
        {
          name: 'index.html',
          type: 'html',
          content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample Website</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="header">
        <nav class="navbar">
            <div class="logo">Brand</div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main class="main-content">
        <section class="hero">
            <h1>Welcome to Our Website</h1>
            <p>This is a sample website for demonstration.</p>
            <button class="cta-button" onclick="handleClick()">Get Started</button>
        </section>
    </main>
    
    <script src="script.js"></script>
</body>
</html>`,
          size: '2.1 KB'
        },
        {
          name: 'styles.css',
          type: 'css',
          content: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

.header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 1rem 0;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-links a {
    color: white;
    text-decoration: none;
    transition: opacity 0.3s ease;
}

.nav-links a:hover {
    opacity: 0.8;
}

.main-content {
    margin-top: 80px;
}

.hero {
    background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('hero-bg.jpg');
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    animation: fadeInUp 1s ease;
}

.hero p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    animation: fadeInUp 1s ease 0.3s both;
}

.cta-button {
    background: #ff6b6b;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 50px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    animation: fadeInUp 1s ease 0.6s both;
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .navbar {
        flex-direction: column;
        gap: 1rem;
    }
    
    .hero h1 {
        font-size: 2rem;
    }
    
    .nav-links {
        gap: 1rem;
    }
}`,
          size: '3.7 KB'
        },
        {
          name: 'script.js',
          type: 'js',
          content: `// Main application JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully');
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize animations
    initScrollAnimations();
});

function handleClick() {
    alert('Button clicked! This would typically navigate to a signup page.');
    
    // Track analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            'event_category': 'CTA',
            'event_label': 'Hero Button'
        });
    }
}

function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    let isMenuOpen = false;
    
    // Create mobile menu toggle
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.display = 'none';
    
    navbar.appendChild(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(102, 126, 234, 0.95)';
            navLinks.style.padding = '1rem';
        } else {
            navLinks.style.display = '';
            navLinks.style.flexDirection = '';
            navLinks.style.position = '';
            navLinks.style.top = '';
            navLinks.style.left = '';
            navLinks.style.width = '';
            navLinks.style.background = '';
            navLinks.style.padding = '';
        }
    });
    
    // Show/hide mobile menu based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
        } else {
            menuToggle.style.display = 'none';
            // Reset nav links to default state
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = '';
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.hero h1, .hero p, .cta-button');
    animatedElements.forEach(el => observer.observe(el));
}

// Utility functions
const utils = {
    // Debounce function for performance optimization
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Get viewport dimensions
    getViewportSize: function() {
        return {
            width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
            height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        };
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export utilities for other scripts
window.siteUtils = utils;`,
          size: '4.8 KB'
        }
      ];
      
      setExtractedFiles(mockFiles);
      
      toast({
        title: "Code Extraction Complete!",
        description: `Successfully extracted ${mockFiles.length} files from ${url}`,
      });
      
    } catch (error) {
      toast({
        title: "Extraction Failed",
        description: "Failed to extract code from the website. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 space-y-4">
        {!extractedFiles.length ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-2xl">
              <URLInput onExtract={handleExtract} isLoading={isLoading} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-screen">
            <div className="lg:col-span-2">
              <CodeViewer files={extractedFiles} />
            </div>
            <div className="lg:col-span-1">
              <AIAssistant />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
