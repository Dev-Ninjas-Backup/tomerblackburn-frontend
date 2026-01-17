'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FloatingPriceCard } from '../_components/FloatingPriceCard'
import { useEstimatorStore } from '@/store/estimatorStore'

export default function Step1Page() {
  const router = useRouter()
  const { bathroomType, step1Data, setStep1Data, addCost, removeCost } = useEstimatorStore()
  
  const [wallTileRemoval, setWallTileRemoval] = useState(step1Data.demolition.wallTileRemoval)
  const [wallTileSqft, setWallTileSqft] = useState(step1Data.demolition.wallTileSqft || 0)
  const [floorTileSelection, setFloorTileSelection] = useState(step1Data.flooring.floorTileSelection || '')
  const [floorTileQty, setFloorTileQty] = useState(step1Data.flooring.floorTileQty || 1)
  const [heatedFloor, setHeatedFloor] = useState(step1Data.flooring.heatedFloor)

  useEffect(() => {
    if (!bathroomType) {
      router.push('/estimator/choose-bathroom-type')
    }
  }, [bathroomType, router])

  useEffect(() => {
    if (wallTileRemoval && wallTileSqft > 0) {
      addCost({ id: 'wall-tile-removal', name: `Wall Tile Removal (${wallTileSqft} sqft)`, cost: wallTileSqft * 5 })
    } else {
      removeCost('wall-tile-removal')
    }
  }, [wallTileRemoval, wallTileSqft])

  useEffect(() => {
    if (floorTileSelection) {
      addCost({ id: 'floor-tile', name: `Floor Tile (${floorTileSelection})`, cost: 10000 })
    } else {
      removeCost('floor-tile')
    }
  }, [floorTileSelection])

  useEffect(() => {
    if (heatedFloor) {
      addCost({ id: 'heated-floor', name: 'Heated Floor', cost: 15 })
    } else {
      removeCost('heated-floor')
    }
  }, [heatedFloor])

  const handleNext = () => {
    setStep1Data({
      demolition: { wallTileRemoval, wallTileSqft },
      flooring: { floorTileSelection, floorTileQty, heatedFloor },
    })
    router.push('/estimator/step-2')
  }

  const handleCancel = () => {
    router.push('/estimator/choose-bathroom-type')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <FloatingPriceCard />
      
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#283878]">Step 1: Demolition & Structural Prep</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#283878] h-2 rounded-full" style={{ width: '33%' }}></div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Demolition Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Demolition & Site Preparation</h2>
            <p className="text-gray-600 mb-6">
              Removal of existing fixtures and materials, with complete cleanup and waste disposal included in the base price
            </p>

            {/* White - Included in base */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-900 mb-1">Demolition</h3>
              <p className="text-sm text-gray-600">Remove existing fixtures, tiles, and prepare space for remodel</p>
              <p className="text-xs text-green-600 mt-2">Included in base price</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-1">Waste Removal</h3>
              <p className="text-sm text-gray-600">Haul away and disposal of all demolition debris</p>
              <p className="text-xs text-green-600 mt-2">Included in base price</p>
            </div>

            {/* Blue - Yes/No Toggle */}
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Wall Tile Removal</h3>
                  <p className="text-sm text-gray-600">Remove existing wall tiles</p>
                </div>
                <button
                  onClick={() => setWallTileRemoval(!wallTileRemoval)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    wallTileRemoval ? 'bg-[#283878]' : 'bg-gray-300'
                  }`}
                  aria-label="Toggle wall tile removal"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      wallTileRemoval ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Green - Data Input */}
              {wallTileRemoval && (
                <div className="mt-4 bg-green-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Enter square feet of tile
                  </label>
                  <Input
                    type="number"
                    value={wallTileSqft}
                    onChange={(e) => setWallTileSqft(Number(e.target.value))}
                    placeholder="0"
                    className="w-32"
                  />
                  <p className="text-xs text-green-700 mt-2">$250 per each</p>
                </div>
              )}
            </div>
          </div>

          {/* Flooring Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Flooring Options</h2>
            <p className="text-gray-600 mb-6">
              Tile flooring installation is included in the base price. You can customize your bathroom by selecting your preferred tile style or adding radiant heated flooring for extra comfort.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-1">Floor Tile Installation</h3>
              <p className="text-sm text-gray-600">Install tile flooring throughout bathroom</p>
              <p className="text-xs text-green-600 mt-2">Included in base price</p>
            </div>

            {/* Orange - Dropdown */}
            <div className="bg-orange-50 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Floor Tile Selection</h3>
              <p className="text-sm text-gray-600 mb-3">Choose tile style and material</p>
              <div className="flex gap-4">
                <select
                  value={floorTileSelection}
                  onChange={(e) => setFloorTileSelection(e.target.value)}
                  className="flex-1 rounded-lg border-gray-300 p-2"
                  aria-label="Select floor tile type"
                >
                  <option value="">Select option</option>
                  <option value="Ceramic">Ceramic</option>
                  <option value="Porcelain">Porcelain</option>
                  <option value="Natural Stone">Natural Stone</option>
                  <option value="Luxury Vinyl">Luxury Vinyl</option>
                </select>
                <Input
                  type="number"
                  value={floorTileQty}
                  onChange={(e) => setFloorTileQty(Number(e.target.value))}
                  placeholder="QTY"
                  className="w-24"
                  min="1"
                  max="4"
                />
              </div>
              <p className="text-xs text-orange-700 mt-2">+$10,000</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Heated Floor</h3>
                  <p className="text-sm text-gray-600">Add radiant floor heating system</p>
                  <p className="text-xs text-blue-700 mt-2">+$15</p>
                </div>
                <button
                  onClick={() => setHeatedFloor(!heatedFloor)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    heatedFloor ? 'bg-[#283878]' : 'bg-gray-300'
                  }`}
                  aria-label="Toggle heated floor"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      heatedFloor ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1 py-6 text-lg rounded-full"
            >
              Cancel
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1 bg-[#283878] hover:bg-[#1f2d5c] text-white py-6 text-lg rounded-full"
            >
              Next →
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
