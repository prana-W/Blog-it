import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <h2 className="text-lg font-bold">Stay Connected</h2>
          <p className="text-sm text-gray-400">Follow us on social media for updates</p>
        </div>
        <div className="flex justify-center gap-6 mb-6">
          <Link to="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-facebook-f"></i> Facebook
          </Link>
          <Link to="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-twitter"></i> Twitter
          </Link>
          <Link to="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-instagram"></i> Instagram
          </Link>
        </div>
        <div className="text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
