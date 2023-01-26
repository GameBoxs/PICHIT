import { useEffect, useState } from "react";
import axios from "axios";

function useGet(target) {
  const [data, setData] = useState(null);
  //로그인 이후 리덕스 저장소에서 토큰 들고오기
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzcGVha29uIiwibmFtZSI6IuydtO2drOyImCIsImlkIjo0NiwiZXhwIjoxNjc2NTA3ODMwLCJpYXQiOjE2NzQ2OTM0MzAsInVzZXJJZCI6Imtha2FvXzI2Mjk4Mzk0NjIifQ.R7JuJDcrX13tpKqqHxq_MDcNOzASPZUYPnLWlevKzmePM6InZPe3YEy0XkTD-HqRADzkpB2p9UYFcVYnwQwzBA";

  useEffect(() => {
    axios
      .get(target)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [target]);

  return [data];
}

export default useGet;
