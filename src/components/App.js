import React, { useState, useEffect } from "react";
import { fetchData } from "../utils";
import Search from "./Search";
import ErrorInfo from "./ErrorInfo";
import Content from "./Content";

const genHandleScroll = (fetchNextPage) => () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    fetchNextPage();
  }
};

const App = () => {
  const [filter, setFilter] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const appendSuccessData = (appendedData) => {
    setData([...data, ...appendedData]);
  };
  const fetchNextPage = () => {
    fetchData(filter, page + 1, appendSuccessData, setErrMsg);
    setPage((prevPage) => prevPage + 1);
  };
  useEffect(() => {
    const handleScroll = genHandleScroll(fetchNextPage);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage]);
  return (
    <div>
      <Search
        defaultValue={filter}
        onChange={(value) => {
          if (value) {
            fetchData(value, 1, setData, setErrMsg);
            setFilter(value);
            setPage(1);
          } else {
            setData([]);
            setErrMsg("");
            setFilter("");
            setPage(0);
          }
        }}
      />
      {errMsg ? <ErrorInfo errMsg={errMsg} /> : null}
      <hr />
      <Content data={data} />
    </div>
  );
};

export default App;
