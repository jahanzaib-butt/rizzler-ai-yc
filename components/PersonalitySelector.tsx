"use client";

import { Sparkles, Laugh, Crown, BookHeart, Glasses, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Personality } from '@/types/chat';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PersonalitySelectorProps {
  selected: string;
  onSelect: (personality: Personality) => void;
}

export function PersonalitySelector({ selected, onSelect }: PersonalitySelectorProps) {
  const personalities = [
    { 
      id: 'Smooth',
      icon: <Sparkles className="w-4 h-4" />,
      label: 'Smooth',
      gradient: 'from-violet-400 via-fuchsia-500 to-indigo-500',
      glow: 'shadow-violet-500/50'
    },
    { 
      id: 'Flirty',
      icon: <Laugh className="w-4 h-4" />,
      label: 'Flirty',
      gradient: 'from-pink-400 via-rose-500 to-red-500',
      glow: 'shadow-pink-500/50'
    },
    { 
      id: 'Sigma',
      icon: <Crown className="w-4 h-4" />,
      label: 'Sigma rizz',
      gradient: 'from-amber-400 via-orange-500 to-yellow-500',
      glow: 'shadow-amber-500/50'
    },
    { 
      id: 'Poetic',
      icon: <BookHeart className="w-4 h-4" />,
      label: 'Poetic',
      gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
      glow: 'shadow-emerald-500/50'
    },
    { 
      id: 'Mysterious',
      icon: <Glasses className="w-4 h-4" />,
      label: 'Mysterious',
      gradient: 'from-blue-400 via-indigo-500 to-violet-500',
      glow: 'shadow-blue-500/50'
    },
  ];

  const selectedPersonality = personalities.find(p => p.id === selected);

  return (
    <div className="container mx-auto px-4 max-w-screen-xl">
      {/* Mobile Dropdown */}
      <div className="sm:hidden flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className={cn(
                'relative flex items-center justify-between w-full max-w-[200px] px-4 py-2 rounded-full',
                'transition-all duration-300',
                `bg-gradient-to-r ${selectedPersonality?.gradient} text-white shadow-md ${selectedPersonality?.glow}`
              )}
            >
              <span className="flex items-center gap-2">
                {selectedPersonality?.icon}
                <span className="font-medium">{selectedPersonality?.label}</span>
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="center"
            className="w-[200px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-none shadow-lg"
          >
            {personalities.map(({ id, icon, label, gradient }) => (
              <DropdownMenuItem
                key={id}
                onClick={() => onSelect(id as Personality)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2.5 cursor-pointer',
                  selected === id && `bg-gradient-to-r ${gradient} text-white`
                )}
              >
                {icon}
                <span>{label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden sm:flex justify-center gap-3">
        {personalities.map(({ id, icon, label, gradient, glow }) => (
          <Button
            key={id}
            onClick={() => onSelect(id as Personality)}
            className={cn(
              'relative flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300',
              'hover:scale-105',
              selected === id
                ? `bg-gradient-to-r ${gradient} text-white shadow-md ${glow}` 
                : 'bg-white/50 hover:bg-white/80 text-gray-600'
            )}
          >
            <span className="flex items-center gap-2 font-medium">
              {icon}
              {label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}