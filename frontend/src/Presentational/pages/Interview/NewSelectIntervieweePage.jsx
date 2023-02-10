// ETC Import Start
import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// ETC Import End

// component Import Start
import Screen from "../../layout/Interview/Screen";
// component Import End

// Module Import Start
import { leaveSession, selectInterviwee } from "../../../action/modules/chatModule";
// Module Import End

// Global Variable Start
const MySwal = withReactContent(Swal);
// Global Variable End

const NewSelectIntervieweePage = () => {


}

export default NewSelectIntervieweePage;
