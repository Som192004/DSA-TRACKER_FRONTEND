// import React from 'react'
// import { Link } from 'react-router-dom'
// import {Logo} from '../index.js'

// function Footer() {
//   return (
//     <section className="relative overflow-hidden py-10 border border-t-2 border-t-black dark:bg-slate-600">
//             <div className="relative z-10 mx-auto max-w-7xl px-4">
//                 <div className="-m-6 flex flex-wrap">
//                     <div className="w-full p-6 md:w-1/2 lg:w-5/12">
//                         <div className="flex h-full flex-col justify-between">
//                             <div className="mb-4 inline-flex items-center">
//                                 <Logo />
//                             </div>
//                             <div>
//                                 <p className="text-sm text-gray-600 dark:text-white">
//                                     &copy; Copyright 2025. All Rights Reserved by DSA TRACKER.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="w-full p-6 md:w-1/2 lg:w-2/12">
//                         <div className="h-full">
//                             <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
//                                 Company
//                             </h3>
//                             <ul>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Features
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Pricing
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Affiliate Program
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Press Kit
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div className="w-full p-6 md:w-1/2 lg:w-2/12">
//                         <div className="h-full">
//                             <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
//                                 Support
//                             </h3>
//                             <ul>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Account
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Help
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Contact Us
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Customer Support
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div className="w-full p-6 md:w-1/2 lg:w-3/12">
//                         <div className="h-full">
//                             <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
//                                 Legals
//                             </h3>
//                             <ul>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Terms &amp; Conditions
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Privacy Policy
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Licensing
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//   )
// }

// export default Footer;
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../index.js';

function Footer() {
  return (
    <footer className="relative overflow-hidden py-10 bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap -mx-6">
          
          {/* Logo & Copyright */}
          <div className="w-full md:w-1/2 lg:w-5/12 px-6 flex flex-col justify-between">
            <div className="mb-4 flex items-center">
              <Logo className="h-10 w-auto" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              &copy; 2025 DSA TRACKER. All Rights Reserved.
            </p>
          </div>

          {/* Navigation Sections */}
          {[
            {
              title: "Company",
              links: ["Features", "Pricing", "Affiliate Program", "Press Kit"]
            },
            {
              title: "Support",
              links: ["Account", "Help", "Contact Us", "Customer Support"]
            },
            {
              title: "Legals",
              links: ["Terms & Conditions", "Privacy Policy", "Licensing"]
            }
          ].map((section, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-2/12 px-6">
              <h3 className="mb-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                {section.title}
              </h3>
              <ul>
                {section.links.map((link, idx) => (
                  <li key={idx} className="mb-3">
                    <Link 
                      to="/" 
                      className="text-base font-medium text-gray-800 dark:text-gray-300 transition hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>
    </footer>
  );
}

export default Footer;
