import React from "react";
import styled from "styled-components";

// 뷰포트 너비를 기준으로 모든 단위를 유동적으로 변경
const Container = styled.div`
  width: 90vw;
  margin: 0 auto;
  padding: 2.5vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 1.5vw;
  grid-template-areas:
    "card1 card2 card2"
    "whats-new whats-new ad";
  justify-content: center;
  align-content: center;

  @media (max-width: 768px) {
    width: 95vw;
    grid-template-columns: 1fr;
    grid-template-areas:
      "card1"
      "card2"
      "whats-new"
      "ad";
  }
`;

const Card = styled.div`
  border-radius: 1.5vw;
  padding: 3vw;
  color: white;
  position: relative;
  overflow: hidden;
  min-height: 12vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    border-radius: 20px;
    padding: 30px;
    min-height: 200px;
  }
`;

const Card1 = styled(Card)`
  grid-area: card1;
  background: linear-gradient(135deg, #9c1f24, #6b1519);
`;

const Card2 = styled(Card)`
  grid-area: card2;
  background: linear-gradient(135deg, #ff8500, #ff6b00);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex-direction: row;
  align-items: stretch;
  text-align: left;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const Card2ImageArea = styled.div`
  width: 45%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1vw;
  border-radius: 1.5vw 0 0 1.5vw;

  @media (max-width: 768px) {
    display: none; // 모바일에서는 이미지 영역을 숨깁니다.
  }
`;

const Card2Content = styled.div`
  width: 55%;
  height: 100%;
  padding: 3vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  text-align: right;

  @media (max-width: 768px) {
    padding: 30px;
    width: 100%;
    text-align: center;
    align-items: center;
  }
`;

const CardButton = styled.a`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: white;
  padding: 0.8vw 1.5vw;
  border-radius: 2vw;
  font-size: 1vw;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
  margin-top: 1.5vw;
  text-decoration: none;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 768px) {
    font-size: 16px; // 모바일에서는 픽셀 고정
    padding: 12px 25px; // 모바일에서는 픽셀 고정
    border-radius: 25px; // 모바일에서는 픽셀 고정
    margin-top: 20px;
  }
`;

const CardTitle = styled.div`
  font-size: 2vw;
  font-weight: bold;
  line-height: 1.3;
  margin-bottom: 2vw;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const HomeMenuBenner: React.FC = () => {
  return (
    <Container>
      {/* Left Card */}
      <Card1>
        <CardTitle>
          Make a reservation
          <br />
          Before your visit
        </CardTitle>
        <CardButton href="https://www.opentable.com.au/r/hongdae-pocha-sydney-reservations-chippendale?restref=298547&lang=en-AU&ot_source=Restaurant%20website">
          Reservation
        </CardButton>
      </Card1>

      {/* Right Card - Now spans 2 columns with image area */}
      <Card2>
        <Card2ImageArea
          style={{
            backgroundImage:
              "url(/assets/HongdaePocha/HongdaePocha_store_image/0I0A8295.jpg)",
          }}
        ></Card2ImageArea>
        <Card2Content>
          <CardTitle>
            Explore diverse
            <br />
            Hongdae Pocha Menus
          </CardTitle>
          <CardButton href="/MainMenu">View menu</CardButton>
        </Card2Content>
      </Card2>
    </Container>
  );
};

export default HomeMenuBenner;
