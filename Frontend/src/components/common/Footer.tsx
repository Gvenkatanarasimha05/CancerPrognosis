import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Cancer Prognosis</span>
            </div>
            <p className="text-gray-300 max-w-xs">
              Revolutionizing healthcare through AI-powered predictions and seamless 
              doctor-patient connections. Your health, our priority.
            </p>
          </div>

          {/* Team Members */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Developed By</h3>
            <ul className="text-gray-300 space-y-1">
              <li>BODDU PRAVEESH (2203031240180)</li>
              <li>AKULA AJAY KUMAR (2203031240034)</li>
              <li>G. VENKATA NARASIMHA (2203031240369)</li>
              <li>MACHINENI CHARAN TEJA (2203031240747)</li>
            </ul>
          </div>

          {/* Guide */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Guided By</h3>
            <p className="text-gray-300">
              BHAVESH ATULBHAI VAGHELA <br />
              AI & AIDS Department <br />
              PIET, Parul University
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Cancer Prognosis. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
