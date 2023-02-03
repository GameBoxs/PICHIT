import { createGlobalStyle } from "styled-components";
import SBagrroL from "../../../store/asset/fonts/SBaggroL.ttf"

export default createGlobalStyle`
    @font-face {
        font-family: "SBagrroL";
        src: local("SBaggroL"),
        url(${SBagrroL}) format('tff');
        font-style: normal;
    }
`