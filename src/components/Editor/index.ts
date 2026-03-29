export { default as EditorPreview } from "./EditorPreview";

import dynamic from "next/dynamic";

export const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
  ssr: false,
});
