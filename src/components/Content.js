import React from "react";

export default ({ data }) => (
  <>
    {data.map(({ full_name, description }) => (
      <div key={full_name}>
        <h3>{full_name}</h3>
        <div>{description || ""}</div>
      </div>
    ))}
  </>
);
