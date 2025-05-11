
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import Layout from '@/components/Layout';
import DashboardPage from '@/pages/DashboardPage';
import AiWriterPage from '@/pages/AiWriterPage';
import MindMapPage from '@/pages/MindMapPage';
import TimetablePage from '@/pages/TimetablePage';
import DocumentsPage from '@/pages/DocumentsPage';
import DocumentEditorPage from '@/pages/DocumentEditorPage';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="study-companion-theme">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/ai-writer" element={<AiWriterPage />} />
            <Route path="/mind-maps" element={<MindMapPage />} />
            <Route path="/timetable" element={<TimetablePage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/documents/:documentId" element={<DocumentEditorPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
  