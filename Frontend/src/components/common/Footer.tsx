import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 text-center">
      <p className="text-gray-400 text-sm">
        © {new Date().getFullYear()} Cancer Prognosis. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
