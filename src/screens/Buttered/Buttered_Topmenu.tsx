import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import en from "../../language/Eng_Aust.json";

const Topmenu: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 햄버거 메뉴 상태 추가
  const navigate = useNavigate();

  const handleMenuClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false); // 메뉴 클릭 시 닫기
    console.log(`${path} 페이지로 이동`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <NavBarContainer>
      <NavBar isExpanded={hoveredItem !== null}>
        <Logo
          src={
            process.env.PUBLIC_URL +
            "/assets/Buttered/Buttered_logo/Top_Menu_logo.png"
          }
          alt="Logo"
          onClick={() => handleMenuClick("/")}
          role="button"
        />
        <DesktopNavItems>
          <NavItem onClick={() => handleMenuClick("/About")}>{en.menu.about}</NavItem>
          <NavItem onClick={() => handleMenuClick("/MainMenu")}>{en.menu.menu}</NavItem>
          {/*<NavItem onClick={() => handleMenuClick("/Reservation")}>{en.menu.reservation}</NavItem>*/}
        </DesktopNavItems>
        <MobileMenuButton onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? 'X' : '☰'}
        </MobileMenuButton>
      </NavBar>
      {isMobileMenuOpen && (
        <MobileMenu>
          <MobileNavItem onClick={() => handleMenuClick("/About")}>{en.menu.about}</MobileNavItem>
          <MobileNavItem onClick={() => handleMenuClick("/MainMenu")}>{en.menu.menu}</MobileNavItem>
          {/*<MobileNavItem onClick={() => handleMenuClick("/Reservation")}>{en.menu.reservation}</MobileNavItem>*/}
        </MobileMenu>
      )}
    </NavBarContainer>
  );
};

export default Topmenu;

const NavBarContainer = styled.div`
  position: relative;
  width: 100%;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  color: #333;
  user-select: none;
  transition: color 0.2s ease;

  &:hover {
    color: #41B6E6;
  }
`;

const NavBar = styled.nav<{ isExpanded: boolean }>`
  width: 100%;
  height: ${(props) => (props.isExpanded ? "100px" : "70px")};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: height 0.3s ease;
  z-index: 1000;

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

const MobileMenuButton = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    font-size: 24px;
    cursor: pointer;
    padding-right: 20px;
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
  z-index: 999;
`;

const MobileNavItem = styled(NavItem)`
  width: 100%;
  height: auto;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
`;