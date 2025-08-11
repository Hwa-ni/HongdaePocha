import React, { useEffect } from "react";
import styled from "styled-components";

const Buttered_insta: React.FC = () => {
  const postUrls = [
    "https://www.instagram.com/p/DMM6SOxThD3/",
    "https://www.instagram.com/p/DMMkaIPvvBD/",
    "https://www.instagram.com/p/DMEMySFPSQ9/",
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <InstagramContainer>
      {postUrls.map((url, index) => (
        <InstagramCard key={index}>
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={url}
            data-instgrm-version="14"
            style={{ 
              width: "100%", 
              height: "100%",
              margin: 0,
              border: 0,
              borderRadius: "15px",
              boxShadow: "none"
            }}
          ></blockquote>
        </InstagramCard>
      ))}
    </InstagramContainer>
  );
};

export default Buttered_insta;

const InstagramContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  justify-items: center;
`;

const InstagramCard = styled.div`
  position: relative;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  width: 100%;
  max-width: 280px;
  height: 350px; /* Instagram 게시글에 적절한 높이 설정 */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  /* Instagram embed 스타일 오버라이드 */
  .instagram-media {
    background: white !important;
    border: none !important;
    border-radius: 15px !important;
    box-shadow: none !important;
    margin: 0 !important;
    max-width: none !important;
    min-width: auto !important;
    width: 100% !important;
    height: 100% !important;
  }

  /* Instagram embed iframe 스타일 조정 */
  iframe {
    border-radius: 15px !important;
    width: 100% !important;
    height: 100% !important;
  }
`;