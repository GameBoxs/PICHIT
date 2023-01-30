import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function useAxios(target, type, body) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const token = useSelector(state => state.token)

  useEffect(() => {
    const select = type.toUpperCase()
    switch (select) {
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

export default useAxios;
