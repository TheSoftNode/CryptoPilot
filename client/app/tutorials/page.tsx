"use client";

import { ExampleCommands } from "@/components/Tutorials/ExampleCommands";
import { SecurityFeatures } from "@/components/Tutorials/SecurityFeatures";
import { TutorialCtaSection } from "@/components/Tutorials/TutorialCtaSection";
import { TutorialHero } from "@/components/Tutorials/TutorialHero";
import { TutorialSteps } from "@/components/Tutorials/TutorialSteps";
import { ArrowRight } from "lucide-react";


export default function TutorialPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
            <main className="flex-1">
                <TutorialHero />
                <TutorialSteps />
                <ExampleCommands />
                <SecurityFeatures />
                <TutorialCtaSection
                    title="Ready to Get Started?"
                    description="Experience the future of cryptocurrency management with our AI Wallet Assistant."
                    buttonText="Launch Assistant"
                    buttonIcon={<ArrowRight className="ml-2 h-4 w-4" />}
                    buttonHref="/chat"
                />
            </main>
        </div>
    );
}