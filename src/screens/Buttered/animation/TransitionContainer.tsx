// src/components/TransitionContainer.tsx 또는 적절한 위치에 생성
import styled, { keyframes } from "styled-components";

// Fade-in keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Fade-out keyframes (optional, for when component is unmounted)
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const TransitionContainer = styled.div`
  opacity: 0; /* Initial state for fade-in */
  animation: ${fadeIn} 0.8s ease-in-out forwards; /* Apply fade-in animation */
  width: 100%;
  height: 100%;
`;

// 만약 페이지 전환 시 이전 페이지가 완전히 사라지는 fade-out 효과를 원한다면
// 라우터 설정에서 TransitionGroup 등을 활용해야 합니다.
// 현재 구조에서는 새 페이지가 마운트될 때 fadeIn만 적용하는 것이 가장 간단합니다.