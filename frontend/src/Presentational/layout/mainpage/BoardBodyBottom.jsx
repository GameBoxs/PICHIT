import React, {useState} from "react";
import styled from "styled-components";
import CreateRoom from "../../component/Modal/CreateRoom";
import Button from "../../common/Button";
import { useSelector } from "react-redux";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function BoardBodyBottom() {
    //방생성하기
    const token =useSelector((state)=>state.token)

    //모달 생성 판별 여부
    const [modalOpen, setModalOpen] = useState(false);
    const showModal = () => {
      if (token){
        setModalOpen(true);
      }
      else{
        MySwal.fire({
          title:"로그인이 필요한 서비스 입니다.",
          text: "상단 메뉴에서 카카오 로그인을 이용해 주세요 ",
          showConfirmButton: false,
          icon: "warning",
          timer: 1500,
        });
      }
    };

    return <Footer>
      <Button text={"방 만들기"} handler={showModal} isImportant={true}>방만들기</Button>
      {modalOpen && <CreateRoom setModalOpen={setModalOpen} />}
    </Footer>
}

export default BoardBodyBottom

const Footer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 1rem 0;
`;