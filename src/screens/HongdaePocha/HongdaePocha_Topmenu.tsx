import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import en from "../../language/Eng_Aust.json";

const Topmenu: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolledPastPhotoline, setIsScrolledPastPhotoline] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    console.log(`${path} 페이지로 이동`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Home 페이지인지 확인
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    // Home 페이지가 아닌 경우 항상 흰 배경
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
        <NavBar isExpanded={hoveredItem !== null}>
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
            <NavItem
              onClick={() => handleMenuClick("/About")}
              isScrolledPastPhotoline={isScrolledPastPhotoline}
            >
              {en.menu.about}
            </NavItem>
            <NavItem
              onClick={() => handleMenuClick("/MainMenu")}
              isScrolledPastPhotoline={isScrolledPastPhotoline}
            >
              {en.menu.menu}
            </NavItem>
            <NavItem
              onClick={() =>
                window.open(
                  "https://www.opentable.com.au/r/hongdae-pocha-sydney-reservations-chippendale?restref=298547&lang=en-AU&ot_source=Restaurant%20website"
                )
              }
              isScrolledPastPhotoline={isScrolledPastPhotoline}
            >
              {en.menu.reservation}
            </NavItem>
          </DesktopNavItems>
          <MobileMenuButton
            onClick={toggleMobileMenu}
            isScrolledPastPhotoline={isScrolledPastPhotoline}
          >
            {isMobileMenuOpen ? "X" : "☰"}
          </MobileMenuButton>
        </NavBar>
        {isMobileMenuOpen && (
          <MobileMenu>
            <MobileNavItem
              onClick={() => handleMenuClick("/About")}
              isScrolledPastPhotoline={true}
            >
              {en.menu.about}
            </MobileNavItem>
            <MobileNavItem
              onClick={() => handleMenuClick("/MainMenu")}
              isScrolledPastPhotoline={true}
            >
              {en.menu.menu}
            </MobileNavItem>
            <MobileNavItem
              onClick={() =>
                window.open(
                  "https://www.opentable.com.au/r/hongdae-pocha-sydney-reservations-chippendale?restref=298547&lang=en-AU&ot_source=Restaurant%20website"
                )
              }
              isScrolledPastPhotoline={true}
            >
              {en.menu.reservation}
            </MobileNavItem>
          </MobileMenu>
        )}
      </NavBarContainer>
      {!isHomePage && <ContentSpacer />}
    </>
  );
};

export default Topmenu;

const NavBarContainer = styled.div<{ isScrolledPastPhotoline: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: ${(props) =>
    props.isScrolledPastPhotoline ? "white" : "transparent"};
  z-index: 2000;
  transition: background 0.3s ease;
`;

const NavItem = styled.div<{ isScrolledPastPhotoline: boolean }>`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  color: ${(props) => (props.isScrolledPastPhotoline ? "#9c1f24" : "#ffffff")};
  user-select: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) =>
      props.isScrolledPastPhotoline ? "#ff5100" : "#9c1f24"};
  }
`;

const NavBar = styled.nav<{ isExpanded: boolean }>`
  width: 100%;
  height: ${(props) => (props.isExpanded ? "100px" : "70px")};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: height 0.3s ease;
  z-index: 2001;

  @media (max-width: 768px) {
    height: 60px;
    justify-content: space-between;
  }
`;

const Logo = styled.img`
  height: 70px;
  margin-right: 30px;
  cursor: pointer;

  @media (max-width: 768px) {
    height: 50px;
    margin-right: 0;
  }
`;

const DesktopNavItems = styled.div`
  display: flex;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.div<{ isScrolledPastPhotoline: boolean }>`
  display: none;
  @media (max-width: 768px) {
    display: block;
    font-size: 24px;
    cursor: pointer;
    padding-right: 20px;
    color: ${(props) =>
      props.isScrolledPastPhotoline ? "#9c1f24" : "#ffffff"};
  }
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 2000;
`;

const MobileNavItem = styled(NavItem)`
  width: 100%;
  height: auto;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  /* 이 컴포넌트는 isScrolledPastPhotoline이 항상 true인 상태의 색상을 가집니다. */
  color: #9c1f24;

  &:hover {
    color: #9c1f24;
  }
`;

const ContentSpacer = styled.div`
  height: 70px;

  @media (max-width: 768px) {
    height: 60px;
  }
`;
