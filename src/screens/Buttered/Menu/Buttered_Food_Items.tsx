import React, { useState } from "react";
import styled from "styled-components";
import Topmenu from "../Buttered_Topmenu"; // 기존 Topmenu 컴포넌트 import
import lang from "../../../language/Eng_Aust.json";
import { menuData } from "./Buttered_Menu_list";
import BottomMenu from "../Buttered_BottomMenu";
import { TransitionContainer } from "../animation/TransitionContainer";

//메뉴 페이지 종류 메뉴바 설정 (Eng_Aust.json참고)
const categories = [
  lang.itemMenu.all,
  lang.itemMenu.drink,
  lang.itemMenu.bread,
  lang.itemMenu.cake,
];

const subcategories: { [key: string]: string[] } = {
  [lang.itemMenu.drink]: [
    lang.drinkMenu.coffee,
    lang.drinkMenu.noncoffee,
    lang.drinkMenu.signaturevelvet,
    lang.drinkMenu.sweettea,
    lang.drinkMenu.looseleaftea,
    lang.drinkMenu.ade,
    lang.drinkMenu.babycino
  ],

  [lang.itemMenu.bread]: [
    lang.breadMenu.saltedbreadroll,
    lang.breadMenu.tissuebread,
    lang.breadMenu.saltbreadicecreamsndo,
    lang.breadMenu.mochiloaf
  ],
  [lang.itemMenu.cake]: [
    lang.cakeMenu.miniwaterfallcake,
    lang.cakeMenu.waterfallcake,
    lang.breadMenu.tiramisu
  ]
  // 다른 상위 카테고리에 따른 하위 카테고리도 여기에 추가 가능
};

const MenuListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(lang.itemMenu.all);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 필터 조건 수정: selectedSubCategory가 존재하면 해당 카테고리 전체(selectedCategory)에 속한 항목들을 보이게 하고,
  // 선택한 하위 카테고리를 다시 누르면 해제되도록 토글 방식으로 동작
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
        <CategorySection>
          <CategoryTabsWrapper>
            <CategoryTabs>
              {categories.map(category => (
                <CategoryTab
                  key={category}
                  active={selectedCategory === category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedSubCategory(null);
                  }}
                >
                  {category}
                </CategoryTab>
              ))}
            </CategoryTabs>

            {subcategories[selectedCategory] && (
              <CategoryTabs isSub>
                {subcategories[selectedCategory].map(sub => (
                  <CategoryTab
                    key={sub}
                    active={selectedSubCategory === sub}
                    onClick={() =>
                      setSelectedSubCategory(prev => prev === sub ? null : sub)
                    }
                  >
                    {sub}
                  </CategoryTab>
                ))}
              </CategoryTabs>
            )}
          </CategoryTabsWrapper>

          <SearchSection>
            <SearchInput
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchSection>
        </CategorySection>

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
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;

  /* 모바일 화면에서 ContentContainer의 최대 너비 조정 */
  @media (max-width: 600px) {
    padding: 20px 10px; /* 모바일에서 좌우 패딩 줄이기 */
  }
`;

const CategorySection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;

  /* 모바일 화면에서 카테고리 섹션 레이아웃 조정 */
  @media (max-width: 600px) {
    flex-direction: column; /* 세로로 정렬 */
    align-items: stretch; /* 너비 전체 사용 */
    gap: 15px;
    margin-bottom: 20px;
  }
`;

// CategoryTabsWrapper 스타일 추가
const CategoryTabsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #f8f8f8;
  border-radius: 20px;
  padding: 10px;
  gap: 10px;
  flex: 1;

  /* 모바일 화면에서 CategoryTabsWrapper 너비 조정 */
  @media (max-width: 600px) {
    padding: 8px;
  }
`;

//메뉴 카테고리 디자인 부분 (색상, 좌우 길이 조절등)
const CategoryTabs = styled.div<{ isSub?: boolean }>`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: ${props => props.isSub ? 'flex-start' : 'center'};
  background: transparent;
  border-radius: 0;
  padding: 0;
  gap: 10px;

  /* 모바일 화면에서 카테고리 탭 간격 조정 */
  @media (max-width: 600px) {
    gap: 5px;
    justify-content: flex-start; /* 모바일에서 왼쪽 정렬 */
  }
`;

//메뉴 카테고리 지정되었을때 디자인
const CategoryTab = styled.button<{ active: boolean }>`
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

  /* 모바일 화면에서 카테고리 탭 폰트 크기 및 패딩 조정 */
  @media (max-width: 600px) {
    padding: 8px 10px;
    font-size: 14px;
  }
`;

const SearchSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 220px;
  min-width: 220px;

  /* 모바일 화면에서 검색 섹션 너비 조정 */
  @media (max-width: 600px) {
    width: 100%; /* 너비 전체 사용 */
    justify-content: center; /* 중앙 정렬 */
    min-width: unset; /* 최소 너비 제한 해제 */
  }
`;

const SearchInput = styled.input`
  width: 200px;
  padding: 15px 20px;
  border: 1px solid #ddd;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
  
  &:focus {
    border-color: #f8f8f8;
    box-shadow: 0 0 0 2px rgba(136, 216, 163, 0.2);
  }

  /* 모바일 화면에서 검색 입력 필드 너비 및 패딩 조정 */
  @media (max-width: 600px) {
    width: 100%; /* 너비 전체 사용 */
    padding: 12px 15px;
    font-size: 14px;
  }
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(280px, 1fr));
  gap: 30px;
  justify-items: center;

  /* 태블릿 (1200px 이하): 3열 */
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(250px, 1fr));
    gap: 20px;
  }
  
  /* 작은 태블릿 (900px 이하): 2열 */
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
    gap: 15px;
  }

  /* 모바일 (600px 이하): 2열로 변경 */
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr); /* 2개 아이템이 동일하게 공간 분할 */
    gap: 10px;
    padding: 0 10px; /* 모바일에서 좌우 패딩 추가 */
  }

  /* 매우 작은 모바일 (400px 이하): 2열 유지 */
  @media (max-width: 400px) {
    grid-template-columns: repeat(2, 1fr); /* 2개 아이템이 동일하게 공간 분할 */
    gap: 8px;
    padding: 0 5px;
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
  max-width: 280px; /* 데스크톱 기본 최대 너비 */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  /* 모바일 화면에서 카드 너비 조정 */
  @media (max-width: 600px) {
    max-width: unset; /* 모바일에서는 최대 너비 제한 해제 */
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

  /* 모바일 화면에서 뱃지 크기 조정 */
  @media (max-width: 600px) {
    padding: 4px 10px;
    font-size: 10px;
    top: 10px;
    left: 10px;
  }
`;

//ICE작업필요,색상 변경 필요
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

  /* 모바일 화면에서 뱃지 크기 및 위치 조정 */
  @media (max-width: 600px) {
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

  /* 모바일 화면에서 뱃지 크기 및 위치 조정 */
  @media (max-width: 600px) {
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
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f5f5f5;

  /* 모바일 화면에서 이미지 컨테이너 높이 조정 */
  @media (max-width: 600px) {
    height: 120px;
  }
`;

const MenuImage = styled.img`
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

  /* 모바일 화면에서 메뉴 이름 폰트 크기 및 패딩 조정 */
  @media (max-width: 600px) {
    padding: 10px;
    font-size: 14px;
  }
`;
