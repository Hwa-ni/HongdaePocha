import React from "react";
import styled from "styled-components";
import Topmenu from "../HongdaePocha_Topmenu";
import BottomMenu from "../HongdaePocha_BottomMenu";
import raw from "../../../language/Eng_Aust.json";
import { TransitionContainer } from "../animation/TransitionContainer";
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
      
      {/* Hero Section with Image and Story Overlay */}
      <HeroSection>
        <HeroImage>
          <img
            src={process.env.PUBLIC_URL + "/assets/HongdaePocha/HongdaePocha_store_image/0I0A9058.jpg"}
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
      </HeroSection>

      {/* Second Story Section */}
      <SecondHeroSection>
        <SecondHeroImage>
          <img
            src={process.env.PUBLIC_URL + "/assets/HongdaePocha/HongdaePocha_store_image/0I0A9027.jpg"}
            alt="Second Story"
          />
          <SecondHeroOverlay />
        </SecondHeroImage>
        
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

      {/* Featured Products Section */}
      <FeaturedSection>
        <SectionTitle>{en.about?.featured?.title}</SectionTitle>
        <FeaturedGrid>
          <FeaturedItem>
            <FeaturedImage>
              <img 
                src={process.env.PUBLIC_URL + "/assets/Buttered/dessert_image/SignatureBread.jpg"} 
                alt="Featured Product 1" 
              />
            </FeaturedImage>
            <FeaturedTitle>{en.about?.featured?.item1?.title}</FeaturedTitle>
            <FeaturedDescription>
              {en.about?.featured?.item1?.description}
            </FeaturedDescription>
          </FeaturedItem>
          
          <FeaturedItem>
            <FeaturedImage>
              <img 
                src={process.env.PUBLIC_URL + "/assets/Buttered/dessert_image/MadeWithLoves.jpg"} 
                alt="Featured Product 2" 
              />
            </FeaturedImage>
            <FeaturedTitle>{en.about?.featured?.item2?.title}</FeaturedTitle>
            <FeaturedDescription>
              {en.about?.featured?.item2?.description}
            </FeaturedDescription>
          </FeaturedItem>
          
          <FeaturedItem>
            <FeaturedImage>
              <img 
                src={process.env.PUBLIC_URL + "/assets/Buttered/dessert_image/CustomCakes.jpg"} 
                alt="Featured Product 3" 
              />
            </FeaturedImage>
            <FeaturedTitle>{en.about?.featured?.item3?.title}</FeaturedTitle>
            <FeaturedDescription>
              {en.about?.featured?.item3?.description}
            </FeaturedDescription>
          </FeaturedItem>
        </FeaturedGrid>
      </FeaturedSection>

      {/* Values Section */}
      <ValuesSection>
        <SectionTitle>{en.about?.values?.title}</SectionTitle>
        <ValuesGrid>
          <ValueItem>
            <img 
                src={process.env.PUBLIC_URL + "/assets/Buttered/Buttered_logo/About_image_1.svg"} 
                alt="Featured Product 1" 
              />
            <ValueTitle>{en.about?.values?.quality?.title}</ValueTitle>
            <ValueDescription>
              {en.about?.values?.quality?.description}
            </ValueDescription>
          </ValueItem>
          
          <ValueItem>
            <img 
                src={process.env.PUBLIC_URL + "/assets/Buttered/Buttered_logo/About_image_2.png"} 
                alt="Featured Product 2" 
              />
            <ValueTitle>{en.about?.values?.passion?.title}</ValueTitle>
            <ValueDescription>
              {en.about?.values?.passion?.description}
            </ValueDescription>
          </ValueItem>
          
          <ValueItem>
            <img 
                src={process.env.PUBLIC_URL + "/assets/Buttered/Buttered_logo/About_image_3.svg"} 
                alt="Featured Product 3" 
              />
            <ValueTitle>{en.about?.values?.creativity?.title}</ValueTitle>
            <ValueDescription>
              {en.about?.values?.creativity?.description}
            </ValueDescription>
          </ValueItem>
        </ValuesGrid>
      </ValuesSection>
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

// New Hero Section Styles
const HeroSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 5%;
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

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  max-width: 800px;
  padding: 40px 40px 40px 80px;
  text-align: left;
  color: white;
  margin-left: 0;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// Second Hero Section Styles (똑같은 스타일)
const SecondHeroSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 5%;
`;

const SecondHeroImage = styled.div`
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

const SecondHeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const SecondHeroContent = styled.div`
  position: relative;
  z-index: 10;
  max-width: 800px;
  padding: 40px 80px 40px 40px;
  text-align: right;
  color: white;
  margin-right: 0;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SecondStoryText = styled.div`
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  text-align: right;
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
`;

const TopTextSection = styled.section`
  height: auto;
  min-height: 0;
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 5px;
`;

const StorySection = styled.section`
  padding: 30px 5%;
  max-width: 1200px;
  margin: 0 auto;
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
`;

const StoryContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
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
`;

const StoryImage = styled.div`
  display: flex;
  justify-content: flex-end;

  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const FeaturedSection = styled.section`
  padding: 80px 5%;
  background-color: #f8f8f8;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeaturedItem = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeaturedImage = styled.div`
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
`;

const FeaturedTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: bold;
  margin: 20px 20px 10px;
  color: #333;
`;

const FeaturedDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0 20px 20px;
  line-height: 1.6;
`;

const ValuesSection = styled.section`
  padding: 80px 5%;
  max-width: 1200px;
  margin: 0 auto;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
`;

const ValueItem = styled.div`
  text-align: center;
  padding: 30px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);

  img {
    width: 300px;
    height: 300px;
    object-fit: contain;
    margin-bottom: 20px;
  }
`;

const ValueTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
`;

const ValueDescription = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
`;

const CTASection = styled.section`
  padding: 80px 5%;
  background: #3a3a3a;
  text-align: center;
`;

const CTAContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const CTADescription = styled.p`
  font-size: 1.2rem;
  color: white;
  margin-bottom: 30px;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const CTAButton = styled.button`
  background-color: #ff6b8a;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #ff5577;
    transform: translateY(-2px);
  }
`;

const CenteredImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0;

  img {
    max-width: 100%;
    height: auto;
  }
`;