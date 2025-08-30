"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface LootItem {
  id: string
  name: string
  type: "skin" | "tool" | "decoration" | "consumable" | "coins" | "xp"
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
  icon: string
  description: string
  value?: number
}

interface LootChestProps {
  isOpen: boolean
  onClose: () => void
  onRewardClaimed: (reward: LootItem) => void
}

export function LootChest({ isOpen, onClose, onRewardClaimed }: LootChestProps) {
  const [isOpening, setIsOpening] = useState(false)
  const [reward, setReward] = useState<LootItem | null>(null)
  const [hasOpened, setHasOpened] = useState(false)

  const possibleRewards: LootItem[] = [
    {
      id: "coins-small",
      name: "Coin Pouch",
      type: "coins",
      rarity: "Common",
      icon: "🪙",
      description: "A small pouch of coins",
      value: 50,
    },
    {
      id: "coins-medium",
      name: "Coin Bag",
      type: "coins",
      rarity: "Rare",
      icon: "💰",
      description: "A bag full of shiny coins",
      value: 150,
    },
    {
      id: "xp-boost",
      name: "XP Crystal",
      type: "xp",
      rarity: "Rare",
      icon: "💎",
      description: "A crystal that grants bonus XP",
      value: 100,
    },
    {
      id: "torch-bundle",
      name: "Torch Bundle",
      type: "consumable",
      rarity: "Common",
      icon: "🕯️",
      description: "A bundle of knowledge torches",
      value: 5,
    },
    {
      id: "rare-skin",
      name: "Mystery Skin",
      type: "skin",
      rarity: "Epic",
      icon: "🎭",
      description: "A rare character skin",
    },
    {
      id: "legendary-tool",
      name: "Legendary Pickaxe",
      type: "tool",
      rarity: "Legendary",
      icon: "⛏️",
      description: "An incredibly powerful mining tool",
    },
  ]

  const handleOpenChest = () => {
    setIsOpening(true)

    // Simulate chest opening animation
    setTimeout(() => {
      // Random reward selection with weighted probabilities
      const rand = Math.random()
      let selectedReward: LootItem

      if (rand < 0.5) {
        // 50% chance for common rewards
        selectedReward = possibleRewards.filter((r) => r.rarity === "Common")[
          Math.floor(Math.random() * possibleRewards.filter((r) => r.rarity === "Common").length)
        ]
      } else if (rand < 0.8) {
        // 30% chance for rare rewards
        selectedReward = possibleRewards.filter((r) => r.rarity === "Rare")[
          Math.floor(Math.random() * possibleRewards.filter((r) => r.rarity === "Rare").length)
        ]
      } else if (rand < 0.95) {
        // 15% chance for epic rewards
        selectedReward = possibleRewards.filter((r) => r.rarity === "Epic")[
          Math.floor(Math.random() * possibleRewards.filter((r) => r.rarity === "Epic").length)
        ]
      } else {
        // 5% chance for legendary rewards
        selectedReward = possibleRewards.filter((r) => r.rarity === "Legendary")[
          Math.floor(Math.random() * possibleRewards.filter((r) => r.rarity === "Legendary").length)
        ]
      }

      setReward(selectedReward)
      setIsOpening(false)
      setHasOpened(true)
    }, 2000)
  }

  const handleClaimReward = () => {
    if (reward) {
      onRewardClaimed(reward)
      onClose()
      setReward(null)
      setHasOpened(false)
    }
  }

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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="border-4 border-stone-600 shadow-2xl max-w-md w-full bg-gradient-to-b from-amber-50 to-orange-50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
            <span className="text-3xl">📦</span>
            Loot Chest
          </CardTitle>
          <CardDescription>
            {!hasOpened ? "Click to open your reward chest!" : "Congratulations on your reward!"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {!hasOpened && !isOpening && (
            <div className="space-y-4">
              <div className="text-8xl animate-bounce">📦</div>
              <Button onClick={handleOpenChest} className="w-full border-4 border-primary text-lg py-6" size="lg">
                Open Chest!
              </Button>
            </div>
          )}

          {isOpening && (
            <div className="space-y-4">
              <div className="text-8xl animate-spin">✨</div>
              <div className="text-lg font-medium text-primary">Opening chest...</div>
              <div className="text-sm text-muted-foreground">Generating your reward!</div>
            </div>
          )}

          {hasOpened && reward && (
            <div className="space-y-4">
              <div className="text-8xl animate-pulse">{reward.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">{reward.name}</h3>
                <Badge className={`border-2 ${getRarityColor(reward.rarity)} mb-3`}>{reward.rarity}</Badge>
                <p className="text-muted-foreground mb-4">{reward.description}</p>
                {reward.value && (
                  <div className="text-lg font-bold text-secondary">
                    +{reward.value} {reward.type === "coins" ? "🪙" : reward.type === "xp" ? "XP" : ""}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Button onClick={handleClaimReward} className="w-full border-4 border-primary text-lg py-4" size="lg">
                  Claim Reward!
                </Button>
                <Button variant="outline" onClick={onClose} className="w-full border-2 border-stone-400 bg-transparent">
                  Close
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
