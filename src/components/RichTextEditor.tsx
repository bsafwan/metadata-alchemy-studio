
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Bold, Italic, List, ListOrdered, Type } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState('16');

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      
      // Auto-format lists
      const lines = content.split('<div>').join('\n').split('</div>').join('').split('<br>');
      let formattedContent = content;
      
      lines.forEach((line, index) => {
        const trimmed = line.trim();
        if (trimmed.match(/^(\d+\.|\w\.|[•-])\s/)) {
          // Already formatted
          return;
        }
        if (trimmed.match(/^(\d+\.|\w\.)\s/) || trimmed.match(/^\d+\.\s/) || trimmed.match(/^[a-zA-Z]\.\s/)) {
          // Auto-format numbered/lettered lists
          return;
        }
      });
      
      onChange(formattedContent);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const currentLine = range.startContainer.textContent;
        
        if (currentLine?.match(/^\d+\.\s/)) {
          e.preventDefault();
          const nextNum = parseInt(currentLine.match(/^(\d+)/)?.[1] || '1') + 1;
          document.execCommand('insertHTML', false, `<br>${nextNum}. `);
        } else if (currentLine?.match(/^[a-zA-Z]\.\s/)) {
          e.preventDefault();
          const currentLetter = currentLine.match(/^([a-zA-Z])/)?.[1] || 'a';
          const nextLetter = String.fromCharCode(currentLetter.charCodeAt(0) + 1);
          document.execCommand('insertHTML', false, `<br>${nextLetter}. `);
        }
      }
    }
  };

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <div className="flex items-center gap-2 p-2 bg-gray-50 border-b border-gray-200">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand('bold')}
          className="h-8 w-8 p-0"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand('italic')}
          className="h-8 w-8 p-0"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand('insertUnorderedList')}
          className="h-8 w-8 p-0"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand('insertOrderedList')}
          className="h-8 w-8 p-0"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-1 ml-2">
          <Type className="h-4 w-4 text-gray-500" />
          <select
            value={fontSize}
            onChange={(e) => {
              setFontSize(e.target.value);
              execCommand('fontSize', e.target.value);
            }}
            className="text-xs border border-gray-300 rounded px-1 py-0.5"
          >
            <option value="1">Small</option>
            <option value="3">Normal</option>
            <option value="4">Large</option>
            <option value="5">X-Large</option>
          </select>
        </div>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className="min-h-[200px] p-4 focus:outline-none"
        style={{ fontSize: fontSize === '1' ? '12px' : fontSize === '3' ? '16px' : fontSize === '4' ? '18px' : '20px' }}
        dangerouslySetInnerHTML={{ __html: value }}
        data-placeholder={placeholder}
      />
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
