'use client';

import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
  language?: string;
}

export default function CodeEditor({ code, onChange, language = 'javascript' }: CodeEditorProps) {
  return (
    <div className="h-full w-full rounded-xl overflow-hidden border border-surface-border">
      <Editor
        height="100%"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: 'var(--font-geist-mono), monospace',
          padding: { top: 16 },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
        }}
        loading={<div className="flex items-center justify-center h-full text-gray-500">Loading IDE...</div>}
      />
    </div>
  );
}
