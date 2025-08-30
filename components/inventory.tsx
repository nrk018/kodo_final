"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface InventoryItem {
  id: string
  name: string
  type: "skin" | "tool" | "decoration" | "consumable"
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
  icon: string
  description: string
  owned: boolean
  equipped?: boolean
  quantity?: number
}

interface InventoryProps {
  onBackToDashboard: () => void
  userCoins: number
}

export function Inventory({ onBackToDashboard, userCoins }: InventoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: "steve-skin",
      name: "Classic Steve",
      type: "skin",
      rarity: "Common",
      icon: "🧑‍💼",
      description: "The classic Minecraft Steve skin",
      owned: true,
      equipped: true,
    },
    {
      id: "alex-skin",
      name: "Alex Explorer",
      type: "skin",
      rarity: "Common",
      icon: "👩‍🦰",
      description: "The adventurous Alex skin",
      owned: true,
    },
    {
      id: "wizard-skin",
      name: "Code Wizard",
      type: "skin",
      rarity: "Epic",
      icon: "🧙‍♂️",
      description: "A mystical wizard skin for advanced learners",
      owned: false,
    },
    {
      id: "diamond-pickaxe",
      name: "Diamond Pickaxe",
      type: "tool",
      rarity: "Rare",
      icon: "⛏️",
      description: "A powerful tool for mining knowledge",
      owned: true,
      equipped: true,
    },
    {
      id: "golden-sword",
      name: "Golden Sword of Learning",
      type: "tool",
      rarity: "Epic",
      icon: "⚔️",
      description: "Cuts through complex problems with ease",
      owned: false,
    },
    {
      id: "xp-potion",
      name: "XP Boost Potion",
      type: "consumable",
      rarity: "Rare",
      icon: "🧪",
      description: "Doubles XP gain for 1 hour",
      owned: true,
      quantity: 3,
    },
    {
      id: "torch",
      name: "Knowledge Torch",
      type: "decoration",
      rarity: "Common",
      icon: "🕯️",
      description: "Lights up dark corners of understanding",
      owned: true,
      quantity: 12,
    },
    {
      id: "crown",
      name: "Crown of Mastery",
      type: "decoration",
      rarity: "Legendary",
      icon: "👑",
      description: "Only for those who have mastered all subjects",
      owned: false,
    },
  ])

  const categories = ["All", "Skins", "Tools", "Decorations", "Consumables"]

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.type === selectedCategory.toLowerCase().slice(0, -1))

  const ownedItems = items.filter((item) => item.owned)
  const totalValue = ownedItems.reduce((sum, item) => {
    const baseValue = item.rarity === "Common" ? 50 : item.rarity === "Rare" ? 150 : item.rarity === "Epic" ? 300 : 500
    return sum + baseValue * (item.quantity || 1)
  }, 0)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-stone-100 text-stone-800 border-stone-300"
      case "Rare":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "Epic":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "Legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const handleEquipItem = (itemId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId && item.owned) {
          // Unequip other items of the same type
          const updatedItems = prevItems.map((i) =>
            i.type === item.type && i.id !== itemId ? { ...i, equipped: false } : i,
          )
          return { ...item, equipped: !item.equipped }
        }
        return item
      }),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-card border-b-4 border-stone-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={onBackToDashboard}
              className="border-2 border-stone-400 hover:border-primary bg-transparent"
            >
              ← Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                <span className="text-3xl">🎒</span>
                Inventory
              </h1>
              <p className="text-sm text-muted-foreground">
                {ownedItems.length} items owned • Value: {totalValue} coins
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg border-2 border-primary/20">
            <span className="text-lg">🪙</span>
            <span className="font-bold text-primary">{userCoins}</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Currently Equipped */}
        <Card className="border-4 border-stone-600 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              Currently Equipped
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["skin", "tool", "decoration", "consumable"].map((type) => {
                const equippedItem = items.find((item) => item.type === type && item.equipped)
                return (
                  <div key={type} className="text-center bg-secondary/10 p-4 rounded-lg border-2 border-secondary/20">
                    <div className="text-3xl mb-2">{equippedItem ? equippedItem.icon : "❌"}</div>
                    <div className="font-medium capitalize">{type}</div>
                    <div className="text-xs text-muted-foreground">
                      {equippedItem ? equippedItem.name : "None equipped"}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`border-2 ${
                selectedCategory === category
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-stone-400 hover:border-primary bg-transparent"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className={`border-4 shadow-lg transition-all hover:scale-105 ${
                item.owned
                  ? item.equipped
                    ? "border-primary bg-primary/10"
                    : "border-stone-600 bg-card"
                  : "border-stone-400 bg-stone-50 opacity-75"
              }`}
            >
              <CardHeader className="text-center">
                <div className={`text-5xl mb-2 ${item.owned ? "" : "grayscale"}`}>{item.icon}</div>
                <CardTitle className={`text-lg ${item.owned ? "text-primary" : "text-muted-foreground"}`}>
                  {item.name}
                </CardTitle>
                <div className="flex justify-center gap-2">
                  <Badge className={`border-2 ${getRarityColor(item.rarity)}`}>{item.rarity}</Badge>
                  <Badge variant="outline" className="border-2 border-stone-300 capitalize">
                    {item.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <CardDescription>{item.description}</CardDescription>

                {item.quantity && item.quantity > 1 && (
                  <div className="text-sm font-medium text-primary">Quantity: {item.quantity}</div>
                )}

                {item.owned ? (
                  <div className="space-y-2">
                    {item.equipped && (
                      <Badge className="bg-primary text-primary-foreground border-2 border-primary">⚡ Equipped</Badge>
                    )}
                    <Button
                      variant={item.equipped ? "outline" : "default"}
                      onClick={() => handleEquipItem(item.id)}
                      className="w-full border-2 border-primary"
                    >
                      {item.equipped ? "Unequip" : "Equip"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">🔒 Not owned</div>
                    <Button variant="outline" disabled className="w-full border-2 border-stone-400 bg-transparent">
                      Coming Soon
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
