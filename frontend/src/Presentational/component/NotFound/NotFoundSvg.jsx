import styled, {keyframes} from "styled-components"

const NotFoundSvg = () => {
    return (
        <SvgWrap version="1.1" viewBox="0 0 837 1045" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnsSketch="http://www.bohemiancoding.com/sketch/ns">
            <SvgG sketchType="MSPage">
                <PolyGon1 d="M 616.5 245 L 753.332 325.5 L 753.332 484 L 616.5 561.5 L 479.668 484 L 479.668 325.5 L 616.5 245 Z" sketchType="MSShapeGroup"/>
                <PolyGon2 d="M 479.25 505 L 513.5 525.0932 L 513.5 564.6556 L 479.25 584 L 445 564.6556 L 445 525.0932 L 479.25 505 Z" sketchType="MSShapeGroup"/>
                <PolyGon3 d="M 796.5 333.5 L 823.5 349.2694 L 823.5 380.3183 L 796.5 395.5 L 769.5 380.3183 L 769.5 349.2694 L 796.5 333.5 Z" sketchType="MSShapeGroup" />
                <PolyGon4 d="M 759.5 505 L 826.5 544.4234 L 826.5 622.0458 L 759.5 660 L 692.5 622.0458 L 692.5 544.4234 L 759.5 505 Z" sketchType="MSShapeGroup" />
                <PolyGon5 d="M 580.5 641 L 631.5 671.0126 L 631.5 730.1058 L 580.5 759 L 529.5 730.1058 L 529.5 671.0126 L 580.5 641 Z" sketchType="MSShapeGroup" />
                {/* <PolyGon1 d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z" sketch:type="MSShapeGroup"/>
                <PolyGon2 d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z" sketch:type="MSShapeGroup"/>
                <PolyGon3 d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z" sketch:type="MSShapeGroup" />
                <PolyGon4 d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z" sketch:type="MSShapeGroup" />
                <PolyGon5 d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z" sketch:type="MSShapeGroup" /> */}
            </SvgG>
        </SvgWrap>
    )
}

const KeyFrames = keyframes`
    100% {
    transform: translateY(20px);
  }
`

const SvgWrap = styled.svg`
    width: 380px;
    height: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -250px;
    margin-left: -400px;
`
const SvgG = styled.g`
    stroke: none;
    stroke-width: 1;
    fill: none;
    fill-rule: evenodd;
    * {
        animation: ${KeyFrames} 1s infinite ease-in-out alternate;
    }
`
const PolyGon1 = styled.path`
    stroke: #007FB2;
    /* fill: #00b7ff; */
    stroke-width: 6;
`
const PolyGon2 = styled.path`
    stroke: #EF4A5B;
    stroke-width: 6;
    animation-delay: .2s; 
`
const PolyGon3 = styled.path`
    stroke: #795D9C;
    stroke-width: 6;
    animation-delay: .4s; 
`
const PolyGon4 = styled.path`
    stroke: #F2773F;
    stroke-width: 6;
    animation-delay: .8s; 
`
const PolyGon5 = styled.path`
    stroke: #36B455;
    stroke-width: 6;
    animation-delay: .10s; 
`

export default NotFoundSvg;