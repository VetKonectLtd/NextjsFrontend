'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Edit, Star, Info, Minus, Plus } from 'lucide-react';
import ProductCard from '@/components/shared/ProductCard';
import { Map } from '@/app/assets/icons/vet-vendor';

// Mock data - replace with actual data fetching
const productData = {
  id: '1',
  name: 'Dog Mouth Guard & Belt - PD092201a',
  location: 'Lagos, Nigeria',
  price: 7.99,
  images: [
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=600&fit=crop&crop=center&auto=format&q=80'
  ],
  about: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia.',
  disclaimer: 'Dear wonderful users, this is just to let you know that you are fully responsible for the products you purchase on the platform. The delivery timeline, location is to be communicated with the seller. However, your money is safe until transaction has been completed.',
  availableUnits: 20,
  tags: ['Dog Kits', 'Puppy', 'Golden Retrieval', 'Buy Dog Puppy'],
  reviews: [
    {
      id: 1,
      name: 'Adedunwa',
      rating: 5,
      comment: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.'
    },
    {
      id: 2,
      name: 'John Smith',
      rating: 4,
      comment: 'Great product, very satisfied with the quality and delivery time.'
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Excellent quality and fast shipping. Highly recommended!'
    },
    {
      id: 4,
      name: 'Mike Brown',
      rating: 4,
      comment: 'Good value for money. Product works as expected.'
    }
  ]
};

const similarProducts = [
  {
    id: '2',
    title: 'German shepherd',
    price: 15.66,
    image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    rating: 2.2,
    seller: 'Pet Store',
    location: 'Cross River, Nigeria',
    open: true
  },
  {
    id: '3',
    title: 'Dog collar premium',
    price: 50.99,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    rating: 4.8,
    seller: 'Pet Store',
    location: 'Cross River, Nigeria',
    open: true
  },
  {
    id: '4',
    title: 'Premium dog food',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    rating: 4.2,
    seller: 'Pet Store',
    location: 'Oyo, Nigeria',
    open: true
  },
  {
    id: '5',
    title: 'Dog training treats',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    rating: 4.5,
    seller: 'Pet Store',
    location: 'Oyo, Nigeria',
    open: true
  }
];

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [units, setUnits] = useState(1);

  const handleBack = () => {
    router.back();
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === productData.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productData.images.length - 1 : prev - 1
    );
  };

  const incrementUnits = () => {
    if (units < productData.availableUnits) {
      setUnits(units + 1);
    }
  };

  const decrementUnits = () => {
    if (units > 1) {
      setUnits(units - 1);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-12">
      {/* Header */}
      <div className="px-4 py-4 flex items-center mb-6">
        <button 
          onClick={handleBack} 
          className="flex items-center justify-center w-10 h-10 bg-white rounded-full mr-2 shadow-md hover:shadow-lg transition-shadow duration-200 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="text-sm font-medium">Back</span>
      </div>

      {/* Image Carousel */}
      <div className="relative h-64 bg-gray-900 rounded-t-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={productData.images[currentImageIndex]}
              alt={productData.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <motion.button
          onClick={prevImage}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:shadow-xl"
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </motion.button>

        <motion.button
          onClick={nextImage}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:shadow-xl"
        >
          <ChevronRight size={20} className="text-gray-600" />
        </motion.button>

        {/* Overlay Elements */}
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-4">
          {/* Edit Icon */}
          <button className="bg-white rounded-full p-2 shadow-lg">
            <Edit size={16} className="text-gray-600" />
          </button>

          {/* Carousel Indicators */}
          <div className="flex items-center space-x-2">
            {productData.images.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                  }`}
              />
            ))}
          </div>

          {/* Price */}
          <div className="text-white text-xl font-bold">
            ${productData.price.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white px-4 py-4">
        <h1 className="text-lg font-semibold text-gray-900 mb-2">
          {productData.name}
        </h1>

        <div className="flex items-center text-gray-500 mb-4">
          <Image
            src={Map}
            alt="Location"
            width={10}
            height={10}
            className="mr-2"
          />
          <span className="text-sm">{productData.location}</span>
        </div>

        {/* About */}
        <div className="mb-6">
          <h3 className="text-base font-semibold text-gray-900 mb-2">About</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {productData.about}
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <h3 className="text-base font-semibold text-gray-900">Disclaimer</h3>
            <Info size={16} className="ml-2 text-gray-400" />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {productData.disclaimer}
          </p>
        </div>

        {/* Reviews */}
        <div className="mb-6">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Reviews</h3>
          <div className="w-full overflow-x-scroll">
            <div className="flex space-x-4 pb-2">
              {productData.reviews.map((review) => (
                <div key={review.id} className="flex-shrink-0 w-full bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{review.name}</span>
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {productData.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Units and Controls */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-base font-medium text-gray-900">Units</span>
          <div className="flex items-center space-x-3">
            <button
              onClick={decrementUnits}
              disabled={units <= 1}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
            >
              <Minus size={16} />
            </button>
            <span className="text-lg font-medium w-8 text-center">{units}</span>
            <button
              onClick={incrementUnits}
              disabled={units >= productData.availableUnits}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-8">
          <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium">
            Available - ({productData.availableUnits} Units)
          </button>
          <button className="w-full py-3 bg-green-600 text-white rounded-lg font-medium">
            Proceed to Payment
          </button>
        </div>

        {/* Similar Products */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Products</h3>
          <div className="grid grid-cols-4 gap-4">
            {similarProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                rating={product.rating}
                seller={product.seller}
                location={product.location}
                open={product.open}
                onViewProduct={(id) => router.push(`/dashboard/products/${id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
