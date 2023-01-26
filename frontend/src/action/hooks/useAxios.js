import { useEffect, useState } from "react";
import axios from "axios";

function useGet(target, type, body) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //로그인 이후 리덕스 저장소에서 토큰 들고오기
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzcGVha29uIiwibmFtZSI6IuydtO2drOyImCIsImlkIjo0NiwiZXhwIjoxNjc2NTA3ODMwLCJpYXQiOjE2NzQ2OTM0MzAsInVzZXJJZCI6Imtha2FvXzI2Mjk4Mzk0NjIifQ.R7JuJDcrX13tpKqqHxq_MDcNOzASPZUYPnLWlevKzmePM6InZPe3YEy0XkTD-HqRADzkpB2p9UYFcVYnwQwzBA";

  useEffect(() => {
    switch (type) {
      case "GET":
        axios
          .get(target)
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => console.log(err))
          .finally(() => {
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
      default:
        console.log("지정되지 않은 메소드입니다");
        break;
    }
  }, [type]);

  return { data, isLoading };
}

export default useGet;
