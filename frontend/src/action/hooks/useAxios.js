import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

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

function useAxios(target, type, body, token) {
  const [data, setData] = useState(null);             //외부로 내보낼 데이터
  const [isLoading, setIsLoading] = useState(true);   //로딩 중인지 아닌지 판단하는 부분
  
  useEffect(() => {                     //props를 받고 실행되어야 하기 때문에/통신이기 때문에 useEffect로 감싸줌
    const select = type.toUpperCase()   //소문자/대문자 구별 없애기

    /* 
      GET/POST/PUT/DELETE 판단 후 해당하는 부분으로 이동하여 작동
      PUT과 DELETE는 테스트는 해봤는데 정확히 되는 지는 확인 필요
    */

    switch (select) {                   
      case "GET":       //GET만 토큰/body 필요X
        axios
          .get(target)
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => console.log(err))
          .finally(() => {              //then 또는 catch가 모두 작동한 이후에 로딩이 끝났다고 판단
            setIsLoading(false);
          });
        break;
      case "POST":
        axios
          .post(target, body, { headers: { Authorization: token } })
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setIsLoading(false);
          });
        break;
      case "PUT":
        axios
          .put(target, body, { headers: { Authorization: token } })
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setIsLoading(false);
          });
        break;
      case "DELETE":
        axios
          .delete(target, body, { headers: { Authorization: token } })
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setIsLoading(false);
          });
        break;
      default:                          //지정되지 않은 메소드일 경우 메세지만 띄움            
        console.log("지정되지 않은 메소드입니다");
        break;
    }
  }, [type]);

  return { data, isLoading };
}

export default useAxios;
