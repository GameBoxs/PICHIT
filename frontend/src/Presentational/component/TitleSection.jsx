import styled from "styled-components";
//sweetalert2
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);


function TitleSection(props) {
  const isUser = props.token
  function switchHandler(e){
    props.roomSwitch(e)
  }
  function testFuntion(){
    console.log('찍혀라 얍')
  }
  //비로그인 사용자가 MY 클릭시
  function needLogin(){
    MySwal.fire({
      text: "로그인이 필요한 서비스 입니다.",
      showConfirmButton:false,
      icon:'warning',
      timer: 1500
    })
  }
  return (
    <Titlesection>
      <p>
        {props.roomPosition
          ? "내가 참여한 목록입니다(예정만 보여줌)"
          : "모든방 목록입니다"}
      </p>
      <div>
        <button onClick={()=>{switchHandler("toTotal")}}>
            TOTAL
        </button>
        <button onClick={()=>{if(isUser){
            switchHandler("toMy");}
            else{needLogin()}}}>
            MY
        </button>
      </div>
    </Titlesection>
  );
}

export default TitleSection;

const Titlesection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'SBAggroL';
`
