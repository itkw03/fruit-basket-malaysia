import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Palette, 
  Flower, 
  Apple, 
  Share2, 
  Plus,
  Edit,
  Trash2,
  Star,
  Video
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Product, ColorMood, Flower as FlowerType, Fruit, CustomerReview, VideoContent } from '../../types';
import { mockProducts, colorMoods, flowers, fruits } from '../../data/mockData';
import Button from '../UI/Button';
import EditItemModal from '../Modals/EditItemModal';

interface AdminDashboardProps {
  onBackToHome: () => void;
  onNavigateToOrders?: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome, onNavigateToOrders }) => {
  const { auth } = useStore();
  const [activeTab, setActiveTab] = useState('products');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data management - replace with real API calls
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [colorMoodsData, setColorMoodsData] = useState<ColorMood[]>(colorMoods);
  const [flowersData, setFlowersData] = useState<FlowerType[]>(flowers);
  const [fruitsData, setFruitsData] = useState<Fruit[]>(fruits);
  const [socialLinks, setSocialLinks] = useState({
    instagram: 'https://www.instagram.com/fruitbasket.malaysia',
    facebook: 'https://facebook.com/fruitbasketmalaysia',
    whatsapp: '+60 12-392 5913'
  });
  const [reviews, setReviews] = useState<CustomerReview[]>([
    {
      id: '1',
      productId: '1',
      customerName: 'Sarah M.',
      customerEmail: 'sarah@example.com',
      rating: 5,
      comment: "The most beautiful surprise I've ever received. Made my birthday unforgettable! 🥺",
      createdAt: '2024-01-15T10:30:00Z',
      isApproved: true
    },
    {
      id: '2',
      productId: '2',
      customerName: 'Ahmad K.',
      customerEmail: 'ahmad@example.com',
      rating: 5,
      comment: 'Quality beyond expectations. The fruits were so fresh and the flowers lasted for weeks.',
      createdAt: '2024-01-10T14:20:00Z',
      isApproved: true
    },
    {
      id: '3',
      productId: '3',
      customerName: 'Lisa T.',
      customerEmail: 'lisa@example.com',
      rating: 4,
      comment: 'Perfect for corporate gifts. Our clients were impressed and it reflected well on us.',
      createdAt: '2024-01-08T09:15:00Z',
      isApproved: false
    }
  ]);
  const [videos, setVideos] = useState<VideoContent[]>([
    {
      id: '1',
      title: 'Behind the Scenes: Creating the Perfect Arrangement',
      description: 'Watch our skilled artisans carefully select and arrange fresh flowers and premium fruits for your special moments.',
      videoUrl: 'data:video/mp4;base64,placeholder', // Placeholder for uploaded video
      thumbnailUrl: 'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=800',
      instagramPostUrl: 'https://instagram.com/p/example1',
      createdAt: '2024-01-15T10:30:00Z',
      isActive: true
    },
    {
      id: '2',
      title: 'Fresh Fruit Selection Process',
      description: 'Discover how we source the freshest seasonal fruits from local farms for our arrangements.',
      videoUrl: 'data:video/mp4;base64,placeholder', // Placeholder for uploaded video
      thumbnailUrl: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800',
      instagramPostUrl: 'https://instagram.com/p/example2',
      createdAt: '2024-01-10T14:20:00Z',
      isActive: true
    }
  ]);

  const tabs = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'colors', label: 'Color Themes', icon: Palette },
    { id: 'flowers', label: 'Flowers', icon: Flower },
    { id: 'fruits', label: 'Fruits', icon: Apple },
    { id: 'reviews', label: 'Customer Reviews', icon: Star },
    { id: 'videos', label: 'Behind the Scenes', icon: Video },
    { id: 'social', label: 'Social Links', icon: Share2 },
  ];

  const handleEdit = (item: any, type: string) => {
    setEditingItem({ ...item, _type: type });
  };

  const handleSave = (updatedItem: any) => {
    const { _type, ...itemData } = updatedItem;
    
    switch (_type) {
      case 'product':
        if (itemData.id && products.find(p => p.id === itemData.id)) {
          // Update existing product
          setProducts(prev => prev.map(p => p.id === itemData.id ? itemData : p));
        } else {
          // Add new product
          const newProduct = { ...itemData, id: Date.now().toString() };
          setProducts(prev => [...prev, newProduct]);
        }
        break;
      case 'colorMood':
        if (itemData.name && colorMoodsData.find(c => c.name === itemData.name)) {
          // Update existing color mood
          setColorMoodsData(prev => prev.map(c => c.name === itemData.name ? itemData : c));
        } else {
          // Add new color mood
          setColorMoodsData(prev => [...prev, itemData]);
        }
        break;
      case 'flower':
        if (itemData.id && flowersData.find(f => f.id === itemData.id)) {
          // Update existing flower
          setFlowersData(prev => prev.map(f => f.id === itemData.id ? itemData : f));
        } else {
          // Add new flower
          const newFlower = { ...itemData, id: Date.now().toString() };
          setFlowersData(prev => [...prev, newFlower]);
        }
        break;
      case 'fruit':
        if (itemData.id && fruitsData.find(f => f.id === itemData.id)) {
          // Update existing fruit
          setFruitsData(prev => prev.map(f => f.id === itemData.id ? itemData : f));
        } else {
          // Add new fruit
          const newFruit = { ...itemData, id: Date.now().toString() };
          setFruitsData(prev => [...prev, newFruit]);
        }
        break;
      case 'social':
        setSocialLinks(itemData);
        break;
      case 'review':
        if (itemData.id && reviews.find(r => r.id === itemData.id)) {
          // Update existing review
          setReviews(prev => prev.map(r => r.id === itemData.id ? itemData : r));
        } else {
          // Add new review
          const newReview = { ...itemData, id: Date.now().toString(), createdAt: new Date().toISOString() };
          setReviews(prev => [...prev, newReview]);
        }
        break;
      case 'video':
        if (itemData.id && videos.find(v => v.id === itemData.id)) {
          // Update existing video
          setVideos(prev => prev.map(v => v.id === itemData.id ? itemData : v));
        } else {
          // Add new video
          const newVideo = { ...itemData, id: Date.now().toString(), createdAt: new Date().toISOString() };
          setVideos(prev => [...prev, newVideo]);
        }
        break;
    }
    
    setEditingItem(null);
    setShowAddModal(false);
  };

  const handleDelete = (id: string, type: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      switch (type) {
        case 'product':
          setProducts(prev => prev.filter(p => p.id !== id));
          break;
        case 'colorMood':
          setColorMoodsData(prev => prev.filter(c => c.name !== id));
          break;
        case 'flower':
          setFlowersData(prev => prev.filter(f => f.id !== id));
          break;
        case 'fruit':
          setFruitsData(prev => prev.filter(f => f.id !== id));
          break;
        case 'review':
          setReviews(prev => prev.filter(r => r.id !== id));
          break;
        case 'video':
          setVideos(prev => prev.filter(v => v.id !== id));
          break;
      }
    }
  };

  const handleDelist = (id: string, type: string) => {
    if (window.confirm('Are you sure you want to delist this product? It will no longer be available for purchase but will remain in the system.')) {
      switch (type) {
        case 'product':
          setProducts(prev => prev.map(p => 
            p.id === id ? { ...p, isDelisted: true } : p
          ));
          break;
      }
    }
  };

  const handleRelist = (id: string, type: string) => {
    if (window.confirm('Are you sure you want to relist this product? It will become available for purchase again.')) {
      switch (type) {
        case 'product':
          setProducts(prev => prev.map(p => 
            p.id === id ? { ...p, isDelisted: false } : p
          ));
          break;
      }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        // Separate active and delisted products
        const activeProducts = products.filter(p => !p.isDelisted);
        const delistedProducts = products.filter(p => p.isDelisted);
        
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-display text-neutral-charcoal">Product Management</h3>
              <Button onClick={() => {
                setEditingItem({ _type: 'product', images: [], tags: [] });
                setShowAddModal(true);
              }} icon={Plus}>
                Add Product
              </Button>
            </div>
            
            {/* Active Products */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-neutral-charcoal">Active Products ({activeProducts.length})</h4>
              <div className="grid gap-4">
                {activeProducts.map((product) => (
                  <div key={product.id} className="bg-white p-6 rounded-xl border border-neutral-ash/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="font-medium text-neutral-charcoal">{product.title}</h4>
                          <p className="text-sm text-neutral-ash">{product.description}</p>
                          <p className="text-sm font-medium text-primary-peach-coral">RM{product.price}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(product, 'product')}
                          icon={Edit}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelist(product.id, 'product')}
                          className="text-amber-600 hover:text-amber-700"
                        >
                          Delist
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delisted Products */}
            {delistedProducts.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-neutral-charcoal">Delisted Products ({delistedProducts.length})</h4>
                <div className="grid gap-4">
                  {delistedProducts.map((product) => (
                    <div key={product.id} className="bg-white p-6 rounded-xl border border-amber-200 bg-amber-50/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="w-16 h-16 object-cover rounded-lg opacity-60"
                            />
                            <div className="absolute inset-0 bg-amber-500/20 rounded-lg"></div>
                          </div>
                          <div>
                            <h4 className="font-medium text-neutral-charcoal">{product.title}</h4>
                            <p className="text-sm text-neutral-ash">{product.description}</p>
                            <p className="text-sm font-medium text-primary-peach-coral">RM{product.price}</p>
                            <span className="inline-block mt-1 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                              Delisted
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(product, 'product')}
                            icon={Edit}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRelist(product.id, 'product')}
                            className="text-green-600 hover:text-green-700"
                          >
                            Relist
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'colors':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-display text-neutral-charcoal">Color Theme Management</h3>
              <Button onClick={() => {
                setEditingItem({ _type: 'colorMood', colors: ['#ffffff'] });
                setShowAddModal(true);
              }} icon={Plus}>
                Add Color Theme
              </Button>
            </div>
            
            <div className="grid gap-4">
              {colorMoodsData.map((mood) => (
                <div key={mood.name} className="bg-white p-6 rounded-xl border border-neutral-ash/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex space-x-2">
                        {mood.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 rounded-full border border-white shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-charcoal">{mood.name}</h4>
                        <p className="text-sm text-neutral-ash">{mood.mood}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(mood, 'colorMood')}
                        icon={Edit}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(mood.name, 'colorMood')}
                        icon={Trash2}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'flowers':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-display text-neutral-charcoal">Flower Management</h3>
              <Button onClick={() => {
                setEditingItem({ _type: 'flower', seasonal: [], allergyTags: [] });
                setShowAddModal(true);
              }} icon={Plus}>
                Add Flower
              </Button>
            </div>
            
            <div className="grid gap-4">
              {flowersData.map((flower) => (
                <div key={flower.id} className="bg-white p-6 rounded-xl border border-neutral-ash/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={flower.image}
                        alt={flower.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-medium text-neutral-charcoal">{flower.name}</h4>
                        <p className="text-sm text-neutral-ash">
                          Seasonal: {flower.seasonal.map(m => m.toString()).join(', ')}
                        </p>
                        {flower.allergyTags && (
                          <p className="text-sm text-red-600">
                            Allergy Tags: {flower.allergyTags.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(flower, 'flower')}
                        icon={Edit}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(flower.id, 'flower')}
                        icon={Trash2}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'fruits':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-display text-neutral-charcoal">Fruit Management</h3>
              <Button onClick={() => {
                setEditingItem({ _type: 'fruit', seasonal: [], unitPrice: 15 });
                setShowAddModal(true);
              }} icon={Plus}>
                Add Fruit
              </Button>
            </div>
            
            <div className="grid gap-4">
              {fruitsData.map((fruit) => (
                <div key={fruit.id} className="bg-white p-6 rounded-xl border border-neutral-ash/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={fruit.image}
                        alt={fruit.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-medium text-neutral-charcoal">{fruit.name}</h4>
                        <p className="text-sm text-neutral-ash">
                          Seasonal: {fruit.seasonal.map(m => m.toString()).join(', ')}
                        </p>
                        <p className="text-sm font-medium text-primary-orange">+RM15 each</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(fruit, 'fruit')}
                        icon={Edit}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(fruit.id, 'fruit')}
                        icon={Trash2}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-display text-neutral-charcoal">Customer Reviews</h3>
              <Button onClick={() => {
                setEditingItem({ _type: 'review', rating: 5, isApproved: false });
                setShowAddModal(true);
              }} icon={Plus}>
                Add Review
              </Button>
            </div>
            
            <div className="grid gap-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-xl border border-neutral-ash/20">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          review.isApproved 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {review.isApproved ? 'Approved' : 'Pending'}
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <h4 className="font-medium text-neutral-charcoal">{review.customerName}</h4>
                        <p className="text-sm text-neutral-ash">{review.customerEmail}</p>
                        <p className="text-xs text-neutral-ash">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <p className="text-neutral-charcoal mb-3">{review.comment}</p>
                      
                      <div className="text-sm text-neutral-ash">
                        <span className="font-medium">Product ID:</span> {review.productId}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(review, 'review')}
                        icon={Edit}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setReviews(prev => prev.map(r => 
                            r.id === review.id 
                              ? { ...r, isApproved: !r.isApproved }
                              : r
                          ));
                        }}
                        className={review.isApproved ? 'text-yellow-600' : 'text-green-600'}
                      >
                        {review.isApproved ? 'Unapprove' : 'Approve'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(review.id, 'review')}
                        icon={Trash2}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'videos':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-display text-neutral-charcoal">Behind the Scenes Videos</h3>
              <Button onClick={() => {
                setEditingItem({ _type: 'video', isActive: true });
                setShowAddModal(true);
              }} icon={Plus}>
                Add Video
              </Button>
            </div>
            
            <div className="grid gap-6">
              {videos.map((video) => (
                <div key={video.id} className="bg-white p-6 rounded-xl border border-neutral-ash/20">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Video Thumbnail */}
                    <div className="lg:w-64 flex-shrink-0">
                      <div className="relative">
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/50 rounded-full p-3">
                            <Video className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        {video.videoUrl.startsWith('data:') && (
                          <div className="absolute bottom-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                            Uploaded
                          </div>
                        )}
                        <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                          video.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {video.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-neutral-charcoal text-lg mb-2">{video.title}</h4>
                          <p className="text-neutral-ash mb-3">{video.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-neutral-charcoal mb-1">Video File</p>
                          <p className="text-neutral-ash">
                            {video.videoUrl.startsWith('data:') ? 'Uploaded video file' : 'External video'}
                          </p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-neutral-charcoal mb-1">Instagram Post</p>
                          {video.instagramPostUrl ? (
                            <a 
                              href={video.instagramPostUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-orange hover:text-primary-coral break-all"
                            >
                              {video.instagramPostUrl}
                            </a>
                          ) : (
                            <span className="text-neutral-ash">No Instagram link</span>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-neutral-ash">
                        Created: {new Date(video.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2 lg:min-w-[150px]">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(video, 'video')}
                        icon={Edit}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setVideos(prev => prev.map(v => 
                            v.id === video.id 
                              ? { ...v, isActive: !v.isActive }
                              : v
                          ));
                        }}
                        className={video.isActive ? 'text-yellow-600' : 'text-green-600'}
                      >
                        {video.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(video.id, 'video')}
                        icon={Trash2}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-display text-neutral-charcoal">Social Media Links</h3>
              <Button onClick={() => handleEdit(socialLinks, 'social')} icon={Edit}>
                Edit Links
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-neutral-ash/20">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-neutral-charcoal">Instagram</h4>
                    <p className="text-sm text-neutral-ash">{socialLinks.instagram}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit({ ...socialLinks, _type: 'social' }, 'social')}
                    icon={Edit}
                  >
                    Edit
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-neutral-charcoal">Facebook</h4>
                    <p className="text-sm text-neutral-ash">{socialLinks.facebook}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit({ ...socialLinks, _type: 'social' }, 'social')}
                    icon={Edit}
                  >
                    Edit
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-neutral-charcoal">WhatsApp</h4>
                    <p className="text-sm text-neutral-ash">{socialLinks.whatsapp}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit({ ...socialLinks, _type: 'social' }, 'social')}
                    icon={Edit}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Check if user is admin
  if (!auth.isAuthenticated || auth.user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-neutral-off-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display text-neutral-charcoal mb-4">Access Denied</h1>
          <p className="text-neutral-ash mb-6">You need admin privileges to access this page.</p>
          <Button onClick={onBackToHome}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-off-white">
      {/* Header */}
      <div className="bg-white border-b border-neutral-ash/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-display text-neutral-charcoal">Admin Settings</h1>
              <p className="text-neutral-ash">Manage your Fruit Basket Malaysia content</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-neutral-charcoal">{auth.user?.name}</p>
                <p className="text-xs text-neutral-ash">Administrator</p>
              </div>
              {onNavigateToOrders && (
                <Button variant="outline" onClick={onNavigateToOrders} icon={Package}>
                  Order Tracking
                </Button>
              )}
              <Button variant="outline" onClick={onBackToHome}>
                Back to Site
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-neutral-ash/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-orange text-primary-orange'
                      : 'border-transparent text-neutral-ash hover:text-neutral-charcoal'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-7xl py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>

      {/* Edit/Add Modal */}
      <EditItemModal
        isOpen={!!editingItem || showAddModal}
        onClose={() => {
          setEditingItem(null);
          setShowAddModal(false);
        }}
        onSave={handleSave}
        item={editingItem}
        type={editingItem?._type || (showAddModal ? activeTab as any : 'product')}
      />
    </div>
  );
};

export default AdminDashboard;
