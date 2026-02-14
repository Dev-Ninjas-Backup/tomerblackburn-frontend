'use client'

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { useSiteSettings } from '@/hooks/useSiteSettings';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { data: settings } = useSiteSettings();

  return (
    <footer className="bg-[#1a2744] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="text-sm text-gray-300 mb-4 md:mb-0">
            © {currentYear} {settings?.siteTitle || 'BBurn Builders LLC'}. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link
              href="/privacy-policy"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4">
            {settings?.facebookUrl && (
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
                aria-label="Visit our Facebook page"
              >
                <Facebook size={20} />
              </a>
            )}
            {settings?.instagramUrl && (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
                aria-label="Visit our Instagram page"
              >
                <Instagram size={20} />
              </a>
            )}
            {settings?.twitterUrl && (
              <a
                href={settings.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
                aria-label="Visit our Twitter page"
              >
                <Twitter size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
