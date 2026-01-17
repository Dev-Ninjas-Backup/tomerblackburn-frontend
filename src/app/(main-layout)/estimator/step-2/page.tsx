'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FloatingPriceCard } from '../_components/FloatingPriceCard'
import { useEstimatorStore } from '@/store/estimatorStore'

export default function Step2Page() {
  const router = useRouter()
  const { bathroomType, step2Data, setStep2Data, addCost, removeCost } = useEstimatorStore()
  
  const [vanitySize, setVanitySize] = useState(step2Data.vanity.size || '')
  const [vanitySizeQty, setVanitySizeQty] = useState(step2Data.vanity.sizeQty || 1)
  const [vanityStyle, setVanityStyle] = useState(step2Data.vanity.style || '')
  const [vanityStyleQty, setVanityStyleQty] = useState(step2Data.vanity.styleQty || 1)
  const [countertopMaterial, setCountertopMaterial] = useState(step2Data.vanity.countertopMaterial || '')
  const [countertopQty, setCountertopQty] = useState(step2Data.vanity.countertopQty || 1)
  const [doubleSink, setDoubleSink] = useState(step2Data.vanity.doubleSink)
  
  const [showerDoorType, setShowerDoorType] = useState(step2Data.shower.showerDoorType || '')
  const [showerDoorQty, setShowerDoorQty] = useState(step2Data.shower.showerDoorQty || 1)
  const [showerNiche, setShowerNiche] = useState(step2Data.shower.showerNiche)
  const [benchSeat, setBenchSeat] = useState(step2Data.shower.benchSeat)
  const [rainShowerHead, setRainShowerHead] = useState(step2Data.shower.rainShowerHead)
  
  const [tubTypeUpgrade, setTubTypeUpgrade] = useState(step2Data.bathtub.tubTypeUpgrade || '')
  const [tubTypeQty, setTubTypeQty] = useState(step2Data.bathtub.tubTypeQty || 1)

  useEffect(() => {
    if (!bathroomType) {
      router.push('/estimator/choose-bathroom-type')
    }
  }, [bathroomType, router])

  useEffect(() => {
    if (vanitySize) addCost({ id: 'vanity-size', name: `Vanity Size (${vanitySize})`, cost: 40000 })
    else removeCost('vanity-size')
  }, [vanitySize])

  useEffect(() => {
    if (vanityStyle) addCost({ id: 'vanity-style', name: `Vanity Style (${vanityStyle})`, cost: 30000 })
    else removeCost('vanity-style')
  }, [vanityStyle])

  useEffect(() => {
    if (countertopMaterial) addCost({ id: 'countertop', name: `Countertop (${countertopMaterial})`, cost: 20000 })
    else removeCost('countertop')
  }, [countertopMaterial])

  useEffect(() => {
    if (doubleSink) addCost({ id: 'double-sink', name: 'Double Sink', cost: 800 })
    else removeCost('double-sink')
  }, [doubleSink])

  useEffect(() => {
    if (showerDoorType) addCost({ id: 'shower-door', name: `Shower Door (${showerDoorType})`, cost: 50 })
    else removeCost('shower-door')
  }, [showerDoorType])

  useEffect(() => {
    if (showerNiche) addCost({ id: 'shower-niche', name: 'Shower Niche', cost: 250 })
    else removeCost('shower-niche')
  }, [showerNiche])

  useEffect(() => {
    if (benchSeat) addCost({ id: 'bench-seat', name: 'Bench Seat', cost: 400 })
    else removeCost('bench-seat')
  }, [benchSeat])

  useEffect(() => {
    if (rainShowerHead) addCost({ id: 'rain-shower', name: 'Rain Shower Head', cost: 350 })
    else removeCost('rain-shower')
  }, [rainShowerHead])

  useEffect(() => {
    if (tubTypeUpgrade) addCost({ id: 'tub-upgrade', name: `Tub Upgrade (${tubTypeUpgrade})`, cost: 60 })
    else removeCost('tub-upgrade')
  }, [tubTypeUpgrade])

  const handleNext = () => {
    setStep2Data({
      vanity: { size: vanitySize, sizeQty: vanitySizeQty, style: vanityStyle, styleQty: vanityStyleQty, countertopMaterial, countertopQty, doubleSink },
      shower: { showerDoorType, showerDoorQty, showerNiche, benchSeat, rainShowerHead },
      bathtub: { tubTypeUpgrade, tubTypeQty },
    })
    router.push('/estimator/step-3')
  }

  const showShower = bathroomType === 'TPS' || bathroomType === 'FP'
  const showBathtub = bathroomType === 'TPT' || bathroomType === 'FP'

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <FloatingPriceCard />
      
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-600">Completed ✓</span>
            <span className="text-sm font-medium text-[#283878]">Step 2: Core Fixtures & Layout</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#283878] h-2 rounded-full" style={{ width: '66%' }}></div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Vanity Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Vanity & Countertop Options</h2>
            <p className="text-gray-600 mb-6">
              Choose the size, style, and countertop material for your vanity to match your space and design preferences. Optional upgrades like a double sink are available to enhance functionality and convenience.
            </p>

            <div className="space-y-4">
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Vanity Size</h3>
                <p className="text-sm text-gray-600 mb-3">Select vanity width</p>
                <div className="flex gap-4">
                  <select
                    value={vanitySize}
                    onChange={(e) => setVanitySize(e.target.value)}
                    className="flex-1 rounded-lg border-gray-300 p-2"
                    aria-label="Select vanity size"
                  >
                    <option value="">Select option</option>
                    <option value="24 inch">24 inch</option>
                    <option value="36 inch">36 inch</option>
                    <option value="48 inch">48 inch</option>
                    <option value="60 inch">60 inch</option>
                  </select>
                  <Input type="number" value={vanitySizeQty} onChange={(e) => setVanitySizeQty(Number(e.target.value))} className="w-24" min="1" max="4" />
                </div>
                <p className="text-xs text-orange-700 mt-2">+$40,000</p>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Vanity Style</h3>
                <p className="text-sm text-gray-600 mb-3">Select vanity design</p>
                <div className="flex gap-4">
                  <select
                    value={vanityStyle}
                    onChange={(e) => setVanityStyle(e.target.value)}
                    className="flex-1 rounded-lg border-gray-300 p-2"
                    aria-label="Select vanity style"
                  >
                    <option value="">Select option</option>
                    <option value="Modern">Modern</option>
                    <option value="Traditional">Traditional</option>
                    <option value="Floating">Floating</option>
                    <option value="Rustic">Rustic</option>
                  </select>
                  <Input type="number" value={vanityStyleQty} onChange={(e) => setVanityStyleQty(Number(e.target.value))} className="w-24" min="1" max="4" />
                </div>
                <p className="text-xs text-orange-700 mt-2">+$30,000</p>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Countertop Material</h3>
                <p className="text-sm text-gray-600 mb-3">Select countertop material</p>
                <div className="flex gap-4">
                  <select
                    value={countertopMaterial}
                    onChange={(e) => setCountertopMaterial(e.target.value)}
                    className="flex-1 rounded-lg border-gray-300 p-2"
                    aria-label="Select countertop material"
                  >
                    <option value="">Select option</option>
                    <option value="Quartz">Quartz</option>
                    <option value="Granite">Granite</option>
                    <option value="Marble">Marble</option>
                    <option value="Solid Surface">Solid Surface</option>
                  </select>
                  <Input type="number" value={countertopQty} onChange={(e) => setCountertopQty(Number(e.target.value))} className="w-24" min="1" max="4" />
                </div>
                <p className="text-xs text-orange-700 mt-2">+$20,000</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Double Sink</h3>
                    <p className="text-sm text-gray-600">Upgrade to double sink vanity</p>
                    <p className="text-xs text-blue-700 mt-2">+$800</p>
                  </div>
                  <button
                    onClick={() => setDoubleSink(!doubleSink)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      doubleSink ? 'bg-[#283878]' : 'bg-gray-300'
                    }`}
                    aria-label="Toggle double sink"
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${doubleSink ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Shower Section */}
          {showShower && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Shower Design & Features</h2>
              <p className="text-gray-600 mb-6">
                Customize your shower layout and features, including the base, enclosure, and optional upgrades, to create a comfortable and functional shower experience.
              </p>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">Shower Base</h3>
                  <p className="text-sm text-gray-600">Acrylic or tile shower base</p>
                  <p className="text-xs text-green-600 mt-2">Included in base price</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">Shower Tile</h3>
                  <p className="text-sm text-gray-600">Tile shower walls and floor with waterproofing</p>
                  <p className="text-xs text-green-600 mt-2">Included in base price</p>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Shower Door Type</h3>
                  <p className="text-sm text-gray-600 mb-3">Select shower enclosure</p>
                  <div className="flex gap-4">
                    <select
                      value={showerDoorType}
                      onChange={(e) => setShowerDoorType(e.target.value)}
                      className="flex-1 rounded-lg border-gray-300 p-2"
                      aria-label="Select shower door type"
                    >
                      <option value="">Select option</option>
                      <option value="Frameless">Frameless</option>
                      <option value="Semi-Frameless">Semi-Frameless</option>
                      <option value="Framed">Framed</option>
                      <option value="Sliding">Sliding</option>
                    </select>
                    <Input type="number" value={showerDoorQty} onChange={(e) => setShowerDoorQty(Number(e.target.value))} className="w-24" min="1" max="4" />
                  </div>
                  <p className="text-xs text-orange-700 mt-2">+$50</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Shower Niche</h3>
                      <p className="text-sm text-gray-600">Built-in storage niche</p>
                      <p className="text-xs text-blue-700 mt-2">+$250</p>
                    </div>
                    <button
                      onClick={() => setShowerNiche(!showerNiche)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showerNiche ? 'bg-[#283878]' : 'bg-gray-300'}`}
                      aria-label="Toggle shower niche"
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showerNiche ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Bench Seat</h3>
                      <p className="text-sm text-gray-600">Built-in shower bench</p>
                      <p className="text-xs text-blue-700 mt-2">+$400</p>
                    </div>
                    <button
                      onClick={() => setBenchSeat(!benchSeat)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${benchSeat ? 'bg-[#283878]' : 'bg-gray-300'}`}
                      aria-label="Toggle bench seat"
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${benchSeat ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Rain Shower Head</h3>
                      <p className="text-sm text-gray-600">Upgrade to rain shower head</p>
                      <p className="text-xs text-blue-700 mt-2">+$350</p>
                    </div>
                    <button
                      onClick={() => setRainShowerHead(!rainShowerHead)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${rainShowerHead ? 'bg-[#283878]' : 'bg-gray-300'}`}
                      aria-label="Toggle rain shower head"
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${rainShowerHead ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bathtub Section */}
          {showBathtub && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Bathtub Options</h2>
              <p className="text-gray-600 mb-6">
                Select your bathtub type and size to fit your space and comfort needs, with upgrade options available for enhanced functionality and convenience.
              </p>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">Standard Bathtub</h3>
                  <p className="text-sm text-gray-600">Standard acrylic bathtub</p>
                  <p className="text-xs text-green-600 mt-2">Included in base price</p>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Tub Type Upgrade</h3>
                  <p className="text-sm text-gray-600 mb-3">Upgrade bathtub type</p>
                  <div className="flex gap-4">
                    <select
                      value={tubTypeUpgrade}
                      onChange={(e) => setTubTypeUpgrade(e.target.value)}
                      className="flex-1 rounded-lg border-gray-300 p-2"
                      aria-label="Select tub type upgrade"
                    >
                      <option value="">Select option</option>
                      <option value="Soaking Tub">Soaking Tub</option>
                      <option value="Freestanding">Freestanding</option>
                      <option value="Jetted">Jetted</option>
                      <option value="Walk-in">Walk-in</option>
                    </select>
                    <Input type="number" value={tubTypeQty} onChange={(e) => setTubTypeQty(Number(e.target.value))} className="w-24" min="1" max="4" />
                  </div>
                  <p className="text-xs text-orange-700 mt-2">+$60</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button
              onClick={() => router.push('/estimator/step-1')}
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
