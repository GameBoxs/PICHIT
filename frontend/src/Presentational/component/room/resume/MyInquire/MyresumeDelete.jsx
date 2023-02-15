import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { PITCHIT_URL } from "../../../../../store/values";


function MyresumeDelete({getData,token,setMemData}) {
  if (getData === null) {
    return (<>
    </>)
  }
  else{
    const fileId = getData.data.id
       // 등록된 pdf 데이터 삭제
    const onDeleteTarget = () => {
      console.log(getData)
      axios({
        method: "DELETE",
        url: `${PITCHIT_URL}/resumes/${fileId}`,
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          window.location.reload();
          setMemData(null)

        })
        .catch((err) => console.log(err));
    };
    return (<>
       <DeleteButton onClick={onDeleteTarget}>
              <IoClose />
            </DeleteButton>
    </>
 
    )
  }

}
export default MyresumeDelete; 

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1em;
  border: none;
  background-color: var(--primary-light);
  padding: 0.5em;
  color: var(--white);
  cursor: pointer;

  &:hover {
    background-color: var(--primary-dark);
  }
`;