import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TextPressure from '../../../animation/TextPressure/TextPressure';
import TiltedCard from '../../../animation/TiltedCard/TiltedCard';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const About = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`${backendUrl}/api/v1/auth/portfolioProfile`, { withCredentials: true });
      setUser(response.data.user);
    };
    getUser();
  }, []);

  return (
    <motion.div
      className="w-full flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 3, ease: "easeOut" }}
    >
      <div className="relative">
        <h1
          className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
          lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{ background: "hsl(222.2 84% 4.9%)" }}
        >
          <div style={{ position: 'relative', height: '100px' }}>
            <TextPressure
              text="ABOUT ME"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#ffffff"
              strokeColor="#ff0000"
              minFontSize={36}
            />
          </div>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="text-center">
        <p className="uppercase text-xl text-slate-400">Allow me to introduce myself.</p>
      </div>
      <div>
        <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
          <div className="flex justify-center items-center">
            <TiltedCard
              imageSrc={user.avatar?.url}
              altText="Taufee Mirza - GNX Album Cover"
              captionText="Taufeeq Mirza"
              containerHeight="300px"
              containerWidth="300px"
              imageHeight="300px"
              imageWidth="300px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p className="tilted-card-demo-text rounded-2xl px-5 py-2 mt-5 ml-5 bg-[#808080]">
                  Taufeeq Mirza
                </p>
              }
            />
          </div>
          <motion.div
            className="flex justify-center flex-col tracking-[1px] text-xl gap-5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
            <p>
              My name is Mirza. I have graduate in Bachlore Of Computer Application from Dr ram manohar lohiya avadh university, ayodhya in 2024. I work as a web developer and freelancer. My hobbies include listening music, playing video games, and some time cooking.
            </p>
            <p>
              I have interests learning new technology. I excel in meeting deadlines for my work.
            </p>
          </motion.div>
        </div>
        <motion.p
          className="tracking-[1px] text-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3, ease: "easeOut" }}
        >
          My dedication and perseverance in timely delivery of work are integral to me. I maintain the courage to face any challenges for extended periods.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default About;
