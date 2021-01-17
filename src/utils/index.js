const DEFAULT_PER_PAGE = 10;
async function fetchApi(q, page) {
  const queryStr = [
    `q=${encodeURIComponent(q)}`,
    `page=${page}`,
    `per_page=${DEFAULT_PER_PAGE}`,
  ].join("&");
  return await fetch(
    `https://api.github.com/search/repositories?${queryStr}`
  ).then((response) => {
    return response.json();
  });
}

export async function fetchData(q, page, successCb, failureCb) {
  const { items, message } = await fetchApi(q, page);
  if (message) {
    failureCb(message);
  }
  if (items) {
    successCb(items);
    failureCb("");
  }
}
