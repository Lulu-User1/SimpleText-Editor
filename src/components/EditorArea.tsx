import  { useEffect, useRef } from 'react';
import { TextFile } from '../types';
import { Save } from 'lucide-react';

interface EditorAreaProps {
  activeFile: TextFile | null;
  onUpdateContent: (content: string) => void;
  onSaveFile: () => void;
}

const EditorArea = ({ activeFile, onUpdateContent, onSaveFile }: EditorAreaProps) => {
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editorRef.current && activeFile) {
      editorRef.current.focus();
    }
  }, [activeFile?.id]);

  if (!activeFile) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <img 
          src="https://previews.123rf.com/images/arcady31/arcady311604/arcady31160400053/55145543-text-file-icon.jpg" 
          alt="Text file icon" 
          className="w-64 h-auto mb-4 rounded-md opacity-75"
        />
        <div className="flex flex-col items-center space-y-2">
          <p className="text-gray-500">Select a file to edit or create a new one</p>
          <p className="text-sm text-gray-400">Your documents are stored locally in your browser</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-700">
          Editing: {activeFile.name}
        </h2>
        <button
          onClick={onSaveFile}
          className="flex items-center px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          <Save className="h-4 w-4 mr-2" />
          Save
        </button>
      </div>
      <textarea
        ref={editorRef}
        className="editor"
        value={activeFile.content}
        onChange={(e) => onUpdateContent(e.target.value)}
        placeholder="Start typing here..."
      />
      <div className="text-sm text-gray-500">
        Last modified: {new Date(activeFile.lastModified).toLocaleString()}
      </div>
    </div>
  );
};

export default EditorArea;
 