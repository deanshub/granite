'use client';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import { saveFileContent } from '@/lib/actions';

export function TiptapEditor({ content, filePath }: { content: string; filePath: string }) {
  return <SimpleEditor content={content} onChange={(content) => saveFileContent(filePath, content)} />;
}
