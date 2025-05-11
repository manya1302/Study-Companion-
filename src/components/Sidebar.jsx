
import React from 'react';
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'; // Sheet is no longer imported here
import { CalendarDays, Calculator, SlidersHorizontal } from 'lucide-react';

const Sidebar = () => {
  return (
    <>
      {/* Desktop persistent sidebar (optional, shown for context) */}
      <aside className="hidden md:flex md:flex-col md:w-72 border-r bg-background/90 p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center text-primary">
            <SlidersHorizontal className="mr-2 h-5 w-5" />
            Quick Tools
          </h3>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-2 flex items-center">
            <CalendarDays className="mr-2 h-5 w-5 text-accent" />
            Mini Calendar
          </h4>
          <div className="p-4 rounded-lg border bg-muted/50 h-64 flex items-center justify-center">
            <p className="text-muted-foreground">Calendar placeholder</p>
          </div>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-2 flex items-center">
            <Calculator className="mr-2 h-5 w-5 text-accent" />
            Mini Calculator
          </h4>
          <div className="p-4 rounded-lg border bg-muted/50 h-48 flex items-center justify-center">
            <p className="text-muted-foreground">Calculator placeholder</p>
          </div>
        </div>
         <div className="mt-auto pt-6 border-t">
          <p className="text-xs text-muted-foreground text-center">
            StudyMate AI © {new Date().getFullYear()}
          </p>
        </div>
      </aside>

      {/* Mobile sheet content */}
      <SheetContent side="left" className="w-[300px] sm:w-[360px] p-6 flex flex-col md:hidden">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold text-primary flex items-center">
            <SlidersHorizontal className="mr-2 h-6 w-6" />
            Quick Tools
          </SheetTitle>
          <SheetDescription>
            Your handy calendar and calculator.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-grow space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <CalendarDays className="mr-2 h-5 w-5 text-accent" />
              Mini Calendar
            </h3>
            <div className="p-4 rounded-lg border bg-muted/50 h-64 flex items-center justify-center">
              <p className="text-muted-foreground">Calendar placeholder</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Calculator className="mr-2 h-5 w-5 text-accent" />
              Mini Calculator
            </h3>
            <div className="p-4 rounded-lg border bg-muted/50 h-48 flex items-center justify-center">
              <p className="text-muted-foreground">Calculator placeholder</p>
            </div>
          </div>
        </div>
        
        <div className="mt-auto pt-6 border-t">
          <p className="text-xs text-muted-foreground text-center">
            StudyMate AI © {new Date().getFullYear()}
          </p>
        </div>
      </SheetContent>
    </>
  );
};

export default Sidebar;
  