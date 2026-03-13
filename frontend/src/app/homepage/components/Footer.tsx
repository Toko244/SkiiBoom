'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface FooterProps {
  currentLanguage: string;
}

const Footer = ({ currentLanguage }: FooterProps) => {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const content = {
    en: {
      about: "About",
      aboutText: "Ski Boom Gudauri is your premier destination for ski equipment rental and professional lessons in the heart of the Caucasus Mountains.",
      quickLinks: "Quick Links",
      contact: "Contact",
      followUs: "Follow Us",
      address: "Gudauri Ski Resort, Georgia",
      phone: "+995 555 123 456",
      email: "info@skiboomgudauri.ge",
      rights: "All rights reserved.",
      links: [
        { label: "Home", href: "/homepage" },
        { label: "Equipment Rental", href: "/equipment-rental" },
        { label: "Ski Lessons", href: "/ski-lessons" },
        { label: "About Us", href: "/about-us" },
        { label: "Gallery", href: "/gallery" },
        { label: "Book Online", href: "/book-online" }
      ]
    },
    ka: {
      about: "ჩვენს შესახებ",
      aboutText: "Ski Boom Gudauri არის თქვენი პრემიერ დანიშნულების ადგილი სათხილამურო აღჭურვილობის გაქირავებისა და პროფესიონალური გაკვეთილებისთვის კავკასიონის მთების გულში.",
      quickLinks: "სწრაფი ბმულები",
      contact: "კონტაქტი",
      followUs: "გამოგვყევით",
      address: "გუდაურის სათხილამურო კურორტი, საქართველო",
      phone: "+995 555 123 456",
      email: "info@skiboomgudauri.ge",
      rights: "ყველა უფლება დაცულია.",
      links: [
        { label: "მთავარი", href: "/homepage" },
        { label: "აღჭურვილობის გაქირავება", href: "/equipment-rental" },
        { label: "სათხილამურო გაკვეთილები", href: "/ski-lessons" },
        { label: "ჩვენს შესახებ", href: "/about-us" },
        { label: "გალერეა", href: "/gallery" },
        { label: "ონლაინ დაჯავშნა", href: "/book-online" }
      ]
    },
    ru: {
      about: "О нас",
      aboutText: "Ski Boom Gudauri - ваше главное место для аренды лыжного снаряжения и профессиональных уроков в самом сердце Кавказских гор.",
      quickLinks: "Быстрые ссылки",
      contact: "Контакты",
      followUs: "Следите за нами",
      address: "Горнолыжный курорт Гудаури, Грузия",
      phone: "+995 555 123 456",
      email: "info@skiboomgudauri.ge",
      rights: "Все права защищены.",
      links: [
        { label: "Главная", href: "/homepage" },
        { label: "Аренда снаряжения", href: "/equipment-rental" },
        { label: "Уроки катания", href: "/ski-lessons" },
        { label: "О нас", href: "/about-us" },
        { label: "Галерея", href: "/gallery" },
        { label: "Онлайн бронирование", href: "/book-online" }
      ]
    }
  };

  const text = content[currentLanguage as keyof typeof content] || content.en;

  const socialLinks = [
    { icon: "facebook", href: "#", label: "Facebook" },
    { icon: "instagram", href: "#", label: "Instagram" },
    { icon: "twitter", href: "#", label: "Twitter" }
  ];

  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="font-outfit font-bold text-xl mb-4">{text.about}</h3>
            <p className="font-inter text-sm text-white/80 leading-relaxed">
              {text.aboutText}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-outfit font-bold text-xl mb-4">{text.quickLinks}</h3>
            <ul className="space-y-2">
              {text.links.map((link, index) => (
                <li key={index}>
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

          {/* Contact Info */}
          <div>
            <h3 className="font-outfit font-bold text-xl mb-4">{text.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Icon name="MapPinIcon" size={20} variant="outline" className="mr-2 mt-0.5 flex-shrink-0" />
                <span className="font-inter text-sm text-white/80">{text.address}</span>
              </li>
              <li className="flex items-center">
                <Icon name="PhoneIcon" size={20} variant="outline" className="mr-2 flex-shrink-0" />
                <a href={`tel:${text.phone}`} className="font-inter text-sm text-white/80 hover:text-primary transition-colors duration-300">
                  {text.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Icon name="EnvelopeIcon" size={20} variant="outline" className="mr-2 flex-shrink-0" />
                <a href={`mailto:${text.email}`} className="font-inter text-sm text-white/80 hover:text-primary transition-colors duration-300">
                  {text.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-outfit font-bold text-xl mb-4">{text.followUs}</h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Icon name="ShareIcon" size={20} variant="outline" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-inter text-sm text-white/60 text-center md:text-left">
              {`© ${currentYear}`} Ski Boom Gudauri. {text.rights}
            </p>
            <div className="flex items-center gap-2">
              <Icon name="GlobeAltIcon" size={20} variant="outline" className="text-primary" />
              <span className="font-inter text-sm text-white/60">
                Gudauri, Georgia
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;