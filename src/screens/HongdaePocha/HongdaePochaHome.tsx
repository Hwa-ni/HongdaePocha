import React from "react";
import Topmenu from "./HongdaePocha_Topmenu";
import Photoline from "./HongdaePocha_Photoline";
import ButteredMenuline from "./HongdaePocha_Menuline";
import BottomMenu from "./HongdaePocha_BottomMenu";
import Buttered_insta from "./HongdaePocha_insta";
import { TransitionContainer } from "./animation/TransitionContainer";
import { menuData } from "./Menu/Buttered_Menu_list";
import styled from "styled-components";

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 50px;
  color: #333;
`;


const Home: React.FC = () => {
  return (
    <div>
      <TransitionContainer>
      <Topmenu />
      <Photoline />
      <Title>Drink Menu</Title>
      <ButteredMenuline menuList={menuData.filter(item => item.category === "DRINK").map(item => ({ ...item, id: String(item.id) }))} />
      <Title>Bread Menu</Title>
      <ButteredMenuline menuList={menuData.filter(item => item.category === "BREAD").map(item => ({ ...item, id: String(item.id) }))} />
      <Title><i className="fi fi-brands-instagram" /> Our Instagram</Title>
      <Buttered_insta />
      <BottomMenu />
      </TransitionContainer>

    </div>
  );
};

export default Home;
