import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import ReactMarkdown from 'react-markdown';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const formatMessage = (content: string) => {
  const cleanContent = content
    .replace(/\n{3,}/g, '\n\n')
    .replace(/•/g, '•')
    .trim();

  return (
    <ReactMarkdown
      className="space-y-4"
      components={{
        h1: ({ children }) => (
          <h1 className="text-xl font-bold mb-3 text-violet-500 dark:text-violet-400">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-lg font-semibold mb-2 text-violet-500/90 dark:text-violet-400/90">
            {children}
          </h2>
        ),
        p: ({ children }) => (
          <p className="text-[15px] leading-relaxed mb-3">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="space-y-2 ml-5 my-3">
            {children}
          </ul>
        ),
        li: ({ children }) => (
          <li className="flex gap-2 text-[15px] leading-relaxed">
            <span className="text-violet-400 text-lg">•</span>
            <span>{children}</span>
          </li>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-violet-600 dark:text-violet-400">
            {children}
          </strong>
        ),
      }}
    >
      {cleanContent}
    </ReactMarkdown>
  );
};

export function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <div className="space-y-8 px-2">
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn(
            'flex gap-4 text-base/relaxed',
            message.role === 'user' ? 'justify-end' : 'justify-start'
          )}
        >
          {message.role === 'assistant' && (
            <div className="flex-shrink-0">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-500 to-purple-700 animate-pulse" />
                <div className="absolute inset-[2px] rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-violet-500" />
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-900 bg-green-500" />
              </div>
            </div>
          )}

          <div
            className={cn(
              'group relative max-w-[85%] rounded-3xl px-6 py-5 text-[15px]',
              'hover:shadow-lg hover:-translate-y-1',
              message.role === 'user'
                ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white ml-12'
                : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-violet-100/20 dark:border-violet-900/20 mr-12'
            )}
          >
            <div className="relative z-10">
              <div className={cn(
                'font-medium mb-2 text-sm tracking-wide uppercase',
                message.role === 'user' ? 'text-violet-100' : 'text-violet-500 dark:text-violet-300'
              )}>
                {message.role === 'user' ? 'You' : 'RizzGPT'}
              </div>
              <div className={cn(
                'prose prose-base max-w-none',
                message.role === 'user'
                  ? 'text-white/90 prose-headings:text-white prose-a:text-violet-200'
                  : 'text-gray-700 dark:text-gray-200 prose-headings:text-gray-900 dark:prose-headings:text-gray-100'
                )}
              >
                {message.role === 'assistant' ? formatMessage(message.content) : (
                  <p className="text-[15px] leading-relaxed">{message.content}</p>
                )}
              </div>
            </div>
            
            {/* Hover effect overlay */}
            <div className={cn(
              'absolute inset-0 rounded-3xl opacity-0 transition-all duration-300',
              'group-hover:opacity-100',
              message.role === 'assistant' 
                ? 'bg-gradient-to-br from-violet-50/50 to-purple-50/50 dark:from-violet-900/20 dark:to-purple-900/20' 
                : 'bg-gradient-to-br from-white/10 to-white/5'
            )} />

            {/* Message tail */}
            <div className={cn(
              'absolute bottom-5 w-4 h-4 rotate-45',
              message.role === 'user' 
                ? 'right-[-8px] bg-purple-600' 
                : 'left-[-8px] bg-white/90 dark:bg-gray-800/90 border border-violet-100/20 dark:border-violet-900/20'
            )} />
          </div>

          {message.role === 'user' && (
            <div className="flex-shrink-0">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600 to-purple-700" />
                <div className="absolute inset-[2px] rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                  <User className="h-5 w-5 text-violet-600" />
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-900 bg-green-500" />
              </div>
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 animate-pulse" />
              <div className="absolute inset-[2px] rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                <Bot className="h-5 w-5 text-violet-500 animate-pulse" />
              </div>
            </div>
          </div>
          <div className="space-y-2.5 flex-1">
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      )}
    </div>
  );
}