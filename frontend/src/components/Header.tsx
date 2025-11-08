import { Menu, User } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/75">
      <div className="flex h-16 items-center px-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="mr-4 text-slate-300 hover:text-white hover:bg-slate-800"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-white">FA</span>
          </div>
          <h1 className="text-white">Financial Analytics System</h1>
        </div>
        
        <div className="ml-auto flex items-center gap-4">
          <Avatar className="h-9 w-9 border-2 border-blue-500/20">
            <AvatarFallback className="bg-slate-800 text-slate-300">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
