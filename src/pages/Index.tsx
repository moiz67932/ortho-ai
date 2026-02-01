import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Calendar, Bot, Shield, ChevronRight } from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M12 2a10 10 0 0 0-9.95 9h11.64L9.74 17.42A10 10 0 1 0 12 2z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-foreground">Ortho AI</span>
          </div>
          <Button onClick={() => navigate('/login')} className="gap-2">
            Sign In
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Bot className="h-4 w-4" />
            AI-Powered Appointment Management
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Manage Your Dental Practice{' '}
            <span className="text-primary">Effortlessly</span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
            A modern, calm, and professional clinic dashboard that makes managing AI-booked
            appointments feel effortless and trustworthy.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" onClick={() => navigate('/login')} className="gap-2 px-8">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 px-8">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border/50 bg-card/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
              Everything You Need
            </h2>
            <p className="text-muted-foreground">
              Powerful features to streamline your dental practice
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Calendar}
              title="Smart Calendar"
              description="View and manage all your appointments with an intuitive monthly calendar view"
            />
            <FeatureCard
              icon={Bot}
              title="AI Booking Integration"
              description="Seamlessly track appointments booked by AI alongside manual bookings"
            />
            <FeatureCard
              icon={Shield}
              title="Secure & Private"
              description="Your clinic data is protected with enterprise-grade security"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Ortho AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default Index;
