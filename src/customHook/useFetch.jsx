import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


export function useFetch(url, query = '') {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const reloadData = () => {
    setReload(!reload)
  }
  const [paging, setPaging] = useState({
    page: 1,
    pageSize: 8,
    total: 10,
  });


  url += `?populate=*&pagination[page]=${paging.page}&pagination[pageSize]=${paging.pageSize}&${query}`;
  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        if (componentMounted) {
          setData(res.data.data);
          setPaging({
            ...res?.data?.meta?.pagination,
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
    return () => {
      componentMounted = false;
    };
  }, [url, paging.page, reload, query]);

  return { data, setData, paging, setPaging, reload, reloadData, loading, setLoading };
}