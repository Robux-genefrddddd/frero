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

const baseQuestions: Question[] = [
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
    id: "contact-1",
    section: "Informations de Contact",
    title: "Complète tes informations de contact",
    definition:
      "Fournis ton pseudo Roblox, ton pseudo Discord et ton ID Discord. Ces infos sont essentielles pour te contacter et t'envoyer ton cadeau.",
    doNotMeasure: [
      "Tous les champs sont obligatoires",
      "L'ID Discord doit être valide",
      "Ne partage jamais ton mot de passe",
    ],
    options: ["contact-multiinput"],
    placeholder: "Informations de contact",
  },
];

const getQuantityQuestion = (giftChoice: string): Question => {
  const baseQuestion = {
    id: "quantity-1",
    section: "Quantité & Plateforme",
    doNotMeasure: [
      "Vous ne pouvez demander qu'une seule quantité",
      "Les demandes excessives seront rejets",
      "L'annonce du giveaway se fera via Discord ou notification site",
    ],
  };

  if (giftChoice === "Robux") {
    return {
      ...baseQuestion,
      title: "Combien de Robux souhaites-tu ?",
      definition:
        "Indique la quantité de Robux désirée. Les montants disponibles : 100, 500, 1000, 5000 Robux.",
      options: ["100 Robux", "500 Robux", "1000 Robux", "5000 Robux"],
    };
  } else if (giftChoice === "Nitro Discord") {
    return {
      ...baseQuestion,
      title: "Quel type de Nitro Discord préfères-tu ?",
      definition:
        "Nitro Classic offre des émojis custom et des GIFs animés. Nitro Full inclut les jeux. Choisis une seule option.",
      options: ["Nitro Classic (1 mois)", "Nitro Full (1 mois)"],
    };
  } else if (giftChoice === "Carte cadeau") {
    return {
      ...baseQuestion,
      title: "Quel montant de carte cadeau veux-tu ?",
      definition:
        "Indique le montant souhaité. Les cartes disponibles : 10€, 25€, 50€, 100€.",
      options: ["10€", "25€", "50€", "100€"],
    };
  }

  return {
    ...baseQuestion,
    title: "Sélectionne d'abord un cadeau",
    definition: "Complète la section 'Ton Cadeau' pour continuer.",
    options: [],
  };
};

const getQuestions = (answers: Record<string, string>): Question[] => {
  const giftChoice = answers["gift-choice-1"];
  const quantityQuestion = getQuantityQuestion(giftChoice);

  return [
    baseQuestions[0],
    quantityQuestion,
    baseQuestions[1],
  ];
};

export default function Index() {
  const [completedSections, setCompletedSections] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sections, setSections] = useState<Section[]>([
    { id: "gift", title: "Ton Cadeau", expanded: true },
    { id: "quantity", title: "Quantité & Plateforme", expanded: false },
    { id: "contact", title: "Informations de Contact", expanded: false },
  ]);

  const questions = getQuestions(answers);

  const handleAnswer = (questionId: string, value: string) => {
    const oldValue = answers[questionId];
    setAnswers({ ...answers, [questionId]: value });
    if (value && !oldValue) {
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
                            <span className="font-semibold">{question.section}:</span>{" "}
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

                        {question.options[0] === "contact-multiinput" ? (
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-semibold mb-2">Pseudonyme Discord *</label>
                              <input
                                type="text"
                                placeholder="Ton pseudo Discord"
                                value={(answers["contact-discord"] || "")}
                                onChange={(e) =>
                                  setAnswers({
                                    ...answers,
                                    "contact-discord": e.target.value,
                                  })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold mb-2">ID Discord *</label>
                              <input
                                type="text"
                                placeholder="Ton ID Discord (ex: 123456789012345678)"
                                value={(answers["contact-discord-id"] || "")}
                                onChange={(e) =>
                                  setAnswers({
                                    ...answers,
                                    "contact-discord-id": e.target.value,
                                  })
                                }
                                className="w-full px-4 py-3 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                              />
                            </div>
                            {answers["contact-discord"] && answers["contact-discord-id"] && (
                              <div className="flex items-center gap-2 text-green-600 text-sm font-semibold animate-in slide-in-from-top-2 duration-300">
                                <Check className="w-5 h-5" />
                                Informations enregistrées
                              </div>
                            )}
                          </div>
                        ) : question.options[0] === "textinput" ? (
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
              Après avoir soumis ce formulaire, tu verras l'annonce du giveaway sur Discord ou recevras une notification directement sur le site.
              Les gagnants seront annoncés et notifiés individuellement.
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
                  <span className="font-semibold">Annonce du Giveaway :</span>{" "}
                  Le giveaway sera annoncé sur Discord et/ou via notification directe sur le site.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  <span className="font-semibold">Réception du Cadeau :</span> Si tu es sélectionné, tu recevras ton cadeau via Discord ou par email selon le type de cadeau.
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
                <p className="text-sm text-muted-foreground">Aucune</p>
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
