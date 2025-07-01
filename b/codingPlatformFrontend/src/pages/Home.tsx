
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, FlameKindling, Terminal, Trophy } from 'lucide-react';

const Home = () => {
  // Create animated particles in background
  useEffect(() => {
    const createParticle = () => {
      const particles = document.getElementById('particles');
      if (!particles) return;
      
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random position
      const size = Math.random() * 100 + 30;
      const posX = Math.random() * window.innerWidth;
      const posY = Math.random() * window.innerHeight;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;
      
      particles.appendChild(particle);
      
      // Remove after animation completes
      setTimeout(() => {
        particles.removeChild(particle);
      }, 8000);
    };
    
    // Create initial particles
    for (let i = 0; i < 6; i++) {
      setTimeout(() => createParticle(), i * 300);
    }
    
    // Create new particles periodically
    const interval = setInterval(createParticle, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pb-16">
      {/* Animated particles */}
      <div id="particles" className="fixed inset-0 overflow-hidden pointer-events-none z-0"></div>
      
      {/* Hero section */}
      <section className="relative pt-24 md:pt-32 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center bg-primary/10 text-primary rounded-full px-4 py-1.5 mb-6 text-sm font-medium">
            <FlameKindling className="h-4 w-4 mr-2" />
            <span>Welcome to the next level of coding challenges</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Master Coding Through <span className="text-gradient">Creative Challenges</span>
          </h1>
          
          <p className="text-muted-foreground text-lg mb-8 max-w-3xl mx-auto">
            CodeSpark combines cutting-edge problems with an immersive learning experience. 
            Level up your skills, compete with others, and build your coding portfolio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Link to="/problems">
                <span>Start Coding</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-muted hover:border-primary/50">
              <Link to="/signup">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="mt-24 lg:mt-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why JSR Coders?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers unique features to enhance your coding journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Terminal className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Interactive Challenges</h3>
              <p className="text-muted-foreground">
                Solve problems with real-time feedback and hints when you need them.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Multi-Language Support</h3>
              <p className="text-muted-foreground">
                Practice in your favorite programming language with syntax highlighting.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Achievement System</h3>
              <p className="text-muted-foreground">
                Earn badges and track your progress as you master new concepts.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="mt-24 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm rounded-2xl p-8 text-center border border-primary/10">
          <h2 className="text-2xl font-bold mb-4">Ready to spark your coding skills?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of developers who are leveling up their coding skills every day.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            <Link to="/problems">Explore Problems</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
