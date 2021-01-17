import React from "react";

export default ({ errMsg }) => (
  <h3 className="cl-red">Server Error: {errMsg}. Please retry again.</h3>
);
