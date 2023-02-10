//#region import
import styled from "styled-components";
import { GlobalStyle } from "../../action/GlobalStyle";
import { useState } from "react";
//#endregion

//#region NormalToggleButton
const ToggleButton = ({handler,toggle,ToggleHandler}) => {

    const ClickedToggle = () => {
    ToggleHandler(!toggle)
    }
    return (
        <MainDiv>
            <ToggleBody onClick={ClickedToggle}></ToggleBody>
        </MainDiv>
    )
}

    //#region Normal Styled-Component
    const ToggleBody = styled.input.attrs({type:"checkbox"})`
        position: relative;
        -webkit-appearance: none;
        
        width: 70px;
        height: 30px;
        outline: none;
        background: #7b7a7a;
        
        border-radius: 20px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        
        &:checked {
            background: #40b6f5;
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
        }
    `

    const MainDiv = styled.div`
        & .sunImg{
            width: 25px;
            height: 25px;
            margin-right: 5px;
        }
        & .moonImg{
            width: 25px;
            height: 25px;
            margin-left: 5px;
        }
    `
    //#endregion

//#endregion

//#region DarkModToggleButton
const DarkModToggleButton = ({handler}) => {
    return (
        <ToggleWrapper>
            <DN className="dn" id="dn"/>
            <Toggle className="toggle" onClick={handler} htmlFor="dn">
                <ToggleHandler className="toggle__handler">
                    <Crater className="crater crater--1"></Crater>
                    <Crater className="crater crater--2"></Crater>
                    <Crater className="crater crater--3"></Crater>
                </ToggleHandler>
                <Star className="star star--1"></Star>
                <Star className="star star--2"></Star>
                <Star className="star star--3"></Star>
                <Star className="star star--4"></Star>
                <Star className="star star--5"></Star>
                <Star className="star star--6"></Star>
            </Toggle>
        </ToggleWrapper>
    )
}
    //#region DarkMod Styled-Component
    const ToggleWrapper = styled.div`
        & .dn {
            position: absolute;
            left: -99em;
            &:checked{
                + .toggle {
                    background-color: #749DD6;
                    
                    .toggle__handler {
                        background-color: #FFE5B5;
                        transform: translate3d(40px, 0, 0) rotate(0);
                
                        .crater { opacity: 1; }
                    }
                    
                    .star--1 {
                        width: 2px;
                        height: 2px;
                    }
                    
                    .star--2 {
                        width: 4px;
                        height: 4px;
                        transform: translate3d(-5px, 0, 0);
                    }
                    
                    .star--3 {
                        width: 2px;
                        height: 2px;
                        transform: translate3d(-7px, 0, 0);
                    }
                    
                    .star--4,
                    .star--5,
                    .star--6 {
                        opacity: 1;
                        transform: translate3d(0,0,0);
                    }
                    .star--4 {
                        transition: all 300ms 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
                    }
                    .star--5 {
                        transition: all 300ms 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
                    }
                    .star--6 {
                        transition: all 300ms 400ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
                    }
                }
            }
        }
    `
    const DN = styled.input.attrs({type:"checkbox"})`

    `

    const Toggle = styled.label`
        cursor: pointer;
        display: inline-block;
        position: relative;
        width: 90px;
        height: 50px;
        background-color: #83D8FF;
        border-radius: 84px;
        transition: background-color 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);

        .star {
            position: absolute;
            background-color: #ffffff;
            transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
            border-radius: 50%;
        }

        .star--1 {
            top: 10px;
            left: 35px;
            z-index: 1;
            width: 30px;
            height: 3px;
        }

        .star--2 {
            top: 18px;
            left: 28px;
            z-index: 1;
            width: 30px;
            height: 3px;
        }

        .star--3 {
            top: 27px;
            left: 40px;
            z-index: 0;
            width: 30px;
            height: 3px;
        }
            
        .star--4,
        .star--5,
        .star--6 {
            opacity: 0;
            transition: all 300ms 0 cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }

        .star--4 {
            top: 16px;
            left: 11px;
            z-index: 0;
            width: 2px;
            height: 2px;
            transform: translate3d(3px,0,0);
        }

        .star--5 {
            top: 32px;
            left: 17px;
            z-index: 0;
            width: 3px;
            height: 3px;
            transform: translate3d(3px,0,0);
        }

        .star--6 {
            top: 36px;
            left: 28px;
            z-index: 0;
            width: 2px;
            height: 2px;
            transform: translate3d(3px,0,0);
        }
    `

    const ToggleHandler = styled.span`
        display: inline-block;
        position: relative;
        z-index: 1;
        top: 3px;
        left: 3px;
        width: 44px;
        height: 44px;
        background-color: #FFCF96;
        border-radius: 50px;
        box-shadow: 0 2px 6px rgba(0,0,0,.3);
        transition: all 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
        transform:  rotate(-45deg);

        .crater {
            position: absolute;
            background-color: #E8CDA5;
            opacity: 0;
            transition: opacity 200ms ease-in-out;
            border-radius: 100%;
        }
        
        .crater--1 {
            top: 18px;
            left: 10px;
            width: 4px;
            height: 4px;
        }
        
        .crater--2 {
            top: 28px;
            left: 22px;
            width: 6px;
            height: 6px;
        }
        
        .crater--3 {
            top: 10px;
            left: 25px;
            width: 8px;
            height: 8px;
        }
    `

    const Crater = styled.span`
        
    `
    const Star = styled.span`
        
    `
    //#endregion
//#endregion

export {ToggleButton,DarkModToggleButton} ;