import React from "react";
import { AlertTriangle } from "lucide-react";

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-gray-50">
      <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4 animate-bounce" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Courses Coming Soon!</h1>
      <p className="text-gray-600 text-lg max-w-md">
        We’re working hard behind the scenes to bring you amazing learning content. Stay tuned – something great is on the way!
      </p>
    </div>
  );
};

export default ComingSoon;
