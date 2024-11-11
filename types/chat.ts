export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export type Personality = 'Smooth' | 'Playful' | 'Poetic' | 'Mysterious';