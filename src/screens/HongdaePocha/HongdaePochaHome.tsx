import React from "react";
import Topmenu from "./HongdaePocha_Topmenu";
import Photoline from "./HongdaePocha_Photoline";
import BottomMenu from "./HongdaePocha_BottomMenu";
import { TransitionContainer } from "./animation/TransitionContainer";
import HomeMenuBenner from "../Home_Menu";
import HongdaePochaMenuline from "./HongdaePocha_Menuline";
import { menuData } from "./Menu/Hongdae_Pocha_Menu_list";
import styled from "styled-components";
import StoreImageSection from "./Hongdae_Pocha_StoreImage";

// 기존 Title 컴포넌트
const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 50px;
  color: #bf252a; /* 다크모드 글씨색 */
`;
const Wrapper = styled.div`
  background-color: #1a1a1a; /* 다크모드 배경색 */
  width: 100vw;
`;

// 이미지와 오버레이, 텍스트를 담을 새로운 컨테이너 컴포넌트
const ImageContainer = styled.div`
  position: relative; // 자식 요소의 위치를 절대적으로 지정하기 위해 필요
  width: 100%;
  height: 800px; // 원하는 높이로 조절하세요.
  margin-bottom: 50px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // 이미지가 컨테이너를 가득 채우도록 설정
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3); // 불투명도 30%의 검은색 배경
  }

  .welcome-text {
    position: absolute;
    bottom: 20px;
    right: 20px;
    color: white;
    font-size: 2rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); // 텍스트 그림자 효과
  }
`;

const Home: React.FC = () => {
  const bbqMenu = menuData.filter((item) => item.category === "BBQ / Grill");
  const drink = menuData.filter((item) => item.category === "DRINKS");
  return (
    <div>
      <TransitionContainer>
        <Wrapper>
          <Topmenu />
          <Photoline />
          {/* 여기에 새로 추가된 이미지 컨테이너
        <ImageContainer>
          <img src="/assets/HongdaePocha/HongdaePocha_store_image/0I0A8375.jpg" alt="Hongdae Pocha" />
          <div className="overlay"></div>
          <div className="welcome-text">
            Welcome to Hongdae Pocha, a Korean-style pub
          </div>
        </ImageContainer>
         */}

          <Title>BBQ / Grill</Title>
          <HongdaePochaMenuline menuList={bbqMenu} />
          <Title>Drink Menu</Title>
          <HongdaePochaMenuline menuList={drink} />
          <StoreImageSection />
          <HomeMenuBenner />
          <BottomMenu />
        </Wrapper>
      </TransitionContainer>
    </div>
  );
};

export default Home;
