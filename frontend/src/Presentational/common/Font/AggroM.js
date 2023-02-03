import { createGlobalStyle } from "styled-components";
import SBagrroM from "../../../store/asset/fonts/SBaggroM.ttf"

export default createGlobalStyle`
    @font-face {
        font-family: "SBagrroM";
        src: local("SBaggroM"),
        url(${SBagrroM}) format('tff');
        font-style: normal;
    }
`