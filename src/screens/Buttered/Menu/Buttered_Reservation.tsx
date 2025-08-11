import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Buttered_Topmenu from "../Buttered_Topmenu";
import texts from "../../../language/Eng_Aust.json";
import BottomMenu from "../Buttered_BottomMenu";
import { TransitionContainer } from "../animation/TransitionContainer";

interface ReservationData {
  date: string;
  time: string;
  customerName: string;
  phone: string;
  specialRequests: string;
}

const Buttered_Reservation = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [specialRequests, setSpecialRequests] = useState<string>("");

  // 날짜 생성 (오늘부터 1주일간)
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) { // 1주일 (오늘 포함 7일)
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayName = dayNames[date.getDay()];
      
      dates.push({
        value: date.toISOString().split('T')[0],
        display: `${month}/${day}`,
        dayName: dayName
      });
    }
    return dates;
  };

  const dates = generateDates();

  // 시간 슬롯 생성 (영업 시간 1시간 단위)
  const generateTimeSlots = () => {
    const slots = [];
    const businessHoursStart = 10; // 10:00
    const businessHoursEnd = 22;   // 22:00

    for (let hour = businessHoursStart; hour < businessHoursEnd; hour++) {
      const timeString = `${String(hour).padStart(2, '0')}:00 - ${String(hour + 1).padStart(2, '0')}:00`;
      slots.push({
        time: timeString,
        available: true // 모든 시간 슬롯은 기본적으로 사용 가능하다고 가정 (추후 API를 통해 상태 업데이트 가능)
      });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !customerName || !phone) {
      alert(texts.messages.requiredFields);
      return;
    }

    const reservationData: ReservationData = {
      date: selectedDate,
      time: selectedTime,
      customerName,
      phone,
      specialRequests
    };

    try {
      const response = await fetch('/api/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        alert(texts.messages.reservationComplete);
        // 성공 후 필드 초기화 또는 페이지 이동
        setSelectedDate("");
        setSelectedTime("");
        setCustomerName("");
        setPhone("");
        setSpecialRequests("");
      } else {
        const errorData = await response.json();
        alert(`예약 실패: ${errorData.message || '알 수 없는 오류'}`);
      }
    } catch (error) {
      console.error("예약 요청 중 오류 발생:", error);
      alert("예약 중 문제가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <TransitionContainer>
    <Container>
      <Buttered_Topmenu />
      
      <ContentWrapper>
        <ReservationContainer>
          <LeftSection>
            <Title>{texts.reservation.title}</Title>
            
            {/* 날짜 선택 */}
            <Section>
              <SectionTitle>{texts.reservation.dateSelection}</SectionTitle>
              <DateGrid>
                {dates.map((date, index) => (
                  <DateButton
                    key={date.value}
                    $selected={selectedDate === date.value}
                    onClick={() => setSelectedDate(date.value)}
                  >
                    <DateNumber>{date.display}</DateNumber>
                    <DayName>{date.dayName}</DayName>
                  </DateButton>
                ))}
              </DateGrid>
            </Section>

            {/* 시간 선택 */}
            <Section>
              <SectionTitle>{texts.reservation.timeSelection}</SectionTitle>
              <TimeGrid>
                {timeSlots.map((slot, index) => (
                  <TimeButton
                    key={slot.time}
                    $selected={selectedTime === slot.time}
                    $available={slot.available}
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                    disabled={!slot.available}
                  >
                    {slot.time}
                  </TimeButton>
                ))}
              </TimeGrid>
              <TimeStatus>
                <StatusItem>
                  <StatusDot $color="#ff69b4" />
                  <span>{texts.status.selected}</span>
                </StatusItem>
                <StatusItem>
                  <StatusDot $color="#333" />
                  <span>{texts.status.available}</span>
                </StatusItem>
                <StatusItem>
                  <StatusDot $color="#ccc" />
                  <span>{texts.status.unavailable}</span>
                </StatusItem>
              </TimeStatus>
            </Section>

            {/* 예약자 정보 */}
            <Section>
              <SectionTitle>{texts.reservation.customerInfo}</SectionTitle>
              <InputGroup>
                <Label>{texts.form.name} *</Label>
                <Input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={texts.form.namePlaceholder}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label>{texts.form.phone} *</Label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={texts.form.phonePlaceholder}
                  required
                />
              </InputGroup>
            </Section>

            {/* 요청사항 */}
            <Section>
              <SectionTitle>{texts.reservation.specialRequests}</SectionTitle>
              <TextArea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder={texts.form.specialRequestsPlaceholder}
                rows={4}
              />
            </Section>
          </LeftSection>

          <RightSection>
            <SummaryCard>
              <SummaryTitle>{texts.reservation.selected}</SummaryTitle>
              
              <SummaryItem>
                <SummaryLabel>{texts.reservation.location}</SummaryLabel>
                <SummaryValue>
                  <LocationName>{texts.location.guui}</LocationName>
                  <LocationAddress>{texts.location.address}</LocationAddress>
                  <LocationDetail>{texts.location.detail}</LocationDetail>
                </SummaryValue>
              </SummaryItem>

              <SummaryItem>
                <SummaryLabel>{texts.reservation.businessHours}</SummaryLabel>
                <SummaryValue>{texts.time.businessHours}</SummaryValue>
              </SummaryItem>
              
              <SummaryItem>
                <SummaryLabel>{texts.reservation.lastOrder}</SummaryLabel>
                <SummaryValue>{texts.time.lastOrder}</SummaryValue>
              </SummaryItem>

              <SummaryItem>
                <SummaryLabel>{texts.reservation.service}</SummaryLabel>
                <SummaryValue>{texts.service.takeout} | {texts.service.dineIn}</SummaryValue>
              </SummaryItem>

              {/* 선택된 예약 정보 표시 */}
              {(selectedDate || selectedTime) && (customerName || phone || specialRequests) && (
                <ReservationInfo>
                  <ReservationTitle>{texts.reservation.reservationInfo}</ReservationTitle>
                  {selectedDate && (
                    <ReservationDetail>
                      <ReservationLabel>Date</ReservationLabel>
                      <ReservationValue>{selectedDate}</ReservationValue>
                    </ReservationDetail>
                  )}
                  {selectedTime && (
                    <ReservationDetail>
                      <ReservationLabel>Time</ReservationLabel>
                      <ReservationValue>{selectedTime}</ReservationValue>
                    </ReservationDetail>
                  )}
                  {customerName && (
                    <ReservationDetail>
                      <ReservationLabel>{texts.form.name}</ReservationLabel>
                      <ReservationValue>{customerName}</ReservationValue>
                    </ReservationDetail>
                  )}
                  {phone && (
                    <ReservationDetail>
                      <ReservationLabel>{texts.form.phone}</ReservationLabel>
                      <ReservationValue>{phone}</ReservationValue>
                    </ReservationDetail>
                  )}
                  {specialRequests && (
                    <ReservationDetail>
                      <ReservationLabel>{texts.reservation.specialRequests}</ReservationLabel>
                      <ReservationValue>{specialRequests}</ReservationValue>
                    </ReservationDetail>
                  )}
                </ReservationInfo>
              )}

              <MenuSection>
                <PriceSection>
                  <PriceRow>
                    <PriceLabel>{texts.price.productPrice}</PriceLabel>
                    <PriceValue>0.00</PriceValue> {/* 실제 메뉴 가격을 여기에 표시 */}
                  </PriceRow>
                  <PriceRow>
                    <PriceLabel>{texts.price.deliveryFee}</PriceLabel>
                    <PriceValue>{texts.price.free}</PriceValue>
                  </PriceRow>
                  <TotalPriceRow>
                    <TotalLabel>{texts.price.totalPrice}</TotalLabel>
                    <TotalPrice>0.00</TotalPrice> {/* 총 가격을 여기에 표시 */}
                  </TotalPriceRow>
                </PriceSection>
                
                <CompleteButton onClick={handleSubmit}>
                  {texts.reservation.completeReservation}
                </CompleteButton>
              </MenuSection>
            </SummaryCard>
          </RightSection>
        </ReservationContainer>
      </ContentWrapper>
      <BottomMenu />
    </Container>
    </TransitionContainer>
  );
};

export default Buttered_Reservation;

// Styled Components (이 부분은 변경됨)
const Container = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ReservationContainer = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  max-width: 700px;
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  height: fit-content;
`;

const RightSection = styled.div`
  width: 450px;
  
  @media (max-width: 1024px) {
    width: 100%;
    max-width: 450px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 40px;
  text-align: center;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
`;

const DateGrid = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 15px;
  justify-content: center; /* 중앙 정렬 추가 */
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
`;

const DateButton = styled.button<{ $selected: boolean }>`
  min-width: 80px;
  height: 80px;
  border: 2px solid ${props => props.$selected ? '#ff69b4' : '#e0e0e0'};
  background: ${props => props.$selected ? '#ff69b4' : 'white'};
  color: ${props => props.$selected ? 'white' : '#333'};
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  &:hover {
    border-color: #ff69b4;
    transform: translateY(-2px);
  }
`;

const DateNumber = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const DayName = styled.div`
  font-size: 14px;
  margin-top: 4px;
`;

const TimeGrid = styled.div`
  display: grid; /* Flex 대신 Grid 사용 */
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); /* 한 줄에 5개 (최대 5개) */
  gap: 12px;
  justify-items: center; /* 그리드 아이템 중앙 정렬 */
  max-width: 100%; /* 부모 너비에 맞춤 */

  /* 모바일 화면에서 컬럼 수 조절 */
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); /* 화면이 작아지면 컬럼 수 줄임 */
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); /* 더 작은 화면 */
  }
`;

const TimeButton = styled.button<{ $selected: boolean; $available: boolean }>`
  width: 100%; /* 그리드 셀에 꽉 차도록 설정 */
  aspect-ratio: 1 / 1; /* 정사각형 유지 */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px; /* 내부 여백 조절 */
  border: 2px solid ${props => props.$selected ? '#ff69b4' : '#e0e0e0'};
  background: ${props => props.$selected ? '#ff69b4' : 'white'};
  color: ${props => props.$selected ? 'white' : '#333'};
  border-radius: 12px;
  cursor: ${props => props.$available ? 'pointer' : 'not-allowed'};
  transition: all 0.3s ease;
  font-size: 14px; /* 텍스트 크기 조절 */
  font-weight: 500;
  opacity: ${props => props.$available ? 1 : 0.5};
  text-align: center; /* 텍스트 중앙 정렬 */
  white-space: normal; /* 텍스트가 줄 바꿈 되도록 설정 */
  
  &:hover {
    border-color: ${props => props.$available ? '#ff69b4' : '#e0e0e0'};
    transform: ${props => props.$available ? 'translateY(-2px)' : 'none'};
  }
`;

const TimeStatus = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 15px;
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
`;

const StatusDot = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.$color};
`;

const InputGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #ff69b4;
  }
  
  &::placeholder {
    color: #999;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 16px;
  resize: vertical;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #ff69b4;
  }
  
  &::placeholder {
    color: #999;
  }
`;

const SummaryCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 20px;
`;

const SummaryTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 25px;
  text-align: center;
`;

const SummaryItem = styled.div`
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SummaryLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #ff69b4;
  margin-bottom: 8px;
`;

const SummaryValue = styled.div`
  font-size: 14px;
  color: #333;
  line-height: 1.5;
`;

const LocationName = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
`;

const LocationAddress = styled.div`
  color: #666;
  margin-bottom: 2px;
`;

const LocationDetail = styled.div`
  color: #666;
`;

const ReservationInfo = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
`;

const ReservationTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
`;

const ReservationDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ReservationLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

const ReservationValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const MenuSection = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px solid #f0f0f0;
`;

const PriceSection = styled.div`
  margin: 20px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const PriceLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

const PriceValue = styled.span`
  font-size: 14px;
  color: #333;
`;

const TotalPriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #e0e0e0;
`;

const TotalLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const TotalPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #ff69b4;
`;

const CompleteButton = styled.button`
  width: 100%;
  padding: 18px;
  background: #ffeb3b;
  color: #333;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #fdd835;
    transform: translateY(-2px);
  }
`;
