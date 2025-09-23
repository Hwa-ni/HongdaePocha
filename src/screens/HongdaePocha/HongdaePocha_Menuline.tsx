import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useSwipeable } from "react-swipeable"; // 터치 스와이프 기능을 위해 새로운 라이브러리 추가

// Custom hook to get window width
const useWindowResize = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
};

interface MenuItemType {
  id: number;
  name: string;
  image: string;
}

const HongdaePocha_Menuline: React.FC<{ menuList: MenuItemType[] }> = ({
  menuList,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalItems = menuList.length;
  const windowWidth = useWindowResize();

  // 화면 크기에 따라 보여줄 아이템 개수 결정
  const getItemsPerPage = () => {
    // 모바일(768px 이하)에서는 3개, 그 외에는 5개로 유지
    return windowWidth <= 768 ? 3 : 5;
  };

  // 자동 슬라이드 기능 유지 (모바일 환경에서는 터치 사용으로 자동 넘김 해제 가능성 고려)
  useEffect(() => {
    const isMobile = windowWidth <= 768;
    const interval = setInterval(() => {
      // 모바일이 아닌 경우에만 자동 넘김
      if (!isMobile) {
        handleNext();
      }
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [startIndex, windowWidth, totalItems]);

  const getCurrentItems = () => {
    const itemsPerPage = getItemsPerPage();
    const end = startIndex + itemsPerPage;
    if (end <= totalItems) {
      return menuList.slice(startIndex, end);
    } else {
      const firstPart = menuList.slice(startIndex, totalItems);
      const overflow = itemsPerPage - firstPart.length;
      return firstPart.concat(menuList.slice(0, overflow));
    }
  };

  const handleTransition = (callback: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setIsTransitioning(false);
    }, 150);
  };

  const handleNext = () => {
    handleTransition(() => {
      const itemsPerPage = getItemsPerPage();
      const nextIndex = startIndex + itemsPerPage;
      setStartIndex(nextIndex >= totalItems ? 0 : nextIndex);
    });
  };

  const handlePrev = () => {
    handleTransition(() => {
      const itemsPerPage = getItemsPerPage();
      const prevIndex = startIndex - itemsPerPage;
      if (prevIndex < 0) {
        const remainder = totalItems % itemsPerPage;
        const newIndex =
          remainder === 0 ? totalItems - itemsPerPage : totalItems - remainder;
        setStartIndex(newIndex);
      } else {
        setStartIndex(prevIndex);
      }
    });
  };

  // 터치 스와이프 핸들러
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      // 왼쪽으로 스와이프하면 다음 페이지로
      if (windowWidth <= 768) {
        handleNext();
      }
    },
    onSwipedRight: () => {
      // 오른쪽으로 스와이프하면 이전 페이지로
      if (windowWidth <= 768) {
        handlePrev();
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  if (totalItems === 0) {
    return null;
  }

  const isMobile = windowWidth <= 768;

  return (
    <Container>
      {/* PC 환경에서만 보이는 화살표 버튼 */}
      {!isMobile && (
        <ArrowButton onClick={handlePrev} disabled={isTransitioning}>
          <ArrowIcon>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </ArrowIcon>
        </ArrowButton>
      )}

      {/* 모바일 터치 핸들러를 Wrapper에 적용 */}
      <Wrapper {...handlers} $isTransitioning={isTransitioning}>
        {getCurrentItems().map((item: MenuItemType) => (
          <MenuItem key={item.id} $isMobile={isMobile}>
            <img src={item.image} alt={item.name} />
            <span>{item.name}</span>
          </MenuItem>
        ))}
      </Wrapper>

      {/* PC 환경에서만 보이는 화살표 버튼 */}
      {!isMobile && (
        <ArrowButton onClick={handleNext} disabled={isTransitioning}>
          <ArrowIcon>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </ArrowIcon>
        </ArrowButton>
      )}
    </Container>
  );
};

export default HongdaePocha_Menuline;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-30px);
  }
`;

const Wrapper = styled.div<{ $isTransitioning: boolean }>`
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: center;
  animation: ${({ $isTransitioning }) =>
      $isTransitioning ? slideOut : slideIn}
    0.3s ease-in-out;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

// MenuItem 스타일 수정
const MenuItem = styled.div<{ $isMobile: boolean }>`
  background-color: #1e1e1e;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 0;
  text-align: center;
  transition: transform 0.2s ease;
  max-width: 20%;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-4px);
  }

  img {
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  span {
    font-size: 15px;
    color: #ffffff;
    font-weight: 500;
    padding: 16px;
  }

  @media (max-width: 768px) {
    max-width: calc(33.333% - 10px);
    flex: 1 1 calc(33.333% - 10px);

    // 모바일에서 텍스트 크기 더 크게
    span {
      font-size: 14px;
      padding: 15px;
    }
  }

  @media (max-width: 480px) {
    max-width: calc(33.333% - 10px);
    flex: 1 1 calc(33.333% - 10px);
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
  padding: 25px;
  background-color: #1a1a1a;

  @media (max-width: 768px) {
    padding: 15px;
    // 모바일에서는 화살표 버튼을 숨기므로, 간격을 없애고 Wrapper를 중앙에 위치시킵니다.
    gap: 0;
    justify-content: center;
  }
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  width: 48px;
  height: 48px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    display: none; // 모바일에서는 버튼을 숨깁니다.
  }
`;

const ArrowIcon = styled.div`
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;

  &:hover {
    color: #000;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    display: none; // 모바일에서는 아이콘을 숨깁니다.
  }
`;
