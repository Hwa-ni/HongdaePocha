import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
  grid-template-areas: 
    "card1 card2 card2"
    "whats-new whats-new ad";
  justify-content: center;
  align-content: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas: 
      "card1"
      "card2"
      "whats-new"
      "ad";
  }
`;

const Card = styled.div`
  border-radius: 20px;
  padding: 40px;
  color: white;
  position: relative;
  overflow: hidden;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  
  @media (max-width: 768px) {
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
  font-size: 14px;
  border-radius: 20px 0 0 20px;
`;

const Card2Content = styled.div`
  width: 55%;
  height: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; // 상단 정렬로 변경
  align-items: flex-end; // 가로 오른쪽 정렬로 변경
  text-align: right; // 텍스트를 오른쪽으로 정렬
  padding: 35px; // 오른쪽 상단 패딩을 위해 15px로 변경
  
  @media (max-width: 768px) {
    padding: 30px;
    width: 100%;
    text-align: center;
    align-items: center;
  }
`;

const CardButton = styled.a` // button을 a로 변경
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: white;
  padding: 12px 25px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
  margin-top: 20px;
  text-decoration: none; // 밑줄 제거
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.8);
  }
`;

const CardTitle = styled.div`
  font-size: 28px;
  font-weight: bold;
  line-height: 1.3;
  margin-bottom: 30px;
  
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
          Make a reservation<br />
          Before your visit
        </CardTitle>
        <CardButton href="https://www.opentable.com.au/r/hongdae-pocha-sydney-reservations-chippendale?restref=298547&lang=en-AU&ot_source=Restaurant%20website">Reservation</CardButton>
      </Card1>

      {/* Right Card - Now spans 2 columns with image area */}
      <Card2>
        <Card2ImageArea style={{backgroundImage: 'url(/assets/HongdaePocha/HongdaePocha_store_image/0I0A8295.jpg)'}}>
        </Card2ImageArea>
        <Card2Content>
          <CardTitle>
            Explore diverse<br />
            Hongdae Pocha Menus
          </CardTitle>
          <CardButton href="/MainMenu">View menu</CardButton>
        </Card2Content>
      </Card2>
    </Container>
  );
};

export default HomeMenuBenner;