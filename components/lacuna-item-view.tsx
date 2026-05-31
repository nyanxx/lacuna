"use client";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";

export default function ContentViewer({ content }: { content: string }) {
  const editor = useCreateBlockNote({
    initialContent: JSON.parse(content),
  });

  return <BlockNoteView editor={editor} editable={false} />;
}
