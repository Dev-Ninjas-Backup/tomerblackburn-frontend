"use client";

import React from "react";
import "./editor.css";

interface EditorPreviewProps {
  content: string;
  className?: string;
  bare?: boolean;
}

const EditorPreview: React.FC<EditorPreviewProps> = ({
  content,
  className = "",
  bare = false,
}) => {
  return (
    <div className={`editor-preview-container ${className}`}>
      <div
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: content }}
        style={{
          border: "none",
          padding: bare ? "0" : "1rem",
          minHeight: "auto",
          backgroundColor: bare ? "transparent" : "#f9fafb",
          borderRadius: bare ? "0" : "0.5rem",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default EditorPreview;
