import React from "react";
import styled from "styled-components";
import { FaStar} from "react-icons/fa";

const Rating = () => {
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

        <RatingLabel aria-label="1 star" htmlFor="rating2-10">
          <RatingIcon>
            <FaStar />
          </RatingIcon>
        </RatingLabel>
        <RatingInput name="rating2" id="rating2-10" value="1" type="radio" />

        <RatingLabel aria-label="2 stars" htmlFor="rating2-20">
          <RatingIcon>
            <FaStar />
          </RatingIcon>
        </RatingLabel>
        <RatingInput name="rating2" id="rating2-20" value="2" type="radio" />

        <RatingLabel aria-label="3 stars" htmlFor="rating2-30">
          <RatingIcon>
            <FaStar />
          </RatingIcon>
        </RatingLabel>
        <RatingInput name="rating2" id="rating2-30" value="3" type="radio" />

        <RatingLabel aria-label="4 stars" htmlFor="rating2-40">
          <RatingIcon>
            <FaStar />
          </RatingIcon>
        </RatingLabel>
        <RatingInput name="rating2" id="rating2-40" value="4" type="radio" />

        <RatingLabel aria-label="5 stars" htmlFor="rating2-50">
          <RatingIcon>
            <FaStar />
          </RatingIcon>
        </RatingLabel>
        <RatingInput name="rating2" id="rating2-50" value="5" type="radio" />
      </RatingGroup>
    </RatingBox>
  );
};

export default Rating;

const RatingIcon = styled.div`
  pointer-events: none;
  color: orange;

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
