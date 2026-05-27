import { useState } from "react";
import { ChevronDown, ChevronUp, Info, Check } from "lucide-react";
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
  placeholder?: string;
}

const questions: Question[] = [
  {
    id: "gift-choice-1",
    section: "Ton Cadeau",
    title: "Quel cadeau souhaites-tu recevoir ?",
    definition:
      "Choisis le type de cadeau qui t'intéresse. Tu ne peux sélectionner qu'une seule option.",
    doNotMeasure: [
      "Un compte par personne uniquement",
      "Les réponses doivent être honnêtes et sincères",
      "Pas de création de comptes multiples",
    ],
    options: ["Robux", "Nitro Discord", "Carte cadeau"],
  },
  {
    id: "quantity-1",
    section: "Quantité & Plateforme",
    title: "Combien de Robux/points souhaites-tu ?",
    definition:
      "Indique la quantité désirée. Les montants disponibles : 100, 500, 1000, 5000 Robux ou équivalent.",
    doNotMeasure: [
      "Vous ne pouvez demander qu'une seule quantité",
      "Les demandes excessives seront rejets",
      "La livraison se fera dans les 7 jours",
    ],
    options: ["100 Robux", "500 Robux", "1000 Robux", "5000 Robux"],
  },
  {
    id: "contact-1",
    section: "Informations de Contact",
    title: "Quel est ton pseudonyme Roblox ?",
    definition:
      "Fournis ton nom d'utilisateur Roblox exact. Nous utiliserons ce pseudo pour t'envoyer ton cadeau.",
    doNotMeasure: [
      "Le pseudo doit être correct et à jour",
      "Tu dois avoir un compte actif et en bon état",
      "Ne partage jamais ton mot de passe",
    ],
    options: ["textinput"],
    placeholder: "Ton pseudonyme Roblox",
  },
];

export default function Index() {
  const [completedSections, setCompletedSections] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sections, setSections] = useState<Section[]>([
    { id: "gift", title: "Ton Cadeau", expanded: true },
    { id: "quantity", title: "Quantité & Plateforme", expanded: false },
    { id: "contact", title: "Informations de Contact", expanded: false },
  ]);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
    if (value && value !== "Fourni via input") {
      setCompletedSections((prev) => prev + 1);
    }
  };

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
            Giveaway & Dream Form
          </h1>
          <p className="text-sm text-muted-foreground">
            {completedSections} of 3 sections completed
          </p>
        </div>

        {/* Instructions */}
        <div className="mb-8 space-y-4">
          <p className="text-sm">Réponds aux questions pour participer au giveaway :</p>
          <ul className="text-sm space-y-2 ml-4">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                Réponds honnêtement à toutes les questions du formulaire. Les réponses fausses ou trompeuses entraîneront une disqualification immédiate.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                Un compte par personne uniquement. Les comptes en double seront disqualifiés et bannis du giveaway.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                Complète tous les champs obligatoires. Les demandes incomplètes ne seront pas acceptées.
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
                className="w-full flex items-center justify-between px-4 py-2 hover:bg-secondary transition-colors"
              >
                <h2 className="text-base font-semibold">{section.title}</h2>
                <div className="flex items-center gap-2">
                  {questions.some(
                    (q) => q.section === section.title && answers[q.id]
                  ) && <Check className="w-5 h-5 text-primary" />}
                  {section.expanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
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

                        {question.options[0] === "textinput" ? (
                          <div className="space-y-3">
                            <input
                              type="text"
                              placeholder={question.placeholder || "Saisis ta réponse..."}
                              value={answers[question.id] || ""}
                              onChange={(e) =>
                                handleAnswer(question.id, e.target.value)
                              }
                              className="w-full px-4 py-3 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                            />
                            {answers[question.id] && (
                              <div className="flex items-center gap-2 text-green-600 text-sm font-semibold animate-in slide-in-from-top-2 duration-300">
                                <Check className="w-5 h-5" />
                                Pseudo enregistré
                              </div>
                            )}
                          </div>
                        ) : (
                          <fieldset className="space-y-3">
                            {question.options.map((option) => (
                              <div key={option}>
                                <label className="flex items-center gap-3 cursor-pointer">
                                  <input
                                    type="radio"
                                    name={question.id}
                                    value={option}
                                    checked={answers[question.id] === option}
                                    onChange={(e) =>
                                      handleAnswer(question.id, e.target.value)
                                    }
                                    className="w-4 h-4 cursor-pointer"
                                  />
                                  <span className="text-sm">{option}</span>
                                </label>
                                {answers[question.id] === option && (
                                  <div className="mt-2 flex items-center gap-2 text-green-600 text-sm font-semibold animate-in slide-in-from-top-2 duration-300">
                                    <Check className="w-4 h-4" />
                                    Choix enregistré ✓
                                  </div>
                                )}
                              </div>
                            ))}
                          </fieldset>
                        )}
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
              Après avoir soumis ce formulaire, ta demande sera traitée dans les 7 jours.
              Tu recevras une notification avec ton cadeau et les instructions de livraison.
            </p>
            <h3 className="font-semibold mt-4">Note Importante</h3>
            <ul className="text-sm space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  Une fois ta demande soumise, tu ne pourras pas la modifier.
                  Vérifie bien toutes tes réponses avant d'envoyer.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  Les gagnants sont sélectionnés aléatoirement parmi les participants éligibles.
                  Assure-toi que ton compte Roblox est actif et non banni.
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Ce que ça change pour toi</h3>
            <p className="text-sm">
              En participant au giveaway, tu acceptes nos conditions d'utilisation.
              Si tu es sélectionné, tu auras accès à ton cadeau directement depuis ton inventaire Roblox.
            </p>
            <ul className="text-sm space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <span className="font-semibold">Livraison des Robux :</span>{" "}
                  Les Robux seront envoyés directement à ton compte Roblox dans les 7 jours suivant la sélection.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <span className="font-semibold">Cadeaux alternatifs :</span> Les cadeaux Nitro et cartes cadeau seront
                  envoyés via email avec les instructions de rédemption.
                </span>
              </li>
            </ul>
          </div>

          <p className="text-sm">
            Besoin d'aide ? Consulte{" "}
            <a href="#" className="text-primary hover:underline">
              notre FAQ
            </a>
            {" "}ou contacte notre support.
          </p>
        </div>

        {/* Results Section */}
        <div className="mt-12 space-y-6 pb-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-base">Statut de ta Demande</h3>
              <Info className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-sm font-semibold">Étape Actuelle</p>
            {answers["gift-choice-1"] ? (
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <Check className="w-5 h-5" />
                <span>Cadeau sélectionné : {answers["gift-choice-1"]}</span>
              </div>
            ) : (
              <>
                <div className="text-sm text-muted-foreground">En attente</div>
                <p className="text-sm text-muted-foreground">Complète le formulaire pour continuer</p>
              </>
            )}
          </div>

          <div className="border-t border-border pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-base">Disponibilité</h3>
              <Info className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex gap-8">
              <div>
                <p className="text-sm font-semibold mb-2">Régions Acceptées</p>
                <p className="text-sm text-muted-foreground">Monde entier</p>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">Restrictions</p>
                <p className="text-sm text-muted-foreground">Compte Roblox actif requis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="pb-8">
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Envoyer ma demande
          </button>
        </div>

        {/* Footer */}
        <footer className="text-xs text-muted-foreground mt-12 pt-6 border-t border-border space-y-2">
          <p>©2026 Dream Giveaway. Tous droits réservés.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">
              Conditions d'utilisation
            </a>
            <a href="#" className="hover:text-foreground">
              Confidentialité
            </a>
            <a href="#" className="hover:text-foreground">
              Accessibilité
            </a>
            <a href="#" className="hover:text-foreground">
              Support
            </a>
            <a href="#" className="hover:text-foreground">
              Paramètres de confidentialité
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
