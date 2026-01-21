"use client";

import React, { useState } from "react";
import { RichTextEditor } from "./RichTextEditor";

export const EditorPreview = () => {
  const [content, setContent] = useState("<p>Start typing here...</p>");

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Rich Text Editor Demo</h2>
        <p className="text-gray-600">
          A modern WYSIWYG editor with professional toolbar
        </p>
      </div>

      <RichTextEditor
        value={content}
        onChange={setContent}
        placeholder="Press '/' for commands or start typing..."
      />

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">HTML Output:</h3>
        <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
          {content}
        </pre>
      </div>
    </div>
  );
};
