'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FloatingPriceCard } from '../_components/FloatingPriceCard'
import { useEstimatorStore } from '@/store/estimatorStore'
import { Upload } from 'lucide-react'

export default function PreviewPage() {
  const router = useRouter()
  const { bathroomType, userInfo, setUserInfo, totalPrice, additionalCosts, basePrice } = useEstimatorStore()
  
  const [fullName, setFullName] = useState(userInfo.fullName)
  const [email, setEmail] = useState(userInfo.email)
  const [phone, setPhone] = useState(userInfo.phone)
  const [zipCode, setZipCode] = useState(userInfo.zipCode)
  const [address, setAddress] = useState(userInfo.address)
  const [notes, setNotes] = useState(userInfo.notes)
  const [photoCount, setPhotoCount] = useState(0)
  const [videoCount, setVideoCount] = useState(0)

  useEffect(() => {
    if (!bathroomType) {
      router.push('/estimator/choose-bathroom-type')
    }
  }, [bathroomType, router])

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setPhotoCount(Math.min(files.length, 10))
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setVideoCount(Math.min(files.length, 2))
    }
  }

  const handleSubmit = () => {
    const submissionData = {
      bathroomType,
      userInfo: {
        fullName,
        email,
        phone,
        zipCode,
        address,
        notes,
      },
      pricing: {
        basePrice,
        additionalCosts,
        totalPrice,
      },
      photoCount,
      videoCount,
      submittedAt: new Date().toISOString(),
    }

    console.log('=== ESTIMATE SUBMISSION ===')
    console.log('Bathroom Type:', bathroomType)
    console.log('User Information:', submissionData.userInfo)
    console.log('Pricing Details:', submissionData.pricing)
    console.log('Files:', { photos: photoCount, videos: videoCount })
    console.log('Full Submission Data:', submissionData)
    console.log('==========================')

    setUserInfo({
      fullName,
      email,
      phone,
      zipCode,
      address,
      notes,
    })
    router.push('/estimator/confirmation')
  }

  const isFormValid = fullName && email && phone && zipCode && address

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <FloatingPriceCard />
      
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* User Information */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Full Name*
                </label>
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email Address*
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Phone Number*
                </label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(773) 555-0123"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Zip Code*
                </label>
                <Input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="60614"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Project Address*
                </label>
                <Input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="example address"
                  required
                />
              </div>
            </div>
          </div>

          {/* Project Notes */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Notes (optional)</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Share any additional details, preferences, or questions about your project
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="example address"
              className="w-full min-h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#283878] focus:border-transparent"
            />
          </div>

          {/* Upload Photos & Videos */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Photos & Videos</h2>
            <p className="text-gray-600 mb-6 text-sm">
              Help us understand your space better by uploading photos and videos of your current bathroom.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Upload Photos (Max 10)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#283878] transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                    max={10}
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600 mb-1">Click to upload images</p>
                    <p className="text-xs text-gray-500">PNG, JPG, JPEG (Max 10MB each)</p>
                    {photoCount > 0 && (
                      <p className="text-sm text-[#283878] font-medium mt-2">
                        {photoCount} photo{photoCount > 1 ? 's' : ''} selected
                      </p>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Upload Videos (Max 2)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#283878] transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={handleVideoUpload}
                    className="hidden"
                    id="video-upload"
                    max={2}
                  />
                  <label htmlFor="video-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600 mb-1">Click to upload videos</p>
                    <p className="text-xs text-gray-500">MP4, MOV (Max 50MB each)</p>
                    {videoCount > 0 && (
                      <p className="text-sm text-[#283878] font-medium mt-2">
                        {videoCount} video{videoCount > 1 ? 's' : ''} selected
                      </p>
                    )}
                  </label>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 Tip: Include photos of the entire bathroom, fixtures, any problem areas, and measurements if available. Videos can show the layout and flow of the space.
                </p>
              </div>
            </div>
          </div>

          {/* Estimate Summary */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Estimate Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">Base Price:</span>
                <span className="font-semibold">${basePrice.toLocaleString()}</span>
              </div>

              {additionalCosts.length > 0 && (
                <>
                  <div className="border-t pt-3">
                    <p className="text-gray-600 mb-3">Additional Items:</p>
                    <div className="space-y-2 pl-4">
                      {additionalCosts.map((cost) => (
                        <div key={cost.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">{cost.name}:</span>
                          <span className="font-medium">+${cost.cost.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">Additions Total:</span>
                      <span className="font-semibold">
                        ${additionalCosts.reduce((sum, c) => sum + c.cost, 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </>
              )}

              <div className="border-t-2 border-[#283878] pt-4">
                <div className="flex justify-between text-2xl">
                  <span className="font-bold text-gray-900">Total:</span>
                  <span className="font-bold text-[#283878]">${totalPrice.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-right">
                  * Final price may vary based on site conditions
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="w-full bg-[#283878] hover:bg-[#1f2d5c] text-white py-6 text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Estimate Budget →
            </Button>
            <p className="text-xs text-gray-500 text-center mt-4">
              By submitting, you agree to receive communication from BBurn Builders regarding your estimate.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
