import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import en from "../../language/Eng_Aust.json";

const Topmenu: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolledPastPhotoline, setIsScrolledPastPhotoline] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    console.log(`${path} 페이지로 이동`);
  };

  const handleLocationsClick = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 150);
    } else {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleReservationClick = () => {
    setIsMobileMenuOpen(false);
    window.open(
      "https://www.opentable.com.au/r/hongdae-pocha-sydney-reservations-chippendale?restref=298547&lang=en-AU&ot_source=Restaurant%20website",
      "_blank"
    );
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Home 또는 About 페이지인지 확인
  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname.toLowerCase() === "/about";
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
      <NavBarContainer isScrolledPastPhotoline={isScrolledPastPhotoline}>
        <NavBar isScrolledPastPhotoline={isScrolledPastPhotoline}>
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
            <MobileMenuButton onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? "✕" : "☰"}
            </MobileMenuButton>
          </RightActions>
        </NavBar>

        {isMobileMenuOpen && (
          <MobileMenu>
            <MobileNavItem onClick={() => handleMenuClick("/MainMenu")}>
              {en.menu.menu || "Menu"}
            </MobileNavItem>
            <MobileNavItem onClick={() => handleMenuClick("/About")}>
              {en.menu.about || "About"}
            </MobileNavItem>
            <MobileNavItem onClick={handleLocationsClick}>
              {en.menu.locations || "Locations"}
            </MobileNavItem>
            <MobileNavItem onClick={handleReservationClick}>
              {en.menu.reservation || "Reservation"}
            </MobileNavItem>
          </MobileMenu>
        )}
      </NavBarContainer>
      {!hasHeroImageAtTop && <ContentSpacer />}
    </>
  );
};

export default Topmenu;

const NavBarContainer = styled.div<{ isScrolledPastPhotoline: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 12px 16px;
  box-sizing: border-box;
  z-index: 2000;
  pointer-events: none;
  transition: padding 0.3s ease;

  @media (max-width: 768px) {
    padding: 8px 12px;
  }
`;

const NavBar = styled.nav<{ isScrolledPastPhotoline: boolean }>`
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
    props.isScrolledPastPhotoline
      ? "0 8px 30px rgba(0, 0, 0, 0.6)"
      : "0 4px 20px rgba(0, 0, 0, 0.3)"};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    height: 58px;
    padding: 0 16px;
    border-radius: 14px;
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

const MobileMenuButton = styled.div`
  display: none;
  @media (max-width: 850px) {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    cursor: pointer;
    color: #F1FAEE;
    padding: 4px;
  }
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 76px;
  left: 16px;
  right: 16px;
  background-color: #1A1A1A;
  border: 1px solid rgba(212, 163, 115, 0.15);
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  pointer-events: auto;
  z-index: 2000;

  @media (min-width: 851px) {
    display: none;
  }
  @media (max-width: 768px) {
    top: 68px;
    left: 12px;
    right: 12px;
  }
`;

const MobileNavItem = styled.div`
  width: 100%;
  padding: 14px 24px;
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 500;
  color: #D4A373;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &:hover {
    color: #F1FAEE;
    background: rgba(241, 250, 238, 0.04);
  }
`;

const ContentSpacer = styled.div`
  height: 88px;

  @media (max-width: 768px) {
    height: 76px;
  }
`;
