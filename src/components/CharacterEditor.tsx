"use client"

import { useState } from 'react';
import { Character, Category, Rarity } from '@/lib/data/characters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, X, Eye } from 'lucide-react';
import { categoryColors, categoryIcons, rarityColors } from '@/lib/data/characters';

interface CharacterEditorProps {
  character: Character;
  onSave: (updatedCharacter: Character) => void;
  onCancel: () => void;
}

export default function CharacterEditor({ character, onSave, onCancel }: CharacterEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCharacter, setEditedCharacter] = useState<Character>(character);

  const handleSave = () => {
    onSave(editedCharacter);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedCharacter(character);
    setIsEditing(false);
    onCancel();
  };

  const updateField = (field: keyof Character, value: any) => {
    setEditedCharacter(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Character Editor
        </CardTitle>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Character Preview */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🎭</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`bg-gradient-to-r ${rarityColors[editedCharacter.rarity]} text-white`}>
                {editedCharacter.rarity}
              </Badge>
              <Badge className={`bg-gradient-to-r ${categoryColors[editedCharacter.category]} text-white`}>
                {categoryIcons[editedCharacter.category]} {editedCharacter.category}
              </Badge>
            </div>
            <h3 className="text-xl font-bold">{editedCharacter.name}</h3>
            <p className="text-gray-600">{editedCharacter.title}</p>
            <p className="text-sm text-gray-500">+{editedCharacter.points} points</p>
          </div>
        </div>

        {/* Editable Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Character Name</Label>
            <Input
              id="name"
              value={editedCharacter.name}
              onChange={(e) => updateField('name', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={editedCharacter.title}
              onChange={(e) => updateField('title', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rarity">Rarity</Label>
            <Select
              value={editedCharacter.rarity}
              onValueChange={(value: Rarity) => updateField('rarity', value)}
              disabled={!isEditing}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Common">Common</SelectItem>
                <SelectItem value="Rare">Rare</SelectItem>
                <SelectItem value="Epic">Epic</SelectItem>
                <SelectItem value="Legendary">Legendary</SelectItem>
                <SelectItem value="Mythic">Mythic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={editedCharacter.category}
              onValueChange={(value: Category) => updateField('category', value)}
              disabled={!isEditing}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
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

          <div className="space-y-2">
            <Label htmlFor="unlockCondition">Unlock Points Required</Label>
            <Input
              id="unlockCondition"
              type="number"
              value={editedCharacter.unlockCondition}
              onChange={(e) => updateField('unlockCondition', parseInt(e.target.value) || 0)}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="points">Points Awarded</Label>
            <Input
              id="points"
              type="number"
              value={editedCharacter.points}
              onChange={(e) => updateField('points', parseInt(e.target.value) || 0)}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={editedCharacter.description}
            onChange={(e) => updateField('description', e.target.value)}
            disabled={!isEditing}
            rows={4}
            className="resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            value={editedCharacter.imageUrl}
            onChange={(e) => updateField('imageUrl', e.target.value)}
            disabled={!isEditing}
            placeholder="/Character-card/character-name.png"
          />
        </div>
      </CardContent>
    </Card>
  );
}
