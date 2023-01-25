import styled from "styled-components";
import { useEffect, useState } from "react";
import {BiSend} from "react-icons/bi";

const Input = ({SetIncomMessage}) => {
    const [textValue, SetTextValue] = useState("");

    useEffect(() => {
        if(textValue==='\n')
            SetTextValue('')
    },[textValue]);

    function setText(e) {
        SetTextValue(e.target.value);
    }

    function getTime() {
        let today = new Date();

        let hours = ('0' + today.getHours()).slice(-2); 
        let minutes = ('0' + today.getMinutes()).slice(-2);
        let seconds = ('0' + today.getSeconds()).slice(-2); 

        return (hours + ':' + minutes  + ':' + seconds);
    }

    function pressEnter(e) {
        if(e.key === 'Enter'){
            if(e.shiftKey || textValue===''){
                return;
            }
            console.log(e.key ==='Enter' && e.shiftKey);
            SetTextValue('');
            clickBtn();
        }
    }
    
    function clickBtn() {
        if(textValue===''){
            return;
        }
        let time = getTime();
        const data = {Name:"김지훈", Time:time, Message:textValue};
        
        SetIncomMessage(data);
        SetTextValue('');
    }

    return (
        <InputWrap>
            <InputText placeholder="Type a Message ...." value={textValue} onChange={setText} onKeyDown={pressEnter}/>
            <SendBtn onClick={clickBtn}>
                <BiSend className="SendImg" />
            </SendBtn>
        </InputWrap>
    )
}

// const InputText = styled.input.attrs({type:"text"})`
//     border: none;
//     font-size: 20px;
//     width: 95%;
//     &:focus{
//         outline: 0;
//     }
// `

const InputWrap = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`

const InputText = styled.textarea.attrs({rows:1})`
    border: none;
    font-size: 20px;
    width: 95%;
    /* line-height: 50px; */
    &:focus{
        outline: 0;
    }
    resize: none;
`

const SendBtn = styled.div`
    cursor: pointer;
    width: 25px;
    height: 25px;
    border: none;
    background-color: rgba(0,0,0,0);

    .SendImg {
        width: 25px;
        height: 25px;
        color: #79C7C5;
    }
`

export default Input;