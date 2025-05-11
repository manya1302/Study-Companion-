
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { FileArchive, PlusCircle, ArrowLeft, FileText, Trash2, Edit } from 'lucide-react';

const DocumentsPage = () => {
  const [documents, setDocuments] = useLocalStorage('documents', [
    { id: '1', title: 'My First Note', lastModified: new Date().toISOString(), summary: 'This is a sample note about important study topics...' },
    { id: '2', title: 'Lecture Recap - Week 3', lastModified: new Date(Date.now() - 86400000).toISOString(), summary: 'Key points from Prof. Smith\'s lecture on Monday.' },
  ]);
  const [newDocumentTitle, setNewDocumentTitle] = useState('');
  const navigate = useNavigate();

  const handleCreateDocument = () => {
    if (newDocumentTitle.trim() === '') {
      toast({ title: "Oops!", description: "Document title cannot be empty.", variant: "destructive" });
      return;
    }
    const newDocId = String(Date.now());
    const newDocument = {
      id: newDocId,
      title: newDocumentTitle,
      content: '', 
      lastModified: new Date().toISOString(),
      summary: 'New document, start writing...'
    };
    setDocuments([newDocument, ...documents]);
    setNewDocumentTitle('');
    toast({ title: "Document Created!", description: `"${newDocument.title}" is ready.`, className: "bg-green-500 text-white dark:bg-green-600 dark:text-white" });
    navigate(`/documents/${newDocId}`);
  };

  const handleDeleteDocument = (docId) => {
    const docToDelete = documents.find(doc => doc.id === docId);
    setDocuments(documents.filter(doc => doc.id !== docId));
    toast({ title: "Document Deleted", description: `"${docToDelete.title}" has been removed.`, variant: "destructive" });
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8 px-4 md:px-6 space-y-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileArchive className="h-10 w-10 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">My Documents</h1>
        </div>
        <Button variant="outline" asChild>
          <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Link>
        </Button>
      </div>

      <Card className="glassmorphism-card">
        <CardHeader>
          <CardTitle>Create & Manage Notes</CardTitle>
          <CardDescription>Organize your study materials, lecture notes, and important documents.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input 
              placeholder="New Document Title..." 
              value={newDocumentTitle}
              onChange={(e) => setNewDocumentTitle(e.target.value)}
              className="h-10 flex-grow"
              onKeyPress={(e) => e.key === 'Enter' && handleCreateDocument()}
            />
            <Button onClick={handleCreateDocument} className="h-10 gradient-bg text-primary-foreground">
              <PlusCircle className="mr-2 h-4 w-4" /> Create New
            </Button>
          </div>
        </CardContent>
      </Card>

      {documents.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <FileText className="mx-auto h-16 w-16 text-muted-foreground opacity-50 mb-4" />
          <h3 className="text-xl font-semibold text-muted-foreground">No Documents Yet</h3>
          <p className="text-muted-foreground">Start by creating your first document above.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map(doc => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: documents.indexOf(doc) * 0.1 }}
            >
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200 bg-card/80 dark:bg-card/60">
                <CardHeader>
                  <CardTitle className="text-lg truncate">{doc.title}</CardTitle>
                  <CardDescription>Last modified: {formatDate(doc.lastModified)}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-3">{doc.summary || "No summary available."}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-4 border-t">
                  <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary/80">
                    <Link to={`/documents/${doc.id}`}><Edit className="mr-2 h-4 w-4" /> Edit</Link>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteDocument(doc.id)} className="text-destructive hover:text-destructive/80">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
      <p className="text-center text-sm text-muted-foreground mt-10">
        Document data is currently stored in your browser. For reliable storage, integrate a backend.
      </p>
    </motion.div>
  );
};

export default DocumentsPage;
  