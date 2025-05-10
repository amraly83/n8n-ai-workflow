import Link from 'next/link';
import { BotMessageSquareIcon } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerNavs = [
    {
      label: 'Product',
      items: [
        { href: '#features', name: 'Features' },
        { href: '#pricing', name: 'Pricing' },
        { href: '/faq', name: 'FAQ' }, // Example, FAQ page not yet planned
      ],
    },
    {
      label: 'Company',
      items: [
        { href: '/about', name: 'About Us' }, // Example
        { href: '/blog', name: 'Blog' },     // Example
        { href: '#contact', name: 'Contact Us' },
      ],
    },
    {
      label: 'Legal',
      items: [
        { href: '/terms', name: 'Terms of Service' }, // Example
        { href: '/privacy', name: 'Privacy Policy' }, // Example
      ],
    },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <BotMessageSquareIcon className="h-8 w-8 text-sky-400" />
              <span className="text-2xl font-bold text-white">
                AI n8n Flow
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-slate-400">
              Automate smarter, not harder. Generate n8n workflows with the power of AI.
            </p>
            {/* Social media icons can go here */}
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            {footerNavs.map((nav) => (
              <div key={nav.label}>
                <p className="font-semibold text-white">{nav.label}</p>
                <ul className="mt-4 space-y-2">
                  {nav.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-slate-400 hover:text-sky-400 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-center sm:text-left">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} AI n8n Flow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
