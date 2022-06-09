import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import style from "./textBox.module.less";

export const TextBox = () => {
  // var icons = ReactQuill.import("ui/icons");
  TextBox.modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ header: "1" }, { header: "2" }],

      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };
  TextBox.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
  ];
  const [body, setBody] = useState("");
  const handleBody = (e) => {
    console.log(e);
    setBody(e);
  };

  return (
    <div>
      <div className={style["wrap"]}>
        <ReactQuill
          className={style["textBox"]}
          modules={TextBox.modules}
          formats={TextBox.formats}
          onChange={handleBody}
          value={body}
          placeholder="Nhập nội dung"
        />
      </div>
    </div>
  );
};
