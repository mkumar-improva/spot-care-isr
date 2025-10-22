"use client";

import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import Loading from "@/components/ui/Loader/Loading";
import { Config } from "constants/config";

const BlogPage: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [height, setHeight] = useState(0);

  return (
    <div className="nc-BlogPage relative h-screen scrollbar-hide">
      <Helmet>
        <title>Spot.Care | Blog</title>
      </Helmet>

      {/* Conditionally render iframe or loading */}
      <iframe
        ref={iframeRef}
        src={Config.KEY.BLOG_URL} // iframe content URL
        // src="http://localhost:3000" // iframe content URL
        className="w-full border-none mb-4 z-10 h-full scrollbar-hide"
        // scrolling="no" // Disable scrolling
        title="Spot.Care Blog"
      />

      {height === 0 && (
        <div className="absolute w-full top-1/4 flex justify-center align-middle -z-10">
          <div className="my-auto">
            <Loading />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
