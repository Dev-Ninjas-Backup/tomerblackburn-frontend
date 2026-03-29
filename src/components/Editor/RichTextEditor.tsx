"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./editor.css";
import type { RichTextEditorProps } from "@/types/textEditor";

// Register custom font sizes
const Size = Quill.import("formats/size") as { whitelist: string[] };
Size.whitelist = ["8px","10px","12px","14px","16px","18px","20px","24px","28px","32px","36px","48px","64px","72px"];
Quill.register("formats/size", Size, true);

// Register custom fonts
const Font = Quill.import("formats/font") as { whitelist: string[] };
Font.whitelist = [
  "sans-serif", "serif", "monospace",
  "arial", "georgia", "trebuchet-ms", "verdana",
  "courier-new", "times-new-roman", "impact",
  "comic-sans-ms", "tahoma", "palatino",
];
Quill.register("formats/font", Font, true);

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Start writing your content...",
  className = "",
  readOnly = false,
  theme = "snow",
  minHeight = "400px",
}) => {
  const quillRef = useRef<ReactQuill>(null);
  const [mounted, setMounted] = useState(false);
  const initialValue = useRef(value);
  const populated = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || populated.current) return;
    const editor = quillRef.current?.getEditor();
    if (!editor || !value || value === "<p><br></p>") return;
    editor.clipboard.dangerouslyPasteHTML(value);
    populated.current = true;
  }, [mounted, value]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: ["sans-serif","serif","monospace","arial","georgia","trebuchet-ms","verdana","courier-new","times-new-roman","impact","comic-sans-ms","tahoma","palatino"] }],
          [{ size: ["8px","10px","12px","14px",false,"16px","18px","20px","24px","28px","32px","36px","48px","64px","72px"] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ align: [] }],
          [{ direction: "rtl" }],
          ["blockquote", "code-block"],
          ["link", "image", "video", "formula"],
          ["clean"],
        ],
      },
      clipboard: { matchVisual: false },
    }),
    [],
  );

  const formats = useMemo(
    () => [
      "header", "font", "size",
      "bold", "italic", "underline", "strike",
      "color", "background",
      "script",
      "list", "indent",
      "align", "direction",
      "blockquote", "code-block",
      "link", "image", "video", "formula",
    ],
    [],
  );

  if (!mounted) return <div style={{ minHeight }} className={`rich-text-editor-wrapper ${className}`} />;

  return (
    <div className={`rich-text-editor-wrapper ${className}`}>
      <ReactQuill
        ref={quillRef}
        theme={theme}
        defaultValue={initialValue.current}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </div>
  );
};

export default RichTextEditor;
