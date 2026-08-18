import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  CircleUserRound,
  Home,
  MapPin,
  UtensilsCrossed,
} from "lucide-react";
import en from "../../language/Eng_Aust.json";

const Topmenu: React.FC = () => {
  const [isScrolledPastPhotoline, setIsScrolledPastPhotoline] = useState(false);
  const [isLocationsActive, setIsLocationsActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (path: string) => {
    setIsLocationsActive(false);
    const isCurrentPage =
      location.pathname.toLowerCase() === path.toLowerCase();

    if (isCurrentPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigate(path);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
      });
    });
  };

  const handleLocationsClick = () => {
    setIsLocationsActive(true);

    const scrollToLocation = () => {
      document.getElementById("location")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToLocation, 150);
    } else {
      scrollToLocation();
    }
  };

  const handleReservationClick = () => {
    window.open(
      "https://www.opentable.com.au/r/hongdae-pocha-sydney-reservations-chippendale?restref=298547&lang=en-AU&ot_source=Restaurant%20website",
      "_blank"
    );
  };

  // Home 또는 About 페이지인지 확인
  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname.toLowerCase() === "/about";
  const activeMobileTab =
    isLocationsActive
      ? 3
      : location.pathname.toLowerCase() === "/mainmenu"
      ? 1
      : isAboutPage
      ? 2
      : 0;
  const hasHeroImageAtTop = isHomePage || isAboutPage;

  useEffect(() => {
    // Home 페이지가 아닌 경우 항상 어두운 배경
    if (!isHomePage) {
      setIsScrolledPastPhotoline(true);
      return;
    }

    const handleScroll = () => {
      const photolineSection = document.getElementById("photoline");
      if (photolineSection) {
        const photolineBottom =
          photolineSection.offsetTop + photolineSection.offsetHeight;
        if (window.scrollY > photolineBottom) {
          setIsScrolledPastPhotoline(true);
        } else {
          setIsScrolledPastPhotoline(false);
        }
      } else {
        // "photoline" 섹션이 없는 경우, 임의로 100px 스크롤 후 배경을 변경합니다.
        if (window.scrollY > 100) {
          setIsScrolledPastPhotoline(true);
        } else {
          setIsScrolledPastPhotoline(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  return (
    <>
      <NavBarContainer>
        <NavBar $isScrolledPastPhotoline={isScrolledPastPhotoline}>
          <Logo
            src={
              process.env.PUBLIC_URL +
              "/assets/HongdaePocha/HongdaePocha_logo/Mainlogo3.png"
            }
            alt="Logo"
            onClick={() => handleMenuClick("/")}
            role="button"
          />

          <DesktopNavItems>
            <NavItem onClick={() => handleMenuClick("/MainMenu")}>
              {en.menu.menu || "Menu"}
            </NavItem>
            <NavItem onClick={() => handleMenuClick("/About")}>
              {en.menu.about || "About"}
            </NavItem>
            <NavItem onClick={handleLocationsClick}>
              {en.menu.locations || "Locations"}
            </NavItem>
          </DesktopNavItems>

          <RightActions>
            <ReservationButton onClick={handleReservationClick}>
              {en.menu.reservation || "Reservation"}
            </ReservationButton>
          </RightActions>
        </NavBar>

        <MobileDock aria-label="Primary navigation">
          <MobileTabBar>
            <MobileActiveIndicator
              $index={activeMobileTab}
              aria-hidden="true"
            />
            <MobileTab
              type="button"
              $active={isHomePage && !isLocationsActive}
              aria-current={
                isHomePage && !isLocationsActive ? "page" : undefined
              }
              onClick={() => handleMenuClick("/")}
            >
              <Home aria-hidden="true" />
              <span>Home</span>
            </MobileTab>
            <MobileTab
              type="button"
              $active={location.pathname.toLowerCase() === "/mainmenu"}
              aria-current={
                location.pathname.toLowerCase() === "/mainmenu"
                  ? "page"
                  : undefined
              }
              onClick={() => handleMenuClick("/MainMenu")}
            >
              <UtensilsCrossed aria-hidden="true" />
              <span>{en.menu.menu || "Menu"}</span>
            </MobileTab>
            <MobileTab
              type="button"
              $active={isAboutPage}
              aria-current={isAboutPage ? "page" : undefined}
              onClick={() => handleMenuClick("/About")}
            >
              <CircleUserRound aria-hidden="true" />
              <span>{en.menu.about || "About"}</span>
            </MobileTab>
            <MobileTab
              type="button"
              $active={isLocationsActive}
              aria-current={isLocationsActive ? "location" : undefined}
              onClick={handleLocationsClick}
            >
              <MapPin aria-hidden="true" />
              <span>{en.menu.locations || "Locations"}</span>
            </MobileTab>
          </MobileTabBar>
        </MobileDock>
      </NavBarContainer>
      {!hasHeroImageAtTop && <ContentSpacer />}
    </>
  );
};

export default Topmenu;

const NavBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 12px 16px;
  box-sizing: border-box;
  z-index: 2000;
  pointer-events: none;
  transition: padding 0.3s ease, top 0.3s ease, bottom 0.3s ease;

  @media (max-width: 850px) {
    padding: 8px 12px;
  }
`;

const NavBar = styled.nav<{ $isScrolledPastPhotoline: boolean }>`
  pointer-events: auto;
  width: 100%;
  max-width: 1400px;
  height: 64px;
  margin: 0 auto;
  background: #1A1A1A;
  border: 1px solid rgba(212, 163, 115, 0.15);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0 28px;
  box-sizing: border-box;
  box-shadow: ${(props) =>
    props.$isScrolledPastPhotoline
      ? "0 8px 30px rgba(0, 0, 0, 0.6)"
      : "0 4px 20px rgba(0, 0, 0, 0.3)"};
  transition: all 0.3s ease;

  @media (max-width: 850px) {
    height: 58px;
    max-width: 480px;
    padding: 0 16px;
    border-radius: 18px;
    background: rgba(26, 26, 26, 0.72);
    border-color: rgba(255, 255, 255, 0.14);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.36),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(22px) saturate(180%);
    -webkit-backdrop-filter: blur(22px) saturate(180%);
  }
`;

const Logo = styled.img`
  height: 46px;
  cursor: pointer;
  user-select: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.03);
  }

  @media (max-width: 768px) {
    height: 36px;
  }
`;

const DesktopNavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 36px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 850px) {
    display: none;
  }
`;

const NavItem = styled.div`
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  color: #D4A373;
  user-select: none;
  transition: color 0.2s ease;

  &:hover {
    color: #F1FAEE;
  }
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ReservationButton = styled.button`
  background: #E63946;
  color: #F1FAEE;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  border: none;
  border-radius: 24px;
  padding: 9px 22px;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(230, 57, 70, 0.25);

  &:hover {
    background: #f24b58;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(230, 57, 70, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 500px) {
    padding: 7px 14px;
    font-size: 13px;
  }
`;

const MobileDock = styled.nav`
  display: none;

  @media (max-width: 850px) {
    position: fixed;
    left: 12px;
    right: 12px;
    bottom: calc(12px + env(safe-area-inset-bottom, 0px));
    display: flex;
    align-items: center;
    max-width: 480px;
    margin: 0 auto;
    pointer-events: auto;
  }
`;

const MobileTabBar = styled.div`
  position: relative;
  min-width: 0;
  height: 64px;
  flex: 1;
  display: flex;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 24px;
  background: rgba(28, 27, 27, 0.72);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.44),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
`;

const MobileActiveIndicator = styled.span<{ $index: number }>`
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 5px;
  width: calc((100% - 10px) / 4);
  border-radius: 18px;
  background: rgba(230, 57, 70, 0.18);
  box-shadow: inset 0 0 0 1px rgba(230, 57, 70, 0.06);
  transform: translateX(${(props) => props.$index * 100}%);
  transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const MobileTab = styled.button<{ $active: boolean }>`
  position: relative;
  z-index: 1;
  min-width: 0;
  min-height: 52px;
  flex: 1;
  padding: 5px 2px 4px;
  border: 0;
  border-radius: 18px;
  background: transparent;
  color: ${(props) => (props.$active ? "#ff5a66" : "#f1faee")};
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  transition: color 0.2s ease, background-color 0.2s ease,
    transform 0.15s ease;

  svg {
    width: 21px;
    height: 21px;
    stroke-width: ${(props) => (props.$active ? 2.4 : 1.9)};
  }

  span {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:active {
    transform: scale(0.94);
  }

  &:focus-visible {
    outline: 2px solid #f1faee;
    outline-offset: -2px;
  }
`;

const ContentSpacer = styled.div`
  height: 88px;
  background-color: #121212;

  @media (max-width: 850px) {
    height: 74px;
  }
`;
