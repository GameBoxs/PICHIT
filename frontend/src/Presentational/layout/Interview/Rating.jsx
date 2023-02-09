import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { useRef } from "react";

const Rating = ({ RatingHandler, finishExecute }) => {
  const star = useRef()

  const gradle = Array(5)
    .fill(0)
    .map((_, idx) => {
      return (
        <React.Fragment
        key={idx}
      >
          <RatingLabel
            key={idx}
            aria-label={`${idx + 1} stars`}
            htmlFor={`rating2-${10 * (idx + 1)}`}
          >
            <RatingIcon>
              <FaStar />
            </RatingIcon>
          </RatingLabel>
          <RatingInput
            name="rating2"
            id={`rating2-${10 * (idx + 1)}`}
            value={idx+1}
            type="radio"
            onClick={RatingHandler}
          />
        </React.Fragment>
      );
    });

  return (
    <RatingBox>
      <RatingGroup>
        <RatingInput
          className="rating__input--none"
          defaultChecked
          name="rating2"
          id="rating2-0"
          value="0"
          type="radio"
        />
        <RatingLabel aria-label="0 stars" htmlFor="rating2-0">
          &nbsp;
        </RatingLabel>

        {gradle}
      </RatingGroup>
    </RatingBox>
  );
};

export default Rating;

const RatingIcon = styled.div`
  pointer-events: none;
  color: #f7e160;

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
