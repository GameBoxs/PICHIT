import styled from "styled-components";

const Title = (props) => {
    return (
      <>
        <TitleText className="Title">{props.title}</TitleText>
      </>
    )
}

export default Title;

const TitleText =styled.div`
    font-size: 24px;
`