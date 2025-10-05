"use client"

import { useState } from 'react';
import { characters, Character } from '@/lib/data/characters';
import CharacterEditor from '@/components/CharacterEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus, Edit } from 'lucide-react';
import { categoryColors, categoryIcons, rarityColors } from '@/lib/data/characters';

export default function CharacterManagementPage() {
  const [charactersList, setCharactersList] = useState<Character[]>(characters);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRarity, setFilterRarity] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredCharacters = charactersList.filter(character => {
    const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         character.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRarity = filterRarity === 'all' || character.rarity === filterRarity;
    const matchesCategory = filterCategory === 'all' || character.category === filterCategory;
    
    return matchesSearch && matchesRarity && matchesCategory;
  });

  const handleSaveCharacter = (updatedCharacter: Character) => {
    setCharactersList(prev => 
      prev.map(char => char.id === updatedCharacter.id ? updatedCharacter : char)
    );
    setSelectedCharacter(null);
  };

  const handleCancelEdit = () => {
    setSelectedCharacter(null);
  };

  const handleEditCharacter = (character: Character) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Character Management</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Character
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search characters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Rarity</label>
              <Select value={filterRarity} onValueChange={setFilterRarity}>
                <SelectTrigger>
                  <SelectValue />
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
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue />
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
        </CardContent>
      </Card>

      {/* Character Editor */}
      {selectedCharacter && (
        <CharacterEditor
          character={selectedCharacter}
          onSave={handleSaveCharacter}
          onCancel={handleCancelEdit}
        />
      )}

      {/* Characters List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCharacters.map((character) => (
          <Card key={character.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={`bg-gradient-to-r ${rarityColors[character.rarity]} text-white`}>
                    {character.rarity}
                  </Badge>
                  <Badge className={`bg-gradient-to-r ${categoryColors[character.category]} text-white`}>
                    {categoryIcons[character.category]} {character.category}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditCharacter(character)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-bold text-lg mb-1">{character.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{character.title}</p>
              <p className="text-gray-500 text-xs mb-3 line-clamp-2">{character.description}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Unlock: {character.unlockCondition} pts</span>
                <span className="text-yellow-600 font-semibold">+{character.points} pts</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCharacters.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No characters found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
