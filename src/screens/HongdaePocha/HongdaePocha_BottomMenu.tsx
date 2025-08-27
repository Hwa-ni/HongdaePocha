import React from "react";
import styled from "styled-components";
import en from "../../language/Eng_Aust.json";

const BottomMenu = () => {
  return (
    <Wrapper>
      <TextSection>
        <Line><strong>{en.bottommenu?.title}</strong></Line>
        <Line>
          <a
            href={`https://www.google.com/maps/place/Buttered+Bakery+%26+Cafe/@-33.8852129,151.1987054,19z/data=!3m1!4b1!4m6!3m5!1s0x6b12afd5e5b12d91:0x820358e326161bf5!8m2!3d-33.885214!4d151.1999231!16s%2Fg%2F11x2slnvpz?entry=ttu&g_ep=EgoyMDI1MDcxMy4wIKXMDSoASAFQAw%3D%3D || "")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {en.bottommenu?.location}
          </a>
        </Line>
        <Line>
          <a href={`tel:${en.bottommenu?.number}`}>{en.bottommenu?.number}</a>
        </Line>
        <Line>
          <a
            href={`https://instagram.com/${en.bottommenu?.instagram?.replace(/^@/, "")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {en.bottommenu?.instagram}
          </a>
        </Line>
        <Line>
          <a href={`mailto:${en.bottommenu?.email}`}>{en.bottommenu?.email}</a>
        </Line>
        <Line>{en.bottommenu?.group}</Line>
      </TextSection>
      <LogoSection>
        <img
          src={process.env.PUBLIC_URL + "/assets/Buttered/Buttered_logo/MainLogo3.png"}
          alt="Logo"
        />
      </LogoSection>
    </Wrapper>
  );
};

export default BottomMenu;

const Wrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 60px;
  background-color: #f9f9f9;

  @media (max-width: 768px) {
    justify-content: center;
    padding: 20px 30px;
  }
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Line = styled.p`
  margin: 4px 0;
  font-size: 14px;
  color: #333;
  a {
    color: inherit;
    text-decoration: none;
    font-weight: normal;
    transition: font-weight 0.3s ease, opacity 0.3s ease;
  }
  a:hover {
    text-decoration: none;
    font-weight: bold;
    opacity: 0.8;
  }
`;

const LogoSection = styled.div`
  img {
    width: 180px;
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: 0;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;