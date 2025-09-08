"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface CoinPackage {
  id: string
  name: string
  description: string | null
  amount: number
  price: number
  discount: number | null
}

interface CoinShopProps {
  userCoins: number
  onCoinsUpdated: (newCoins: number) => void
  onBackToDashboard: () => void
}

export function CoinShop({ userCoins, onCoinsUpdated, onBackToDashboard }: CoinShopProps) {
  const [coinPackages, setCoinPackages] = useState<CoinPackage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Fetch coin packages
    const fetchCoinPackages = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/coins/packages')
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch coin packages')
        }
        
        setCoinPackages(data.coinPackages)
      } catch (error) {
        console.error('Error fetching coin packages:', error)
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : 'Failed to load coin packages',
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCoinPackages()
  }, [])

  const handlePurchase = async (packageId: string) => {
    try {
      setIsPurchasing(true)
      const response = await fetch('/api/coins/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ packageId }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Purchase failed')
      }
      
      // Update the user's coin balance
      onCoinsUpdated(data.coins)
      
      toast({
        title: "Purchase successful",
        description: data.message,
      })
    } catch (error) {
      console.error('Purchase error:', error)
      toast({
        title: "Purchase failed",
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: "destructive",
      })
    } finally {
      setIsPurchasing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-wider pixel-font text-neon-blue">COIN SHOP</h2>
          <p className="text-blue-200">Power up your adventure with more coins!</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="px-4 py-2 text-lg font-bold bg-yellow-500/20 text-yellow-300 border-yellow-500/50">
            <span className="mr-2">🪙</span>
            {userCoins}
          </Badge>
          <Button onClick={onBackToDashboard} variant="outline" className="border-blue-500/50 text-blue-300 hover:bg-blue-500/20">
            Back to Dashboard
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse text-2xl text-blue-300">Loading coin packages...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coinPackages.map((pkg) => (
            <Card key={pkg.id} className="glass-card glass-border glass-shadow overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-yellow-600/80 to-amber-500/80 backdrop-blur-md text-white">
                <div className="text-4xl filter drop-shadow-lg">🪙</div>
                <CardTitle className="text-2xl font-black tracking-wider pixel-font text-yellow-100">
                  {pkg.name}
                </CardTitle>
                <CardDescription className="text-amber-100 font-bold">
                  {pkg.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 glass-bg space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-3xl font-black text-yellow-300 pixel-font">{pkg.amount} 🪙</div>
                  {pkg.discount && (
                    <Badge className="bg-green-500/30 text-green-300 border-green-500/50">
                      {pkg.discount}% OFF
                    </Badge>
                  )}
                </div>
                <div className="text-xl font-bold text-blue-200">${pkg.price.toFixed(2)}</div>
                <Button
                  onClick={() => handlePurchase(pkg.id)}
                  disabled={isPurchasing}
                  className="w-full h-12 text-lg font-black rounded-xl bg-gradient-to-r from-yellow-500/80 to-amber-500/80 hover:from-yellow-400/90 hover:to-amber-400/90 text-white pixel-font"
                >
                  {isPurchasing ? 'Processing...' : 'Purchase'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}