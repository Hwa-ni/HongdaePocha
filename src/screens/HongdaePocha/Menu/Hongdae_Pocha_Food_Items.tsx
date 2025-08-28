import React, { useState } from "react";
import styled from "styled-components";
import Topmenu from "../HongdaePocha_Topmenu";
import lang from "../../../language/Eng_Aust.json";
import { menuData } from "./Hongdae_Pocha_Menu_list";
import BottomMenu from "../HongdaePocha_BottomMenu";
import { TransitionContainer } from "../animation/TransitionContainer";

const categories = [
  lang.itemMenu.all,
  lang.itemMenu.drinks,
  lang.itemMenu.bbqgrill,
  lang.itemMenu.special,
  lang.itemMenu.Pochastaplestoshare,
  lang.itemMenu.side,
  lang.itemMenu.extras,
  lang.itemMenu.dessert,
];

const subcategories: { [key: string]: string[] } = {
  [lang.itemMenu.drinks]: [
    lang.drinkMenu.soju,
    lang.drinkMenu.beer,
    lang.drinkMenu.makgeolli,
    lang.drinkMenu.wine,
    lang.drinkMenu.kwine,
    lang.drinkMenu.cocktails,
    lang.drinkMenu.softdrink
  ],

  [lang.itemMenu.bbqgrill]: [
    lang.bbqgrillmenu.beef,
    lang.bbqgrillmenu.pork,
    lang.bbqgrillmenu.friend
  ],
};

const MenuListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(lang.itemMenu.all);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMenu = menuData.filter(item => {
    const matchesCategory =
      selectedCategory === lang.itemMenu.all || item.category === selectedCategory;
    const matchesSubCategory =
      !selectedSubCategory || item.subcategory === selectedSubCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSubCategory && matchesSearch;
  });

  return (
    <TransitionContainer>
    <PageContainer>
      <Topmenu />
      <ContentContainer>
        {/* PC 화면용 레이아웃 */}
        <SidebarContainer>
          <SearchSection>
            <SearchInput
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchSection>

          <CategorySection>
            <CategoryTitle>Categories</CategoryTitle>
            <CategoryList>
              {categories.map(category => (
                <CategoryItem
                  key={category}
                  active={selectedCategory === category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedSubCategory(null);
                  }}
                >
                  {category}
                </CategoryItem>
              ))}
            </CategoryList>

            {subcategories[selectedCategory] && (
              <>
                <SubCategoryTitle>Subcategories</SubCategoryTitle>
                <CategoryList>
                  {subcategories[selectedCategory].map(sub => (
                    <CategoryItem
                      key={sub}
                      active={selectedSubCategory === sub}
                      onClick={() =>
                        setSelectedSubCategory(prev => prev === sub ? null : sub)
                      }
                      isSub
                    >
                      {sub}
                    </CategoryItem>
                  ))}
                </CategoryList>
              </>
            )}
          </CategorySection>
        </SidebarContainer>

        {/* 모바일 화면용 레이아웃 */}
        <MobileCategorySection>
          <MobileCategoryTabsWrapper>
            <MobileCategoryTabs>
              {categories.map(category => (
                <MobileCategoryTab
                  key={category}
                  active={selectedCategory === category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedSubCategory(null);
                  }}
                >
                  {category}
                </MobileCategoryTab>
              ))}
            </MobileCategoryTabs>
            {subcategories[selectedCategory] && (
              <MobileCategoryTabs isSub>
                {subcategories[selectedCategory].map(sub => (
                  <MobileCategoryTab
                    key={sub}
                    active={selectedSubCategory === sub}
                    onClick={() =>
                      setSelectedSubCategory(prev => prev === sub ? null : sub)
                    }
                  >
                    {sub}
                  </MobileCategoryTab>
                ))}
              </MobileCategoryTabs>
            )}
          </MobileCategoryTabsWrapper>
          <MobileSearchSection>
            <SearchInput
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </MobileSearchSection>
        </MobileCategorySection>

        <MenuContainer>
          <MenuGrid>
            {filteredMenu.map(item => (
              <MenuCard key={item.id}>
                {item.isNew && <NewBadge>NEW</NewBadge>}
                {item.isHot && <HotBadge isNewVisible={item.isNew}>HOT</HotBadge>}
                {item.isIce && (
                  <IceBadge
                    isNewVisible={item.isNew}
                    isHotVisible={item.isHot}
                  >
                    ICE
                  </IceBadge>
                )}
                <MenuImageContainer>
                  <MenuImage src={item.image} alt={item.name} />
                </MenuImageContainer>
                <MenuName>{item.name}</MenuName>
              </MenuCard>
            ))}
          </MenuGrid>
        </MenuContainer>
      </ContentContainer>
      <BottomMenu />
    </PageContainer>
    </TransitionContainer>
  );
};

export default MenuListPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
`;

const ContentContainer = styled.div`
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px 10px;
    gap: 20px;
  }
`;

// --- PC 레이아웃 스타일 ---
const SidebarContainer = styled.div`
  width: 280px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  
  @media (max-width: 768px) {
    display: none; // 모바일에서는 숨김
  }
`;

const SearchSection = styled.div`
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  border: 1px solid #ddd;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  
  &:focus {
    border-color: #9c1f23;
    box-shadow: 0 0 0 2px rgba(156, 31, 35, 0.1);
  }

  @media (max-width: 768px) {
    padding: 12px 15px;
    font-size: 14px;
  }
`;

const CategorySection = styled.div`
  background: #f8f8f8;
  border-radius: 20px;
  padding: 25px;
  width: 100%;
  min-height: 400px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    display: none; // 모바일에서는 숨김
  }
`;

const CategoryTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const SubCategoryTitle = styled.h4`
  margin: 25px 0 15px 0;
  font-size: 16px;
  font-weight: bold;
  color: #666;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

const CategoryItem = styled.button<{ active: boolean; isSub?: boolean }>`
  background: ${props => props.active ? 'white' : 'transparent'};
  border: none;
  padding: 12px 15px;
  border-radius: 15px;
  font-size: ${props => props.isSub ? '14px' : '16px'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  color: ${props => props.active ? '#9c1f23' : props.isSub ? '#777' : '#333'};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;
  
  white-space: normal;
  word-break: break-word;

  &:hover {
    background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
    color: ${props => props.active ? '#9c1f23' : '#9c1f23'};
  }
`;


// --- 모바일 레이아웃 스타일 (Buttered_Food_Items.tsx 참고) ---
const MobileCategorySection = styled.div`
  display: none; // PC에서는 숨김
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    gap: 15px;
  }
`;

const MobileCategoryTabsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #f8f8f8;
  border-radius: 20px;
  padding: 10px;
  gap: 10px;
  width: 100%;

  @media (max-width: 600px) {
    padding: 8px;
  }
`;

const MobileCategoryTabs = styled.div<{ isSub?: boolean }>`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  background: transparent;
  border-radius: 0;
  padding: 0;
  gap: 10px;

  @media (max-width: 600px) {
    gap: 5px;
  }
`;

const MobileCategoryTab = styled.button<{ active: boolean }>`
  background: ${props => props.active ? 'white' : 'transparent'};
  border: none;
  padding: 10px 10px;
  border-radius: 15px;
  font-size: 16px;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  color: ${props => props.active ? '#333' : '#666'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.3)'};
  }

  @media (max-width: 600px) {
    padding: 8px 10px;
    font-size: 14px;
  }
`;

const MobileSearchSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;


const MenuContainer = styled.div`
  flex: 1;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 300px);
  gap: 30px;
  justify-content: start;
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 280px);
    gap: 25px;
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 300px);
    gap: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(150px, 1fr));
    gap: 15px;
    justify-content: center; // 모바일에서 가운데 정렬
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(2, minmax(130px, 1fr));
    gap: 10px;
  }

  @media (max-width: 350px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
  }
`;

const MenuCard = styled.div`
  position: relative;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  width: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const NewBadge = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background: #FF7F32;
  color: white;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 4px 10px;
    font-size: 10px;
    top: 10px;
    left: 10px;
  }
`;

const HotBadge = styled.div<{ isNewVisible: boolean }>`
  position: absolute;
  top: ${props => props.isNewVisible ? '47px' : '15px'};
  left: 15px;
  background: #ff1c1c;
  color: white;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 4px 10px;
    font-size: 10px;
    top: ${props => props.isNewVisible ? '35px' : '10px'};
    left: 10px;
  }
`;

const IceBadge = styled.div<{ isNewVisible: boolean; isHotVisible?: boolean }>`
  position: absolute;
  top: ${({ isNewVisible, isHotVisible }) =>
    isNewVisible && isHotVisible ? '79px' :
    isHotVisible ? '47px' :
    isNewVisible ? '47px' :
    '15px'};
  left: 15px;
  background: #12bcff;
  color: white;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 4px 10px;
    font-size: 10px;
    top: ${({ isNewVisible, isHotVisible }) =>
      isNewVisible && isHotVisible ? '60px' :
      isHotVisible ? '35px' :
      isNewVisible ? '35px' :
      '10px'};
    left: 10px;
  }
`;

const MenuImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 116.67%;
  overflow: hidden;
  background: #f5f5f5;
`;

const MenuImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;

  ${MenuCard}:hover & {
    transform: scale(1.05);
  }
`;

const MenuName = styled.h3`
  padding: 20px;
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  text-align: center;
  line-height: 1.4;

  @media (max-width: 768px) {
    padding: 15px;
    font-size: 14px;
  }
`;