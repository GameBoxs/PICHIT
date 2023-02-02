import { useEffect, useState } from "react";
import axios from "axios";
import { PITCHIT_URL } from "../../store/values";
import { useDispatch } from "react-redux";

/* 
  target : 타겟 백엔드 API 주소
  type : 메소드 유형(GET, POST, PUT, DELETE)
  body : 전송하거나 받을 데이터 종류
    ex) const test = {
          "userId": 1,
          "id": 1,
          "title": "테스트 되고 있나용",
          "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  token : 로그인 토큰
  }

  사용 예시
  *js는 타입이 널널해서? 인자로 덜 전달해도 알아서 undefined로 판단하고 넣어줘요
  const data = useAxios('https://jsonplaceholder.typicode.com/comments', "GET")
  const data = useAxios('https://jsonplaceholder.typicode.com/posts/1', "DELETE", test, token)

*/

function useAxios(target, type, token, body, execute=true) {
  const [data, setData] = useState(null); //외부로 내보낼 데이터
  const [isLoading, setIsLoading] = useState(true); //로딩 중인지 아닌지 판단하는 부분
  useEffect(() => {
      
      if(execute){
        //props를 받고 실행되어야 하기 때문에/통신이기 때문에 useEffect로 감싸줌
        const sendType = type.toUpperCase(); //소문자/대문자 구별 없애기
    
        axios({
          method: sendType,
          url: `${PITCHIT_URL}/${target}`,
          headers: {
            Authorization: token,
          },
          data: { ...body },
        })
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            //then 또는 catch가 모두 작동한 이후에 로딩이 끝났다고 판단
            setIsLoading(false);
          });
      }
  }, [type, target, body,execute]);

  return [ data, isLoading ];
}

export default useAxios;
