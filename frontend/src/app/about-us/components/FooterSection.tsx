'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function FooterSection() {
  const [currentYear, setCurrentYear] = useState('2026');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const quickLinks = [
    { label: 'Home', href: '/homepage' },
    { label: 'Equipment Rental', href: '/equipment-rental' },
    { label: 'Ski Lessons', href: '/ski-lessons' },
    { label: 'Gallery', href: '/gallery' },
  ];

  const contactInfo = [
    { icon: 'MapPinIcon', text: 'Gudauri Ski Resort, Georgia' },
    { icon: 'PhoneIcon', text: '+995 555 123 456' },
    { icon: 'EnvelopeIcon', text: 'info@skiboomgudauri.ge' },
  ];

  const socialLinks = [
    { icon: 'GlobeAltIcon', label: 'Facebook', href: '#' },
    { icon: 'CameraIcon', label: 'Instagram', href: '#' },
    { icon: 'ChatBubbleLeftRightIcon', label: 'WhatsApp', href: '#' },
  ];

  return (
    <footer className="bg-trustBuilder text-white py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative w-10 h-10">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    d="M24 4L8 16L12 32L24 44L36 32L40 16L24 4Z"
                    fill="#FFBF00"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M24 12L16 20L18 28L24 36L30 28L32 20L24 12Z"
                    fill="#76B3BC"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                  <circle cx="24" cy="24" r="4" fill="#FFFFFF" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-outfit font-bold text-lg leading-tight">SkiBoom</span>
                <span className="font-outfit font-normal text-sm leading-tight">Gudauri</span>
              </div>
            </div>
            <p className="font-inter text-sm text-white/80 leading-relaxed">
              Your trusted partner for premium ski equipment and professional lessons in the heart of the Caucasus Mountains.
            </p>
          </div>

          <div>
            <h3 className="font-outfit font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm text-white/80 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-outfit font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Icon name={info.icon as any} size={18} variant="outline" className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-inter text-sm text-white/80">{info.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-outfit font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <Icon name={social.icon as any} size={20} variant="outline" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p suppressHydrationWarning>
            © {currentYear} Ski Boom Gudauri. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}