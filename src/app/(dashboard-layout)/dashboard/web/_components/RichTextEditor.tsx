"use client";

import React, { useRef, useMemo } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Start typing...",
}: RichTextEditorProps) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder,
      minHeight: 400,
      toolbar: true,
      toolbarAdaptive: false,
      uploader: {
        insertImageAsBase64URI: true,
      },
      filebrowser: {
        ajax: {
          url: process.env.NEXT_PUBLIC_API_BASE_URL + "/upload",
        },
      },
    }),
    [placeholder],
  );

  return (
    <div className="w-full">
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        onChange={(newContent) => onChange(newContent)}
      />
    </div>
  );
};
