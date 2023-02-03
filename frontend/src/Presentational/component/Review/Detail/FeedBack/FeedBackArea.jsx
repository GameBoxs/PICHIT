import styled from "styled-components";
import Title from "../../../../common/Title";
import SubTitle from "../../../../common/SubTitle";
import FeedBackItem from "./FeedBackItem";

import { memo, useRef } from "react";
import { useEffect } from "react";

const FeedBackArea = ({title, data}) => {
    const targetElement = useRef(null);
    
    useEffect(() => {
        targetElement.current.scrollIntoView({behavior:'smooth'});
    },[title])

    return(
        <FeedBackWrap>
            <Title title={title}></Title>
            <SubTitle title="피드백"></SubTitle>
            <div ref={targetElement}>
                {
                    data ? data.map((datas,idx) => {
                        return(
                            <FeedBackItem data={datas} key={idx}/>
                        )
                    }) : null
                }
            </div>
        </FeedBackWrap>
    )
}

const FeedBackWrap = styled.div`
    width: 100%;

    & > div:first-child {
        text-align: center;
        font-weight: bolder;
        font-size: 40px;
        margin: 50px 0 50px 0;
    }

    & > div:nth-child(2) {
    margin-top: 50px;
    margin-bottom: 50px;
    font-weight: bold;
    font-size: 30px;
    }
`

export default memo(FeedBackArea);