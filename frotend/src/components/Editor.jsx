import React, { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-markdown";
import "prismjs/themes/prism.css"; // Add the Prism theme
import axios from "axios";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const [tempMarkdown, setTempMarkdown] = useState("");
  const debounceTimeoutRef = useRef(null);

  const handleInputChange = (value) => {
    if (value === "") {
      setMarkdown(value);
      setTempMarkdown(value);
      return;
    }
    setTempMarkdown(value);
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      handleDebouncedChange(value);
    }, 500);
  };

  const handleDebouncedChange = async (value) => {
    try {
      let markDownResp = await axios.post("http://localhost:5000/convert", {
        markdown: value,
      });
      if (!markDownResp?.error) {
        setMarkdown(markDownResp?.data?.html);
      }
      console.log("🚀 ~ handleDebouncedChange ~ markDownResp:", markDownResp);
    } catch (error) {
      console.log("🚀 ~ handleDebouncedChange ~ error:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="markdown-editor-container">
      <div className="editor-section">
        <h2 className="section-header">Markdown Editor</h2>
        <Editor
          value={tempMarkdown}
          onValueChange={handleInputChange}
          highlight={(code) =>
            Prism.highlight(code, Prism.languages.markdown, "markdown")
          }
          padding={10}
          className="editor"
        />
      </div>
      <div className="preview-section">
        <h2 className="section-header">Preview</h2>
        <div
          className="preview"
          dangerouslySetInnerHTML={{ __html: marked(markdown) }}
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;
