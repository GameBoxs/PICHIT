import React, {useState} from "react";
import styled from "styled-components";
import CreateRoom from "../../component/CreateRoom";

function BoardBodyBottom() {
    //방생성하기
    const [modalOpen, setModalOpen] = useState(false);
    const showModal = () => {
      setModalOpen(true);
    };

    return <Footer>
      <button onClick={showModal}>방만들기</button>
      {modalOpen && <CreateRoom setModalOpen={setModalOpen} />}
    </Footer>
}

export default BoardBodyBottom

const Footer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;