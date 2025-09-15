import React from "react";
import styled from "styled-components";
import Topmenu from "../HongdaePocha_Topmenu";
import BottomMenu from "../HongdaePocha_BottomMenu";
import raw from "../../../language/Eng_Aust.json";
import { TransitionContainer } from "../animation/TransitionContainer";
import HomeMenuBenner from "../../Home_Menu";
import StoreImageSection from "../Hongdae_Pocha_StoreImage";
const en = raw as any;

const RenderWithLineBreaks = ({ text }: { text?: string }) => {
  if (!text) return null;
  return (
    <>
      {text.split(/<br\s*\/?>|\n/g).map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </>
  );
};

const Buttered_About = () => {
  return (
    <TransitionContainer>
      <Container>
        <Topmenu />

        {/* Combined Story Section with shared background image */}
        <CombinedStorySection>
          <HeroImage>
            <img
              src={
                process.env.PUBLIC_URL +
                "/assets/HongdaePocha/HongdaePocha_store_image/0I0A9058.jpg"
              }
              alt="Main Logo"
            />
            <HeroOverlay />
          </HeroImage>

          {/* Our Story Section - Now overlayed on the image */}
          <HeroContent>
            <SectionTitle>{en.about?.story?.title}</SectionTitle>
            <StoryText>
              <StoryParagraph>
                <strong>{en.about?.story?.paragraph1}</strong>
              </StoryParagraph>
              <StoryParagraph>
                <RenderWithLineBreaks text={en.about?.story?.paragraph2} />
              </StoryParagraph>
            </StoryText>
          </HeroContent>

          {/* Second Story Section (우측 정렬된 독립 섹션) */}
          <SecondHeroSection>
            <SecondHeroContent>
              <SecondStoryText>
                <SecondStoryParagraph>
                  <strong>{en.about?.story2?.paragraph1}</strong>
                </SecondStoryParagraph>
                <SecondStoryParagraph>
                  <RenderWithLineBreaks text={en.about?.story2?.paragraph2} />
                </SecondStoryParagraph>
              </SecondStoryText>
            </SecondHeroContent>
          </SecondHeroSection>

          {/* Third Story Section (좌측 정렬된 독립 섹션) */}
          <ThirdHeroSection>
            <ThirdHeroContent>
              <ThirdStoryText>
                <ThirdStoryParagraph>
                  <strong>{en.about?.story3?.paragraph1}</strong>
                </ThirdStoryParagraph>
                <ThirdStoryParagraph>
                  <RenderWithLineBreaks text={en.about?.story3?.paragraph2} />
                </ThirdStoryParagraph>
              </ThirdStoryText>
            </ThirdHeroContent>
          </ThirdHeroSection>
        </CombinedStorySection>
        <HomeMenuBenner />
        <BottomMenu />
      </Container>
    </TransitionContainer>
  );
};

export default Buttered_About;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
`;

// Combined Story Section with shared background
const CombinedStorySection = styled.div`
  position: relative;
  width: 100%;
  min-height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const HeroImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

// Hero Section with Image and Story Overlay
const HeroSection = styled.section`
  position: relative;
  z-index: 10;
  width: 100%;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 5%;

  @media (max-width: 768px) {
    min-height: 40vh;
    padding: 3%;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  max-width: 800px;
  padding: 40px;
  text-align: left;
  color: white;
  margin-left: 0;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// Overlay Image Container (첫 번째 이미지)
const OverlayImageContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 300px;
  height: 200px;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 11;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 150px;
  }
`;

// Second Hero Section Styles (우측 정렬)
const SecondHeroSection = styled.section`
  position: relative;
  z-index: 10;
  width: 100%;
  min-height: 50vh;
  display: flex; /* flexbox 사용 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: flex-end; /* 기본적으로 우측 정렬 유지 */
  padding-right: 5%;
  margin-top: 30px;

  @media (max-width: 768px) {
    min-height: 40vh;
    flex-direction: column; /* 모바일에서는 세로로 정렬 */
    padding-right: 3%;
  }
`;

// 추가된 Second Overlay Image Container (두 번째 이미지)
const SecondOverlayImageContainer = styled.div`
  position: relative;
  width: 300px; /* 이미지 너비 */
  height: 200px; /* 이미지 높이 */
  border-radius: 30px; /* 모서리 둥글게 */
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-right: 50px; /* SecondHeroContent와의 간격 */
  z-index: 11;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 150px;
    margin-right: 0; /* 모바일에서는 간격 제거 */
    margin-bottom: 20px; /* 모바일에서 텍스트와 이미지 사이 간격 */
  }
`;

const SecondHeroContent = styled.div`
  position: relative;
  z-index: 10;
  max-width: 800px;
  padding: 150px 40px 40px 40px;
  text-align: right;
  color: white;
  margin-right: 0;

  @media (max-width: 768px) {
    padding: 20px;
    text-align: center; /* 모바일에서 텍스트 중앙 정렬 */
  }
`;

const SecondStoryText = styled.div`
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  text-align: right;

  @media (max-width: 768px) {
    text-align: center; /* 모바일에서 텍스트 중앙 정렬 */
  }
`;

const SecondStoryParagraph = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: white;
  margin-bottom: 20px;
  font-weight: normal;
  text-align: right;

  strong {
    font-weight: bold;
    font-size: 50px;
  }

  @media (max-width: 768px) {
    strong {
      font-size: 24px;
    }
    text-align: center; /* 모바일에서 텍스트 중앙 정렬 */
  }
`;

// Third Hero Section Styles (좌측 정렬)
const ThirdHeroSection = styled.section`
  position: relative;
  z-index: 10;
  width: 100%;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 5%;
  margin-top: 30px;

  @media (max-width: 768px) {
    min-height: 40vh;
    flex-direction: column; /* 모바일에서는 세로로 정렬 */
    padding-left: 3%;
  }
`;

// 추가된 Third Overlay Image Container (세 번째 이미지)
const ThirdOverlayImageContainer = styled.div`
  position: relative;
  width: 300px; /* 이미지 너비 */
  height: 200px; /* 이미지 높이 */
  border-radius: 30px; /* 모서리 둥글게 */
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-left: 50px; /* ThirdHeroContent와의 간격 */
  z-index: 11;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 150px;
    margin-left: 0; /* 모바일에서는 간격 제거 */
    margin-top: 20px; /* 모바일에서 텍스트와 이미지 사이 간격 */
  }
`;

const ThirdHeroContent = styled.div`
  position: relative;
  z-index: 10;
  max-width: 800px;
  padding: 150px 40px 40px 40px;
  text-align: left;
  color: white;
  margin-left: 0;

  @media (max-width: 768px) {
    padding: 20px;
    text-align: center; /* 모바일에서 텍스트 중앙 정렬 */
  }
`;

const ThirdStoryText = styled.div`
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  text-align: left;

  @media (max-width: 768px) {
    text-align: center; /* 모바일에서 텍스트 중앙 정렬 */
  }
`;

const ThirdStoryParagraph = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: white;
  margin-bottom: 20px;
  font-weight: normal;
  text-align: left;

  strong {
    font-weight: bold;
    font-size: 50px;
  }

  @media (max-width: 768px) {
    strong {
      font-size: 24px;
    }
    text-align: center; /* 모바일에서 텍스트 중앙 정렬 */
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 50px;
  color: #333;

  /* White color when used in hero section */
  ${HeroContent} & {
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    font-size: 90px;
    text-align: left;
  }

  @media (max-width: 768px) {
    ${HeroContent} & {
      font-size: 32px;
    }
  }
`;

const StoryText = styled.div`
  /* White color and shadow when used in hero section */
  ${HeroContent} & {
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  }
`;

const StoryParagraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 20px;

  /* White color when used in hero section */
  ${HeroContent} & {
    color: white;
    font-size: 16px;
    font-weight: normal;
  }

  /* Bold text for strong tags in hero section */
  ${HeroContent} & strong {
    font-weight: bold;
    font-size: 40px;
  }

  @media (max-width: 768px) {
    ${HeroContent} & strong {
      font-size: 24px;
    }
  }
`;
