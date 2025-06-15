import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Mail, Star, Users, Clock, CheckCircle, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmailCaptureProps {
  answers: string[];
  onBack: () => void;
}

const EmailCapture = ({ answers, onBack }: EmailCaptureProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  // Replace this URL with your deployed Google Apps Script Web App URL
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbxafhAdk4a11vsTmZI4duf82yuBsTi25ZrJSv_0KyqNRAMPqJUekNur5arcWjkI8_Clgw/exec';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, answers }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setIsSubmitted(true);
        toast({
          title: "Welcome aboard! 🎉",
          description: "Check your email for exclusive entrepreneur strategies.",
        });
      } else {
        toast({
          title: "Oops, something went wrong!",
          description: data.message || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network error",
        description: "Failed to send your email. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md mx-auto bg-slate-800/50 border-slate-700 backdrop-blur-sm p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">You're In!</h2>
            <p className="text-slate-300">
              Check your email for your personalized entrepreneur strategy guide.
            </p>
          </div>
          <Button onClick={onBack} variant="outline" className="w-full">
            Start Another Assessment
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl mx-auto w-full">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full">
                <Gift className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">
              Get Your Free Expert Strategies!
            </h2>
            <p className="text-slate-300 text-lg">
              Based on your responses, we'll send you personalized insights from successful entrepreneurs.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-sm text-slate-300">Proven Strategies</p>
            </div>
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-slate-300">Expert Community</p>
            </div>
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <Clock className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-sm text-slate-300">Weekly Insights</p>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 py-3 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading || !email}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 text-lg font-semibold disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Get Free Expert Strategies!'}
            </Button>
          </form>

          {/* Trust Indicators */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
              <Users className="w-4 h-4" />
              <span>Join 5,000+ young entrepreneurs</span>
            </div>
            <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <p className="text-orange-300 text-sm font-medium">
                ⚡ Limited spots available this month - Act now!
              </p>
            </div>
            <p className="text-xs text-slate-500">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>

          {/* Back Button */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmailCapture;
