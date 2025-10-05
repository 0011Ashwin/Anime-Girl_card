"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Task {
  id: number;
  title: string;
  description: string;
  points: number;
  type: 'upload' | 'daily' | 'challenge';
  completed: boolean;
}

export interface UserData {
  username: string;
  points: number;
  unlockedCharacters: number[];
  completedTasks: number[];
  streak: number;
  level: number;
}

interface UserContextType {
  userData: UserData;
  completeTask: (taskId: number, points: number) => void;
  unlockCharacter: (characterId: number) => void;
  addPoints: (points: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Upload Your First File',
    description: 'Upload any image file to get started',
    points: 50,
    type: 'upload',
    completed: false,
  },
  {
    id: 2,
    title: 'Daily Check-in',
    description: 'Visit the app today',
    points: 25,
    type: 'daily',
    completed: false,
  },
  {
    id: 3,
    title: 'Upload 3 Files',
    description: 'Share 3 different files',
    points: 100,
    type: 'challenge',
    completed: false,
  },
  {
    id: 4,
    title: 'Reach 200 Points',
    description: 'Accumulate 200 total points',
    points: 50,
    type: 'challenge',
    completed: false,
  },
  {
    id: 5,
    title: 'Upload an Anime Screenshot',
    description: 'Share your favorite anime moment',
    points: 75,
    type: 'upload',
    completed: false,
  },
];

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('animeUnlockerUser');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return {
      username: 'Otaku Master',
      points: 0,
      unlockedCharacters: [1], // First character always unlocked
      completedTasks: [],
      streak: 1,
      level: 1,
    };
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('animeUnlockerTasks');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('animeUnlockerUser', JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    localStorage.setItem('animeUnlockerTasks', JSON.stringify(tasks));
  }, [tasks]);

  const completeTask = (taskId: number, points: number) => {
    setUserData((prev) => ({
      ...prev,
      points: prev.points + points,
      completedTasks: [...prev.completedTasks, taskId],
      level: Math.floor((prev.points + points) / 200) + 1,
    }));
    
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  const unlockCharacter = (characterId: number) => {
    setUserData((prev) => ({
      ...prev,
      unlockedCharacters: [...prev.unlockedCharacters, characterId],
    }));
  };

  const addPoints = (points: number) => {
    setUserData((prev) => ({
      ...prev,
      points: prev.points + points,
      level: Math.floor((prev.points + points) / 200) + 1,
    }));
  };

  return (
    <UserContext.Provider
      value={{ userData, completeTask, unlockCharacter, addPoints }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

export { initialTasks };