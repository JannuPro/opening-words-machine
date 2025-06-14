
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle, Lightbulb, Rocket } from 'lucide-react';

interface InteractiveFunnelProps {
  currentStep: number;
  onStepComplete: (answer: string) => void;
  onBack: () => void;
}

const questions = [
  {
    id: 1,
    icon: CheckCircle,
    title: "Call to Adventure",
    question: "Are you absolutely on track to reach your biggest business goal?",
    subtitle: "Be honest with yourself - where do you really stand?",
    options: [
      "Yes, I'm exactly where I need to be",
      "I'm making progress but not fast enough",
      "I'm struggling to make meaningful progress",
      "I'm not sure if I'm on the right track"
    ]
  },
  {
    id: 2,
    icon: AlertCircle,
    title: "Confrontation",
    question: "What's the single biggest roadblock holding you back?",
    subtitle: "Identify what's really stopping your progress",
    options: [
      "Lack of clear strategy and direction",
      "Not enough confidence in my decisions",
      "Limited resources and funding",
      "Don't know the right people or network"
    ]
  },
  {
    id: 3,
    icon: Lightbulb,
    title: "Vision of Success",
    question: "Imagine having proven expert guidance – what could you achieve?",
    subtitle: "Picture your business with the right mentorship",
    options: [
      "10x my revenue within 12 months",
      "Build a team and scale operations",
      "Launch successfully and gain market share",
      "Become a recognized leader in my industry"
    ]
  },
  {
    id: 4,
    icon: Rocket,
    title: "Commitment",
    question: "Ready to bridge the gap and get top-entrepreneur insights for free?",
    subtitle: "Take the next step toward your business breakthrough",
    options: [
      "Yes, I'm ready to learn from the best",
      "I want proven strategies that actually work",
      "I need expert guidance to accelerate my growth",
      "I'm committed to taking my business to the next level"
    ]
  }
];

const InteractiveFunnel = ({ currentStep, onStepComplete, onBack }: InteractiveFunnelProps) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const question = questions[currentStep - 1];
  const IconComponent = question.icon;

  const handleContinue = () => {
    if (selectedOption) {
      onStepComplete(selectedOption);
      setSelectedOption('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl mx-auto w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-400">Question {currentStep} of 4</span>
            <span className="text-sm text-slate-400">{Math.round((currentStep / 4) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-8">
          {/* Question Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-orange-500/20 rounded-full">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
            </div>
            <p className="text-sm text-orange-400 font-medium mb-2">{question.title}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {question.question}
            </h2>
            <p className="text-slate-300">{question.subtitle}</p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(option)}
                className={`w-full p-4 text-left rounded-lg border transition-all duration-200 hover:scale-[1.02] ${
                  selectedOption === option
                    ? 'bg-gradient-to-r from-blue-600/20 to-orange-600/20 border-blue-500 text-white'
                    : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    selectedOption === option
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-slate-500'
                  }`}>
                    {selectedOption === option && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-[2px]"></div>
                    )}
                  </div>
                  {option}
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <Button
              onClick={handleContinue}
              disabled={!selectedOption}
              className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white px-6 py-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === 4 ? 'Get My Free Strategies' : 'Continue'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveFunnel;
