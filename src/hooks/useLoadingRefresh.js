import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/authSlice";
import api from "../utils/httpRequests";

export const useLoadingRefresh = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("api/refresh");
        dispatch(setAuth(data));
        setLoading(false);
        console.log("refresh");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  return { loading };
};
