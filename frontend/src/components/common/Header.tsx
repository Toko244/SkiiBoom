'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';


interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Home', href: '/homepage', icon: 'HomeIcon' },
    { label: 'Equipment Rental', href: '/equipment-rental', icon: 'CubeIcon' },
    { label: 'Ski Lessons', href: '/ski-lessons', icon: 'AcademicCapIcon' },
    { label: 'About Us', href: '/about-us', icon: 'InformationCircleIcon' },
    { label: 'Gallery', href: '/gallery', icon: 'PhotoIcon' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-card shadow-md ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}
          <Link href="/homepage" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  d="M24 4L8 16L12 32L24 44L36 32L40 16L24 4Z"
                  fill="#FFBF00"
                  stroke="#1A1A1A"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M24 12L16 20L18 28L24 36L30 28L32 20L24 12Z"
                  fill="#76B3BC"
                  stroke="#1A1A1A"
                  strokeWidth="1.5"
                />
                <circle cx="24" cy="24" r="4" fill="#FFFFFF" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-outfit font-bold text-lg lg:text-xl text-foreground leading-tight">
                SkiBoom
              </span>
              <span className="font-outfit font-normal text-xs lg:text-sm text-muted-foreground leading-tight">
                Gudauri
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-inter font-medium text-sm"
              >
                <Icon name={item.icon as any} size={18} variant="outline" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/book-online"
              className="px-6 py-2.5 bg-conversionAccent text-white rounded-md font-outfit font-semibold text-sm hover:bg-ctaHover transition-all duration-300 shadow-subtle hover:shadow-elevated transform hover:-translate-y-0.5"
            >
              Book Online
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            <Icon
              name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'}
              size={24}
              variant="outline"
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-md text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-inter font-medium"
              >
                <Icon name={item.icon as any} size={20} variant="outline" />
                <span>{item.label}</span>
              </Link>
            ))}
            <Link
              href="/book-online"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center w-full px-4 py-3 mt-4 bg-conversionAccent text-white rounded-md font-outfit font-semibold hover:bg-ctaHover transition-all duration-300"
            >
              Book Online
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;