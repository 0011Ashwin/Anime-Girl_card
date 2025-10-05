"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Lock, Filter } from 'lucide-react';
import { useUser } from '@/lib/context/UserContext';
import { characters, type Rarity, type Category } from '@/lib/data/characters';
import CharacterCard from '@/components/CharacterCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CollectionPage() {
  const { userData, unlockCharacter, addPoints } = useUser();
  const [filterRarity, setFilterRarity] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredCharacters = characters.filter(
    (char) => {
      const matchesRarity = filterRarity === 'all' || char.rarity === filterRarity;
      const matchesCategory = filterCategory === 'all' || char.category === filterCategory;
      return matchesRarity && matchesCategory;
    }
  );

  const unlockedCount = userData.unlockedCharacters.length;
  const totalCount = characters.length;
  const progressPercentage = (unlockedCount / totalCount) * 100;

  const handleUnlock = (characterId: number, requiredPoints: number) => {
    if (userData.points >= requiredPoints && !userData.unlockedCharacters.includes(characterId)) {
      unlockCharacter(characterId);
      addPoints(-requiredPoints);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center gap-3">
                <Sparkles className="w-10 h-10 text-yellow-500" />
                Your Collection
              </h1>
              <p className="text-muted-foreground text-lg">
                {unlockedCount} of {totalCount} characters unlocked
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Select value={filterRarity} onValueChange={setFilterRarity}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by rarity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rarities</SelectItem>
                  <SelectItem value="Common">Common</SelectItem>
                  <SelectItem value="Rare">Rare</SelectItem>
                  <SelectItem value="Epic">Epic</SelectItem>
                  <SelectItem value="Legendary">Legendary</SelectItem>
                  <SelectItem value="Mythic">Mythic</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Hot">🔥 Hot</SelectItem>
                  <SelectItem value="Cute">💕 Cute</SelectItem>
                  <SelectItem value="Mysterious">🌙 Mysterious</SelectItem>
                  <SelectItem value="Elegant">✨ Elegant</SelectItem>
                  <SelectItem value="Energetic">⚡ Energetic</SelectItem>
                  <SelectItem value="Calm">🌊 Calm</SelectItem>
                  <SelectItem value="Bold">💪 Bold</SelectItem>
                  <SelectItem value="Sweet">🍭 Sweet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold">Collection Progress</span>
              <span className="text-sm text-muted-foreground">{progressPercentage.toFixed(0)}%</span>
            </div>
            <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Character Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredCharacters.map((character, index) => {
            const isUnlocked = userData.unlockedCharacters.includes(character.id);
            const canUnlock = userData.points >= character.unlockCondition && !isUnlocked;

            return (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative"
              >
                <CharacterCard
                  character={character}
                  isUnlocked={isUnlocked}
                  onUnlock={() => handleUnlock(character.id, character.unlockCondition)}
                />
                
                {!isUnlocked && canUnlock && (
                  <motion.div
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 + 0.3 }}
                  >
                    <Button
                      onClick={() => handleUnlock(character.id, character.unlockCondition)}
                      size="sm"
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg whitespace-nowrap"
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      Unlock Now
                    </Button>
                  </motion.div>
                )}

                {!isUnlocked && !canUnlock && (
                  <div className="absolute top-2 left-2 z-10">
                    <Badge variant="secondary" className="bg-black/50 text-white border-none backdrop-blur-sm">
                      <Lock className="w-3 h-3 mr-1" />
                      {character.unlockCondition} pts
                    </Badge>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {filteredCharacters.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No characters found for this rarity.</p>
          </div>
        )}
      </div>
    </div>
  );
}