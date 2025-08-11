import React, { useState, useEffect } from "react";
import styled from "styled-components";

const images = [
  process.env.PUBLIC_URL +
    "/assets/Buttered/Buttered_store_image/Store_image2.jpg",
  process.env.PUBLIC_URL +
    "/assets/Buttered/Buttered_store_image/Store_image7.jpg",
  process.env.PUBLIC_URL +
    "/assets/Buttered/Buttered_store_image/Store_image8.jpg",
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
    <Container>
      <ImageWrapper>
        <Slider index={currentIndex} total={images.length}>
          {images.map((img, idx) => (
            <StyledImage key={idx} src={img} alt={`Slide ${idx + 1}`} />
          ))}
        </Slider>
        <DotsWrapper>
          {images.map((_, idx) => (
            <Dot key={idx} active={currentIndex === idx} />
          ))}
        </DotsWrapper>
      </ImageWrapper>
    </Container>
  );
};

export default Photoline;

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  border-radius: 20px;
  width: 90%;
  aspect-ratio: 16 / 9;
  max-height: 800px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

const Slider = styled.div<{ index: number; total: number }>`
  display: flex;
  width: 100%;
  height: 100%;
  transform: translateX(-${({ index }) => index * 100}%);
  transition: transform 0.5s ease-in-out;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  object-fit: cover;
  object-position: center;
  display: block;
  border-radius: 10px;
`;

const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

const Dot = styled.span<{ active: boolean }>`
  width: ${({ active }) => (active ? "36px" : "12px")};
  height: 12px;
  border-radius: 999px;
  background-color: ${({ active }) => (active ? "#000" : "#888")};
  margin: 0 5px;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  transition: all 0.3s ease;
`;
