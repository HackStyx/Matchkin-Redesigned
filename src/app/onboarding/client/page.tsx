'use client';

import { Header } from '@/components/layout/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { AuroraBackground } from '@/components/ui/aurora-background';
import Link from 'next/link';
import { IconArrowLeft, IconArrowRight, IconUser, IconBuilding, IconMail, IconPhone, IconBriefcase, IconChartBar, IconClock, IconInfoCircle, IconMessageCircle, IconCheck, IconHome } from '@tabler/icons-react';
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
  companySize: z.string().optional(),
  projectTypes: z.string().optional(),
  companyDescription: z.string().optional(),
  
  // Step 3 fields
  minBudget: z.string().optional(),
  maxBudget: z.string().optional(),
  timeline: z.string().optional(),
  referralSource: z.string().optional(),
  additionalInfo: z.string().optional(),
});

// Define validation schemas for each step
const step1Schema = z.object({
  accountType: z.enum(['individual', 'company']),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  companyName: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  
  // Include optional fields from other steps to ensure type compatibility
  industry: z.string().optional(),
  companySize: z.string().optional(),
  projectTypes: z.string().optional(),
  companyDescription: z.string().optional(),
  minBudget: z.string().optional(),
  maxBudget: z.string().optional(),
  timeline: z.string().optional(),
  referralSource: z.string().optional(),
  additionalInfo: z.string().optional(),
}).refine((data) => {
  // If account type is individual, firstName and lastName are required
  if (data.accountType === 'individual') {
    return data.firstName && data.firstName.length >= 2 && data.lastName && data.lastName.length >= 2;
  }
  // If account type is company, companyName is required
  return data.companyName && data.companyName.length >= 2;
}, {
  message: "Please fill in all required fields",
  path: ['accountType'], // This will show the error message at the account type field
});

const step2Schema = z.object({
  // Include fields from step 1 to ensure type compatibility
  accountType: z.enum(['individual', 'company']).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  companyName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  
  // Step 2 fields with validation
  industry: z.string().min(1, 'Please select an industry'),
  companySize: z.string().min(1, 'Please select a company size'),
  projectTypes: z.string().optional(),
  companyDescription: z.string().optional(),
  
  // Include optional fields from step 3
  minBudget: z.string().optional(),
  maxBudget: z.string().optional(),
  timeline: z.string().optional(),
  referralSource: z.string().optional(),
  additionalInfo: z.string().optional(),
});

const step3Schema = z.object({
  // Include fields from steps 1 and 2 to ensure type compatibility
  accountType: z.enum(['individual', 'company']).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  companyName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  projectTypes: z.string().optional(),
  companyDescription: z.string().optional(),
  
  // Step 3 fields
  minBudget: z.string().optional(),
  maxBudget: z.string().optional(),
  timeline: z.string().optional(),
  referralSource: z.string().optional(),
  additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof baseFormSchema>;

export default function ClientOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormValues>>({
    accountType: 'individual',
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const router = useRouter();
  
  // Set up form for current step
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid }, 
    trigger,
    watch,
    getValues
  } = useForm<FormValues>({
    resolver: zodResolver(
      currentStep === 1 ? step1Schema : 
      currentStep === 2 ? step2Schema : step3Schema
    ),
    mode: 'onChange',
    defaultValues: formData
  });

  const watchAccountType = watch('accountType');
  
  const goToNextStep = async (e: React.MouseEvent) => {
    // Prevent default to avoid any form submission
    e.preventDefault();
    
    // Validate current step
    const isStepValid = await trigger();
    if (!isStepValid) return;
    
    // Update form data
    const currentFormValues = getValues();
    setFormData(prev => ({ ...prev, ...currentFormValues }));
    
    // Move to next step
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const goToPreviousStep = (e: React.MouseEvent) => {
    // Prevent default to avoid any form submission
    e.preventDefault();
    
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const onSubmit = (data: FormValues) => {
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
              Client Onboarding
            </h1>
            
            <p className="text-amber-400 mb-4">
              Step {currentStep} of 3: {
                currentStep === 1 ? 'Your Information' : 
                currentStep === 2 ? 'Company & Project Needs' : 
                'Budget, Timeline & More'
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
              {/* Step 1: Personal Information */}
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
                        <span>Individual</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          value="company"
                          {...register('accountType')}
                          className="form-radio text-amber-500 focus:ring-amber-500"
                          defaultChecked={formData.accountType === 'company'}
                        />
                        <span>Company</span>
                      </label>
                    </div>
                    {errors.accountType && (
                      <p className="text-red-500 text-sm mt-1">{errors.accountType.message}</p>
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
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
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
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
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
                        placeholder="e.g., Acme Corp"
                        className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        {...register('companyName')}
                      />
                      {errors.companyName && (
                        <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
                      )}
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="email" className="flex items-center text-white mb-2">
                      <IconMail className="w-5 h-5 text-amber-500 mr-2" />
                      Work Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
                  </div>
                </div>
              )}
              
              {/* Step 2: Company & Project Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="industry" className="flex items-center text-white mb-2">
                      <IconBriefcase className="w-5 h-5 text-amber-500 mr-2" />
                      Your Industry
                    </label>
                    <select
                      id="industry"
                      className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      {...register('industry')}
                      defaultValue=""
                    >
                      <option value="" disabled>Select industry</option>
                      <option value="technology">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                      <option value="retail">Retail</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.industry && (
                      <p className="text-red-500 text-sm mt-1">{errors.industry.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="companySize" className="flex items-center text-white mb-2">
                      <IconBuilding className="w-5 h-5 text-amber-500 mr-2" />
                      Company Size
                    </label>
                    <select
                      id="companySize"
                      className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      {...register('companySize')}
                      defaultValue=""
                    >
                      <option value="" disabled>Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501+">501+ employees</option>
                    </select>
                    {errors.companySize && (
                      <p className="text-red-500 text-sm mt-1">{errors.companySize.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="projectTypes" className="flex items-center text-white mb-2">
                      <IconChartBar className="w-5 h-5 text-amber-500 mr-2" />
                      Typical Project Types (Optional)
                    </label>
                    <textarea
                      id="projectTypes"
                      placeholder="e.g., AI/ML development, Web application, Data analysis"
                      className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent h-24"
                      {...register('projectTypes')}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="companyDescription" className="flex items-center text-white mb-2">
                      <IconInfoCircle className="w-5 h-5 text-amber-500 mr-2" />
                      Brief Company Description (Optional)
                    </label>
                    <textarea
                      id="companyDescription"
                      placeholder="Tell us about your company..."
                      className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent h-24"
                      {...register('companyDescription')}
                    ></textarea>
                  </div>
                </div>
              )}
              
              {/* Step 3: Budget & Timeline */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center text-white mb-2">
                      <IconChartBar className="w-5 h-5 text-amber-500 mr-2" />
                      Typical Project Budget (USD, Optional)
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Min (e.g., 5000)"
                          className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          {...register('minBudget')}
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Max (e.g., 20000)"
                          className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          {...register('maxBudget')}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="timeline" className="flex items-center text-white mb-2">
                      <IconClock className="w-5 h-5 text-amber-500 mr-2" />
                      Typical Project Timeline (Optional)
                    </label>
                    <input
                      id="timeline"
                      type="text"
                      placeholder="e.g., 1-3 months, 6+ months"
                      className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      {...register('timeline')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="referralSource" className="flex items-center text-white mb-2">
                      <IconInfoCircle className="w-5 h-5 text-amber-500 mr-2" />
                      How did you hear about us? (Optional)
                    </label>
                    <input
                      id="referralSource"
                      type="text"
                      placeholder="e.g., LinkedIn, Colleague, Search Engine"
                      className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      {...register('referralSource')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="additionalInfo" className="flex items-center text-white mb-2">
                      <IconMessageCircle className="w-5 h-5 text-amber-500 mr-2" />
                      Anything Else? (Optional)
                    </label>
                    <textarea
                      id="additionalInfo"
                      placeholder="Any specific needs or questions?"
                      className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent h-24"
                      {...register('additionalInfo')}
                    ></textarea>
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
                      Your submission has been received. We'll be in touch soon to discuss your consulting needs.
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