import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StartScreen = () => {
  const navigate = useNavigate();
  const [expandedSide, setExpandedSide] = useState<"left" | "right" | null>(
    null
  );

  const handleLeftHover = () => {
    setExpandedSide("left");
  };

  const handleRightHover = () => {
    setExpandedSide("right");
  };

  const handleMouseLeave = () => {
    setExpandedSide(null);
  };

  const handleLeftClick = () => {
    console.log("Left option clicked");
  };

  const handleRightClick = () => {
    navigate("/butteredhome");
  };

  return (
    <Container>
      <LeftBox
        $isExpanded={expandedSide === "left"}
        $isCollapsed={expandedSide === "right"}
        onMouseEnter={handleLeftHover}
        onMouseLeave={handleMouseLeave}
        onClick={expandedSide === "left" ? handleLeftClick : undefined}
      >
        <ContentOverlay $isExpanded={expandedSide === "left"}></ContentOverlay>
      </LeftBox>

      <RightBox
        $isExpanded={expandedSide === "right"}
        $isCollapsed={expandedSide === "left"}
        onMouseEnter={handleRightHover}
        onMouseLeave={handleMouseLeave}
        onClick={expandedSide === "right" ? handleRightClick : undefined}
      >
        <ContentOverlay $isExpanded={expandedSide === "right"}></ContentOverlay>
      </RightBox>
    </Container>
  );
};

export default StartScreen;

const leftimageUrl = process.env.PUBLIC_URL + "/assets/Photo1.png";
const rightImageUrl =
  process.env.PUBLIC_URL + "/assets/Buttered/Buttered_store_image/image1.jpg";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const ContentOverlay = styled.div<{ $isExpanded: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  z-index: 2;
  opacity: ${(props) => (props.$isExpanded ? 1 : 0)};
  transition: opacity 0.5s ease 0.3s;
  pointer-events: none;
  letter-spacing: 2px;
`;

const LeftBox = styled.div<{
  $isExpanded: boolean;
  $isCollapsed: boolean;
}>`
  flex: ${(props) =>
    props.$isExpanded ? "2" : props.$isCollapsed ? "0.5" : "1"};
  background-image: url(${leftimageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${(props) =>
      props.$isExpanded ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0)"};
    transition: background 0.3s ease;
    z-index: 1;
  }

  ${(props) =>
    !props.$isExpanded &&
    `
    &:hover {
      transform: scale(1.02);
    }
  `}
`;

const RightBox = styled.div<{
  $isExpanded: boolean;
  $isCollapsed: boolean;
}>`
  flex: ${(props) =>
    props.$isExpanded ? "2" : props.$isCollapsed ? "0.5" : "1"};
  background-image: url(${rightImageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${(props) =>
      props.$isExpanded ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0)"};
    transition: background 0.3s ease;
    z-index: 1;
  }

  /* 기본 상태와 collapsed 상태에서 호버 효과 */
  ${(props) =>
    !props.$isExpanded &&
    `
    &:hover {
      transform: scale(1.02);
    }
  `}
`;
