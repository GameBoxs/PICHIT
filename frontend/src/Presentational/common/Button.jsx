import styled from "styled-components";

const Button = ({text, handler}) => {

    return (
        <Btn onClick={handler}>
            <BtnText>{text}</BtnText>
        </Btn>
    
    )
}

export default Button ;

const BtnText = styled.span`
    display: flex;  
    text-align: center;
`

const Btn = styled.div`
    background: rgb(247,150,192);
    background: radial-gradient(circle, rgba(247,150,192,1) 0%, rgba(118,174,241,1) 100%);
    line-height: 4px;
    padding: 0;
    border: none;
    margin: 20px;
    width: fit-content;
    height: 4px;
    border-radius: 5px;
    padding: 16px 25px;
    cursor: pointer;
    position: relative;
    display: inline-block;
    box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
    7px 7px 20px 0px rgba(0,0,0,.1),
    4px 4px 5px 0px rgba(0,0,0,.1);
    outline: none;

    & span {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;


    }

    &:before,
    &:after{
        position: absolute;
        content: "";
        height: 0%;
        width: 1px;
        box-shadow:
        -1px -1px 20px 0px rgba(255,255,255,1),
        -4px -4px 5px 0px rgba(255,255,255,1),
        7px 7px 20px 0px rgba(0,0,0,.4),
        4px 4px 5px 0px rgba(0,0,0,.3);
    }

    &:before {
        right: 0;
        top: 0;
        transition: all 500ms ease;
    }
    &:after {
        left: 0;
        bottom: 0;
        transition: all 500ms ease;
    }

    &:hover {
        background: transparent;
        color: #76aef1;
        box-shadow: none;
    }

    &:hover:before {
        transition: all 500ms ease;
        height: 100%;
    }

    &:hover:after {
        transition: all 500ms ease;
         height: 100%;
    }
    &:before span,
    &:after span{
        position: absolute;
        content: "";
        box-shadow:
         -1px -1px 20px 0px rgba(255,255,255,1),
         -4px -4px 5px 0px rgba(255,255,255,1),
         7px 7px 20px 0px rgba(0,0,0,.4),
         4px 4px 5px 0px rgba(0,0,0,.3);

    }
    &:before span{
        left: 0;
        top: 0;
        width: 0%;
        height: .5px;
        transition: all 500ms ease;
    }
    &:after span{
        right: 0;
        bottom: 0;
        width: 0%;
        height: .5px;
        transition: all 500ms ease;
    }
    &:hover :before span{
        width:100%;
    }
    &:hover :after span{
        width:100%;
    }
`
