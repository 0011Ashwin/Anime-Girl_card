"use client"

import { motion } from 'framer-motion';
import { User, Trophy, Users, Zap, Award, TrendingUp, Star } from 'lucide-react';
import { useUser } from '@/lib/context/UserContext';
import { characters } from '@/lib/data/characters';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import CharacterCard from '@/components/CharacterCard';

export default function ProfilePage() {
  const { userData } = useUser();

  const nextLevelPoints = userData.level * 200;
  const currentLevelProgress = (userData.points % 200) / 200 * 100;
  
  const unlockedCharacters = characters.filter((char) =>
    userData.unlockedCharacters.includes(char.id)
  );

  const rarityCount = unlockedCharacters.reduce((acc, char) => {
    acc[char.rarity] = (acc[char.rarity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const achievements = [
    { name: 'First Steps', description: 'Unlock your first character', unlocked: userData.unlockedCharacters.length >= 1, icon: Star },
    { name: 'Collector', description: 'Unlock 3 characters', unlocked: userData.unlockedCharacters.length >= 3, icon: Users },
    { name: 'Point Hunter', description: 'Earn 200 total points', unlocked: userData.points >= 200, icon: Zap },
    { name: 'Task Master', description: 'Complete 5 tasks', unlocked: userData.completedTasks.length >= 5, icon: Trophy },
    { name: 'Rare Finder', description: 'Unlock a Rare character', unlocked: unlockedCharacters.some(c => c.rarity === 'Rare'), icon: Award },
    { name: 'Epic Journey', description: 'Unlock an Epic character', unlocked: unlockedCharacters.some(c => c.rarity === 'Epic'), icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Card className="p-8 bg-gradient-to-br from-purple-600 to-pink-600 text-white border-none">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <User className="w-12 h-12" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{userData.username}</h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-none">
                    Level {userData.level}
                  </Badge>
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-none">
                    {userData.streak} Day Streak 🔥
                  </Badge>
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-1">{userData.points}</div>
                <div className="text-white/80">Total Points</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Characters Unlocked', value: `${userData.unlockedCharacters.length}/${characters.length}`, icon: Users, color: 'from-blue-500 to-cyan-500' },
            { label: 'Tasks Completed', value: userData.completedTasks.length, icon: Trophy, color: 'from-green-500 to-emerald-500' },
            { label: 'Current Level', value: userData.level, icon: Zap, color: 'from-yellow-500 to-orange-500' },
            { label: 'Daily Streak', value: `${userData.streak} days`, icon: Award, color: 'from-purple-500 to-pink-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Level Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Level Progress</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Level {userData.level}</span>
                <span className="text-muted-foreground">
                  {userData.points % 200} / 200 XP
                </span>
              </div>
              <Progress value={currentLevelProgress} className="h-3" />
              <p className="text-xs text-muted-foreground">
                {200 - (userData.points % 200)} points to Level {userData.level + 1}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Rarity Collection Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Collection by Rarity</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['Common', 'Rare', 'Epic', 'Legendary', 'Mythic'].map((rarity, index) => (
              <motion.div
                key={rarity}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <Card className="p-4 text-center">
                  <div className="text-3xl font-bold mb-1">{rarityCount[rarity] || 0}</div>
                  <div className="text-sm text-muted-foreground">{rarity}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Achievements</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
              >
                <Card className={`p-4 ${achievement.unlocked ? 'bg-gradient-to-br from-yellow-400/10 to-orange-400/10 border-yellow-400/50' : 'opacity-50'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${achievement.unlocked ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-muted'}`}>
                      <achievement.icon className={`w-5 h-5 ${achievement.unlocked ? 'text-white' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold mb-1">{achievement.name}</h3>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Unlocks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold mb-6">Recent Unlocks</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {unlockedCharacters.slice(-6).reverse().map((character, index) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
              >
                <CharacterCard character={character} isUnlocked={true} />
              </motion.div>
            ))}
          </div>
          {unlockedCharacters.length === 0 && (
            <Card className="p-12 text-center">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No characters unlocked yet. Complete tasks to start your collection!</p>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}