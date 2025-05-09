// // import { Container } from "../components";
// // import { TypeAnimation } from "react-type-animation";
// // import { motion } from "framer-motion";

// // const Home = () => {
// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 dark:from-gray-900 dark:to-black relative overflow-hidden">
// //       {/* Background Animation */}
// //       <motion.div 
// //         initial={{ opacity: 0, scale: 0.9 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         transition={{ duration: 1 }}
// //         className="absolute inset-0 bg-grid-white/[0.2] dark:bg-grid-black/[0.2] pointer-events-none"
// //       />

// //       <Container>
// //         <div className="text-center px-6">
// //           {/* Animated Text */}
// //           <TypeAnimation
// //             sequence={[
// //               "Track, Learn, and Ace DSA!",
// //               2000, 
// //               "The Ultimate DSA Prep Tool.",
// //               2000,
// //               "DSA TRACKER",
// //               3000
// //             ]}
// //             wrapper="span"
// //             speed={50}
// //             repeat={Infinity}
// //             className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg"
// //           />

// //         </div>
// //       </Container>
// //     </div>
// //   );
// // };

// // export default Home;

// import { Container } from "../components";
// import { TypeAnimation } from "react-type-animation";
// import { motion } from "framer-motion";

// const Home = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 dark:from-gray-900 dark:to-black relative overflow-hidden">
//       {/* Background Animation */}
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1 }}
//         className="absolute inset-0 bg-grid-white/[0.2] dark:bg-grid-black/[0.2] pointer-events-none"
//       />

//       <Container>
//         <div className="text-center px-4 sm:px-6">
//           {/* Animated Text */}
//           <TypeAnimation
//             sequence={[
//               "Track, Learn, and Ace DSA!",
//               2000, 
//               "The Ultimate DSA Prep Tool.",
//               2000,
//               "DSA TRACKER",
//               3000
//             ]}
//             wrapper="span"
//             speed={50}
//             repeat={Infinity}
//             className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg"
//           />
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default Home;


import { Container } from "../components";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "What is DSA Tracker?",
    answer: "It's a platform to help you master Data Structures and Algorithms through structured learning paths."
  },
  {
    question: "Is the platform free to use?",
    answer: "Yes, DSA Tracker is completely free for learners!"
  },
  {
    question: "How do I start tracking my progress?",
    answer: "Simply sign up, choose a track, and mark topics as completed."
  }
];

const mentors = [
  {
    name: "Soham Patil",
    title: "Software Engineer @ Google (Aspiring)",
    img: "https://via.placeholder.com/100"
  },
  {
    name: "Aditi Sharma",
    title: "DSA Mentor | Ex-Flipkart",
    img: "https://via.placeholder.com/100"
  },
  {
    name: "Rahul Mehra",
    title: "Problem Solving Coach",
    img: "https://via.placeholder.com/100"
  }
];

const Home = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 dark:from-gray-900 dark:to-black relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-grid-white/[0.2] dark:bg-grid-black/[0.2] pointer-events-none"
        />

        <Container>
          <div className="text-center px-4 sm:px-6">
            <TypeAnimation
              sequence={[
                "Track, Learn, and Ace DSA!",
                2000,
                "The Ultimate DSA Prep Tool.",
                2000,
                "DSA TRACKER",
                3000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg"
            />
          </div>
        </Container>
      </div>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-sm">
                <button onClick={() => toggleFAQ(index)} className="w-full text-left font-medium text-lg text-blue-600 dark:text-blue-400">
                  {faq.question}
                </button>
                {openIndex === index && (
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mentors Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">Meet Our Mentors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {mentors.map((mentor, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 text-center">
                <img
                  src={mentor.img}
                  alt={mentor.name}
                  className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{mentor.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{mentor.title}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default Home;
