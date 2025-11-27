'use client';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';

export function TiptapEditor({ content }: { content: string }) {
  return <SimpleEditor content={content} />;
}
