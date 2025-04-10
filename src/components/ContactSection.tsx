import React, { useState } from 'react';
import useLanguage from '../hooks/useLanguage';
import { useInView } from 'react-intersection-observer';

interface FormData {
  name: string;
  email: string;
  message: string;
  file: File | null;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  file?: string;
}

const ContactSection: React.FC = () => {
  const { pageContent } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    file: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  if (!pageContent) {
    return <div className="py-20"></div>;
  }

  const { title, subtitle, formLabels, successMessage, errorMessage } = pageContent.contact;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (formData.file) {
      const fileExtension = formData.file.name.split('.').pop()?.toLowerCase();
      if (fileExtension !== 'pdf') {
        newErrors.file = 'Only PDF files are allowed';
      } else if (formData.file.size > 5 * 1024 * 1024) {
        newErrors.file = 'File size should be less than 5MB';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({
      ...formData,
      file,
    });

    // Clear file error
    if (errors.file) {
      setErrors({
        ...errors,
        file: undefined,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Successful submission
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        message: '',
        file: null,
      });
      
      // Reset form
      const fileInput = document.getElementById('file') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-700 transform ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className={`max-w-2xl mx-auto transition-all duration-700 transform ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {submitStatus === 'success' ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg text-center">
              <svg 
                className="w-12 h-12 text-green-500 mx-auto mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
              <p>{successMessage}</p>
              <button 
                className="mt-4 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
                onClick={() => setSubmitStatus(null)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-8">
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
                  <p>{errorMessage}</p>
                </div>
              )}
              
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  {formLabels.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  {formLabels.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  {formLabels.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
              
              <div className="mb-8">
                <label htmlFor="file" className="block text-gray-700 font-medium mb-2">
                  {formLabels.file}
                </label>
                <div className="relative border border-dashed border-gray-300 rounded-md p-6 text-center">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center">
                    <svg 
                      className="w-10 h-10 text-gray-400 mb-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                      />
                    </svg>
                    {formData.file ? (
                      <span className="text-primary font-medium">{formData.file.name}</span>
                    ) : (
                      <span className="text-gray-500">Click or drag to upload PDF (Max 5MB)</span>
                    )}
                  </div>
                </div>
                {errors.file && (
                  <p className="text-red-500 text-sm mt-1">{errors.file}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-primary text-white py-3 px-6 rounded-md font-medium text-lg ${
                  isSubmitting 
                    ? 'opacity-70 cursor-not-allowed' 
                    : 'hover:bg-primary-dark transition-colors'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg 
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      ></circle>
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  formLabels.submit
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 