import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Upload, Plus, Trash2 } from 'lucide-react';
import Button from '../UI/Button';

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: any) => void;
  item: any;
  type: 'product' | 'colorMood' | 'flower' | 'fruit' | 'social' | 'review' | 'video';
}

const EditItemModal: React.FC<EditItemModalProps> = ({ isOpen, onClose, onSave, item, type }) => {
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({ ...item });
    }
  }, [item]);

  const validateForm = () => {
    const newErrors: any = {};

    switch (type) {
      case 'product':
        if (!formData.title) newErrors.title = 'Title is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.price || formData.price <= 0) newErrors.price = 'Price must be greater than 0';
        if (!formData.category) newErrors.category = 'Category is required';
        break;
      case 'colorMood':
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.mood) newErrors.mood = 'Mood description is required';
        if (!formData.colors || formData.colors.length === 0) newErrors.colors = 'At least one color is required';
        break;
      case 'flower':
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.seasonal || formData.seasonal.length === 0) newErrors.seasonal = 'Seasonal months are required';
        break;
      case 'fruit':
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.seasonal || formData.seasonal.length === 0) newErrors.seasonal = 'Seasonal months are required';
        break;
      case 'social':
        if (!formData.instagram) newErrors.instagram = 'Instagram link is required';
        if (!formData.facebook) newErrors.facebook = 'Facebook link is required';
        if (!formData.whatsapp) newErrors.whatsapp = 'WhatsApp number is required';
        break;
      case 'review':
        if (!formData.customerName) newErrors.customerName = 'Customer name is required';
        if (!formData.customerEmail) newErrors.customerEmail = 'Customer email is required';
        if (!formData.rating || formData.rating < 1 || formData.rating > 5) newErrors.rating = 'Rating must be between 1 and 5';
        if (!formData.comment) newErrors.comment = 'Comment is required';
        if (!formData.productId) newErrors.productId = 'Product ID is required';
        break;
      case 'video':
        if (!formData.title) newErrors.title = 'Video title is required';
        if (!formData.description) newErrors.description = 'Video description is required';
        if (!formData.videoUrl) newErrors.videoUrl = 'Video URL is required';
        if (!formData.thumbnailUrl) newErrors.thumbnailUrl = 'Thumbnail URL is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: any) => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    const newFiles: File[] = [];
    const newImageUrls: string[] = [];

    // Convert files to data URLs for preview
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file. Please select only image files.`);
        continue;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large. Please select images smaller than 5MB.`);
        continue;
      }

      newFiles.push(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newImageUrls.push(e.target.result as string);
          setFormData((prev: any) => ({
            ...prev,
            images: [...(prev.images || []), e.target?.result as string]
          }));
        }
      };
      reader.readAsDataURL(file);
    }

    setUploadedFiles((prev) => [...prev, ...newFiles]);
    setUploading(false);
  };

  const removeImage = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      images: prev.images.filter((_: any, i: number) => i !== index)
    }));
    
    // Also remove from uploaded files if it's a new upload
    if (index >= (formData.images?.length || 0) - uploadedFiles.length) {
      setUploadedFiles((prev) => prev.filter((_, i) => i !== (index - (formData.images?.length || 0) + uploadedFiles.length)));
    }
  };

  const addColor = () => {
    setFormData((prev: any) => ({
      ...prev,
      colors: [...(prev.colors || []), '#ffffff']
    }));
  };

  const removeColor = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      colors: prev.colors.filter((_: any, i: number) => i !== index)
    }));
  };

  const toggleSeasonalMonth = (month: number) => {
    const seasonal = formData.seasonal || [];
    const newSeasonal = seasonal.includes(month)
      ? seasonal.filter((m: number) => m !== month)
      : [...seasonal, month];
    
    handleInputChange('seasonal', newSeasonal);
  };

  const renderProductForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Title *</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className={`w-full p-3 border rounded-lg focus:outline-none ${
            errors.title ? 'border-red-500' : 'border-neutral-ash/20 focus:border-primary-orange'
          }`}
          placeholder="Product title"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Description *</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className={`w-full p-3 border rounded-lg focus:outline-none ${
            errors.description ? 'border-red-500' : 'border-neutral-ash/20 focus:border-primary-orange'
          }`}
          rows={3}
          placeholder="Product description"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-charcoal mb-2">Price (RM) *</label>
          <input
            type="number"
            value={formData.price || ''}
            onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
            className={`w-full p-3 border rounded-lg focus:outline-none ${
              errors.price ? 'border-red-500' : 'border-neutral-ash/20 focus:border-primary-orange'
            }`}
            placeholder="0.00"
            min="0"
            step="0.01"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-charcoal mb-2">Category *</label>
          <select
            value={formData.category || ''}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none ${
              errors.category ? 'border-red-500' : 'border-neutral-ash/20 focus:border-primary-orange'
            }`}
          >
            <option value="">Select category</option>
            <option value="For Her">For Her</option>
            <option value="For Him">For Him</option>
            <option value="Corporate">Corporate</option>
            <option value="Premium">Premium</option>
            <option value="Seasonal">Seasonal</option>
            <option value="Luxury">Luxury</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Product Images</label>
        
        {/* File Upload Area */}
        <div className="mb-4">
          <div 
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragOver 
                ? 'border-primary-peach-coral bg-primary-peach-coral/5' 
                : 'border-neutral-ash/30 hover:border-primary-peach-coral/50'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragOver(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFileUpload(e.dataTransfer.files);
            }}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
              id="image-upload"
              disabled={uploading}
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <div className="p-3 bg-neutral-soft-blush rounded-full">
                <Upload className="w-6 h-6 text-primary-orange" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-charcoal">
                  {uploading ? 'Uploading...' : dragOver ? 'Drop images here' : 'Click to upload images'}
                </p>
                <p className="text-xs text-neutral-ash">
                  PNG, JPG, JPEG up to 5MB each • Drag & drop supported
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Image Previews */}
        {(formData.images || []).length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {formData.images.map((image: string, index: number) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border border-neutral-ash/20"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  Image {index + 1}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Tags</label>
        <input
          type="text"
          value={(formData.tags || []).join(', ')}
          onChange={(e) => handleInputChange('tags', e.target.value.split(',').map((tag: string) => tag.trim()))}
          className="w-full p-3 border border-neutral-ash/20 rounded-lg focus:border-primary-orange focus:outline-none"
          placeholder="bestseller, romantic, warm-tones"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isExpress"
          checked={formData.isExpress || false}
          onChange={(e) => handleInputChange('isExpress', e.target.checked)}
          className="rounded border-neutral-ash/20"
        />
        <label htmlFor="isExpress" className="text-sm text-neutral-charcoal">
          Express Delivery Available
        </label>
      </div>
    </div>
  );

  const renderColorMoodForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Name *</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={`w-full p-3 border rounded-lg focus:outline-none ${
            errors.name ? 'border-red-500' : 'border-neutral-ash/20 focus:border-primary-orange'
          }`}
          placeholder="Color mood name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Mood Description *</label>
        <input
          type="text"
          value={formData.mood || ''}
          onChange={(e) => handleInputChange('mood', e.target.value)}
          className={`w-full p-3 border rounded-lg focus:outline-none ${
            errors.mood ? 'border-red-500' : 'border-neutral-ash/20 focus:border-primary-orange'
          }`}
          placeholder="Gentle and romantic"
        />
        {errors.mood && <p className="text-red-500 text-sm mt-1">{errors.mood}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Colors *</label>
        <div className="space-y-2">
          {(formData.colors || []).map((color: string, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="color"
                value={color}
                onChange={(e) => {
                  const newColors = [...formData.colors];
                  newColors[index] = e.target.value;
                  handleInputChange('colors', newColors);
                }}
                className="w-12 h-10 border border-neutral-ash/20 rounded-lg"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => {
                  const newColors = [...formData.colors];
                  newColors[index] = e.target.value;
                  handleInputChange('colors', newColors);
                }}
                className="flex-1 p-3 border border-neutral-ash/20 rounded-lg focus:border-primary-orange focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeColor(index)}
                className="p-2 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addColor}
            className="flex items-center space-x-2 text-primary-orange hover:text-primary-coral"
          >
            <Plus className="w-4 h-4" />
            <span>Add Color</span>
          </button>
        </div>
        {errors.colors && <p className="text-red-500 text-sm mt-1">{errors.colors}</p>}
      </div>
    </div>
  );

  const renderFlowerForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Name *</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={`w-full p-3 border rounded-lg focus:outline-none ${
            errors.name ? 'border-red-500' : 'border-neutral-ash/20 focus:border-primary-orange'
          }`}
          placeholder="Flower name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Flower Image</label>
        
        {/* File Upload Area */}
        <div className="mb-4">
          <div className="border-2 border-dashed border-neutral-ash/30 rounded-lg p-4 text-center hover:border-primary-orange/50 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  if (!file.type.startsWith('image/')) {
                    alert('Please select an image file.');
                    return;
                  }
                  if (file.size > 5 * 1024 * 1024) {
                    alert('Image is too large. Please select an image smaller than 5MB.');
                    return;
                  }
                  
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    if (event.target?.result) {
                      handleInputChange('image', event.target.result as string);
                    }
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
              id="flower-image-upload"
            />
            <label
              htmlFor="flower-image-upload"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <div className="p-2 bg-neutral-soft-blush rounded-full">
                <Upload className="w-5 h-5 text-primary-orange" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-charcoal">
                  Upload flower image
                </p>
                <p className="text-xs text-neutral-ash">
                  PNG, JPG, JPEG up to 5MB
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Image Preview */}
        {formData.image && (
          <div className="relative group">
            <img
              src={formData.image}
              alt="Flower preview"
              className="w-full h-32 object-cover rounded-lg border border-neutral-ash/20"
            />
            <button
              type="button"
              onClick={() => handleInputChange('image', '')}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Seasonal Months *</label>
        <div className="grid grid-cols-6 gap-2">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
            <button
              key={index}
              type="button"
              onClick={() => toggleSeasonalMonth(index + 1)}
              className={`p-2 text-sm rounded-lg border transition-colors ${
                formData.seasonal?.includes(index + 1)
                  ? 'bg-primary-peach-coral text-white border-primary-peach-coral'
                  : 'bg-white text-neutral-charcoal border-neutral-ash/20 hover:border-primary-peach-coral'
              }`}
            >
              {month}
            </button>
          ))}
        </div>
        {errors.seasonal && <p className="text-red-500 text-sm mt-1">{errors.seasonal}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Allergy Tags</label>
        <input
          type="text"
          value={(formData.allergyTags || []).join(', ')}
          onChange={(e) => handleInputChange('allergyTags', e.target.value.split(',').map((tag: string) => tag.trim()))}
          className="w-full p-3 border border-neutral-ash/20 rounded-lg focus:border-primary-orange focus:outline-none"
          placeholder="pollen-sensitive, fragrance-sensitive"
        />
      </div>
    </div>
  );

  const renderFruitForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Name *</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={`w-full p-3 border rounded-lg focus:outline-none ${
            errors.name ? 'border-red-500' : 'border-neutral-ash/20 focus:border-primary-orange'
          }`}
          placeholder="Fruit name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Fruit Image</label>
        
        {/* File Upload Area */}
        <div className="mb-4">
          <div className="border-2 border-dashed border-neutral-ash/30 rounded-lg p-4 text-center hover:border-primary-orange/50 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  if (!file.type.startsWith('image/')) {
                    alert('Please select an image file.');
                    return;
                  }
                  if (file.size > 5 * 1024 * 1024) {
                    alert('Image is too large. Please select an image smaller than 5MB.');
                    return;
                  }
                  
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    if (event.target?.result) {
                      handleInputChange('image', event.target.result as string);
                    }
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
              id="fruit-image-upload"
            />
            <label
              htmlFor="fruit-image-upload"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <div className="p-2 bg-neutral-soft-blush rounded-full">
                <Upload className="w-5 h-5 text-primary-orange" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-charcoal">
                  Upload fruit image
                </p>
                <p className="text-xs text-neutral-ash">
                  PNG, JPG, JPEG up to 5MB
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Image Preview */}
        {formData.image && (
          <div className="relative group">
            <img
              src={formData.image}
              alt="Fruit preview"
              className="w-full h-32 object-cover rounded-lg border border-neutral-ash/20"
            />
            <button
              type="button"
              onClick={() => handleInputChange('image', '')}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Seasonal Months *</label>
        <div className="grid grid-cols-6 gap-2">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
            <button
              key={index}
              type="button"
              onClick={() => toggleSeasonalMonth(index + 1)}
              className={`p-2 text-sm rounded-lg border transition-colors ${
                formData.seasonal?.includes(index + 1)
                  ? 'bg-primary-peach-coral text-white border-primary-peach-coral'
                  : 'bg-white text-neutral-charcoal border-neutral-ash/20 hover:border-primary-peach-coral'
              }`}
            >
              {month}
            </button>
          ))}
        </div>
        {errors.seasonal && <p className="text-red-500 text-sm mt-1">{errors.seasonal}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Price per Unit (RM)</label>
        <input
          type="number"
          value={formData.unitPrice || 15}
          onChange={(e) => handleInputChange('unitPrice', parseFloat(e.target.value))}
          className="w-full p-3 border border-neutral-ash/20 rounded-lg focus:border-primary-orange focus:outline-none"
          placeholder="15.00"
          min="0"
          step="0.01"
        />
      </div>
    </div>
  );

  const renderSocialForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Instagram URL *</label>
        <input
          type="url"
          value={formData.instagram || ''}
          onChange={(e) => handleInputChange('instagram', e.target.value)}
          className={`w-full p-3 border rounded-lg focus:outline-none ${
            errors.instagram ? 'border-red-500' : 'border-neutral-ash/20 focus:border-primary-orange'
          }`}
          placeholder="https://instagram.com/fruitbasketmalaysia"
        />
        {errors.instagram && <p className="text-red-500 text-sm mt-1">{errors.instagram}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Facebook URL *</label>
        <input
          type="url"
          value={formData.facebook || ''}
          onChange={(e) => handleInputChange('facebook', e.target.value)}
          className={`w-full p-3 border rounded-lg focus:outline-none ${
            errors.facebook ? 'border-red-500' : 'border-neutral-ash/20 focus:border-primary-orange'
          }`}
          placeholder="https://facebook.com/fruitbasketmalaysia"
        />
        {errors.facebook && <p className="text-red-500 text-sm mt-1">{errors.facebook}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">WhatsApp Number *</label>
        <input
          type="text"
          value={formData.whatsapp || ''}
          onChange={(e) => handleInputChange('whatsapp', e.target.value)}
          className={`w-full p-3 border rounded-lg focus:outline-none ${
            errors.whatsapp ? 'border-red-500' : 'border-neutral-ash/20 focus:border-primary-orange'
          }`}
          placeholder="+60123456789"
        />
        {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>}
      </div>
    </div>
  );

  const renderReviewForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-charcoal mb-2">Customer Name *</label>
          <input
            type="text"
            value={formData.customerName || ''}
            onChange={(e) => handleInputChange('customerName', e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none ${
              errors.customerName ? 'border-red-500' : 'border-neutral-ash/20 focus:border-primary-orange'
            }`}
            placeholder="Customer name"
          />
          {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-charcoal mb-2">Customer Email *</label>
          <input
            type="email"
            value={formData.customerEmail || ''}
            onChange={(e) => handleInputChange('customerEmail', e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none ${
              errors.customerEmail ? 'border-red-500' : 'border-neutral-ash/20 focus:border-primary-orange'
            }`}
            placeholder="customer@example.com"
          />
          {errors.customerEmail && <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Product ID *</label>
        <input
          type="text"
          value={formData.productId || ''}
          onChange={(e) => handleInputChange('productId', e.target.value)}
          className={`w-full p-3 border rounded-lg focus:outline-none ${
            errors.productId ? 'border-red-500' : 'border-neutral-ash/20 focus:border-primary-orange'
          }`}
          placeholder="Product ID"
        />
        {errors.productId && <p className="text-red-500 text-sm mt-1">{errors.productId}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Rating *</label>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleInputChange('rating', star)}
              className={`text-2xl ${
                star <= (formData.rating || 0)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              } hover:text-yellow-400 transition-colors`}
            >
              ★
            </button>
          ))}
          <span className="ml-2 text-sm text-neutral-ash">
            {formData.rating || 0} out of 5 stars
          </span>
        </div>
        {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Comment *</label>
        <textarea
          value={formData.comment || ''}
          onChange={(e) => handleInputChange('comment', e.target.value)}
          className={`w-full p-3 border rounded-lg focus:outline-none ${
            errors.comment ? 'border-red-500' : 'border-neutral-ash/20 focus:border-primary-orange'
          }`}
          rows={4}
          placeholder="Customer's review comment..."
        />
        {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment}</p>}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isApproved"
          checked={formData.isApproved || false}
          onChange={(e) => handleInputChange('isApproved', e.target.checked)}
          className="rounded border-neutral-ash/20"
        />
        <label htmlFor="isApproved" className="text-sm text-neutral-charcoal">
          Approved (visible to customers)
        </label>
      </div>
    </div>
  );

  const renderVideoForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Video Title *</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className={`w-full p-3 border rounded-lg focus:outline-none ${
            errors.title ? 'border-red-500' : 'border-neutral-ash/20 focus:border-primary-orange'
          }`}
          placeholder="Behind the Scenes: Creating the Perfect Arrangement"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Video Description *</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className={`w-full p-3 border rounded-lg focus:outline-none ${
            errors.description ? 'border-red-500' : 'border-neutral-ash/20 focus:border-primary-orange'
          }`}
          rows={3}
          placeholder="Describe what viewers will see in this video..."
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Video File *</label>
        
        {/* Video Upload Area */}
        <div className="mb-4">
          <div className="border-2 border-dashed border-neutral-ash/30 rounded-lg p-6 text-center hover:border-primary-orange/50 transition-colors">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  if (!file.type.startsWith('video/')) {
                    alert('Please select a video file.');
                    return;
                  }
                  if (file.size > 100 * 1024 * 1024) { // 100MB limit
                    alert('Video is too large. Please select a video smaller than 100MB.');
                    return;
                  }
                  
                  // Create a preview URL for the video
                  const videoURL = URL.createObjectURL(file);
                  handleInputChange('videoUrl', videoURL);
                  handleInputChange('videoFile', file);
                }
              }}
              className="hidden"
              id="video-upload"
            />
            <label
              htmlFor="video-upload"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <div className="p-3 bg-neutral-soft-blush rounded-full">
                <Upload className="w-6 h-6 text-primary-orange" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-charcoal">
                  Upload video file
                </p>
                <p className="text-xs text-neutral-ash">
                  MP4, MOV, AVI up to 100MB
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Video Preview */}
        {formData.videoUrl && (
          <div className="relative group">
            <video
              src={formData.videoUrl}
              controls
              className="w-full h-48 object-cover rounded-lg border border-neutral-ash/20"
            />
            <button
              type="button"
              onClick={() => {
                handleInputChange('videoUrl', '');
                handleInputChange('videoFile', null);
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        )}
        {errors.videoUrl && <p className="text-red-500 text-sm mt-1">{errors.videoUrl}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Thumbnail Image *</label>
        
        {/* Thumbnail Upload Area */}
        <div className="mb-4">
          <div className="border-2 border-dashed border-neutral-ash/30 rounded-lg p-4 text-center hover:border-primary-orange/50 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  if (!file.type.startsWith('image/')) {
                    alert('Please select an image file.');
                    return;
                  }
                  if (file.size > 5 * 1024 * 1024) {
                    alert('Image is too large. Please select an image smaller than 5MB.');
                    return;
                  }
                  
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    if (event.target?.result) {
                      handleInputChange('thumbnailUrl', event.target.result as string);
                    }
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
              id="thumbnail-upload"
            />
            <label
              htmlFor="thumbnail-upload"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <div className="p-2 bg-neutral-soft-blush rounded-full">
                <Upload className="w-5 h-5 text-primary-orange" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-charcoal">
                  Upload thumbnail
                </p>
                <p className="text-xs text-neutral-ash">
                  PNG, JPG, JPEG up to 5MB
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Thumbnail Preview */}
        {formData.thumbnailUrl && (
          <div className="relative group">
            <img
              src={formData.thumbnailUrl}
              alt="Thumbnail preview"
              className="w-full h-32 object-cover rounded-lg border border-neutral-ash/20"
            />
            <button
              type="button"
              onClick={() => handleInputChange('thumbnailUrl', '')}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        )}
        {errors.thumbnailUrl && <p className="text-red-500 text-sm mt-1">{errors.thumbnailUrl}</p>}
        <p className="text-xs text-neutral-ash mt-1">
          Image that will be shown as the video preview
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-charcoal mb-2">Instagram Post URL (Optional)</label>
        <input
          type="url"
          value={formData.instagramPostUrl || ''}
          onChange={(e) => handleInputChange('instagramPostUrl', e.target.value)}
          className="w-full p-3 border border-neutral-ash/20 rounded-lg focus:border-primary-orange focus:outline-none"
          placeholder="https://instagram.com/p/example"
        />
        <p className="text-xs text-neutral-ash mt-1">
          Link to the Instagram post related to this video
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isActive"
          checked={formData.isActive || false}
          onChange={(e) => handleInputChange('isActive', e.target.checked)}
          className="rounded border-neutral-ash/20"
        />
        <label htmlFor="isActive" className="text-sm text-neutral-charcoal">
          Active (visible to customers)
        </label>
      </div>
    </div>
  );

  const renderForm = () => {
    switch (type) {
      case 'product': return renderProductForm();
      case 'colorMood': return renderColorMoodForm();
      case 'flower': return renderFlowerForm();
      case 'fruit': return renderFruitForm();
      case 'social': return renderSocialForm();
      case 'review': return renderReviewForm();
      case 'video': return renderVideoForm();
      default: return null;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'product': return item?.id ? 'Edit Product' : 'Add Product';
      case 'colorMood': return item?.name ? 'Edit Color Theme' : 'Add Color Theme';
      case 'flower': return item?.id ? 'Edit Flower' : 'Add Flower';
      case 'fruit': return item?.id ? 'Edit Fruit' : 'Add Fruit';
      case 'social': return 'Edit Social Links';
      case 'review': return item?.id ? 'Edit Review' : 'Add Review';
      case 'video': return item?.id ? 'Edit Video' : 'Add Video';
      default: return 'Edit Item';
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-ash/20">
            <h2 className="text-xl font-display text-neutral-charcoal">{getTitle()}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-soft-blush rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 p-6 overflow-y-auto">
            {renderForm()}
          </form>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-4 p-6 border-t border-neutral-ash/20">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} icon={Save}>
              Save Changes
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditItemModal;
