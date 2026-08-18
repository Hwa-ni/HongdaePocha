import React from "react";
import styled from "styled-components";

const STORE_NAME = "Hongdae Pocha BBQ Sydney";
const STORE_ADDRESS = "5 Central Park Ave, Chippendale NSW 2008";
const MAP_EMBED_URL =
  "https://www.google.com/maps?q=Hongdae+Pocha+BBQ+Sydney%2C+5+Central+Park+Ave%2C+Chippendale+NSW+2008&output=embed";
const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Hongdae+Pocha+BBQ+Sydney%2C+5+Central+Park+Ave%2C+Chippendale+NSW+2008&travelmode=driving&dir_action=navigate";

const StoreImageSection: React.FC = () => {
  return (
    <SectionContainer id="location">
      <MapCard>
        <MapWrapper>
          <MapFrame
            src={MAP_EMBED_URL}
            title={`${STORE_NAME} location on Google Maps`}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
          <MapLabel>
            <Title>Find Hongdae Pocha</Title>
            <Description>{STORE_ADDRESS}</Description>
          </MapLabel>
        </MapWrapper>

        <BottomInfoBar>
          <InfoSection>
            <IconContainer aria-hidden="true">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 21s7-5.1 7-12a7 7 0 10-14 0c0 6.9 7 12 7 12z"
                />
                <circle cx="12" cy="9" r="2.5" strokeWidth={2} />
              </svg>
            </IconContainer>
            <InfoText>
              <h4>{STORE_NAME}</h4>
              <p>{STORE_ADDRESS}</p>
            </InfoText>
          </InfoSection>

          <DirectionsButton
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions on Google Maps
          </DirectionsButton>
        </BottomInfoBar>
      </MapCard>
    </SectionContainer>
  );
};

export default StoreImageSection;

const SectionContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  background: #1a1a1a;
  min-height: 80vh;
  scroll-margin-top: 88px;
`;

const MapCard = styled.div`
  width: 80vw;
  background: #161616;
  border: 1px solid rgba(241, 250, 238, 0.07);
  border-radius: 24px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    width: 92vw;
    border-radius: 16px;
  }
`;

const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  background: #242424;

  @media (min-width: 768px) {
    height: 500px;
  }
`;

const MapFrame = styled.iframe`
  width: 100%;
  height: 100%;
  display: block;
  border: 0;
`;

const MapLabel = styled.div`
  position: absolute;
  left: 20px;
  bottom: 20px;
  max-width: calc(100% - 40px);
  padding: 14px 18px;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  background: rgba(22, 22, 22, 0.82);
  color: #f1faee;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.36);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  pointer-events: none;
`;

const Title = styled.h3`
  margin: 0 0 4px;
  color: #f1faee;
  font-family: var(--font-headline);
  font-size: clamp(1.25rem, 3vw, 2rem);
  font-weight: 700;
  line-height: 1.2;
`;

const Description = styled.p`
  margin: 0;
  color: rgba(241, 250, 238, 0.82);
  font-family: var(--font-body);
  font-size: 0.9rem;
  line-height: 1.45;
`;

const BottomInfoBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 24px;
  background: #161616;
  border-top: 1px solid rgba(241, 250, 238, 0.08);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 18px;
  }
`;

const InfoSection = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  flex: 0 0 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d4a373;
  background: #1f1f1f;
  border: 1px solid rgba(212, 163, 115, 0.2);
  border-radius: 50%;
`;

const InfoText = styled.div`
  min-width: 0;

  h4 {
    margin: 0 0 4px;
    color: #b0b0b0;
    font-size: 0.875rem;
  }

  p {
    margin: 0;
    color: #e0e0e0;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.4;
  }
`;

const DirectionsButton = styled.a`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 12px 24px;
  box-sizing: border-box;
  border-radius: 24px;
  background: #e63946;
  color: #f1faee;
  font-family: var(--font-body);
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(230, 57, 70, 0.25);
  transition: transform 0.2s ease, background-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: #f24b58;
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(230, 57, 70, 0.4);
  }

  &:focus-visible {
    outline: 2px solid #f1faee;
    outline-offset: 3px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
