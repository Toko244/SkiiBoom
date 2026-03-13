'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { submitGalleryPhoto } from '@/services/galleryService';

interface PhotoSubmissionFormProps {
  onClose: () => void;
  pageContent?: Record<string, unknown> | null;
}

const PhotoSubmissionForm = ({ onClose, pageContent }: PhotoSubmissionFormProps) => {
  const submission = (pageContent?.submission as Record<string, string>) || {};
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    category: 'skiing',
    season: 'winter',
    description: '',
    file: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const categories = [
    { id: 'skiing', label: 'Skiing' },
    { id: 'equipment', label: 'Equipment' },
    { id: 'lessons', label: 'Lessons' },
    { id: 'slopes', label: 'Slopes' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitGalleryPhoto({
        title: formData.title,
        description: formData.description || undefined,
        image: formData.file,
        category: formData.category,
        season: formData.season,
        author_name: formData.name || undefined,
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit photo. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-card rounded-lg shadow-elevated overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-outfit font-bold text-foreground text-2xl">
            {submission.title || 'Submit Your Photo'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors duration-300"
          >
            <Icon name="XMarkIcon" size={24} variant="outline" />
          </button>
        </div>

        {/* Form */}
        {!submitSuccess ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {submitError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                {submitError}
              </div>
            )}

            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-inter font-medium text-foreground text-sm mb-2 block">
                  {submission.name_label || 'Your Name'} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-background border border-input rounded-md font-inter text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="font-inter font-medium text-foreground text-sm mb-2 block">
                  {submission.email_label || 'Email Address'} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-background border border-input rounded-md font-inter text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Title & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-inter font-medium text-foreground text-sm mb-2 block">
                  {submission.title_label || 'Photo Title'} *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-background border border-input rounded-md font-inter text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300"
                  placeholder="Perfect powder day"
                />
              </div>
              <div>
                <label className="font-inter font-medium text-foreground text-sm mb-2 block">
                  {submission.category_label || 'Category'} *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-background border border-input rounded-md font-inter text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="font-inter font-medium text-foreground text-sm mb-2 block">
                {submission.description_label || 'Description'}
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 bg-background border border-input rounded-md font-inter text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300 resize-none"
                placeholder="Tell us about this moment..."
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="font-inter font-medium text-foreground text-sm mb-2 block">
                {submission.upload_label || 'Upload Photo'} *
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleFileChange}
                  required
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="flex items-center justify-center w-full px-4 py-8 bg-muted border-2 border-dashed border-border rounded-md cursor-pointer hover:bg-primary/10 hover:border-primary transition-all duration-300"
                >
                  <div className="text-center">
                    <Icon name="CloudArrowUpIcon" size={48} variant="outline" className="mx-auto mb-2 text-muted-foreground" />
                    <p className="font-inter font-medium text-foreground text-sm mb-1">
                      {formData.file ? formData.file.name : (submission.upload_hint || 'Click to upload or drag and drop')}
                    </p>
                    <p className="font-inter text-muted-foreground text-xs">
                      {submission.upload_size || 'JPEG, PNG, WebP up to 10MB'}
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-muted text-foreground rounded-md font-inter font-medium text-sm hover:bg-muted/80 transition-all duration-300"
              >
                {submission.cancel_button || 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-conversionAccent text-white rounded-md font-outfit font-semibold text-sm hover:bg-ctaHover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Icon name="ArrowPathIcon" size={16} variant="outline" className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>{submission.submit_button || 'Submit Photo'}</span>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckIcon" size={32} variant="outline" className="text-success-foreground" />
            </div>
            <h3 className="font-outfit font-bold text-foreground text-xl mb-2">
              {submission.success_title || 'Photo Submitted Successfully!'}
            </h3>
            <p className="font-inter text-muted-foreground text-sm">
              {submission.success_message || "Thank you for sharing your Gudauri experience. We'll review your photo and add it to our gallery soon."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoSubmissionForm;
