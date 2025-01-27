import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function ReadmeTab({ value, setValue }) {
  // const updateReadme = () => {
  //   console.log(JSON.stringify(value));
  // };
  return (
    <div className="container mx-auto p-4">
      <ReactQuill
        theme="snow"
        placeholder="Write the detailed readme of your fyp"
        value={value}
        onChange={setValue}
      />
      {/* <Button className="flex justify-end my-4 ml-auto" onClick={updateReadme}>
        Update Changes
      </Button> */}
    </div>
  );
}

export default ReadmeTab;
