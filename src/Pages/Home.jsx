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
import { useEffect } from "react";
const faqs = [
  {
    question: "What is DSA Tracker?",
    answer: "It's a platform to help you master Data Structures and Algorithms ,the other core subjects as well as the projects development through structured learning paths."
  },
  {
    question: "Is the platform free to use?",
    answer: "Yes, DSA Tracker is completely free for learners!"
  },
  {
    question: "How do I start tracking my progress?",
    answer: "Simply sign up, choose a track, and mark topics as completed."
  },
  {
    question: "Do you offer one to one mentorship?",
    answer: "We currently don’t offer 1:1 mentorship. However, we do conduct group mentorship sessions where you can ask questions, share your concerns, and get guidance from mentors and peers in a collaborative environment."
  },
];

const mentors = [
  // {
  //   name: "Swapnil Badave",
  //   title: "Specialist@Codeforces | 3*CodeChef",
  //   img: "https://fra.cloud.appwrite.io/v1/storage/buckets/676590df00321eb55c08/files/6840711600071f734e11/view?project=67658dc4000374a2bd2a&mode=admin",
  //   linkedIn: "https://in.linkedin.com/in/swapnilbadave922003",
  // },
  {
    name: "Prof. Asmita Patil",
    title: "Professor At VIT",
    // img: "https://fra.cloud.appwrite.io/v1/storage/buckets/676590df00321eb55c08/files/6870fd47002d853e6ad1/view?project=67658dc4000374a2bd2a&mode=admin",
    // linkedIn: "https://www.linkedin.com/in/rahul-kamble-a41691251",
  },
  // {
  //   name: "Shreyas Ghanekar",
  //   title: "FullStack Developer | Ex Intern @Borgave Groups",
  //   img: "https://fra.cloud.appwrite.io/v1/storage/buckets/676590df00321eb55c08/files/68407109003ab40f381e/view?project=67658dc4000374a2bd2a&mode=admin",
  //   linkedIn: "https://in.linkedin.com/in/shreyash-ghanekar",
  // }
];

const Home = () => {
  const [openIndex, setOpenIndex] = useState(null);
  // const [mentors , setMentors] = useState([]);
  const role = localStorage.getItem("role");
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || "");


  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`https://dsa-tracker-backend-oo1y.onrender.com/mentor/get-all-mentors`)
  //     .then((response) => {
  //       setMentors(response.data);
  //     })
  //     .catch((error) => console.error("Error fetching blog:", error));
  // }, []);

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
                "Track Your Preparation, Learn, and Ace Placement!",
                2000,
                "The Ultimate Placement Prep Tool.",
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
      
      {/* Mentors Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
  <Container>
    <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
      Meet Our Mentors
    </h2>

    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
        {mentors.map((mentor, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 text-center w-72 mx-auto"
          >
            <img
              src={mentor.img}
              alt={mentor.name}
              className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              {mentor.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{mentor.title}</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              <a
                href={mentor.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                LinkedIn
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
        {/* {
          role === 'Admin' &&
          <button onClick={openAddModal} className="self-end sm:self-auto p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition">
            <Plus className="text-white w-6 h-6" />
          </button>
        } */}
  </Container>
</section>


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

      
      
    </>
  );
};

export default Home;
