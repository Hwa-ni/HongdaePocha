// src/screens/Buttered/HongdaePocha_Photoline.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const images = [
  process.env.PUBLIC_URL +
    "/assets/HongdaePocha/HongdaePocha_store_image/0I0A8967.jpg",
  process.env.PUBLIC_URL +
    "/assets/HongdaePocha/HongdaePocha_store_image/0I0A8975.jpg",
  process.env.PUBLIC_URL +
    "/assets/HongdaePocha/HongdaePocha_store_image/0I0A8986.jpg",
];

const Photoline: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container id="photoline-container">
      <ImageOverlayContainer>
        <Slider index={currentIndex} total={images.length}>
          {images.map((img, idx) => (
            <StyledImage key={idx} src={img} alt={`Slide ${idx + 1}`} />
          ))}
        </Slider>
        <Overlay />
        <OverlayText>
          Welcome to
          <br />
          Hongdae Pocha
        </OverlayText>
        <DotsWrapper>
          {images.map((_, idx) => (
            <Dot key={idx} active={currentIndex === idx} />
          ))}
        </DotsWrapper>
      </ImageOverlayContainer>
    </Container>
  );
};

export default Photoline;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 56.25%; /* 16:9 비율 유지를 위한 패딩 (9 / 16 = 0.5625) */
  position: relative;
  overflow: hidden;
`;

const ImageOverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Slider = styled.div<{ index: number; total: number }>`
  display: flex;
  height: 100%;
  width: ${({ total }) => total * 100}%;
  transform: translateX(-${({ index, total }) => index * (100 / total)}%);
  transition: transform 0.5s ease-in-out;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  object-fit: cover;
  object-position: center;
  display: block;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  pointer-events: none;
  z-index: 1;
`;

const OverlayText = styled.div`
  position: absolute;
  top: 15vh;
  left: 5vw;
  color: white;
  font-size: 80px;
  font-weight: bold;
  z-index: 2;
  text-align: left;
  white-space: pre-wrap;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 30px;
    top: 10vh;
    left: 5vw;
  }
`;

const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
`;

const Dot = styled.span<{ active: boolean }>`
  width: ${({ active }) => (active ? "36px" : "12px")};
  height: 12px;
  border-radius: 999px;
  background-color: white;
  margin: 0 5px;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  transition: all 0.3s ease;
`;