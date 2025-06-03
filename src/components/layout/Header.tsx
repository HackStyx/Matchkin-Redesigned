'use client';

import { useState, useEffect } from 'react';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from 'next/link';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAIMatching = () => {
    const section = document.getElementById('ai-matching');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else if (window.location.pathname !== '/') {
      // If not on home page, navigate to home page and then scroll
      window.location.href = '/#ai-matching';
    }
  };
  
  const navItems = [
    {
      name: "For Clients",
      link: "/onboarding/client",
    },
    {
      name: "For Consultants",
      link: "/onboarding/consultant",
    },
    {
      name: "How It Works",
      link: "#ai-matching",
      onClick: scrollToAIMatching,
    },
  ];

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <NavbarButton href="/onboarding" variant="primary">Join Us</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                isScrolled={isScrolled}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className="backdrop-blur-md bg-surface/80 dark:bg-surface/60"
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="relative nav-text hover:text-amber-500 transition-colors w-full py-3 border-b border-border"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4 mt-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                href="/onboarding"
                variant="primary"
                className="w-full"
              >
                Join Us
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
} 