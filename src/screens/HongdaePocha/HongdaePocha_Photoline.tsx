import React, { useState, useEffect } from "react";
import styled from "styled-components";

const images = [
  process.env.PUBLIC_URL + "/assets/HongdaePocha/HongdaePocha_store_image/insert2.jpg",
  process.env.PUBLIC_URL + "/assets/HongdaePocha/HongdaePocha_store_image/insert3.jpg",
  process.env.PUBLIC_URL + "/assets/HongdaePocha/HongdaePocha_store_image/insert6.jpg",
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
        <Slider index={currentIndex}>
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
        <BadgeWrapper
          href="https://www.opentable.com.au/restaurant/profile/298547/reserve?rid=298547&restref=298547"
          target="_blank"
          rel="noopener"
        >
          <img
            height="100px"
            width="100px"
            src="https://www.opentable.com.au/restaurant-solutions/badge/ot/DC-2026.png"
            alt="Book on OpenTable"
          />
        </BadgeWrapper>
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
  padding-top: 56.25%;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding-top: 75%;
    height: auto;
  }
`;

const ImageOverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Slider = styled.div<{ index: number }>`
  display: flex;
  height: 100%;
  width: 100%;
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
    top: 80px;
    left: 5vw;
  }
`;

const BadgeWrapper = styled.a`
  position: absolute;
  top: calc(15vh + 220px);
  left: 5vw;
  z-index: 2;
  display: inline-flex;
  opacity: 0.92;
  transition: opacity 0.2s ease, transform 0.2s ease;

  &:hover {
    opacity: 1;
    transform: scale(1.06);
  }

  @media (max-width: 768px) {
    top: 175px;
    img {
      height: 65px;
      width: 65px;
    }
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