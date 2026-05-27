import { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  title: string;
  expanded: boolean;
}

interface Question {
  id: string;
  section: string;
  title: string;
  definition: string;
  doNotMeasure: string[];
  options: string[];
}

const questions: Question[] = [
  {
    id: "violence-1",
    section: "Violence",
    title: "Does this experience contain violence and/or violent content?",
    definition:
      "Violence: Depictions of the act and/or the consequence of intentional, threatened and/or actual use of physical and/or psychological force against characters and/or players.",
    doNotMeasure: [
      "Character death due to accidents.",
      "Nonviolent adversarial games.",
      "Depictions of natural disasters.",
      "Roblox default character reset/death mechanics.",
    ],
    options: ["No", "Yes (Contains Violence)"],
  },
];

export default function Index() {
  const [completedSections, setCompletedSections] = useState(0);
  const [sections, setSections] = useState<Section[]>([
    { id: "violence", title: "Violence", expanded: true },
    { id: "blood", title: "Blood", expanded: false },
    { id: "fear", title: "Fear", expanded: false },
  ]);

  const toggleSection = (sectionId: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, expanded: !section.expanded }
          : section
      )
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Maturity & Compliance Questionnaire
          </h1>
          <p className="text-sm text-muted-foreground">
            {completedSections} of 17 sections completed
          </p>
        </div>

        {/* Instructions */}
        <div className="mb-8 space-y-4">
          <p className="text-sm">Please answer the questions accurately based on:</p>
          <ul className="text-sm space-y-2 ml-4">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                The most mature/extreme content a player can possibly experience
                in your experience (e.g. If your experience depicts mild violence
                occasionally and moderate violence repeatedly, declare "Repeated
                Moderate Violence").
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                Content in any forms, including and not limited to any assets
                (textures, models, animations, audio, video, etc.) and/or
                narratives;
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                Creator generated content only; user generated content is not
                measured. (E.g. you don't need to account for blood in a
                player's platform avatar brought into your experience.)
              </span>
            </li>
          </ul>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="border border-border rounded-lg">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-secondary transition-colors"
              >
                <h2 className="text-lg font-semibold">{section.title}</h2>
                {section.expanded ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {section.expanded && (
                <div className="border-t border-border px-4 py-4 space-y-6">
                  {questions
                    .filter((q) => q.section === section.title)
                    .map((question) => (
                      <div key={question.id} className="space-y-4">
                        <h3 className="font-semibold">{question.title}</h3>

                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="font-semibold">Violence:</span>{" "}
                            {question.definition}
                          </p>
                          <p className="text-sm font-semibold">Do NOT measure:</p>
                          <ul className="text-sm space-y-1 ml-4">
                            {question.doNotMeasure.map((item, idx) => (
                              <li key={idx} className="flex gap-2">
                                <span className="text-primary">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <fieldset className="space-y-3">
                          {question.options.map((option) => (
                            <label
                              key={option}
                              className="flex items-center gap-3 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name={question.id}
                                value={option}
                                className="w-4 h-4 cursor-pointer"
                              />
                              <span className="text-sm">{option}</span>
                            </label>
                          ))}
                        </fieldset>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="mt-12 space-y-6">
          <div className="space-y-4">
            <p className="text-sm font-semibold">
              After you submit this form, you'll receive a content maturity
              label (Minimal, Mild, Moderate, or Restricted) and a regional
              compliance result for your experience.
            </p>
            <h3 className="font-semibold mt-4">Important Note</h3>
            <ul className="text-sm space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  You may retake the Questionnaire anytime to accurately reflect
                  the latest content in your experience.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  You must come back and update your response if any of your
                  answers changed (e.g. because of an experience update).
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Impacts on Your Experience</h3>
            <p className="text-sm">
              Content maturity labels appear on the experience detail page and
              are used to inform search and discovery. Experiences without a
              content maturity label will show an "Unknown" label and won't be
              recommended or playable to users. Please generate a content
              maturity label for your experience as soon as it is eligible.
            </p>
            <ul className="text-sm space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <span className="font-semibold">Content Maturity Label:</span>{" "}
                  This label provides general information about content in your
                  experience, so users can decide whether it's appropriate for
                  them. This label will be displayed on your experience's
                  details page and is used to inform parental controls.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <span className="font-semibold">Regional Compliance:</span> If
                  your experience contains certain themes, or doesn't follow
                  Roblox policy APIs, it may not be allowed in some regions.
                  This information isn't displayed publicly, but it may affect
                  who can access your experience.
                </span>
              </li>
            </ul>
          </div>

          <p className="text-sm">
            Learn more about our{" "}
            <a href="#" className="text-primary hover:underline">
              Policy APIs
            </a>
            , which help you make your experience dynamically compliant.
          </p>
        </div>

        {/* Results Section */}
        <div className="mt-12 space-y-6 pb-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-base">Content Maturity Label</h3>
              <Info className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-sm font-semibold">Descriptors</p>
            <div className="text-sm text-muted-foreground">Unknown</div>
            <p className="text-sm text-muted-foreground">None</p>
          </div>

          <div className="border-t border-border pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-base">Non-Compliant Regions</h3>
              <Info className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex gap-8">
              <div>
                <p className="text-sm font-semibold mb-2">Descriptors</p>
                <p className="text-sm text-muted-foreground">None</p>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">Age Restriction</p>
                <Info className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="pb-8">
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Start
          </button>
        </div>

        {/* Footer */}
        <footer className="text-xs text-muted-foreground mt-12 pt-6 border-t border-border space-y-2">
          <p>©2026 Roblox Corporation. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Accessibility
            </a>
            <a href="#" className="hover:text-foreground">
              Support
            </a>
            <a href="#" className="hover:text-foreground">
              Your Privacy Choices
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
