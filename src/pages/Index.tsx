
import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import InteractiveFunnel from '@/components/InteractiveFunnel';
import EmailCapture from '@/components/EmailCapture';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleStepComplete = (answer: string) => {
    setAnswers([...answers, answer]);
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowEmailCapture(true);
    }
  };

  const resetJourney = () => {
    setCurrentStep(0);
    setShowEmailCapture(false);
    setAnswers([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {!showEmailCapture ? (
        currentStep === 0 ? (
          <HeroSection onStart={() => setCurrentStep(1)} />
        ) : (
          <InteractiveFunnel 
            currentStep={currentStep} 
            onStepComplete={handleStepComplete}
            onBack={() => setCurrentStep(Math.max(0, currentStep - 1))}
          />
        )
      ) : (
        <EmailCapture answers={answers} onBack={resetJourney} />
      )}
    </div>
  );
};

export default Index;
