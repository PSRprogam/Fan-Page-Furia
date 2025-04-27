import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
// import { cn } from '@/lib/utils';

interface NavItemProps {
  href: string;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ href, text, active, onClick }) => (
  <li>
    {/* <Link 
      to={href} 
      className={cn(
        'font-bebas-neue text-lg px-4 py-2 relative transition-colors duration-300',
        active 
          ? 'text-furia-purple' 
          : 'text-white hover:text-furia-purple'
      )}
      onClick={onClick}
    >
      {text}
      {active && (
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-furia-purple to-furia-orange" />
      )}
    </Link> */}
  </li>
);

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  
  const handleNavClick = (item: string) => {
    setActiveItem(item);
    setIsMenuOpen(false);
  };
  
  return (
    <header className="sticky top-0 z-50 w-full bg-furia-dark/90 backdrop-blur-md border-b border-furia-purple/30">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center mr-10">
            <img src="/images/furia-logo.svg" alt="FURIA" className="h-10 w-auto" />
            <span className="ml-2 text-2xl font-bebas-neue text-white">FAN HUB</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <NavItem 
              href="/" 
              text="HOME" 
              active={activeItem === 'home'} 
              onClick={() => handleNavClick('home')}
            />
            <NavItem 
              href="/team" 
              text="TEAM" 
              active={activeItem === 'team'} 
              onClick={() => handleNavClick('team')}
            />
            <NavItem 
              href="/matches" 
              text="MATCHES" 
              active={activeItem === 'matches'} 
              onClick={() => handleNavClick('matches')}
            />
            <NavItem 
              href="/history" 
              text="HISTORY" 
              active={activeItem === 'history'} 
              onClick={() => handleNavClick('history')}
            />
            <NavItem 
              href="/quiz" 
              text="QUIZ" 
              active={activeItem === 'quiz'} 
              onClick={() => handleNavClick('quiz')}
            />
          </ul>
        </nav>
        
        <button className="hidden md:block furia-btn">
          CHAT WITH PANTERABOT
        </button>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-furia-charcoal border-t border-furia-purple/20">
          <ul className="flex flex-col py-4">
            <NavItem 
              href="/" 
              text="HOME" 
              active={activeItem === 'home'} 
              onClick={() => handleNavClick('home')}
            />
            <NavItem 
              href="/team" 
              text="TEAM" 
              active={activeItem === 'team'} 
              onClick={() => handleNavClick('team')}
            />
            <NavItem 
              href="/matches" 
              text="MATCHES" 
              active={activeItem === 'matches'} 
              onClick={() => handleNavClick('matches')}
            />
            <NavItem 
              href="/history" 
              text="HISTORY" 
              active={activeItem === 'history'} 
              onClick={() => handleNavClick('history')}
            />
            <NavItem 
              href="/quiz" 
              text="QUIZ" 
              active={activeItem === 'quiz'} 
              onClick={() => handleNavClick('quiz')}
            />
            <li className="px-4 pt-4">
              <button className="w-full furia-btn">
                CHAT WITH PANTERABOT
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navigation;
