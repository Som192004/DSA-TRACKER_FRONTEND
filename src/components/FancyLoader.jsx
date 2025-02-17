import { useState, useEffect } from "react";

const facts = [
  "Did you know? The first known algorithm was written by Ada Lovelace in the 1840s!",
  "Did you know? QuickSort is one of the fastest sorting algorithms in practice.",
  "Did you know? Dynamic Programming was invented by Richard Bellman in the 1950s.",
  "Did you know? Binary Search can find an element in a sorted array in O(log n) time!",
];

const EduLoader = () => {
  const [textColor, setTextColor] = useState("#000000");
  const [fact, setFact] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateColor = (e) => {
      setTextColor(e.matches ? "#ffffff" : "#000000");
    };

    updateColor(mediaQuery);
    mediaQuery.addEventListener("change", updateColor);

    return () => mediaQuery.removeEventListener("change", updateColor);
  }, []);

  useEffect(() => {
    // Show a random fact on load
    setFact(facts[Math.floor(Math.random() * facts.length)]);

    // Change fact every 3 seconds
    const interval = setInterval(() => {
      setFact(facts[Math.floor(Math.random() * facts.length)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="text-center">
        <p className="text-2xl md:text-3xl font-bold mb-4" style={{ color: textColor }}>
          {fact}
        </p>
        <div className="relative w-64 h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 animate-loading-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default EduLoader;
