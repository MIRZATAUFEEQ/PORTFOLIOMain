import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TrueFocus from '../../../animation/TrueFocus/TrueFocus';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let isMounted = true; // Prevents memory leaks on unmount
    const getMyProjects = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/project/getAll`, {
          withCredentials: true,
        });

        if (isMounted) {
          setProjects(response.data.project || []);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    getMyProjects();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, []);

  return (
    <div>
      <div className="relative mb-12">
        <h1
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
          mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          <TrueFocus
            sentence="MY PORTFOLIO"
            manualMode={false}
            blurAmount={5}
            borderColor="#00D8FF"
            animationDuration={2}
            pauseBetweenAnimations={1}
          />
        </h1>
        <h1
          className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          <TrueFocus
            sentence="MY WORK"
            manualMode={false}
            blurAmount={5}
            borderColor="#00D8FF"
            animationDuration={2}
            pauseBetweenAnimations={1}
          />
          {/* MY <span className="text-tubeLight-effect font-extrabold">WORK</span> */}
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(viewAll ? projects : projects.slice(0, 9)).map((element) => (
          <Link to={`/project/${element._id}`} key={element._id}>
            <Card className="overflow-hidden rounded-lg shadow-md">
              <img
                className="w-full h-48 object-cover" // Fixed image rendering
                src={element.projectBanner?.url || "/placeholder.jpg"}
                alt={element.title}
                loading="lazy"
              />
            </Card>
          </Link>
        ))}
      </div>

      {/* Show More / Show Less Button */}
      {projects.length > 9 && (
        <div className="w-full text-center my-9">
          <Button className="w-52" onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
