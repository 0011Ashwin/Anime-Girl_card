"use client"

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Users, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/lib/context/UserContext';
import { characters } from '@/lib/data/characters';

export default function Home() {
  const { userData } = useUser();
  
  const featuredCharacter = characters[4]; // Akari - The Light Bringer

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        
        {/* Floating particles */}
        {typeof window !== 'undefined' && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500 rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -100 - 50],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none px-4 py-2 text-sm">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Gamified Collection Experience
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
              >
                Anime Girl
                <br />
                Unlocker
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8"
              >
                Complete tasks, earn points, and unlock stunning anime character cards. Build your ultimate collection!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link href="/collection">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-6 group"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start Unlocking
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Link href="/tasks">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="text-lg px-8 py-6 border-2"
                  >
                    <Trophy className="w-5 h-5 mr-2" />
                    View Tasks
                  </Button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-6 mt-12 justify-center lg:justify-start"
              >
                {[
                  { label: 'Your Points', value: userData.points, icon: Zap },
                  { label: 'Unlocked', value: `${userData.unlockedCharacters.length}/${characters.length}`, icon: Users },
                  { label: 'Level', value: userData.level, icon: Trophy },
                ].map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="flex items-center gap-2 mb-1">
                      <stat.icon className="w-4 h-4 text-purple-600" />
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right content - Featured Character */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative max-w-sm mx-auto lg:max-w-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-3xl opacity-50" />
                <Card className="relative p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-card to-muted/50 border-2">
                  <Badge className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none text-xs sm:text-sm">
                    Featured Character
                  </Badge>
                  
                  <div className="aspect-[3/4] relative mb-4 sm:mb-6 rounded-2xl overflow-hidden max-w-xs mx-auto lg:max-w-none">
                    <img 
                      src={featuredCharacter.imageUrl}
                      alt={featuredCharacter.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4">
                      <h3 className="text-white font-bold text-lg sm:text-xl lg:text-2xl mb-1">{featuredCharacter.name}</h3>
                      <p className="text-white/80 text-sm sm:text-base">{featuredCharacter.title}</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base text-center lg:text-left">{featuredCharacter.description}</p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
                    <Badge className="bg-gradient-to-r from-purple-400 to-purple-600 text-white border-none text-xs sm:text-sm">
                      {featuredCharacter.rarity}
                    </Badge>
                    <span className="text-xs sm:text-sm text-muted-foreground text-center">
                      Unlock at {featuredCharacter.unlockCondition} points
                    </span>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Three simple steps to build your collection</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Complete Tasks',
                description: 'Upload files, complete daily missions, and participate in challenges to earn points.',
                icon: Trophy,
                color: 'from-blue-500 to-cyan-500'
              },
              {
                step: '02',
                title: 'Earn Points',
                description: 'Accumulate points with every completed task. The more you do, the faster you progress!',
                icon: Zap,
                color: 'from-yellow-500 to-orange-500'
              },
              {
                step: '03',
                title: 'Unlock Characters',
                description: 'Use your points to unlock beautiful anime character cards across different rarity tiers.',
                icon: Sparkles,
                color: 'from-purple-500 to-pink-500'
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full hover:shadow-xl transition-shadow duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm font-bold text-muted-foreground mb-2">{feature.step}</div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-12 bg-gradient-to-br from-purple-600 to-pink-600 text-white border-none text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Start?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of collectors building their ultimate anime character collections.
              </p>
              <Link href="/collection">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-white/90 text-lg px-10 py-6"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  View Your Collection
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}