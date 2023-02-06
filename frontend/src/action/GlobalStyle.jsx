import React from "react";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        transition: 0.2s;
        font-size: 1rem;
    }

    :root {
        --primary-light: #8abdff;
        --primary: #6d5dfc;
        --primary-dark: #5b0eeb;
        
        --white: #FFFFFF;
        --greyLight-1: #E4EBF5;
        --greyLight-2: #c8d0e7;
        --greyLight-3: #bec8e4;
        --greyDark: #9baacf;
        --textColor: #5e5e5e;
    }

    $shadow: .3rem .3rem .6rem var(--greyLight-2), -.2rem -.2rem .5rem var(--white);
    $inner-shadow: inset .2rem .2rem .5rem var(--greyLight-2), inset -.2rem -.2rem .5rem var(--white);

    body {
        height: fit-content;
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
`;
