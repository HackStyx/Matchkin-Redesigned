'use client';

import { Header } from '@/components/layout/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { AuroraBackground } from '@/components/ui/aurora-background';
import Link from 'next/link';
import { IconArrowLeft, IconArrowRight, IconUser, IconBuilding, IconMail, IconPhone, IconBriefcase, IconMapPin, IconCoin, IconMessageCircle, IconCheck, IconHome, IconInfoCircle } from '@tabler/icons-react';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

// Define the base schema for all steps
const baseFormSchema = z.object({
  accountType: z.enum(['individual', 'company']),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  companyName: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  
  // Step 2 fields
  industry: z.string().optional(),
  jobTitle: z.string().optional(),
  bio: z.string().optional(),
  
  // Step 3 fields
  location: z.string().optional(),
  hourlyRate: z.string().optional(),
  additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof baseFormSchema>;

// Define validation for step 1
const validateStep1 = (data: FormValues) => {
  const errors: Record<string, string> = {};
  
  if (data.accountType === 'individual') {
    if (!data.firstName || data.firstName.length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }
    if (!data.lastName || data.lastName.length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }
  } else {
    if (!data.companyName || data.companyName.length < 2) {
      errors.companyName = 'Company name must be at least 2 characters';
    }
  }
  
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  return errors;
};

// Define validation for step 2
const validateStep2 = (data: FormValues) => {
  const errors: Record<string, string> = {};
  
  if (!data.industry) {
    errors.industry = 'Please select an industry';
  }
  
  if (!data.jobTitle || data.jobTitle.length < 2) {
    errors.jobTitle = 'Job title must be at least 2 characters';
  }
  
  return errors;
};

// Define validation for step 3 - all fields optional
const validateStep3 = (data: FormValues) => {
  return {}; // All fields are optional in step 3
};

export default function ConsultantOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormValues>>({
    accountType: 'individual',
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  
  // Set up form without Zod resolver
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    watch,
    getValues,
    setValue,
    trigger
  } = useForm<FormValues>({
    defaultValues: formData,
    mode: 'onChange'
  });

  const watchAccountType = watch('accountType');
  
  const validateCurrentStep = () => {
    const currentValues = getValues();
    let errors: Record<string, string> = {};
    
    if (currentStep === 1) {
      errors = validateStep1(currentValues);
    } else if (currentStep === 2) {
      errors = validateStep2(currentValues);
    } else {
      errors = validateStep3(currentValues);
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const goToNextStep = async (e: React.MouseEvent) => {
    // Prevent default to avoid any form submission
    e.preventDefault();
    
    // Validate current step
    const isStepValid = validateCurrentStep();
    if (!isStepValid) return;
    
    // Update form data
    const currentFormValues = getValues();
    setFormData(prev => ({ ...prev, ...currentFormValues }));
    
    // Move to next step
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
      setValidationErrors({});
    }
  };
  
  const goToPreviousStep = (e: React.MouseEvent) => {
    // Prevent default to avoid any form submission
    e.preventDefault();
    
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
      setValidationErrors({});
    }
  };
  
  const onSubmit = (data: FormValues) => {
    // Validate the final step
    const isValid = validateCurrentStep();
    if (!isValid) return;
    
    // In a real application, you would send this data to your API
    console.log('Form submitted:', data);
    
    // Show success popup instead of alert
    setShowSuccessPopup(true);
  };

  const redirectToHome = () => {
    router.push('/');
  };
  
  return (
    <main className="bg-black text-white min-h-screen flex flex-col">
      <Header />
      
      <AuroraBackground className="flex-grow flex items-center justify-center py-12 px-4 pt-20">
        <motion.div 
          className="max-w-2xl w-full mx-auto"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <motion.div className="text-center mb-6" variants={slideUp}>
            <h1 className="text-4xl font-serif mb-4">
              Consultant Onboarding
            </h1>
            
            <p className="text-amber-400 mb-4">
              Step {currentStep} of 3: {
                currentStep === 1 ? 'Basic Information' : 
                currentStep === 2 ? 'Professional Details' : 
                'Service Details'
              }
            </p>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  currentStep === 1 ? 'w-1/3 bg-gradient-to-r from-orange-500 to-amber-500' : 
                  currentStep === 2 ? 'w-2/3 bg-gradient-to-r from-orange-500 to-amber-500' : 
                  'w-full bg-gradient-to-r from-orange-500 to-amber-500'
                }`}
              ></div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-black/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700"
            variants={slideUp}
          >
            {/* Use onSubmit only for the final step */}
            <form 
              onSubmit={currentStep === 3 ? handleSubmit(onSubmit) : (e) => e.preventDefault()} 
              className="space-y-6"
            >
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center text-white mb-2">
                      <IconUser className="w-5 h-5 text-amber-500 mr-2" />
                      Account Type
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          value="individual"
                          {...register('accountType')}
                          className="form-radio text-amber-500 focus:ring-amber-500"
                          defaultChecked={formData.accountType === 'individual'}
                        />
                        <span>Individual Consultant</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          value="company"
                          {...register('accountType')}
                          className="form-radio text-amber-500 focus:ring-amber-500"
                          defaultChecked={formData.accountType === 'company'}
                        />
                        <span>Company / Agency</span>
                      </label>
                    </div>
                    {validationErrors.accountType && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.accountType}</p>
                    )}
                  </div>
                  
                  {watchAccountType === 'individual' ? (
                    <>
                      <div>
                        <label htmlFor="firstName" className="flex items-center text-white mb-2">
                          <IconUser className="w-5 h-5 text-amber-500 mr-2" />
                          First Name
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          placeholder="e.g., John"
                          className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          {...register('firstName')}
                        />
                        {validationErrors.firstName && (
                          <p className="text-red-500 text-sm mt-1">{validationErrors.firstName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="flex items-center text-white mb-2">
                          <IconUser className="w-5 h-5 text-amber-500 mr-2" />
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          placeholder="e.g., Doe"
                          className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          {...register('lastName')}
                        />
                        {validationErrors.lastName && (
                          <p className="text-red-500 text-sm mt-1">{validationErrors.lastName}</p>
                        )}
                      </div>
                    </>
                  ) : (
                    <div>
                      <label htmlFor="companyName" className="flex items-center text-white mb-2">
                        <IconBuilding className="w-5 h-5 text-amber-500 mr-2" />
                        Company Name
                      </label>
                      <input
                        id="companyName"
                        type="text"
                        placeholder="e.g., Innovate Solutions LLC"
                        className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        {...register('companyName')}
                      />
                      {validationErrors.companyName && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.companyName}</p>
                      )}
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="email" className="flex items-center text-white mb-2">
                      <IconMail className="w-5 h-5 text-amber-500 mr-2" />
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      {...register('email')}
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="flex items-center text-white mb-2">
                      <IconPhone className="w-5 h-5 text-amber-500 mr-2" />
                      Phone Number (Optional)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+1 123 456 7890"
                      className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      {...register('phone')}
                    />
                    {validationErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Step 2: Professional Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="industry" className="flex items-center text-white mb-2">
                      <IconBriefcase className="w-5 h-5 text-amber-500 mr-2" />
                      Your Primary Industry
                    </label>
                    <select
                      id="industry"
                      className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      {...register('industry')}
                      defaultValue=""
                    >
                      <option value="" disabled>Select your industry</option>
                      <option value="technology">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                      <option value="retail">Retail</option>
                      <option value="marketing">Marketing</option>
                      <option value="consulting">Consulting</option>
                      <option value="other">Other</option>
                    </select>
                    {validationErrors.industry && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.industry}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="jobTitle" className="flex items-center text-white mb-2">
                      <IconBriefcase className="w-5 h-5 text-amber-500 mr-2" />
                      Your Job Title / Headline
                    </label>
                    <input
                      id="jobTitle"
                      type="text"
                      placeholder="e.g., AI Strategy Consultant"
                      className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      {...register('jobTitle')}
                    />
                    {validationErrors.jobTitle && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.jobTitle}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="flex items-center text-white mb-2">
                      <IconInfoCircle className="w-5 h-5 text-amber-500 mr-2" />
                      Brief Bio / Company Overview (Optional)
                    </label>
                    <textarea
                      id="bio"
                      placeholder="Showcase your expertise or your company's focus..."
                      className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent h-32"
                      {...register('bio')}
                    ></textarea>
                    {validationErrors.bio && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.bio}</p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Step 3: Service Details */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="location" className="flex items-center text-white mb-2">
                      <IconMapPin className="w-5 h-5 text-amber-500 mr-2" />
                      Location (Optional)
                    </label>
                    <input
                      id="location"
                      type="text"
                      placeholder="e.g., New York, NY or Remote"
                      className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      {...register('location')}
                    />
                    {validationErrors.location && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.location}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="hourlyRate" className="flex items-center text-white mb-2">
                      <IconCoin className="w-5 h-5 text-amber-500 mr-2" />
                      Expected Hourly Rate (USD, Optional)
                    </label>
                    <input
                      id="hourlyRate"
                      type="text"
                      placeholder="e.g., 75"
                      className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      {...register('hourlyRate')}
                    />
                    {validationErrors.hourlyRate && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.hourlyRate}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="additionalInfo" className="flex items-center text-white mb-2">
                      <IconMessageCircle className="w-5 h-5 text-amber-500 mr-2" />
                      Anything Else? (Optional)
                    </label>
                    <textarea
                      id="additionalInfo"
                      placeholder="Key skills, portfolio link, how you heard about us?"
                      className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent h-32"
                      {...register('additionalInfo')}
                    ></textarea>
                    {validationErrors.additionalInfo && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.additionalInfo}</p>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={goToPreviousStep}
                    className="flex items-center justify-center px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors w-full sm:w-auto"
                  >
                    <IconArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </button>
                ) : (
                  <div className="hidden sm:block"></div> // Empty div to maintain layout with flex justify-between on larger screens
                )}
                
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="flex items-center justify-center px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 rounded-lg transition-colors w-full sm:w-auto"
                  >
                    Next
                    <IconArrowRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center justify-center px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 rounded-lg transition-colors w-full sm:w-auto"
                  >
                    Submit to Waitlist
                    <IconArrowRight className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>
            </form>
          </motion.div>
          
          {/* Success Popup */}
          <AnimatePresence>
            {showSuccessPopup && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed inset-0 flex items-center justify-center z-50 px-4"
                onClick={() => setShowSuccessPopup(false)}
              >
                <div className="absolute inset-0 bg-black/80" onClick={() => setShowSuccessPopup(false)}></div>
                <motion.div 
                  className="bg-gradient-to-b from-gray-900 to-black border border-amber-500/30 rounded-2xl p-8 max-w-md w-full relative z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 flex items-center justify-center mb-6">
                      <IconCheck className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-serif mb-2">Thank You!</h3>
                    <p className="text-gray-300 mb-6">
                      Your submission has been received. We'll be in touch soon to discuss joining our consultant network.
                    </p>
                    
                    <button
                      onClick={redirectToHome}
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 rounded-lg transition-colors"
                    >
                      <IconHome className="w-5 h-5 mr-2" />
                      Return to Homepage
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AuroraBackground>
    </main>
  );
} 