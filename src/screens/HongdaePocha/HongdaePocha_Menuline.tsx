import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import BottomMenu from "./HongdaePocha_BottomMenu";

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
  id: string;
  name: string;
  image: string;
}

const ButteredMenuline: React.FC<{ menuList: MenuItemType[] }> = ({ menuList }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalItems = menuList.length;
  const windowWidth = useWindowResize();

  // 화면 크기에 따라 보여줄 아이템 개수 결정
  const getItemsPerPage = () => {
    return windowWidth <= 768 ? 3 : 5;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [startIndex, windowWidth]); // windowWidth를 의존성 배열에 추가하여 화면 크기 변경 시에도 interval이 재설정되도록 함

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
        const newIndex = remainder === 0 ? totalItems - itemsPerPage : totalItems - remainder;
        setStartIndex(newIndex);
      } else {
        setStartIndex(prevIndex);
      }
    });
  };

  return (
    <Container>
      <ArrowButton onClick={handlePrev} disabled={isTransitioning}>
        <ArrowIcon>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </ArrowIcon>
      </ArrowButton>
      <Wrapper $isTransitioning={isTransitioning}>
        {getCurrentItems().map((item: MenuItemType) => (
          <MenuItem key={item.id}>
            <img src={item.image} alt={String(item.name)} />
            <span>{item.name}</span>
          </MenuItem>
        ))}
      </Wrapper>
      <ArrowButton onClick={handleNext} disabled={isTransitioning}>
        <ArrowIcon>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </ArrowIcon>
      </ArrowButton>
    </Container>
  );
};

export default ButteredMenuline;

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
    $isTransitioning ? slideOut : slideIn} 0.3s ease-in-out;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const MenuItem = styled.div`
  background-color: #ffffff;
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
    color: #333;
    font-weight: 500;
    padding: 16px;
  }

  @media (max-width: 768px) {
    max-width: calc(33.333% - 10px);
    flex: 1 1 calc(33.333% - 10px);
    
    span {
      font-size: 12px;
      padding: 10px;
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

  @media (max-width: 768px) {
    padding: 15px;
    gap: 10px;
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
    width: 36px;
    height: 36px;
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
    svg {
      width: 15px;
      height: 15px;
    }
  }
`;