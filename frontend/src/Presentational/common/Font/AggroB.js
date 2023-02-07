import { createGlobalStyle } from "styled-components";
import SBagrroB from "../../../store/asset/fonts/SBaggroB.ttf"

export default createGlobalStyle`
    @font-face {
        font-family: SBagrroB;
        src: url(${SBagrroB});
    }
`