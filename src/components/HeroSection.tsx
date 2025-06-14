
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, TrendingUp } from 'lucide-react';

interface HeroSectionProps {
  onStart: () => void;
}

const HeroSection = ({ onStart }: HeroSectionProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-orange-500/10"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main Hero Question */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Are you <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">truly doing</span> everything it takes to reach your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">business dream?</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Most young entrepreneurs have the ambition but lack the proven strategies. 
            Bridge that gap with expert insights that actually work.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 text-slate-400">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-400" />
            <span className="text-sm">5,000+ Young Entrepreneurs</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            <span className="text-sm">Proven Growth Strategies</span>
          </div>
        </div>

        {/* Call to Action */}
        <div className="space-y-4">
          <Button 
            onClick={onStart}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
          >
            Discover What You're Missing
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <p className="text-sm text-slate-400">
            Free assessment • Takes 2 minutes • Get personalized insights
          </p>
        </div>

        {/* Urgency Element */}
        <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg backdrop-blur-sm">
          <p className="text-orange-300 text-sm font-medium">
            ⚡ Limited spots available this month - Join now for exclusive strategies
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
