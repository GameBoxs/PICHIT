import React from "react";
import styled from "styled-components";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import GuideImg1 from "../../../store/asset/guide/1.png";
import GuideImg2 from "../../../store/asset/guide/2.png";
import GuideImg3 from "../../../store/asset/guide/3.png";
import GuideImg4 from "../../../store/asset/guide/4.png";
import GuideImg5 from "../../../store/asset/guide/5.png";
import GuideImg6 from "../../../store/asset/guide/6.png";
import GuideImg7 from "../../../store/asset/guide/7.png";
import GuideImg8 from "../../../store/asset/guide/8.png";
import GuideImg9 from "../../../store/asset/guide/9.png";
import GuideImg10 from "../../../store/asset/guide/10.png";
import GuideImg11 from "../../../store/asset/guide/11.png";
import GuideImg12 from "../../../store/asset/guide/12.png";
import GuideImg13 from "../../../store/asset/guide/13.png";
import GuideImg14 from "../../../store/asset/guide/14.png";
import GuideImg15 from "../../../store/asset/guide/15.png";
import GuideImg16 from "../../../store/asset/guide/16.png";
import GuideImg17 from "../../../store/asset/guide/17.png";
import GuideImg18 from "../../../store/asset/guide/18.png";
import GuideImg19 from "../../../store/asset/guide/19.png";
import GuideImg20 from "../../../store/asset/guide/20.png";
import GuideImg21 from "../../../store/asset/guide/21.png";
import GuideImg22 from "../../../store/asset/guide/22.png";
import GuideImg23 from "../../../store/asset/guide/23.png";
import GuideImg24 from "../../../store/asset/guide/24.png";
import GuideImg25 from "../../../store/asset/guide/25.png";

export default function GuideSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
  };

  const Guide = [
    GuideImg1,
    GuideImg2,
    GuideImg3,
    GuideImg4,
    GuideImg5,
    GuideImg6,
    GuideImg7,
    GuideImg8,
    GuideImg9,
    GuideImg10,
    GuideImg11,
    GuideImg12,
    GuideImg13,
    GuideImg14,
    GuideImg15,
    GuideImg16,
    GuideImg17,
    GuideImg18,
    GuideImg19,
    GuideImg20,
    GuideImg21,
    GuideImg22,
    GuideImg23,
    GuideImg24,
    GuideImg25,
  ];

  return (
    <StyledSlider {...settings}>
      {new Array(25).fill(0).map((_, idx) => {
        return (
          <SubDiv key={idx}>
            <img src={Guide[idx]} alt={`GuideImg${idx + 1}`} />
          </SubDiv>
        );
      })}
    </StyledSlider>
  );
}

const SubDiv = styled.div`
  background-color: antiquewhite;
  width: 100%;
  height: inherit;
  
  img {
    width: 100%;
  }
`;

const StyledSlider = styled(Slider)`
  width: 90%;
  margin: 0 auto;

  .slick-dots li button:before,
  .slick-dots li.slick-active button:before,
  .slick-prev:before,
  .slick-next:before {
    color: var(--primary-light);
  }

  .slick-list {
    width: 100%;
    height: 100%;
  }
`;
