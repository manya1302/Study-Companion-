
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { Sheet } from '@/components/ui/sheet';

const Layout = ({ children }) => {
  return (
    <Sheet>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-secondary/30 dark:from-background dark:to-secondary/10">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
        <Footer />
        <Toaster />
      </div>
    </Sheet>
  );
};

export default Layout;
  