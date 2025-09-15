import React, { useState } from "react";
import styled from "styled-components";

// 타입 정의
interface CarouselImageProps {
  currentImageIndex: number;
}

interface NavButtonProps {
  direction: "left" | "right";
}

interface IndicatorProps {
  active: boolean;
}

const MoreButton = styled.button`
  background: #2563eb;
  color: white;
  padding: 12px 24px;
  border-radius: 24px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);

  &:hover {
    background: #1d4ed8;
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4);
  }

  // 모바일에서 너비 조정
  @media (max-width: 768px) {
    width: 90%; // 버튼 너비를 90%로 설정하여 가독성 높임
    max-width: 300px; // 최대 너비 설정
  }
`;

// 스타일 컴포넌트 정의
const SectionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  background: #faf9f6;
  min-height: 80vh;
`;

const ImageCard = styled.div`
  width: 80vw;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 35px 70px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 95vw;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  touch-action: pan-y; /* 터치 이벤트가 세로 스크롤을 막지 않도록 설정 */

  @media (min-width: 768px) {
    height: 500px;
  }
`;

const ImageContainer = styled.div<CarouselImageProps>`
  display: flex;
  height: 100%;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(${(props) => -props.currentImageIndex * 100}%);
`;

const ImageSlide = styled.div`
  min-width: 100%;
  height: 100%;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NavButton = styled.button<NavButtonProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.direction === "left" ? "left: 24px;" : "right: 24px;")}
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 56px;
  height: 56px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #374151;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
  }

  // 모바일 환경일 때 화살표 숨기기
  @media (max-width: 768px) {
    display: none;
  }
`;

const IndicatorsContainer = styled.div`
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
`;

const Indicator = styled.button<IndicatorProps>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: ${(props) =>
    props.active ? "#ffffff" : "rgba(255, 255, 255, 0.6)"};
  transform: ${(props) => (props.active ? "scale(1.25)" : "scale(1)")};
  box-shadow: ${(props) =>
    props.active
      ? "0 4px 12px rgba(255, 255, 255, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.5)"
      : "none"};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: scale(1.1);
  }
`;

const TitleOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    transparent 100%
  );
  padding: 32px;
  color: white;
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
`;

const BottomInfoBar = styled.div`
  background: linear-gradient(to right, #f8fafc 0%, #ffffff 100%);
  padding: 24px; // 패딩을 좀 더 넓게 줍니다.
  border-top: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;

  // 모바일 환경일 때 레이아웃 변경
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 16px; // 항목 간 간격 추가
  }
`;

const InfoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  // 모바일에서 가운데 정렬을 위해
  @media (max-width: 768px) {
    justify-content: center;
    width: 100%; // 너비를 꽉 채워서 가운데 정렬이 잘 보이도록
  }
`;

const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  background: #dbeafe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2563eb;
`;

const InfoText = styled.div`
  h4 {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 2px;
  }

  p {
    font-size: 1.125rem;
    font-weight: 600;
    color: #374151;
  }
`;

// React 컴포넌트
const StoreImageSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0); // 터치 시작 X 좌표 상태 추가

  // 이미지 경로 배열
  const storeImages = [
    "assets/HongdaePocha/HongdaePocha_store_image/insert1.jpg",
    "assets/HongdaePocha/HongdaePocha_store_image/insert2.jpg",
    "assets/HongdaePocha/HongdaePocha_store_image/insert3.jpg",
    "assets/HongdaePocha/HongdaePocha_store_image/insert4.jpg",
    "assets/HongdaePocha/HongdaePocha_store_image/insert5.jpg",
    "assets/HongdaePocha/HongdaePocha_store_image/insert6.jpg",
    "assets/HongdaePocha/HongdaePocha_store_image/insert7.jpg",
    "assets/HongdaePocha/HongdaePocha_store_image/insert8.jpg",
    "assets/HongdaePocha/HongdaePocha_store_image/insert9.jpg",
    "assets/HongdaePocha/HongdaePocha_store_image/insert10.jpg",
  ];

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % storeImages.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + storeImages.length) % storeImages.length
    );
  };

  // 터치 시작 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  // 터치 종료 이벤트 핸들러
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // 스와이프 민감도 설정 (50px -> 30px로 낮춤)
    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        // 오른쪽에서 왼쪽으로 스와이프 (다음 이미지)
        handleNext();
      } else {
        // 왼쪽에서 오른쪽으로 스와이프 (이전 이미지)
        handlePrev();
      }
    }
  };

  const handleMoreButtonClick = () => {
    // 여기에 이동할 URL을 넣어주세요.
    window.location.href = "/about";
  };

  return (
    <SectionContainer>
      <ImageCard>
        <ImageWrapper
          onTouchStart={handleTouchStart} // 이벤트 핸들러 연결
          onTouchEnd={handleTouchEnd} // 이벤트 핸들러 연결
        >
          <ImageContainer currentImageIndex={currentImageIndex}>
            {storeImages.map((image, index) => (
              <ImageSlide key={index}>
                <CarouselImage src={image} alt={`가게 이미지 ${index + 1}`} />
              </ImageSlide>
            ))}
          </ImageContainer>

          <NavButton direction="left" onClick={handlePrev}>
            ‹
          </NavButton>
          <NavButton direction="right" onClick={handleNext}>
            ›
          </NavButton>

          <IndicatorsContainer>
            {storeImages.map((_, index) => (
              <Indicator
                key={index}
                active={index === currentImageIndex}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </IndicatorsContainer>

          <TitleOverlay>
            <Title>Korean Pocha Interior & Vibe</Title>
            <Description>
              A special place to enjoy Korean alcohol, food, and Korean BBQ
            </Description>
          </TitleOverlay>
        </ImageWrapper>

        <BottomInfoBar>
          <InfoSection>
            <IconContainer>
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </IconContainer>
            <InfoText>
              <h4>Total of {storeImages.length} photos</h4>
              <p>
                {currentImageIndex + 1} / {storeImages.length}
              </p>
            </InfoText>
          </InfoSection>
          <MoreButton onClick={handleMoreButtonClick}>
            About Hongdae Pocha
          </MoreButton>
        </BottomInfoBar>
      </ImageCard>
    </SectionContainer>
  );
};

export default StoreImageSection;
