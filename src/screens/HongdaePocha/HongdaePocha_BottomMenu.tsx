import React from "react";
import styled from "styled-components";
import en from "../../language/Eng_Aust.json";

const openingHours = [
  ["Monday", "5:00 pm – 10:00 pm"],
  ["Tuesday", "Closed"],
  ["Wednesday", "5:00 pm – 10:00 pm"],
  ["Thursday", "5:00 pm – 10:00 pm"],
  ["Friday", "5:00 pm – 11:00 pm"],
  ["Saturday", "5:00 pm – 11:00 pm"],
  ["Sunday", "5:00 pm – 9:30 pm"],
];

const kitchenHours = [
  ["Monday", "5:00 pm – 9:00 pm"],
  ["Tuesday", "Closed"],
  ["Wednesday", "5:00 pm – 9:00 pm"],
  ["Thursday", "5:00 pm – 9:00 pm"],
  ["Friday", "5:00 pm – 10:00 pm"],
  ["Saturday", "5:00 pm – 10:00 pm"],
  ["Sunday", "5:00 pm – 8:30 pm"],
];

const BottomMenu = () => {
  return (
    <Wrapper>
      <ContactSection>
        <Line>
          <strong>{en.bottommenu?.title}</strong>
        </Line>
        <Line>
          <a
            href={`https://www.google.com/maps/place/Hongdae+Pocha+BBQ+Sydney/@-33.885214,151.1992794,19z/data=!3m1!4b1!4m6!3m5!1s0x6b12af4b2e862453:0xfbef67412c282063!8m2!3d-33.885214!4d151.1999231!16s%2Fg%2F11xgjvyh86?entry=ttu&g_ep=EgoyMDI1MDgyNC4wIKXMDSoASAFQAw%3D%3D || "")}`}
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
            href={`https://instagram.com/${en.bottommenu?.instagram?.replace(
              /^@/,
              ""
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {en.bottommenu?.instagram}
          </a>
        </Line>
        <Line>
          <a href={`mailto:${en.bottommenu?.email}`}>{en.bottommenu?.email}</a>
        </Line>
      </ContactSection>

      <HoursSection>
        <HoursHeader>
          <HoursTitle>Opening Hours</HoursTitle>
          <EffectiveDate>Effective from 21 September</EffectiveDate>
        </HoursHeader>
        <HoursList>
          {openingHours.map(([day, hours]) => (
            <HoursRow key={day}>
              <Day>{day}</Day>
              <Time $closed={hours === "Closed"}>{hours}</Time>
            </HoursRow>
          ))}
        </HoursList>
      </HoursSection>

      <HoursSection>
        <HoursHeader>
          <HoursTitle>Kitchen Hours</HoursTitle>
        </HoursHeader>
        <HoursList>
          {kitchenHours.map(([day, hours]) => (
            <HoursRow key={day}>
              <Day>{day}</Day>
              <Time $closed={hours === "Closed"}>{hours}</Time>
            </HoursRow>
          ))}
        </HoursList>
      </HoursSection>

      <LogoSection>
        <img
          src={
            process.env.PUBLIC_URL +
            "/assets/HongdaePocha/HongdaePocha_logo/mainlogo4.png"
          }
          alt="Logo"
        />
      </LogoSection>
    </Wrapper>
  );
};

export default BottomMenu;

const Wrapper = styled.footer`
  display: grid;
  grid-template-columns: minmax(230px, 1.25fr) repeat(2, minmax(230px, 1fr)) auto;
  gap: 48px;
  align-items: start;
  padding: 48px 60px;
  background-color: #1A1A1A;
  border-top: 1px solid rgba(212, 163, 115, 0.22);

  @media (max-width: 1360px) {
    grid-template-columns: minmax(220px, 1.2fr) repeat(2, minmax(220px, 1fr));
    gap: 40px;
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 40px 48px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 34px;
    padding: 36px 24px;
  }
`;

const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 900px) {
    grid-column: 1 / -1;
  }

  @media (max-width: 640px) {
    grid-column: auto;
  }
`;

const Line = styled.p`
  margin: 4px 0;
  font-family: var(--font-body);
  font-size: 14px;
  color: #D4A373;

  strong {
    color: #E63946;
  }

  a {
    color: #E63946;
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

const HoursSection = styled.section`
  width: 100%;
  max-width: 310px;

  @media (max-width: 640px) {
    max-width: 420px;
  }
`;

const HoursHeader = styled.div`
  min-height: 48px;
  margin-bottom: 14px;
`;

const HoursTitle = styled.h3`
  margin: 0;
  color: #E63946;
  font-family: var(--font-headline);
  font-size: 17px;
  line-height: 1.3;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const EffectiveDate = styled.p`
  margin: 5px 0 0;
  color: #D4A373;
  font-family: var(--font-body);
  font-size: 12px;
  line-height: 1.35;
`;

const HoursList = styled.div`
  display: grid;
  gap: 8px;
`;

const HoursRow = styled.div`
  display: grid;
  grid-template-columns: minmax(88px, 1fr) auto;
  gap: 18px;
  align-items: baseline;
  font-family: var(--font-body);
  font-size: 13px;
  line-height: 1.4;
`;

const Day = styled.span`
  color: #F1FAEE;
`;

const Time = styled.span<{ $closed?: boolean }>`
  color: ${({ $closed }) => ($closed ? "#E63946" : "#D4A373")};
  font-weight: ${({ $closed }) => ($closed ? 600 : 400)};
  text-align: right;
  white-space: nowrap;
`;

const LogoSection = styled.div`
  align-self: center;

  img {
    width: 180px;
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: 0;
  }

  @media (max-width: 1360px) {
    display: none;
  }
`;
