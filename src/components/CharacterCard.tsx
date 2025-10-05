"use client"

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Lock, Sparkles } from 'lucide-react';
import { Character, rarityColors, rarityGlow, categoryColors, categoryIcons } from '@/lib/data/characters';
import { Badge } from '@/components/ui/badge';

interface CharacterCardProps {
  character: Character;
  isUnlocked: boolean;
  onUnlock?: () => void;
}

export default function CharacterCard({ character, isUnlocked, onUnlock }: CharacterCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (isUnlocked) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <motion.div
      className="relative w-full aspect-[3/4] cursor-pointer"
      whileHover={{ scale: isUnlocked ? 1.05 : 1 }}
      whileTap={{ scale: isUnlocked ? 0.95 : 1 }}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-2xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${rarityColors[character.rarity]} opacity-20`} />
          
          {isUnlocked ? (
            <>
              <Image
                src={character.imageUrl}
                alt={character.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <Badge className={`bg-gradient-to-r ${rarityColors[character.rarity]} text-white border-none`}>
                  {character.rarity}
                </Badge>
                <Badge className={`bg-gradient-to-r ${categoryColors[character.category]} text-white border-none text-xs`}>
                  {categoryIcons[character.category]} {character.category}
                </Badge>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-xl mb-1">{character.name}</h3>
                <p className="text-white/80 text-sm">{character.title}</p>
              </div>

              <motion.div
                className="absolute top-3 left-3"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </motion.div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center">
              <Lock className="w-12 h-12 text-gray-600 mb-4" />
              <p className="text-gray-400 text-sm text-center px-4">
                {character.unlockCondition} points required
              </p>
              <p className="text-gray-500 text-xs mt-2">{character.rarity}</p>
            </div>
          )}
        </div>

        {/* Back of card */}
        {isUnlocked && (
          <div
            className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-900 to-indigo-900 p-6 flex flex-col justify-center"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <Badge className={`bg-gradient-to-r ${rarityColors[character.rarity]} text-white border-none self-start mb-4`}>
              {character.rarity}
            </Badge>
            <h3 className="text-white font-bold text-2xl mb-2">{character.name}</h3>
            <p className="text-purple-200 text-sm mb-4">{character.title}</p>
            <p className="text-white/80 text-sm leading-relaxed">{character.description}</p>
            
            <div className="mt-auto pt-4 border-t border-white/20">
              <div className="flex justify-between items-center text-white/60 text-xs">
                <span>Unlocked at {character.unlockCondition} points</span>
                <span className="text-yellow-400 font-semibold">+{character.points} pts</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}