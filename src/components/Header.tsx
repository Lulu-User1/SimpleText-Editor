import  { FileText } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary-600" />
          <h1 className="text-xl font-bold text-gray-800">SimpleText Editor</h1>
        </div>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden sm:block text-sm text-primary-600 hover:text-primary-800"
        >
          View on GitHub
        </a>
      </div>
    </header>
  );
};

export default Header;
 