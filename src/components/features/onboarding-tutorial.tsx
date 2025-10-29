"use client";

import { useState, useEffect, useCallback, CSSProperties } from "react";
import { X, ArrowRight, ArrowLeft } from "lucide-react";

function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  targetSelector?: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Welcome to khel.ai!",
    description:
      "Let's take a quick tour of the powerful features available to you. This will only take a minute.",
    targetSelector: "#hero-cta",
  },
  {
    id: 2,
    title: "Our Solutions",
    description:
      "Here you can find our core features, like Ball Tracking and Auto Video Clipping, designed to streamline your analysis.",
    targetSelector: "#solutions-grid",
  },
  {
    id: 3,
    title: "Feature Deep Dive",
    description:
      "Each feature addresses a specific challenge. Explore them to see how we can help you.",
    targetSelector: "#why-khel",
  },
  {
    id: 4,
    title: "Frequently Asked Questions",
    description:
      "Have questions? Our FAQ section provides answers to common queries about our platform and services.",
    targetSelector: "#faq-section",
  },
  {
    id: 5,
    title: "You're All Set!",
    description:
      "You have completed the tour. You are now ready to revolutionize your game analysis. Click below to begin!",
  },
];

export default function OnboardingTutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [spotlightStyle, setSpotlightStyle] = useState<CSSProperties>({});
  const [tooltipStyle, setTooltipStyle] = useState<CSSProperties>({});
  const [isSpotlightVisible, setIsSpotlightVisible] = useState(false);

  const currentStep = tutorialSteps[currentStepIndex];

  const handleClose = useCallback(() => {
    setIsOpen(false);
    try {
      localStorage.setItem("onboardingTutorialCompleted", "true");
    } catch (error) {
      console.error("Failed to access localStorage:", error);
    }
  }, []);

  const handleNext = () => {
    if (currentStepIndex < tutorialSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const updatePositions = useCallback(() => {
    if (!isOpen || !currentStep) return;

    const targetElement = currentStep.targetSelector
      ? document.querySelector(currentStep.targetSelector)
      : null;

    if (!targetElement) {
      setIsSpotlightVisible(false);
      setSpotlightStyle({});
      setTooltipStyle({});
      return;
    }

    setIsSpotlightVisible(true);
    const rect = targetElement.getBoundingClientRect();
    const padding = 12;
    const tooltipWidth = 340;
    const tooltipHeight = 220;

    setSpotlightStyle({
      position: "fixed",
      top: `${rect.top - padding}px`,
      left: `${rect.left - padding}px`,
      width: `${rect.width + padding * 2}px`,
      height: `${rect.height + padding * 2}px`,
      boxShadow: "0 0 0 9999px rgba(31, 41, 55, 0.7)",
      borderRadius: "12px",
    });

    const spaceBelow = window.innerHeight - rect.bottom - padding;
    const spaceAbove = rect.top - padding;

    let tooltipTop: number;
    if (spaceBelow > tooltipHeight + 20) {
      tooltipTop = rect.bottom + padding + 12;
    } else if (spaceAbove > tooltipHeight + 20) {
      tooltipTop = rect.top - padding - tooltipHeight - 12;
    } else {
      tooltipTop = window.innerHeight / 2 - tooltipHeight / 2;
    }

    let tooltipLeft = rect.left + rect.width / 2 - tooltipWidth / 2;
    if (tooltipLeft < 20) tooltipLeft = 20;
    if (tooltipLeft + tooltipWidth > window.innerWidth - 20) {
      tooltipLeft = window.innerWidth - tooltipWidth - 20;
    }

    setTooltipStyle({
      position: "fixed",
      top: `${tooltipTop}px`,
      left: `${tooltipLeft}px`,
      width: `${tooltipWidth}px`,
    });
  }, [isOpen, currentStep]);

  useEffect(() => {
    try {
      const hasCompleted = localStorage.getItem("onboardingTutorialCompleted");
      if (hasCompleted !== "true") {
        setTimeout(() => setIsOpen(true), 500);
      }
    } catch (error) {
      console.error("Failed to access localStorage:", error);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      updatePositions();
      window.addEventListener("resize", updatePositions);
      window.addEventListener("scroll", updatePositions);
    }
    return () => {
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("scroll", updatePositions);
    };
  }, [isOpen, updatePositions]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      else if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose, handleNext, handlePrev]);

  if (!isOpen) return null;

  const progressPercentage =
    ((currentStepIndex + 1) / tutorialSteps.length) * 100;

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[200] transition-all duration-500 ease-in-out",
          !isSpotlightVisible && "bg-gray-900/70"
        )}
        style={isSpotlightVisible ? spotlightStyle : {}}
      />
      <div
        style={isSpotlightVisible ? tooltipStyle : {}}
        className={cn(
          "fixed z-[201] w-[340px] rounded-xl bg-background text-foreground shadow-2xl transition-all duration-500 ease-in-out",
          !isSpotlightVisible &&
            "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        )}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-muted-foreground">
              Step {currentStepIndex + 1} of {tutorialSteps.length}
            </p>
            <button
              onClick={handleClose}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-8 w-8 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          <div className="w-full bg-secondary rounded-full h-1.5 mb-4 overflow-hidden">
            <div
              className="bg-primary h-1.5 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <h4 className="text-lg font-bold text-foreground mb-2">
            {currentStep.title}
          </h4>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            {currentStep.description}
          </p>

          <div className="flex items-center justify-between">
            <button
              onClick={handleClose}
              className="px-0 text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Skip Tutorial
            </button>
            <div className="flex items-center gap-2">
              {currentStepIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-9 px-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                >
                  <ArrowLeft className="mr-1.5 h-4 w-4" />
                  Prev
                </button>
              )}
              <button
                onClick={handleNext}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-9 px-4 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {currentStepIndex === tutorialSteps.length - 1
                  ? "Get Started"
                  : "Next"}
                {currentStepIndex < tutorialSteps.length - 1 && (
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
