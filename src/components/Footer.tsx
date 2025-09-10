import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-200 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <img
              src="/images/smart_tonsurium-removebg-preview.png"
              className="md:w-24 md:h-24"
              alt=""
            />
            <h3 className="text-primary font-bold text-xl mb-4">Smart TS Studio</h3>
            <p className="text-sm">
              Experience luxury hair, nail, and skin care at our modern salon.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services" className="hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-primary">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-primary">
                  Offers
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <p className="text-sm mb-2">📍 123 Beauty Street, City</p>
            <p className="text-sm mb-2">📞 (555) 123-4567</p>
            <p className="text-sm mb-2">✉️ info@beautyphantom.com</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-sm mb-3">Join our list to get exclusive deals.</p>
            <form
              onSubmit={e => {
                e.preventDefault();
                alert('Thanks for subscribing!');
              }}
              className="flex"
            >
              <input
                type="email"
                required
                placeholder="Your email"
                className="w-full px-3 py-2 rounded-l-md text-black"
              />
              <button className="bg-primary text-black px-4 py-2 rounded-r-md font-semibold">
                Subscribe
              </button>
            </form>

            <h4 className="text-white font-semibold mt-6 mb-3">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition text-xl"
              >
                {FaInstagram({}) as any}
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition text-xl"
              >
                {FaFacebookF({}) as any}
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition text-xl"
              >
                {FaTwitter({}) as any}
              </a>
              <a
                href="https://www.tiktok.com/@smart_ts_studio"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition text-xl"
              >
                {FaTiktok({}) as any}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Smart TS Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
