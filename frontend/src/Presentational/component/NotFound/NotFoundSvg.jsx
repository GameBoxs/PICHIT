import styled, { keyframes } from "styled-components";

//404페이지에 쓰이는 각 폴리곤 크기/위치 지정
const NotFoundSvg = () => {
  return (
    <SvgWrap
      version="1.1"
      viewBox="0 0 837 1045"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlnsSketch="http://www.bohemiancoding.com/sketch/ns"
    >
      <SvgG sketchType="MSPage">
        <PolyGon1
          d="M 616.5 245 L 753.332 325.5 L 753.332 484 L 616.5 561.5 L 479.668 484 L 479.668 325.5 L 616.5 245 Z"
          sketchType="MSShapeGroup"
        />
        <PolyGon2
          d="M 479.25 505 L 513.5 525.0932 L 513.5 564.6556 L 479.25 584 L 445 564.6556 L 445 525.0932 L 479.25 505 Z"
          sketchType="MSShapeGroup"
        />
        <PolyGon3
          d="M 796.5 333.5 L 823.5 349.2694 L 823.5 380.3183 L 796.5 395.5 L 769.5 380.3183 L 769.5 349.2694 L 796.5 333.5 Z"
          sketchType="MSShapeGroup"
        />
        <PolyGon4
          d="M 759.5 505 L 826.5 544.4234 L 826.5 622.0458 L 759.5 660 L 692.5 622.0458 L 692.5 544.4234 L 759.5 505 Z"
          sketchType="MSShapeGroup"
        />
        <PolyGon5
          d="M 580.5 641 L 631.5 671.0126 L 631.5 730.1058 L 580.5 759 L 529.5 730.1058 L 529.5 671.0126 L 580.5 641 Z"
          sketchType="MSShapeGroup"
        />
       </SvgG>
    </SvgWrap>
  );
};

const KeyFrames = keyframes`
    100% {
    transform: translateY(20px);
  }
`;

const SvgWrap = styled.svg`
  width: 380px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -400px;
`;
const SvgG = styled.g`
  stroke: none;
  stroke-width: 1;
  fill: none;
  fill-rule: evenodd;
  * {
    animation: ${KeyFrames} 1s infinite ease-in-out alternate;
  }
`;
const PolyGon1 = styled.path`
  stroke: var(--primary);
  stroke-width: 6;
`;
const PolyGon2 = styled.path`
  stroke: var(--primary-light);
  stroke-width: 6;
  animation-delay: 0.2s;
`;
const PolyGon3 = styled.path`
  stroke: var(--primary);
  stroke-width: 6;
  animation-delay: 0.4s;
`;
const PolyGon4 = styled.path`
  stroke: var(--primary-light);
  stroke-width: 6;
  animation-delay: 0.8s;
`;
const PolyGon5 = styled.path`
  stroke: var(--primary);
  stroke-width: 6;
  animation-delay: 0.1s;
`;

export default NotFoundSvg;
