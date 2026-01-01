import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const PopupContent = styled.div`
  position: relative;
  background: white;
  width: 85%;
  max-width: 350px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const CloseIconButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
  font-size: 20px;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }
`;

const ImageLink = styled.a`
  display: block;
  width: 100%;
  cursor: pointer;
`;

const PopupImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const PopupFooter = styled.div`
  display: flex;
  flex-direction: column; // 문구와 버튼을 세로로 배치
  align-items: center;
  padding: 16px 12px;
  background-color: #ffffff;
  gap: 8px; // 문구와 버튼 사이의 간격
`;

const PromoText = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  text-align: center;
`;

const FooterButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 13px;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #000;
  }
`;

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const INSTAGRAM_URL =
    "https://www.instagram.com/p/DS4bUvnjvlx/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==";

  useEffect(() => {
    const hidePopupUntil = localStorage.getItem("hidePopupUntil");
    const now = new Date().getTime();

    if (!hidePopupUntil || now > parseInt(hidePopupUntil)) {
      setIsOpen(true);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  const closeForADay = () => {
    const expiryDate = new Date().getTime() + 24 * 60 * 60 * 1000;
    localStorage.setItem("hidePopupUntil", expiryDate.toString());
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <PopupOverlay onClick={closePopup}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        {/* 우측 상단 닫기 X 버튼 */}
        <CloseIconButton onClick={closePopup}>&times;</CloseIconButton>

        {/* 이미지 클릭 시 인스타그램 이동 */}
        <ImageLink
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <PopupImage
            src={
              process.env.PUBLIC_URL +
              "/assets/HongdaePocha/HongdaePocha_event/event.png"
            }
            alt="Promotion Popup"
          />
        </ImageLink>

        <PopupFooter>
          {/* 추가된 볼드체 문구 */}
          <PromoText>Half price off the marked prices</PromoText>

          {/* 하단 하루 동안 보지 않기 버튼 */}
          <FooterButton onClick={closeForADay}>
            Don't show for a day
          </FooterButton>
        </PopupFooter>
      </PopupContent>
    </PopupOverlay>
  );
};

export default Popup;
