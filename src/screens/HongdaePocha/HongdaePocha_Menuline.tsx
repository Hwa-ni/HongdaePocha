import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";

const useWindowResize = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
};

export interface MenuItemType {
  id: number;
  name: string;
  image: string;
  description?: string;
  price?: string;
  category?: string;
  subcategory?: string;
  isNew?: boolean;
  isHot?: boolean;
  isIce?: boolean;
}

interface MenulineProps {
  menuList: MenuItemType[];
  title?: string;
  subtitle?: string;
}

const HongdaePocha_Menuline: React.FC<MenulineProps> = ({
  menuList,
  title,
  subtitle,
}) => {
  // 기본 사진(unknown.jpg)이나 이미지가 등록되지 않은 메뉴 제외
  const validMenuList = React.useMemo(() => {
    return menuList.filter(
      (item) => item.image && !item.image.toLowerCase().includes("unknown")
    );
  }, [menuList]);

  const [startIndex, setStartIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const windowWidth = useWindowResize();
  const navigate = useNavigate();
  const totalItems = validMenuList.length;

  // 3개씩 한 그룹(페이지)으로 벤토 그리드 구성
  const itemsPerPage = 3;

  useEffect(() => {
    if (startIndex >= totalItems && totalItems > 0) {
      setStartIndex(0);
    }
  }, [totalItems, startIndex]);

  const handleTransition = (callback: () => void) => {
    if (isTransitioning || totalItems <= itemsPerPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setIsTransitioning(false);
    }, 200);
  };

  const handleNext = () => {
    if (totalItems <= itemsPerPage) return;
    handleTransition(() => {
      const nextIndex = (startIndex + itemsPerPage) % totalItems;
      setStartIndex(nextIndex);
    });
  };

  const handlePrev = () => {
    if (totalItems <= itemsPerPage) return;
    handleTransition(() => {
      const prevIndex =
        (startIndex - itemsPerPage + totalItems) % totalItems;
      setStartIndex(prevIndex);
    });
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  if (totalItems === 0) {
    return null;
  }

  // 현재 페이지의 3개 아이템 가져오기
  const currentItems: MenuItemType[] = [];
  for (let i = 0; i < Math.min(itemsPerPage, totalItems); i++) {
    const index = (startIndex + i) % totalItems;
    currentItems.push(validMenuList[index]);
  }

  const item0 = currentItems[0];
  const item1 = currentItems[1] || currentItems[0];
  const item2 = currentItems[2] || currentItems[0];

  const handleViewFullMenu = () => {
    navigate("/MainMenu");
  };

  return (
    <SectionContainer>
      <InnerWrapper>
        {/* 상단 헤더 영역 (THE SELECTION + Signature Cuts + 컨트롤러) */}
        {(title || subtitle) && (
          <HeaderBar>
            <HeaderTitleBox>
              {subtitle && <SubtitleText>{subtitle}</SubtitleText>}
              {title && <MainTitleText>{title}</MainTitleText>}
            </HeaderTitleBox>

            <HeaderActions>
              {totalItems > itemsPerPage && (
                <NavButtonsGroup>
                  <RoundNavButton onClick={handlePrev} disabled={isTransitioning} aria-label="Previous items">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </RoundNavButton>
                  <RoundNavButton onClick={handleNext} disabled={isTransitioning} aria-label="Next items">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </RoundNavButton>
                </NavButtonsGroup>
              )}

              <ViewFullMenuLink onClick={handleViewFullMenu}>
                <span>View Full Menu</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </ViewFullMenuLink>
            </HeaderActions>
          </HeaderBar>
        )}

        {/* 벤토 그리드 카드 영역 */}
        <GridContainer {...handlers} $isTransitioning={isTransitioning}>
          {/* Top Row (60% / 40% 비율) */}
          <TopRow>
            {item0 && (
              <CardLarge>
                <CardImageContainer>
                  <CardImg src={item0.image} alt={item0.name} />
                  <ImageGradient />
                </CardImageContainer>
                <CardContent>
                  <MetaRow>
                    <ChefBadge>CHEF'S CHOICE</ChefBadge>
                    <PriceText>{item0.price || "$48"}</PriceText>
                  </MetaRow>
                  <CardTitle>{item0.name}</CardTitle>
                  <CardDesc>
                    {item0.description ||
                      "Highly marbled Japanese style cut. Exceptionally tender with a melt-in-your-mouth texture."}
                  </CardDesc>
                </CardContent>
              </CardLarge>
            )}

            {item1 && (
              <CardMedium>
                <CardImageContainer>
                  <CardImg src={item1.image} alt={item1.name} />
                  <ImageGradient />
                </CardImageContainer>
                <CardContent>
                  <MetaRow>
                    <PriceText>{item1.price || "$26"}</PriceText>
                  </MetaRow>
                  <CardTitle>{item1.name}</CardTitle>
                  <CardDesc>
                    {item1.description ||
                      "Signature double-marinated dish prepared with authentic spices and rich flavor."}
                  </CardDesc>
                </CardContent>
              </CardMedium>
            )}
          </TopRow>

          {/* Bottom Row (100% 파노라마 카드) */}
          {item2 && (
            <BottomRow>
              <CardPanoramic>
                <CardImageContainer $panoramic>
                  <CardImg src={item2.image} alt={item2.name} />
                  <ImageGradient />
                </CardImageContainer>
                <CardContent $panoramic>
                  <BottomLeftContent>
                    <MetaRow>
                      <PriceText>{item2.price || "$34"}</PriceText>
                    </MetaRow>
                    <CardTitle $large>{item2.name}</CardTitle>
                    <CardDesc $large>
                      {item2.description ||
                        "Marinated for 48 hours in our secret soy-pear blend. Perfectly balanced sweetness and umami."}
                    </CardDesc>
                  </BottomLeftContent>
                  <BottomRightTags>
                    <FeatureTag>
                      <span className="icon">🌱</span> Grass-fed
                    </FeatureTag>
                    <FeatureTag>
                      <span className="icon">🔥</span> Charcoal Grilled
                    </FeatureTag>
                  </BottomRightTags>
                </CardContent>
              </CardPanoramic>
            </BottomRow>
          )}
        </GridContainer>
      </InnerWrapper>
    </SectionContainer>
  );
};

export default HongdaePocha_Menuline;

// Keyframes
const fadeScaleIn = keyframes`
  from {
    opacity: 0.2;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Styled Components
const SectionContainer = styled.section`
  width: 100%;
  padding: 20px 24px 60px 24px;
  background-color: #1A1A1A;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 10px 16px 40px 16px;
  }
`;

const InnerWrapper = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  width: 100%;
`;

const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 28px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const HeaderTitleBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubtitleText = styled.span`
  font-family: var(--font-label);
  font-size: 13px;
  font-weight: 700;
  color: #D4A373;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 6px;
`;

const MainTitleText = styled.h2`
  font-family: var(--font-headline);
  font-size: 36px;
  font-weight: 700;
  color: #F1FAEE;
  margin: 0;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const NavButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RoundNavButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1F1F1F;
  border: 1px solid rgba(241, 250, 238, 0.1);
  color: #D4A373;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #E63946;
    color: #F1FAEE;
    border-color: #E63946;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: none;
  }
`;

const ViewFullMenuLink = styled.button`
  background: none;
  border: none;
  color: #D4A373;
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 6px 0;
  transition: color 0.2s ease, transform 0.2s ease;

  svg {
    transition: transform 0.2s ease;
  }

  &:hover {
    color: #F1FAEE;
    svg {
      transform: translateX(4px);
    }
  }
`;

const GridContainer = styled.div<{ $isTransitioning: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  animation: ${({ $isTransitioning }) => ($isTransitioning ? fadeScaleIn : "none")} 0.2s ease-in-out;
`;

const TopRow = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;

  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

const BottomRow = styled.div`
  width: 100%;
`;

const BaseCard = styled.div`
  background-color: #161616;
  border-radius: 20px;
  border: 1px solid rgba(241, 250, 238, 0.07);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(212, 163, 115, 0.35);
  }

  @media (max-width: 768px) {
    border-radius: 16px;
  }
`;

const CardLarge = styled(BaseCard)`
  flex: 1.45;
  width: 58%;
  min-width: 0;

  @media (max-width: 850px) {
    width: 100%;
  }
`;

const CardMedium = styled(BaseCard)`
  flex: 1;
  width: 40%;
  min-width: 0;

  @media (max-width: 850px) {
    width: 100%;
  }
`;

const CardPanoramic = styled(BaseCard)`
  width: 100%;
`;

const CardImageContainer = styled.div<{ $panoramic?: boolean }>`
  position: relative;
  width: 100%;
  height: ${({ $panoramic }) => ($panoramic ? "280px" : "260px")};
  overflow: hidden;

  @media (max-width: 768px) {
    height: 220px;
  }
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${BaseCard}:hover & {
    transform: scale(1.04);
  }
`;

const ImageGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 65%;
  background: linear-gradient(
    to top,
    #161616 0%,
    rgba(22, 22, 22, 0.6) 45%,
    rgba(22, 22, 22, 0) 100%
  );
  pointer-events: none;
`;

const CardContent = styled.div<{ $panoramic?: boolean }>`
  padding: ${({ $panoramic }) =>
    $panoramic ? "16px 28px 28px 28px" : "16px 24px 26px 24px"};
  display: flex;
  flex-direction: ${({ $panoramic }) => ($panoramic ? "row" : "column")};
  justify-content: ${({ $panoramic }) => ($panoramic ? "space-between" : "flex-start")};
  align-items: ${({ $panoramic }) => ($panoramic ? "flex-end" : "stretch")};
  flex-wrap: wrap;
  gap: 20px;
  margin-top: -24px;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 16px 20px 22px 20px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const BottomLeftContent = styled.div`
  flex: 1;
  min-width: 280px;
`;

const BottomRightTags = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    margin-top: 8px;
  }
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
`;

const ChefBadge = styled.span`
  background: #E63946;
  color: #F1FAEE;
  font-family: var(--font-label);
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PriceText = styled.span`
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 700;
  color: #D4A373;
`;

const CardTitle = styled.h3<{ $large?: boolean }>`
  font-family: var(--font-headline);
  font-size: ${({ $large }) => ($large ? "26px" : "22px")};
  font-weight: 700;
  color: #F1FAEE;
  margin: 4px 0 0 0;
  letter-spacing: -0.3px;

  @media (max-width: 768px) {
    font-size: ${({ $large }) => ($large ? "22px" : "20px")};
  }
`;

const CardDesc = styled.p<{ $large?: boolean }>`
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.6;
  color: rgba(241, 250, 238, 0.75);
  margin: 6px 0 0 0;
  max-width: ${({ $large }) => ($large ? "680px" : "100%")};
`;

const FeatureTag = styled.span`
  background: rgba(212, 163, 115, 0.1);
  border: 1px solid rgba(212, 163, 115, 0.25);
  color: #D4A373;
  font-family: var(--font-label);
  font-size: 12px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;

  .icon {
    font-size: 13px;
  }
`;
