import React from "react";
import { debounce } from "lodash-es";

export default ({ defaultValue, onChange }) => {
  const handleChange = debounce((value) => {
    onChange(value);
  }, 400);
  return (
    <div>
      <input
        type="text"
        defaultValue={defaultValue}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        placeholder="Please input repo name"
      />
    </div>
  );
};
