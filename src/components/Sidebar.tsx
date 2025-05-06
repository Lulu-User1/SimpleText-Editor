import  { useState } from 'react';
import { Plus, Trash, File, Edit, Check, X } from 'lucide-react';
import { TextFile } from '../types';

interface SidebarProps {
  files: TextFile[];
  activeFileId: string | null;
  onCreateFile: () => void;
  onDeleteFile: (id: string) => void;
  onSelectFile: (id: string) => void;
  onRenameFile: (id: string, newName: string) => void;
  fileLimit: number;
}

const Sidebar = ({
  files,
  activeFileId,
  onCreateFile,
  onDeleteFile,
  onSelectFile,
  onRenameFile,
  fileLimit
}: SidebarProps) => {
  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [editingFileName, setEditingFileName] = useState<string>('');
  const canCreateFile = files.length < fileLimit;

  const startRenaming = (id: string, currentName: string) => {
    setEditingFileId(id);
    setEditingFileName(currentName);
  };

  const cancelRenaming = () => {
    setEditingFileId(null);
  };

  const saveNewName = (id: string) => {
    if (editingFileName.trim()) {
      onRenameFile(id, editingFileName.trim());
    }
    setEditingFileId(null);
  };

  return (
    <div className="w-full md:w-64 bg-white rounded-md shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-medium text-gray-700">Your Files</h2>
        <div className="text-xs text-gray-500">
          {files.length}/{fileLimit}
        </div>
      </div>
      
      <button
        onClick={onCreateFile}
        disabled={!canCreateFile}
        className={`w-full flex items-center justify-center py-2 px-3 rounded-md mb-4 ${
          canCreateFile 
            ? 'bg-primary-600 text-white hover:bg-primary-700' 
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
      >
        <Plus className="h-4 w-4 mr-2" />
        New File
      </button>
      
      {files.length === 0 && (
        <div className="text-center py-8 text-gray-500 text-sm">
          No files yet. Create your first file!
        </div>
      )}
      
      <div className="space-y-1">
        {files.map((file) => (
          <div 
            key={file.id}
            className={`flex items-center justify-between py-2 px-3 rounded-md ${
              activeFileId === file.id ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'
            }`}
          >
            {editingFileId === file.id ? (
              <div className="flex items-center justify-between w-full">
                <input
                  type="text"
                  value={editingFileName}
                  onChange={(e) => setEditingFileName(e.target.value)}
                  className="flex-1 p-1 text-sm border border-gray-300 rounded mr-2"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveNewName(file.id);
                    if (e.key === 'Escape') cancelRenaming();
                  }}
                />
                <div className="flex items-center">
                  <button
                    onClick={() => saveNewName(file.id)}
                    className="text-green-500 hover:text-green-700 mr-1"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    onClick={cancelRenaming}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div 
                  className="flex items-center truncate cursor-pointer"
                  onClick={() => onSelectFile(file.id)}
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{file.name}</span>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startRenaming(file.id, file.name);
                    }}
                    className="text-gray-400 hover:text-primary-500 mr-1"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteFile(file.id);
                    }}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
 