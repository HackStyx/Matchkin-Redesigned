'use client';

import { Header } from '@/components/layout/Header';
import Link from 'next/link';
import { IconBuilding, IconSearch, IconArrowRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { AuroraBackground } from '@/components/ui/aurora-background';

export default function OnboardingPage() {
  return (
    <main className="bg-black text-white min-h-screen flex flex-col">
      <Header />
      
      <AuroraBackground className="flex-grow flex items-center justify-center py-8 px-4">
        <motion.div 
          className="max-w-4xl w-full mx-auto text-center"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <motion.div
            variants={slideUp}
            className="mb-10"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6"
              variants={slideUp}
            >
              Join Our Waitlist
            </motion.h1>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Client Card */}
            <motion.div 
              className="border border-gray-700 rounded-2xl p-8 flex flex-col items-center bg-black/50 backdrop-blur-sm hover:border-amber-500/50 transition-colors h-full"
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.3 }}
              variants={slideUp}
            >
              <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mb-6">
                <IconBuilding className="w-8 h-8 text-orange-500" />
              </div>
              
              <h2 className="text-2xl font-medium mb-4 font-serif">I'm a Client</h2>
              
              <p className="text-gray-300 mb-8 text-center">
                Looking to post projects and hire expert consultants to achieve your business goals.
              </p>
              
              <Link 
                href="/onboarding/client"
                className="group bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-6 py-3 rounded-xl flex items-center justify-center transition-all duration-300 w-full mt-auto"
              >
                Post Projects
                <IconArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            {/* Consultant Card */}
            <motion.div 
              className="border border-gray-700 rounded-2xl p-8 flex flex-col items-center bg-black/50 backdrop-blur-sm hover:border-indigo-500/50 transition-colors h-full"
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.3 }}
              variants={slideUp}
            >
              <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
                <IconSearch className="w-8 h-8 text-indigo-500" />
              </div>
              
              <h2 className="text-2xl font-medium mb-4 font-serif">I'm a Consultant</h2>
              
              <p className="text-gray-300 mb-8 text-center">
                Ready to find exciting projects, showcase your expertise, and connect with valuable clients.
              </p>
              
              <Link 
                href="/onboarding/consultant"
                className="group bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl flex items-center justify-center transition-all duration-300 w-full mt-auto"
              >
                Find Projects
                <IconArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AuroraBackground>
    </main>
  );
} 