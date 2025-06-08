import { useEffect, useState } from "react";
import { Container } from "../components/index.js";
import { DSACard } from "../components/index.js";
import axios from "axios";
import { useSelector } from "react-redux";
import UnAuthorized from "./UnAuthorized";
import { FancyLoader } from "../components/index.js";

const VideosPage = () => {
  const courses = [
    { id: 0, name: "DBMS", number: 0 },
    { id: 1, name: "Operating System", number: 0 },
    { id: 2, name: "Compter Networks", number: 0 },
  ];

  const [data, setData] = useState(courses);
  const accessToken = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post("https://dsa-tracker-backend-oo1y.onrender.com/videos/video-numbers", {
        courses,
        Authorization: accessToken
      })
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.response?.data);
      });
  }, []);

  if (role === "Admin") {
    return <UnAuthorized />;
  }

  if (loading) {
    return <FancyLoader />;
  }

  return (
    <div className="w-full py-8 text-center dark:bg-black">
      <Container>
        {/* 👇 Responsive Card Grid */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {data?.map((dsaTopic) => (
            <div
              key={dsaTopic.id}
              className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 hover:scale-110 transition duration-300 cursor-pointer"
            >
              <DSACard
                name={dsaTopic.name}
                number={dsaTopic.number}
                msg={"Total Videos"}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default VideosPage;
