import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

const Rating = ({ setFeedback, starScore }) => {
  //별점 값 받아오는 함수
  const RatingHandler = (e) => {
    setFeedback((prev) => {
      return {
        ...prev,
        starScore: e.target.value,
      };
    });
  };

  // 별 5개 차례대로 보여주는 함수
  const gradle = Array(5)
    .fill(0)
    .map((_, idx) => {
      return (
        <React.Fragment key={idx}>
          <RatingLabel
            key={idx}
            aria-label={`${idx + 1} stars`}
            htmlFor={`rating2-${10 * (idx + 1)}`}
          >
            <RatingIcon
              starScore={starScore === 0 || starScore <= idx ? false : true}
            >
              <FaStar />
            </RatingIcon>
          </RatingLabel>
          <RatingInput
            name="rating2"
            id={`rating2-${10 * (idx + 1)}`}
            value={idx + 1}
            type="radio"
            onClick={RatingHandler}
          />
        </React.Fragment>
      );
    });

  return (
    <RatingBox>
      <RatingGroup>
        {gradle}
      </RatingGroup>
    </RatingBox>
  );
};

export default Rating;

const RatingIcon = styled.div`
  pointer-events: none;
  path {
    color: ${(props) => (props.starScore ? "#f7e160" : "#ddd")};
  }

  &.rating__icon--none {
    color: #eee;
  }
`;

const RatingLabel = styled.label`
  cursor: pointer;
  /* if you change the left/right padding, update the margin-right property of .rating__label--half as well. */
  padding: 0 0.1em;
  font-size: var(--star-size);
`;

const RatingInput = styled.input`
  position: absolute !important;
  left: -9999px !important;

  &.rating__input--none {
    color: #eee;
  }

  &:checked ~ ${RatingLabel} ${RatingIcon} {
    color: #ddd;
  }
`;

const RatingGroup = styled.div`
  display: inline-flex;
`;

const RatingBox = styled.div`
  --star-size: 1.2rem;
  margin: 0;
  padding: 0;

  & * {
    font-size: var(--star-size);
  }
`;
