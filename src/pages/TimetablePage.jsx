
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CalendarDays, PlusCircle, ListFilter } from 'lucide-react';
import { Link } from 'react-router-dom';

const TimetablePage = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timeSlots = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`); // 8 AM to 7 PM

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8 px-4 md:px-6 space-y-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CalendarDays className="h-10 w-10 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">My Timetable</h1>
        </div>
        <Button variant="outline" asChild>
          <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Link>
        </Button>
      </div>

      <Card className="glassmorphism-card">
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
          <CardDescription>
            Organize your classes, study sessions, and appointments.
            This is a visual placeholder.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-3 pb-4 border-b">
            <Button className="gradient-bg text-primary-foreground">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Event
            </Button>
            <Button variant="secondary">
              <ListFilter className="mr-2 h-4 w-4" /> Filter View
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border bg-background/50 rounded-lg shadow-md">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">Time</th>
                  {days.map(day => (
                    <th key={day} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[120px]">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {timeSlots.map(time => (
                  <tr key={time}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-foreground">{time}</td>
                    {days.map(day => (
                      <td key={`${day}-${time}`} className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground h-16 border-l">
                        {/* Placeholder for events */}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <p className="text-center text-sm text-muted-foreground">
        A fully functional timetable would require event management and persistent storage.
      </p>
    </motion.div>
  );
};

export default TimetablePage;
  