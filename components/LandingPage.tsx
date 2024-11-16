 "use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Heart, Crown, BookHeart, Glasses } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl sm:text-7xl font-bold"
          >
            <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-transparent bg-clip-text">
              RizzGPT
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Your AI-powered conversation companion that adapts to your style. Master the art of engaging conversations with five unique personalities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/chat">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                Start Chatting <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {[
            {
              icon: <Sparkles className="w-6 h-6" />,
              title: "Smooth Operator",
              description: "Master the art of sophisticated and charming conversations.",
              gradient: "from-violet-400 to-indigo-500"
            },
            {
              icon: <Heart className="w-6 h-6" />,
              title: "Flirty & Fun",
              description: "Add a playful spark to your conversations with tasteful flirting.",
              gradient: "from-pink-400 to-rose-500"
            },
            {
              icon: <Crown className="w-6 h-6" />,
              title: "Sigma Mindset",
              description: "Embrace confidence and purpose in every interaction.",
              gradient: "from-amber-400 to-orange-500"
            },
            {
              icon: <BookHeart className="w-6 h-6" />,
              title: "Poetic Soul",
              description: "Express yourself with beautiful metaphors and artistic flair.",
              gradient: "from-emerald-400 to-teal-500"
            },
            {
              icon: <Glasses className="w-6 h-6" />,
              title: "Mysterious Aura",
              description: "Intrigue others with enigmatic and thought-provoking dialogue.",
              gradient: "from-blue-400 to-indigo-500"
            },
            {
              icon: <Sparkles className="w-6 h-6" />,
              title: "AI-Powered Growth",
              description: "Learn and improve your conversation skills with smart feedback.",
              gradient: "from-purple-400 to-violet-500"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-xl -z-10"
                style={{
                  backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                  ['--tw-gradient-from' as string]: `var(--tw-${feature.gradient.split(' ')[0]})`,
                  ['--tw-gradient-to' as string]: `var(--tw-${feature.gradient.split(' ')[1]})`
                }}
              />
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-3xl border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-300">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-r ${feature.gradient} text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="text-center bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20 rounded-3xl p-12"
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-violet-600 text-transparent bg-clip-text">
            Ready to Transform Your Conversations?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already mastering the art of conversation with RizzGPT.
          </p>
          <Link href="/chat">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
              Get Started Now <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}