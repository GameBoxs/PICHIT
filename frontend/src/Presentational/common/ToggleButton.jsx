import styled from "styled-components";
import { GlobalStyle } from "../../action/GlobalStyle";
import {BsSun} from 'react-icons/bs';
import { useState } from "react";

/*
체크박스 미 체크시 값 전달되도록 하게 하기
다크모드 토글 따로 만들기.
*/
const ToggleButton = (props) => {
    return (
        <MainDiv>
            <BsSun className="sunImg"></BsSun>
            <ToggleBody></ToggleBody>
        </MainDiv>
    )
}

export default ToggleButton ;

const ToggleBody = styled.input.attrs({type:"checkbox"})`
    position: relative;
    -webkit-appearance: none;
    /* appearance: none; */

    width: 70px;
    height: 30px;
    outline: none;
    /* background: #c6c6c6; */
    background: white;

    border-radius: 20px;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    /* transition: .5s; */

    &:checked {
        background: #c6c6c6;
        &::before {
            left: 40px;
        }
    }

    &::before {
        content: '';
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 20px;
        top: 0;
        left: 0;
        background: white;
        transform: scale(1.1);
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        transition: .5s;
        /* background-size: 20px 20px;
        background-position: center;
        background-repeat: no-repeat;
        background-color: whitesmoke;
        background-image: url("data:image/svg+xml,%3Csvg stroke='currentColor' fill='currentColor' stroke-width='0' viewBox='0 0 16 16' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z'%3E%3C/path%3E%3C/svg%3E"); */
    }
    `

const MainDiv = styled.div`
    & .sunImg{
        width: 25px;
        height: 25px;
        margin-right: 5px;
    }
`
