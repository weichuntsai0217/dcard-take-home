# Where is the source code?
* The source code is in `src/` folder.

# How to run this project
* Step 1. Clone this project and go to the directory of this project.
* Step 2. `yarn`
* Step 3. `npm start`
* Step 4. The website should be opened on your default browser (http://localhost:3000/)

# 設計理念
* 大方向: 每次request限制只能撈10筆data (`per_page=10`), 因此
  - 當user第一次輸入repo name時, 撈`page=1`的data
  - 當user下拉視窗到底時, 撈`page=2`的data, 並將`page=2`的data 附加到 `page=1`的data後面
  - 當user再一次下拉視窗到底時, 撈`page=3`的data, 並將`page=3`的data 附加到 `page=2`的data後面
  - 當user改變輸入的repo name時, 用新輸入的repo name去撈`page=1`的data
* Local State設計
  - 使用`filter` (請見`const [filter, setFilter] = useState("");`) 來記錄目前user欲搜尋的repo name
  - 使用`page` (請見`const [page, setPage] = useState(0);`) 來記錄使用者目前request的data是第幾頁 (每頁是10筆)。使用0為初始值, 只是想表示 為當user沒輸入任何值的時候, 網頁不需要去撈data
  - 使用`data` (請見`const [data, setData] = useState([]);`) 來記錄目前撈到的所有data
  - 若`filter`的值改變(但不是空字串), 就會將`page`設為1, 並且撈`page=1`的data
  - 若將視窗下拉到底, 就會去撈 `page + 1` 的data, 並將 `page` 更新為 `page + 1`
  - 若`filter`的值清空, 就會將`page`設為0, 同時將`data`設為`[]`

* 其他performance調校
  - 在搜尋欄位使用debounce來避免user每打1個字就會發request的問題.