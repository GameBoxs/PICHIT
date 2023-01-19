import React from "react";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        color: #000000;
        transition: 0.2s;
    }

    body.dark {
        background: #353535;
        & *{ 
            color: white;
            transition: 0.2s;
        }
        transition: 0.2s;
    }

    *::before, *::after {
        box-sizing: border-box;
    }
`