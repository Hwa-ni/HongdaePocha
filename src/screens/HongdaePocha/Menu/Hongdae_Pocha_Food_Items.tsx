import React, { useState } from "react";
import styled from "styled-components";
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
    lang.drinkMenu.softdrink,
  ],
  [lang.itemMenu.bbqgrill]: [
    lang.bbqgrillmenu.beef,
    lang.bbqgrillmenu.pork,
    lang.bbqgrillmenu.friend,
  ],
};

const MenuListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(lang.itemMenu.all);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMenu = menuData.filter((item) => {
    const hasValidImage =
      item.image && !item.image.toLowerCase().includes("unknown");
    const matchesCategory =
      selectedCategory === lang.itemMenu.all ||
      item.category === selectedCategory;
    const matchesSubCategory =
      !selectedSubCategory || item.subcategory === selectedSubCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return hasValidImage && matchesCategory && matchesSubCategory && matchesSearch;
  });

  // 서브카테고리별로 그룹핑 (순서 유지)
  const groupedMenu = (() => {
    const groups: { subcategory: string | null; items: typeof filteredMenu }[] = [];
    const seen = new Map<string, number>();
    filteredMenu.forEach((item) => {
      const key = item.subcategory ?? item.category ?? "";
      if (seen.has(key)) {
        groups[seen.get(key)!].items.push(item);
      } else {
        seen.set(key, groups.length);
        groups.push({ subcategory: item.subcategory ?? null, items: [item] });
      }
    });
    return groups;
  })();

  // 소제목이 필요한지 여부: 그룹이 2개 이상이거나 서브카테고리가 존재할 때
  const showSectionHeaders = groupedMenu.length > 1 || (groupedMenu.length === 1 && groupedMenu[0].subcategory !== null);

  const renderSpiceLevel = (level?: number) => {
    if (!level || level <= 0) return null;
    return "●".repeat(level);
  };

  return (
    <TransitionContainer>
      <PageContainer>
        <ContentContainer>
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
                {categories.map((category) => (
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

              <SubCategoryWrapper>
                {subcategories[selectedCategory] && (
                  <>
                    <SubCategoryTitle>Subcategories</SubCategoryTitle>
                    <CategoryList>
                      {subcategories[selectedCategory].map((sub) => (
                        <CategoryItem
                          key={sub}
                          active={selectedSubCategory === sub}
                          onClick={() =>
                            setSelectedSubCategory((prev) =>
                              prev === sub ? null : sub
                            )
                          }
                          isSub
                        >
                          {sub}
                        </CategoryItem>
                      ))}
                    </CategoryList>
                  </>
                )}
              </SubCategoryWrapper>
            </CategorySection>
          </SidebarContainer>

          <MobileCategorySection>
            <MobileCategoryTabsWrapper>
              <MobileCategoryTabs>
                {categories.map((category) => (
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
                  {subcategories[selectedCategory].map((sub) => (
                    <MobileCategoryTab
                      key={sub}
                      active={selectedSubCategory === sub}
                      onClick={() =>
                        setSelectedSubCategory((prev) =>
                          prev === sub ? null : sub
                        )
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
            <SpiceGuideWrapper>
              <ViewMenuButton 
                onClick={() => window.open("https://vuzagroup.direct.quickconnect.to/HongdaePocha_Menu/index.html", "_blank", "noopener,noreferrer")}
              >
                View Menu Board
              </ViewMenuButton>
              <SpiceGuide>
                <GuideItem>● Little Spicy</GuideItem>
                <GuideItem>●● Spicy</GuideItem>
                <GuideItem>●●● Very Spicy</GuideItem>
              </SpiceGuide>
            </SpiceGuideWrapper>

            <MenuGrid>
              {filteredMenu.length === 0 ? (
                <EmptyMessage>No items found.</EmptyMessage>
              ) : (
                groupedMenu.map((group, groupIdx) => (
                  <React.Fragment key={groupIdx}>
                    {showSectionHeaders && group.subcategory && (
                      <SectionHeader>
                        <SectionHeaderLine />
                        <SectionHeaderText>{group.subcategory}</SectionHeaderText>
                        <SectionHeaderLine />
                      </SectionHeader>
                    )}
                    {group.items.map((item) => (
                      <MenuCard key={item.id}>
                        {item.isNew && <NewBadge>NEW</NewBadge>}
                        {item.isHot && (
                          <HotBadge isNewVisible={item.isNew}>HOT</HotBadge>
                        )}
                        {item.isIce && (
                          <IceBadge
                            isNewVisible={item.isNew}
                            isHotVisible={item.isHot}
                          >
                            ICE
                          </IceBadge>
                        )}
                        {item.spiceLevel && item.spiceLevel > 0 && (
                          <SpiceBadge
                            isNewVisible={item.isNew}
                            isHotVisible={item.isHot}
                            isIceVisible={item.isIce}
                          >
                            {renderSpiceLevel(item.spiceLevel)}
                          </SpiceBadge>
                        )}
                        <MenuImageContainer>
                          {item.image && <MenuImage src={item.image} alt={item.name} />}
                        </MenuImageContainer>
                        <MenuName>{item.name}</MenuName>
                      </MenuCard>
                    ))}
                  </React.Fragment>
                ))
              )}
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
  background-color: #121212;
  width: 100%;
  overflow-x: hidden;
  align-items: stretch;
`;

const ContentContainer = styled.div`
  flex: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 40px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    padding: 20px 10px;
    gap: 20px;
  }
`;

const SidebarContainer = styled.div`
  width: 280px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-self: flex-start;
  position: sticky;
  top: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchSection = styled.div`
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  border: 1px solid #444;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  background-color: #242424;
  color: #e0e0e0;

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
  background: #1e1e1e;
  border-radius: 20px;
  padding: 25px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CategoryTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: bold;
  color: #e0e0e0;
`;

const SubCategoryTitle = styled.h4`
  margin: 25px 0 15px 0;
  font-size: 16px;
  font-weight: bold;
  color: #b0b0b0;
`;

const SubCategoryWrapper = styled.div`
  min-height: 220px;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

const CategoryItem = styled.button<{ active: boolean; isSub?: boolean }>`
  background: ${(props) => (props.active ? "white" : "transparent")};
  border: none;
  padding: 12px 15px;
  border-radius: 15px;
  font-size: ${(props) => (props.isSub ? "14px" : "16px")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  color: ${(props) =>
    props.active ? "#9c1f23" : props.isSub ? "#b0b0b0" : "#e0e0e0"};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;
  white-space: normal;
  word-break: break-word;

  &:hover {
    background: ${(props) => (props.active ? "white" : "#333")};
    color: ${(props) => (props.active ? "#9c1f23" : "#e0e0e0")};
  }
`;

const MobileCategorySection = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 20px;
    width: 100%;
    box-sizing: border-box;
  }
`;

const MobileCategoryTabsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #1e1e1e;
  border-radius: 20px;
  padding: 10px 0;
  gap: 10px;
  width: 100%;
  overflow-x: hidden;
  padding-bottom: 0;
`;

const MobileCategoryTabs = styled.div<{ isSub?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  background: transparent;
  border-radius: 0;
  padding: 0;
  gap: 0;
`;

const MobileCategoryTab = styled.button<{ active: boolean }>`
  background: ${(props) => (props.active ? "white" : "transparent")};
  border: none;
  padding: 10px 10px;
  border-radius: 15px;
  font-size: 16px;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  color: ${(props) => (props.active ? "#333" : "#b0b0b0")};
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0 5px 10px 10px;

  &:first-child {
    margin-left: 10px;
  }
  &:last-child {
    margin-right: 10px;
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
  display: flex;
  flex-direction: column;
  min-height: 400px;
`;

const SpiceGuideWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const ViewMenuButton = styled.button`
  background-color: #9c1f23;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 8px 25px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background-color: #b32428;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
    width: auto;
  }
`;

const SpiceGuide = styled.div`
  display: flex;
  gap: 20px;
  padding: 8px 25px;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    gap: 15px;
    padding: 6px 20px;
  }
`;

const GuideItem = styled.span`
  color: #9c1f23;
  font-weight: bold;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  justify-items: center;
  width: 100%;

  @media (max-width: 1200px) {
    gap: 25px;
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  @media (max-width: 350px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
  }
`;

const EmptyMessage = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  color: #666;
  font-size: 16px;
  padding: 60px 0;
`;

const SectionHeader = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 0 4px 0;
  margin-top: 8px;
`;

const SectionHeaderLine = styled.div`
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, #444, transparent);
`;

const SectionHeaderText = styled.span`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #9c1f23;
  white-space: nowrap;
  padding: 0 8px;
`;

const MenuCard = styled.div`
  position: relative;
  background: #1e1e1e;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  width: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }
`;

const NewBadge = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background: #ff7f32;
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
  top: ${(props) => (props.isNewVisible ? "47px" : "15px")};
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
    top: ${(props) => (props.isNewVisible ? "35px" : "10px")};
    left: 10px;
  }
`;

const IceBadge = styled.div<{ isNewVisible: boolean; isHotVisible?: boolean }>`
  position: absolute;
  top: ${({ isNewVisible, isHotVisible }) =>
    isNewVisible && isHotVisible
      ? "79px"
      : isHotVisible
        ? "47px"
        : isNewVisible
          ? "47px"
          : "15px"};
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
    isNewVisible && isHotVisible
      ? "60px"
      : isHotVisible
        ? "35px"
        : isNewVisible
          ? "35px"
          : "10px"};
    left: 10px;
  }
`;

const SpiceBadge = styled.div<{ isNewVisible: boolean; isHotVisible?: boolean; isIceVisible?: boolean }>`
  position: absolute;
  top: ${({ isNewVisible, isHotVisible, isIceVisible }) => {
    let count = 0;
    if (isNewVisible) count++;
    if (isHotVisible) count++;
    if (isIceVisible) count++;

    if (count === 3) return "111px";
    if (count === 2) return "79px";
    if (count === 1) return "47px";
    return "15px";
  }};
  left: 15px;
  background: #9c1f23;
  color: white;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
  z-index: 2;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    padding: 4px 10px;
    font-size: 10px;
    top: ${({ isNewVisible, isHotVisible, isIceVisible }) => {
    let count = 0;
    if (isNewVisible) count++;
    if (isHotVisible) count++;
    if (isIceVisible) count++;

    if (count === 3) return "85px";
    if (count === 2) return "60px";
    if (count === 1) return "35px";
    return "10px";
  }};
    left: 10px;
  }
`;

const MenuImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 6 / 7;
  overflow: hidden;
  background: #242424;
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
  color: #e0e0e0;
  text-align: center;
  line-height: 1.4;

  @media (max-width: 768px) {
    padding: 15px;
    font-size: 14px;
  }
`;
