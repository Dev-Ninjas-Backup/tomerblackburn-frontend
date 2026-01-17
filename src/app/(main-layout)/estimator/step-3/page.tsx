'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FloatingPriceCard } from '../_components/FloatingPriceCard'
import { useEstimatorStore } from '@/store/estimatorStore'

export default function Step3Page() {
  const router = useRouter()
  const { bathroomType, step3Data, setStep3Data, addCost, removeCost } = useEstimatorStore()
  
  const [vanityLightUpgrade, setVanityLightUpgrade] = useState(step3Data.lighting.vanityLightUpgrade || '')
  const [vanityLightQty, setVanityLightQty] = useState(step3Data.lighting.vanityLightQty || 1)
  const [recessedLights, setRecessedLights] = useState(step3Data.lighting.recessedLights)
  
  const [toiletUpgrade, setToiletUpgrade] = useState(step3Data.fixtures.toiletUpgrade || '')
  const [toiletQty, setToiletQty] = useState(step3Data.fixtures.toiletQty || 1)
  const [faucetQuality, setFaucetQuality] = useState(step3Data.fixtures.faucetQuality || '')
  const [faucetQty, setFaucetQty] = useState(step3Data.fixtures.faucetQty || 1)
  const [towelBars, setTowelBars] = useState(step3Data.fixtures.towelBars)
  
  const [wallTile, setWallTile] = useState(step3Data.walls.wallTile)
  const [paint, setPaint] = useState(step3Data.walls.paint)

  useEffect(() => {
    if (!bathroomType) {
      router.push('/estimator/choose-bathroom-type')
    }
  }, [bathroomType, router])

  useEffect(() => {
    if (vanityLightUpgrade) addCost({ id: 'vanity-light', name: `Vanity Light (${vanityLightUpgrade})`, cost: 30000 })
    else removeCost('vanity-light')
  }, [vanityLightUpgrade])

  useEffect(() => {
    if (recessedLights) addCost({ id: 'recessed-lights', name: 'Recessed Lights', cost: 800 })
    else removeCost('recessed-lights')
  }, [recessedLights])

  useEffect(() => {
    if (toiletUpgrade) addCost({ id: 'toilet-upgrade', name: `Toilet Upgrade (${toiletUpgrade})`, cost: 50 })
    else removeCost('toilet-upgrade')
  }, [toiletUpgrade])

  useEffect(() => {
    if (faucetQuality) addCost({ id: 'faucet-quality', name: `Faucet Quality (${faucetQuality})`, cost: 60 })
    else removeCost('faucet-quality')
  }, [faucetQuality])

  useEffect(() => {
    if (towelBars) addCost({ id: 'towel-bars', name: 'Towel Bars', cost: 400 })
    else removeCost('towel-bars')
  }, [towelBars])

  useEffect(() => {
    if (wallTile) addCost({ id: 'wall-tile', name: 'Wall Tile', cost: 400 })
    else removeCost('wall-tile')
  }, [wallTile])

  const handleNext = () => {
    setStep3Data({
      lighting: { vanityLightUpgrade, vanityLightQty, recessedLights },
      fixtures: { toiletUpgrade, toiletQty, faucetQuality, faucetQty, towelBars },
      walls: { wallTile, paint },
    })
    router.push('/estimator/preview')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <FloatingPriceCard />
      
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-600">Completed ✓</span>
            <span className="text-sm font-medium text-green-600">Completed ✓</span>
            <span className="text-sm font-medium text-[#283878]">Step 3: Finishing Touches</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#283878] h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Lighting Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Lighting Options</h2>
            <p className="text-gray-600 mb-6">
              Select lighting fixtures and upgrades to enhance visibility, comfort, and ambiance throughout your bathroom.
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Vanity Light</h3>
                <p className="text-sm text-gray-600">Vanity light fixture</p>
                <p className="text-xs text-green-600 mt-2">Included in base price</p>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Vanity Light Upgrade</h3>
                <p className="text-sm text-gray-600 mb-3">Upgrade vanity lighting</p>
                <div className="flex gap-4">
                  <select
                    value={vanityLightUpgrade}
                    onChange={(e) => setVanityLightUpgrade(e.target.value)}
                    className="flex-1 rounded-lg border-gray-300 p-2"
                    aria-label="Select vanity light upgrade"
                  >
                    <option value="">Select option</option>
                    <option value="LED Modern">LED Modern</option>
                    <option value="Sconce Pair">Sconce Pair</option>
                    <option value="Chandelier">Chandelier</option>
                    <option value="Backlit Mirror">Backlit Mirror</option>
                  </select>
                  <Input type="number" value={vanityLightQty} onChange={(e) => setVanityLightQty(Number(e.target.value))} className="w-24" min="1" max="4" />
                </div>
                <p className="text-xs text-orange-700 mt-2">+$30,000</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Recessed Lights</h3>
                    <p className="text-sm text-gray-600">Add recessed can lights</p>
                    <p className="text-xs text-blue-700 mt-2">+$800</p>
                  </div>
                  <button
                    onClick={() => setRecessedLights(!recessedLights)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      recessedLights ? 'bg-[#283878]' : 'bg-gray-300'
                    }`}
                    aria-label="Toggle recessed lights"
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${recessedLights ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Fixtures Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Fixtures & Hardware</h2>
            <p className="text-gray-600 mb-6">
              Select toilets, faucets, and essential accessories to complete your bathroom with reliable performance and style.
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Standard Toilet</h3>
                <p className="text-sm text-gray-600">Standard two-piece toilet</p>
                <p className="text-xs text-green-600 mt-2">Included in base price</p>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Toilet Upgrade</h3>
                <p className="text-sm text-gray-600 mb-3">Upgrade toilet type</p>
                <div className="flex gap-4">
                  <select
                    value={toiletUpgrade}
                    onChange={(e) => setToiletUpgrade(e.target.value)}
                    className="flex-1 rounded-lg border-gray-300 p-2"
                    aria-label="Select toilet upgrade"
                  >
                    <option value="">Select option</option>
                    <option value="One-Piece">One-Piece</option>
                    <option value="Comfort Height">Comfort Height</option>
                    <option value="Dual Flush">Dual Flush</option>
                    <option value="Smart Toilet">Smart Toilet</option>
                  </select>
                  <Input type="number" value={toiletQty} onChange={(e) => setToiletQty(Number(e.target.value))} className="w-24" min="1" max="4" />
                </div>
                <p className="text-xs text-orange-700 mt-2">+$50</p>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Faucet Quality</h3>
                <p className="text-sm text-gray-600 mb-3">Select faucet quality level</p>
                <div className="flex gap-4">
                  <select
                    value={faucetQuality}
                    onChange={(e) => setFaucetQuality(e.target.value)}
                    className="flex-1 rounded-lg border-gray-300 p-2"
                    aria-label="Select faucet quality"
                  >
                    <option value="">Select option</option>
                    <option value="Standard">Standard</option>
                    <option value="Mid-Range">Mid-Range</option>
                    <option value="Premium">Premium</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                  <Input type="number" value={faucetQty} onChange={(e) => setFaucetQty(Number(e.target.value))} className="w-24" min="1" max="4" />
                </div>
                <p className="text-xs text-orange-700 mt-2">+$60</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Towel Bars</h3>
                    <p className="text-sm text-gray-600">Add towel bars and accessories</p>
                    <p className="text-xs text-blue-700 mt-2">+$400</p>
                  </div>
                  <button
                    onClick={() => setTowelBars(!towelBars)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      towelBars ? 'bg-[#283878]' : 'bg-gray-300'
                    }`}
                    aria-label="Toggle towel bars"
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${towelBars ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Walls & Ceiling Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Walls & Ceiling Finishes</h2>
            <p className="text-gray-600 mb-6">
              Choose wall tile and paint options to complete your bathroom's look with durable, clean, and well-finished surfaces.
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Wall Preparation</h3>
                <p className="text-sm text-gray-600">Drywall repair and preparation</p>
                <p className="text-xs text-green-600 mt-2">Included in base price</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Wall Tile</h3>
                    <p className="text-sm text-gray-600">Add wall tile installation</p>
                    <p className="text-xs text-blue-700 mt-2">+$400</p>
                  </div>
                  <button
                    onClick={() => setWallTile(!wallTile)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      wallTile ? 'bg-[#283878]' : 'bg-gray-300'
                    }`}
                    aria-label="Toggle wall tile"
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${wallTile ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Paint</h3>
                <p className="text-sm text-gray-600">Primer and ceiling</p>
                <p className="text-xs text-green-600 mt-2">Included in base price</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => router.push('/estimator/step-2')}
              variant="outline"
              className="flex-1 py-6 text-lg rounded-full"
            >
              Cancel
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1 bg-[#283878] hover:bg-[#1f2d5c] text-white py-6 text-lg rounded-full"
            >
              Continue to Preview & Submit →
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
