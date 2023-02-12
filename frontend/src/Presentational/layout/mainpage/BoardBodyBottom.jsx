import React, {useState} from "react";
import styled from "styled-components";
import CreateRoom from "../../component/CreateRoom";
import Button from "../../common/Button";

function BoardBodyBottom() {
    //방생성하기
    const [modalOpen, setModalOpen] = useState(false);
    const showModal = () => {
      setModalOpen(true);
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