import React, { useEffect } from "react";
import styled from "styled-components";

import Title from "../../common/Title";
import Button from "../../common/Button";
import GuideSlider from "./GuideSlider";

// 방 생성하기 모달
function GuideModal({ setModalOpen }) {
  // 모달 닫는창
  const closeModal = () => {
    setModalOpen(false);
  };

  // 모달 밖 클릭시 모달 없앰
  useEffect(() => {
    document.body.style = `overflow:hidden`;
    return () => (document.body.style = `overflow:auto`);
  }, []);

  // 생성하기 버튼 눌렀을 때 활성화 되는 함수
  return (
    <Wrap onClick={closeModal}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title title="PICHIT 100% 활용 가이드" />
        </Header>
        <GuideSlider />
        <Layout>
          <Button
            handler={closeModal}
            text={"확인했어요"}
            isImportant={false}
          />
        </Layout>
      </ModalContainer>
    </Wrap>
  );
}
export default GuideModal;

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9998;
`;

const ModalContainer = styled.div`
  width: 700px;
  height: 500px;

  /* 최상단 위치 */
  z-index: 9999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  background-color: #ffffff;
  border: none;
  border-radius: 8px;
  box-shadow: 5px 10px 10px 1px rgba(0, 0, 0, 0.3);
  padding: 30px;

  & > div:nth-child(2) {
    height: 75%;
  }
`;

const Layout = styled.div`
  width: 100%;
  margin-top: 2em;

  display: flex;
  justify-content: center;

  div {
    height: 3vh;
    font-size: 0.8rem;
  }
`;

const Header = styled.div`
  margin: 10px;
  text-align: center;

  .Title {
    font-size: 2rem;
    color: var(--primary);
  }
`;
