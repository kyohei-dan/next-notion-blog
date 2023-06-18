'use client'
import React from "react";
import { motion } from "framer-motion";

interface Props {
  name?: string | undefined;
  description?: string | undefined;
  imageUrl?: string | undefined;
  bgColor?: string | undefined;
  url?: string | undefined;
  dark?: boolean | undefined;
}

const ProjectPreview: React.FC<Props> = ({
  name = "Block name",
  description = "This is an amazing block",
  imageUrl = "/images/project-1.png",
  bgColor = "#e4e4e7",
  url = "",
  dark = false,
}) => {
  return (
    <motion.li
      className={`c-projectpreview ${dark ? "dark" : ""}`}
      style={{ background: `${bgColor}` }}
      initial="initial"
      whileInView="animate"
      variants={PreviewAnimation}
    >
      <a href={url} target="_blank">
        <div className="inner" style={{ backgroundImage: `url('${imageUrl}')` }}>
          <h2>{name}</h2>
          <p>{description}</p>
          <span className="arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 700 700" className="w-6 h-6"><path d="M616.66 46.668v167.02c0 18.41-14.922 33.332-33.332 33.332s-33.332-14.922-33.332-33.332v-86.551l-409.76 409.77c-6.508 6.504-15.043 9.758-23.57 9.758-8.527 0-17.062-3.254-23.574-9.766-13.02-13.016-13.02-34.125 0-47.14l409.76-409.76-86.543.003c-18.41 0-33.332-14.922-33.332-33.332s14.922-33.332 33.332-33.332h167.02c18.41 0 33.332 14.922 33.332 33.332z"></path></svg>
          </span>
        </div>
      </a>
    </motion.li>
  );
};

const PreviewAnimation = {
  initial: {
    y: 30,
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 0.8,
    },
  },
};

export default ProjectPreview;
