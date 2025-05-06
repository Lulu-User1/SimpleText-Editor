import  { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import EditorArea from './components/EditorArea';
import { TextFile } from './types';

const STORAGE_KEY = 'simpletext-files';
const FILE_LIMIT = 10;

function App() {
  const [files, setFiles] = useState<TextFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);

  useEffect(() => {
    const savedFiles = localStorage.getItem(STORAGE_KEY);
    if (savedFiles) {
      const parsedFiles = JSON.parse(savedFiles);
      setFiles(parsedFiles);
      
      if (parsedFiles.length > 0) {
        setActiveFileId(parsedFiles[0].id);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
  }, [files]);

  const activeFile = files.find(file => file.id === activeFileId) || null;

  const createNewFile = () => {
    if (files.length >= FILE_LIMIT) return;
    
    const newFile: TextFile = {
      id: Date.now().toString(),
      name: `Untitled-${files.length + 1}`,
      content: '',
      lastModified: Date.now()
    };
    
    setFiles([...files, newFile]);
    setActiveFileId(newFile.id);
  };

  const deleteFile = (id: string) => {
    const updatedFiles = files.filter(file => file.id !== id);
    setFiles(updatedFiles);
    
    if (activeFileId === id) {
      setActiveFileId(updatedFiles.length > 0 ? updatedFiles[0].id : null);
    }
  };

  const updateFileContent = (content: string) => {
    if (!activeFileId) return;
    
    setFiles(files.map(file => 
      file.id === activeFileId 
        ? { ...file, content, lastModified: Date.now() }
        : file
    ));
  };

  const updateFileName = (id: string, newName: string) => {
    setFiles(files.map(file => 
      file.id === id 
        ? { ...file, name: newName, lastModified: Date.now() }
        : file
    ));
  };

  const saveFile = () => {
    // The file is already saved in localStorage via the useEffect
    // This function is for user feedback purposes
    if (!activeFileId) return;
    
    // Update the lastModified timestamp
    setFiles(files.map(file => 
      file.id === activeFileId 
        ? { ...file, lastModified: Date.now() }
        : file
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <Sidebar
            files={files}
            activeFileId={activeFileId}
            onCreateFile={createNewFile}
            onDeleteFile={deleteFile}
            onSelectFile={setActiveFileId}
            onRenameFile={updateFileName}
            fileLimit={FILE_LIMIT}
          />
          
          <div className="flex-1">
            <EditorArea
              activeFile={activeFile}
              onUpdateContent={updateFileContent}
              onSaveFile={saveFile}
            />
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-500">
          SimpleText Editor - Your files are saved locally in your browser
        </div>
      </footer>
    </div>
  );
}

export default App;
 