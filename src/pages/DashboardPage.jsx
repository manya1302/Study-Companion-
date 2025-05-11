
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { 
  BookMarked, Brain, CheckSquare, Edit3, FileText, 
  Goal, Mic, StickyNote, Table, Lock, Search, Lightbulb, Trash2, CheckCircle, Circle, FileArchive
} from 'lucide-react';

const FeatureCard = ({ title, description, icon: Icon, actionText, onAction, children, linkTo }) => {
  const CardButton = linkTo ? Link : Button;
  const buttonProps = linkTo ? { to: linkTo } : { onClick: onAction };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300 glassmorphism-card">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2">
            <Icon className="h-8 w-8 text-primary" />
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          {children ? children : <p className="text-sm text-muted-foreground">Feature details coming soon.</p>}
        </CardContent>
        {(actionText && (linkTo || onAction)) && (
          <div className="p-4 border-t">
            <CardButton {...buttonProps} className="w-full gradient-bg text-primary-foreground hover:opacity-90 inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2">
              {actionText}
            </CardButton>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

const DashboardPage = () => {
  const [todos, setTodos] = useLocalStorage('todos', [{ id: 1, text: 'Prepare for Math exam', completed: false, emoji: '📚' }]);
  const [newTodo, setNewTodo] = useState('');
  const [newTodoEmoji, setNewTodoEmoji] = useState('🎯');

  const [stickyNotes, setStickyNotes] = useLocalStorage('stickyNotes', [{ id: 1, text: 'Remember to call John!', color: 'bg-yellow-300/70 dark:bg-yellow-600/70' }]);
  const [newStickyNote, setNewStickyNote] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() === '') {
      toast({ title: "Uh oh!", description: "To-do can't be empty.", variant: "destructive" });
      return;
    }
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false, emoji: newTodoEmoji }]);
    setNewTodo('');
    toast({ title: "Success!", description: "New to-do added.", className: "bg-green-500 text-white dark:bg-green-600 dark:text-white" });
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    const toggledTodo = todos.find(todo => todo.id === id);
    if (toggledTodo && !toggledTodo.completed) {
        toast({ title: "Task marked complete!", description: `"${toggledTodo.text}" is done.`, className: "bg-green-500 text-white dark:bg-green-600 dark:text-white" });
    }
  };
  
  const deleteTodo = (id) => {
    const deletedTodo = todos.find(todo => todo.id === id);
    setTodos(todos.filter(todo => todo.id !== id));
    toast({ title: "To-do removed", description: `"${deletedTodo.text}" has been deleted.`, variant: "destructive" });
  };


  const handleAddStickyNote = () => {
    if (newStickyNote.trim() === '') {
      toast({ title: "Oops!", description: "Sticky note can't be empty.", variant: "destructive" });
      return;
    }
    const colors = ['bg-pink-300/70 dark:bg-pink-600/70', 'bg-blue-300/70 dark:bg-blue-600/70', 'bg-green-300/70 dark:bg-green-600/70', 'bg-purple-300/70 dark:bg-purple-600/70', 'bg-yellow-300/70 dark:bg-yellow-500/70', 'bg-indigo-300/70 dark:bg-indigo-500/70'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setStickyNotes([...stickyNotes, { id: Date.now(), text: newStickyNote, color: randomColor }]);
    setNewStickyNote('');
    toast({ title: "Noted!", description: "Sticky note added.", className: "bg-blue-500 text-white dark:bg-blue-600 dark:text-white" });
  };

  const deleteStickyNote = (id) => {
    setStickyNotes(stickyNotes.filter(note => note.id !== id));
    toast({ title: "Sticky note removed", description: "The note has been deleted.", variant: "destructive" });
  };

  const mainFeatures = [
    { title: 'My Documents', description: 'Create and manage your notes.', icon: FileArchive, actionText: 'Open Documents', linkTo: '/documents' },
    { title: 'AI Writing Tools', description: 'Grammar, paraphrasing, and more.', icon: Edit3, actionText: 'Explore Tools', linkTo: '/ai-writer' },
    { title: 'Mind Maps & Graphs', description: 'Visualize your ideas.', icon: Brain, actionText: 'Create Map', linkTo: '/mind-maps' },
    { title: 'Timetable Section', description: 'Organize your schedule.', icon: Table, actionText: 'View Timetable', linkTo: '/timetable' },
  ];

  const upcomingFeatures = [
    { title: 'Text Summarizer', description: 'Get key points instantly.', icon: FileText, actionText: 'Summarize Text' },
    { title: 'Commitments & Targets', description: 'Track your progress.', icon: Goal, actionText: 'Set Goals' },
    { title: 'Voice Memo Notes', description: 'Record lectures, attach to notes.', icon: Mic, actionText: 'Record Audio' },
    { title: 'Fancy Bookmarks', description: 'Save and organize important links.', icon: BookMarked, actionText: 'Manage Bookmarks' },
    { title: 'Private Notes', description: 'Secure notes with passwords.', icon: Lock, actionText: 'Access Private Notes' },
    { title: 'Content Search', description: 'Find information within your files.', icon: Search, actionText: 'Start Searching' },
  ];


  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 rounded-xl shadow-2xl gradient-bg text-primary-foreground"
      >
        <h1 className="text-4xl font-bold mb-3">Welcome to Your AI Study Companion!</h1>
        <p className="text-lg opacity-90">Elevate your learning experience with intelligent tools designed for success.</p>
        <div className="mt-6">
          <Button size="lg" variant="secondary" className="text-lg bg-white/20 hover:bg-white/30 text-primary-foreground">
            <Lightbulb className="mr-2 h-5 w-5" /> Get Started
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <FeatureCard title="To-Do List" description="Manage your tasks with emojis." icon={CheckSquare}>
          <div className="space-y-3">
            <div className="flex space-x-2 items-center">
              <Input 
                value={newTodo} 
                onChange={(e) => setNewTodo(e.target.value)} 
                placeholder="New task..."
                className="flex-grow h-10"
                onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
              />
              <select value={newTodoEmoji} onChange={(e) => setNewTodoEmoji(e.target.value)} className="h-10 p-2 border rounded-md bg-background text-foreground">
                <option>🎯</option><option>📚</option><option>💡</option><option>✨</option><option>🎉</option>
              </select>
              <Button onClick={handleAddTodo} size="sm" className="h-10">Add</Button>
            </div>
            <ul className="max-h-48 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent">
              {todos.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No tasks yet. Add one!</p>}
              {todos.map(todo => (
                <li key={todo.id} className={`flex items-center justify-between p-2.5 rounded-lg group transition-all duration-200 ${todo.completed ? 'bg-green-500/10 dark:bg-green-500/20' : 'bg-muted/30 hover:bg-muted/60'}`}>
                  <div className="flex items-center cursor-pointer" onClick={() => toggleTodo(todo.id)}>
                    {todo.completed ? <CheckCircle className="h-5 w-5 text-green-500 mr-2" /> : <Circle className="h-5 w-5 text-primary/50 mr-2" />}
                    <span className={` ${todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {todo.emoji} {todo.text}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600" onClick={() => deleteTodo(todo.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </FeatureCard>

        <FeatureCard title="Sticky Notes" description="Quick thoughts and reminders." icon={StickyNote}>
           <div className="space-y-3">
            <div className="flex space-x-2">
              <Input 
                value={newStickyNote} 
                onChange={(e) => setNewStickyNote(e.target.value)} 
                placeholder="New sticky note..."
                className="flex-grow h-10"
                onKeyPress={(e) => e.key === 'Enter' && handleAddStickyNote()}
              />
              <Button onClick={handleAddStickyNote} size="sm" className="h-10">Pin</Button>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent">
              {stickyNotes.length === 0 && <p className="text-sm text-muted-foreground text-center py-4 col-span-2">No sticky notes yet. Add one!</p>}
              {stickyNotes.map(note => (
                <div key={note.id} className={`relative group p-3 rounded-lg shadow-md text-sm ${note.color} text-gray-800 dark:text-gray-100 min-h-[60px]`}>
                  {note.text}
                  <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700" onClick={() => deleteStickyNote(note.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </FeatureCard>

        {mainFeatures.map(feature => (
          <FeatureCard 
            key={feature.title} 
            title={feature.title} 
            description={feature.description} 
            icon={feature.icon}
            actionText={feature.actionText}
            linkTo={feature.linkTo}
          />
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-center text-primary">Coming Soon...</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingFeatures.map(feature => (
            <FeatureCard 
              key={feature.title} 
              title={feature.title} 
              description={feature.description} 
              icon={feature.icon}
              actionText={feature.actionText}
              onAction={() => toast({ title: feature.title, description: "This feature is under development. Stay tuned!"})}
            />
          ))}
        </div>
      </div>


      <p className="text-center text-sm text-muted-foreground mt-10 pb-4">
        Note: Data for To-Do List and Sticky Notes is currently stored in your browser's local storage. For persistent and synced data, a backend solution like Supabase would be recommended.
      </p>
    </div>
  );
};

export default DashboardPage;
  