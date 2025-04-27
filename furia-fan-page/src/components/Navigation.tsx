import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  href: string;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ href, text, active, onClick }) => {
  const isAnchor = href.startsWith('#');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isAnchor) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (onClick) onClick();
    }
  };

  return (
    <li>
      {isAnchor ? (
        <a
          href={href}
          className={cn(
            'font-bebas-neue text-lg px-4 py-2 relative transition-colors duration-300',
            active ? 'text-furia-purple' : 'text-white hover:text-furia-purple'
          )}
          onClick={handleClick}
        >
          {text}
          {active && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-furia-purple to-furia-orange" />
          )}
        </a>
      ) : (
        <Link
          to={href}
          className={cn(
            'font-bebas-neue text-lg px-4 py-2 relative transition-colors duration-300',
            active ? 'text-furia-purple' : 'text-white hover:text-furia-purple'
          )}
          onClick={onClick}
        >
          {text}
          {active && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-furia-purple to-furia-orange" />
          )}
        </Link>
      )}
    </li>
  );
};

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [currentHash, setCurrentHash] = useState('');

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    setCurrentHash(window.location.hash);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 w-full bg-furia-dark/90 backdrop-blur-md border-b border-furia-purple/30">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center mr-10">
            <img src="https://img-cdn.hltv.org/teamlogo/mvNQc4csFGtxXk5guAh8m1.svg?ixlib=java-2.1.0&s=11e5056829ad5d6c06c5961bbe76d20c" alt="FURIA" className="h-10 w-auto" />
            <span className="ml-2 text-2xl font-bebas-neue text-white">FAN HUB</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {location.pathname === '/' ? (
              <NavItem href="#home" text="HOME" active={currentHash === '#home'} onClick={handleNavClick} />
            ) : (
              <NavItem href="/home" text="HOME" active={location.pathname === '/home'} onClick={handleNavClick} />
            )}
            {location.pathname === '/' ? (
              <NavItem href="#team" text="TEAM" active={currentHash === '#team'} onClick={handleNavClick} />
            ) : (
              <NavItem href="/team" text="TEAM" active={location.pathname === '/team'} onClick={handleNavClick} />
            )}
            {location.pathname === '/' ? (
              <NavItem href="#matches" text="MATCHES" active={currentHash === '#matches'} onClick={handleNavClick} />
            ) : (
              <NavItem href="/matches" text="MATCHES" active={location.pathname === '/matches'} onClick={handleNavClick} />
            )}

            <NavItem href="/history" text="HISTORY" active={location.pathname === '/history'} onClick={handleNavClick} />
            {location.pathname === '/' ? (
              <NavItem href="#quiz" text="QUIZ" active={currentHash === '#quiz'} onClick={handleNavClick} />
            ) : (
              <NavItem href="/quiz" text="QUIZ" active={location.pathname === '/quiz'} onClick={handleNavClick} />
            )}
          </ul>
        </nav>

        <div className="hidden md:flex items-center border-b pb-2 furia-btn">
          <img
            src="https://www.hltv.org/img/static/gfx/ranking/hltv_day.png"
            alt=""
            className="w-4 h-4 mr-2"
          />
          <span className="font-semibold text-sm">
            <a href="https://www.hltv.org/team/8297/furia" target="_blank" rel="noopener noreferrer">World ranking</a>
          </span>
          <a
            href="https://www.hltv.org/team/8297/furia"
            className="text-blue-300 text-sm ml-2 hover:underline"
            target="_blank" rel="noopener noreferrer">
            #16
          </a>
        </div>

        {/* <button >CHAT WITH PANTERABOT</button> */}

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-furia-charcoal border-t border-furia-purple/20">
          <ul className="flex flex-col py-4">
            <NavItem href="/" text="HOME" active={location.pathname === '/'} onClick={handleNavClick} />
            {location.pathname === '/' ? (
              <NavItem href="#team" text="TEAM" active={currentHash === '#team'} onClick={handleNavClick} />
            ) : (
              <NavItem href="/team" text="TEAM" active={location.pathname === '/team'} onClick={handleNavClick} />
            )}

            <NavItem href="/matches" text="MATCHES" active={location.pathname === '/matches'} onClick={handleNavClick} />
            <NavItem href="/history" text="HISTORY" active={location.pathname === '/history'} onClick={handleNavClick} />
            {location.pathname === '/' ? (
              <NavItem href="#quiz" text="QUIZ" active={currentHash === '#quiz'} onClick={handleNavClick} />
            ) : (
              <NavItem href="/quiz" text="QUIZ" active={location.pathname === '/quiz'} onClick={handleNavClick} />
            )}
            <li className="px-4 pt-4">
              <button className="w-full furia-btn">CHAT WITH PANTERABOT</button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navigation;
