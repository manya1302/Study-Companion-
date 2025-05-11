
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from '@/components/ui/use-toast';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Bold, Italic, Underline, List, ListOrdered, Undo, Redo, Image as ImageIcon, Paperclip } from 'lucide-react';

const RichTextEditorToolbar = ({ onCommand }) => {
  return (
    <div className="flex items-center space-x-1 p-2 border-b bg-muted/50 rounded-t-md">
      <Button variant="ghost" size="icon" onClick={() => onCommand('bold')} title="Bold">
        <Bold className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => onCommand('italic')} title="Italic">
        <Italic className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => onCommand('underline')} title="Underline">
        <Underline className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" className="h-6 mx-2" />
      <Button variant="ghost" size="icon" onClick={() => onCommand('insertUnorderedList')} title="Bullet List">
        <List className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => onCommand('insertOrderedList')} title="Numbered List">
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" className="h-6 mx-2" />
      <Button variant="ghost" size="icon" onClick={() => onCommand('undo')} title="Undo">
        <Undo className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => onCommand('redo')} title="Redo">
        <Redo className="h-4 w-4" />
      </Button>
       <Separator orientation="vertical" className="h-6 mx-2" />
        <Button variant="ghost" size="icon" onClick={() => toast({title: "Feature Coming Soon", description: "Image insertion will be available in a future update."})} title="Insert Image (Coming Soon)">
            <ImageIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => toast({title: "Feature Coming Soon", description: "Attaching files will be available in a future update."})} title="Attach File (Coming Soon)">
            <Paperclip className="h-4 w-4" />
        </Button>
    </div>
  );
};

const DocumentEditorPage = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const [documents, setDocuments] = useLocalStorage('documents', []);
  const [document, setDocument] = useState(null);
  const [title, setTitle] = useState('');
  const editorRef = useRef(null);

  useEffect(() => {
    const currentDoc = documents.find(doc => doc.id === documentId);
    if (currentDoc) {
      setDocument(currentDoc);
      setTitle(currentDoc.title);
      if (editorRef.current) {
        editorRef.current.innerHTML = currentDoc.content || '';
      }
    } else {
      toast({ title: "Error", description: "Document not found.", variant: "destructive" });
      navigate('/documents');
    }
  }, [documentId, documents, navigate]);

  const handleSaveDocument = () => {
    if (!document) return;
    const content = editorRef.current ? editorRef.current.innerHTML : '';
    const updatedSummary = content.substring(0, 100).replace(/<[^>]+>/g, '') + (content.length > 100 ? '...' : '');


    const updatedDocument = { 
      ...document, 
      title, 
      content,
      summary: updatedSummary,
      lastModified: new Date().toISOString() 
    };
    
    const updatedDocuments = documents.map(doc => 
      doc.id === documentId ? updatedDocument : doc
    );
    setDocuments(updatedDocuments);
    setDocument(updatedDocument);
    toast({ title: "Saved!", description: `"${title}" has been saved successfully.`, className: "bg-green-500 text-white dark:bg-green-600 dark:text-white" });
  };

  const handleToolbarCommand = (command) => {
    document.execCommand(command, false, null);
    editorRef.current.focus();
  };
  
  const handleContentChange = () => {
    // This could be used for auto-save or other real-time updates if needed
    // For now, manual save is implemented
  };

  if (!document) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading document...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full max-h-[calc(100vh-var(--header-height,4rem)-var(--footer-height,4rem)-2rem)]"
    >
      <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link to="/documents"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <Input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Document Title"
            className="text-xl font-semibold border-0 focus-visible:ring-0 shadow-none p-0 h-auto"
          />
        </div>
        <Button onClick={handleSaveDocument} className="gradient-bg text-primary-foreground">
          <Save className="mr-2 h-4 w-4" /> Save Document
        </Button>
      </header>
      
      <div className="flex-grow flex flex-col p-1 md:p-2 overflow-hidden">
        <RichTextEditorToolbar onCommand={handleToolbarCommand} />
        <div 
          ref={editorRef}
          contentEditable
          onInput={handleContentChange}
          className="flex-grow p-4 md:p-6 bg-background rounded-b-md shadow-inner focus:outline-none overflow-y-auto scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent"
          style={{ minHeight: '300px' }}
        />
      </div>
       <p className="text-center text-xs text-muted-foreground py-2">
        This is a basic rich text editor. For advanced features and reliable storage, a backend is recommended.
      </p>
    </motion.div>
  );
};

export default DocumentEditorPage;
  