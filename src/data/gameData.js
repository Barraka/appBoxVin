export const gameData = {
  title: {
    fr: "Le Dernier Millésime",
    en: "The Last Vintage"
  },

  introduction: {
    fr: {
      title: "Avant-Propos",
      subtitle: "À lire impérativement pour le bon déroulement du jeu",
      paragraphs: [
        "Ce application sera votre guide tout au long de cette aventure 🍷",
        "Utilisez vos méninges pour résoudre les énigmes qui se mettront au travers de votre route et tentez de retrouver la bouteille cachée à l'intérieur de cette malle!",
        "Cliquez sur chaque étape afin d'avoir la possibilité de vous aider d'indices de 3 niveaux différents. Mais attention! Plus vous demandez d'indices, moins vous marquerez des points! Et si malgré les indices, l'une des énigmes continue de vous causer du tort, vous aurez la possibilité de consulter la solution.\nPensez à valider chaque énigme pour passer au suivant.",
        "Pour rappel, votre force physique ne vous sera d'aucune utilité alors soyez précautionneux avec la malle. Hormis la lecture et le calcul, aucune connaissance particulière ne vous sera demandée.",
        "Nous estimons le temps d'une partie à 1h30 mais prenez tout le temps dont vous aurez besoin pour découvrir tous les secrets de cette malle!"
      ],
      closing: ""
    },
    en: {
      title: "Foreword",
      subtitle: "Please read carefully before starting the game",
      paragraphs: [
        "Welcome, dear apprentice winemakers! You are about to embark on a brand new adventure full of flavors and mysteries.",
        "This booklet will be your guide throughout this adventure!",
        "Use your brain to solve the puzzles that will cross your path and try to find the bottle hidden inside this trunk! But if one of the puzzles seems too difficult, don't hesitate to browse through the pages of this booklet for help.",
        "For each puzzle, you will have the option to use hints of 3 different levels.",
        "If, despite the hints, one of the puzzles continues to cause you trouble, you will have the option to view the solution so as not to hinder your progress (but we advise you not to use it too often and to challenge yourself a bit)!",
        "As a reminder, your physical strength will be of no use, so be careful with the trunk. Apart from reading and calculation, no special knowledge will be required.",
        "We estimate the game time to be 1h30, but take all the time you need to discover all the secrets of this trunk!"
      ],
      closing: "Now, apprentice winemakers, it's your turn to play!"
    }
  },

  boxOpening: [
    {
      step: 1,
      fr: "Placer la clé carrée dans les 2 serrures sur la face du labyrinthe et tourner les loquets",
      en: "Place the square key in the 2 locks on the labyrinth face and turn the latches"
    },
    {
      step: 2,
      fr: "Retirer la face avec le labyrinthe (Pas besoin de forcer, s'il y a une résistance, continuer de tourner le loquet qui bloque)",
      en: "Remove the face with the labyrinth (No need to force, if there is resistance, continue turning the blocking latch)"
    },
    {
      step: 3,
      fr: "Ouvrir la fermeture en levant le levier",
      en: "Open the closure by lifting the lever"
    },
    {
      step: 4,
      fr: "Basculer la partie haute de la malle en suivant le sens de la flèche",
      en: "Tilt the upper part of the trunk following the direction of the arrow"
    }
  ],

  puzzles: [
    {
      id: "enigme-1",
      number: "1",
      title: {
        fr: "Le Labyrinthe",
        en: "The Labyrinth"
      },
      hints: [
        {
          fr: "L'objet trouvé dans le petit sac est un aimant. Il devrait vous aider à ouvrir la malle",
          en: "The object found in the small bag is a magnet. It should help you open the trunk"
        },
        {
          fr: "L'une des faces de la malle représente un labyrinthe, mais n'y a-t-il pas un autre élément sur la face opposée ?",
          en: "One side of the trunk shows a labyrinth, but isn't there another element on the opposite side?"
        },
        {
          fr: "La clé gravée sur la face opposée du labyrinthe symbolise le départ",
          en: "The key engraved on the opposite side of the labyrinth symbolizes the starting point"
        }
      ],
      solution: {
        fr: "Séparez-vous en 2 équipes, une à chaque face de la malle. Placez l'aimant sur la clé et reproduisez le labyrinthe grâce aux indications de l'autre équipe",
        en: "Split into 2 teams, one on each side of the trunk. Place the magnet on the key and reproduce the labyrinth using the other team's directions"
      }
    },
    {
      id: "enigme-2",
      number: "2",
      title: {
        fr: "Le niveau des bouteilles",
        en: "The Bottle Levels"
      },
      hints: [
        {
          fr: "Avez-vous observé la gravure des 4 bouteilles attentivement ?",
          en: "Have you carefully observed the engraving of the 4 bottles?"
        },
        {
          fr: "N'avez-vous pas 4 autres bouteilles à disposition ?",
          en: "Don't you have 4 other bottles at your disposal?"
        },
        {
          fr: "Observez attentivement ces 4 petites bouteilles…",
          en: "Carefully observe these 4 small bottles..."
        }
      ],
      solution: {
        fr: "À l'arrière des étiquettes des 4 petites bouteilles, on observe des numéros. Les niveaux des bouteilles et de la gravure sont similaires. En plaçant les bouteilles dans l'ordre de remplissage donné par la gravure, on obtient le code : 5967",
        en: "On the back of the labels of the 4 small bottles, you can see numbers. The levels of the bottles and the engraving are similar. By placing the bottles in the filling order given by the engraving, you get the code: 5967"
      }
    },
    {
      id: "enigme-3a",
      number: "3.a",
      title: {
        fr: "Les étiquettes",
        en: "The Labels"
      },
      hints: [
        {
          fr: "Avez-vous pensé à retourner les étiquettes ?",
          en: "Have you thought about flipping the labels?"
        },
        {
          fr: "Essayez de reconstituer la forme au verso",
          en: "Try to reconstruct the shape on the back"
        },
        {
          fr: "Trier les étiquettes par ordre chronologique pour vous aider",
          en: "Sort the labels in chronological order to help you"
        }
      ],
      solution: {
        fr: "Placer les étiquettes 2 à 2 les unes en dessous des autres par ordre chronologique pour reconstituer le puzzle. La forme représente un entremêlement de chiffres, de haut en bas : 6258",
        en: "Place the labels 2 by 2, one below the other, in chronological order to reconstruct the puzzle. The shape represents intertwined numbers, from top to bottom: 6258"
      }
    },
    {
      id: "enigme-3b",
      number: "3.b",
      title: {
        fr: "Le poème du vignoble",
        en: "The Vineyard Poem"
      },
      hints: [
        {
          fr: "Certains noms de ce poème ne vous sont-ils pas familiers ?",
          en: "Aren't some names in this poem familiar to you?"
        },
        {
          fr: "Observez bien les affiches à disposition",
          en: "Look carefully at the posters available"
        },
        {
          fr: "Concentrez vous sur l'affiche de la taille des bouteilles",
          en: "Focus on the bottle sizes poster"
        }
      ],
      solution: {
        fr: "Certains noms du poème sont en réalité des noms de tailles de bouteilles. En prenant le nombre associé à chaque nom sur l'affiche, par ordre chronologique d'apparition dans le texte, cela donne le code : 75364",
        en: "Some names in the poem are actually names of bottle sizes. By taking the number associated with each name on the poster, in chronological order of appearance in the text, you get the code: 75364"
      }
    },
    {
      id: "enigme-4",
      number: "4",
      title: {
        fr: "Les cépages",
        en: "The Grape Varieties"
      },
      hints: [
        {
          fr: "Pour commencer, observer bien tous les éléments autour de vous.",
          en: "To start, observe all the elements around you carefully."
        },
        {
          fr: "3 adjectifs vont vous aider. Continuez de les chercher autour de vous.",
          en: "3 adjectives will help you. Keep looking for them around you."
        },
        {
          fr: "La gravure sur la devanture de la box devrait vous aider",
          en: "The engraving on the front of the box should help you"
        }
      ],
      solution: {
        fr: "Les 3 adjectifs sur la gravure (Généreux – Convivial – Rigoureux) permettent d'identifier 3 vins (Chenin – Viognier – Riesling). La carte des cépages donne les 3 régions de ces vins (Val de Loire – Rhône – Alsace). En se reportant sur la carte de France gravée, on obtient des numéros qui donne le code : 183",
        en: "The 3 adjectives on the engraving (Generous – Convivial – Rigorous) identify 3 wines (Chenin – Viognier – Riesling). The grape variety map gives the 3 regions for these wines (Val de Loire – Rhône – Alsace). By referring to the engraved map of France, you get numbers that give the code: 183"
      }
    },
    {
      id: "enigme-5",
      number: "5",
      title: {
        fr: "Les verres",
        en: "The Glasses"
      },
      hints: [
        {
          fr: "Vous devez identifier 3 verres grâce au poème et au schéma",
          en: "You need to identify 3 glasses using the poem and the diagram"
        },
        {
          fr: "L'un des cadenas ressemble beaucoup au positionnement des 6 verres sur le message…",
          en: "One of the padlocks looks very similar to the positioning of the 6 glasses on the message..."
        },
        {
          fr: "Appuyer sur les boutons du cadenas correspondant aux emplacements des verres.",
          en: "Press the padlock buttons corresponding to the glass positions."
        }
      ],
      solution: {
        fr: "Le positionnement des 3 verres correspond aux boutons du cadenas sur lesquels il faut appuyer. Faites coulisser le loquet en dessous du cadenas pour tester votre combinaison.",
        en: "The positioning of the 3 glasses corresponds to the padlock buttons you need to press. Slide the latch below the padlock to test your combination."
      }
    },
    {
      id: "enigme-6",
      number: "6",
      title: {
        fr: "Les fiches de dégustation",
        en: "The Tasting Sheets"
      },
      hints: [
        {
          fr: "Ces fiches vont vous permettre d'ouvrir la trappe avec les molettes",
          en: "These sheets will help you open the hatch with the dials"
        },
        {
          fr: "Avez-vous lu les annotations de l'oncle dans le coin des fiches ?",
          en: "Have you read Uncle's annotations in the corner of the sheets?"
        },
        {
          fr: "Relisez bien le message d'introduction, il devrait vous aider",
          en: "Read the introduction message carefully, it should help you"
        }
      ],
      solution: {
        fr: "Les annotations de l'oncle permettent de savoir quelle caractéristique sélectionnée sur chaque fiche.\nCos d'Estournel : l'intensité de la robe (oeil) = 5\nCroix de bois René : l'intensité du nez (nez) = 4\nClos Mosny : l'intensité du goût (bouche) = 3",
        en: "Uncle's annotations tell you which characteristic to select on each sheet.\nCos d'Estournel: robe intensity (eye) = 5\nCroix de bois René: nose intensity (nose) = 4\nClos Mosny: taste intensity (mouth) = 3"
      }
    },
    {
      id: "enigme-7",
      number: "7",
      title: {
        fr: "Les tire-bouchons",
        en: "The Corkscrews"
      },
      hints: [
        {
          fr: "Observez bien les différents tire-bouchons",
          en: "Carefully observe the different corkscrews"
        },
        {
          fr: "Une petite marque de couleur se cache sur chaque tire-bouchon",
          en: "A small color mark is hidden on each corkscrew"
        },
        {
          fr: "Chaque marque sur les tire-bouchons correspond à un numéro sur les brevets.",
          en: "Each mark on the corkscrews corresponds to a number on the patents."
        }
      ],
      solution: {
        fr: "Pour chaque tire-bouchon, il faut trouver la marque cachée et se reporter à son brevet pour trouver le numéro correspondant. Chaque tire-bouchon/brevet est associé à une couleur ce qui permettent d'ouvrir le cadenas couleur : 4 6 1 3",
        en: "For each corkscrew, you need to find the hidden mark and refer to its patent to find the corresponding number. Each corkscrew/patent is associated with a color, which allows you to open the color padlock: 4 6 1 3"
      }
    },
    {
      id: "enigme-8",
      number: "8",
      title: {
        fr: "Les arômes",
        en: "The Aromas"
      },
      hints: [
        {
          fr: "Les grappes de raisins trouvés devraient vous aider",
          en: "The grape bunches you found should help you"
        },
        {
          fr: "Chaque bouchon correspond à une catégorie sur la roue des arômes",
          en: "Each cork corresponds to a category on the aroma wheel"
        },
        {
          fr: "Les numéros sur les grappes vous aident à sélectionner les bons arômes sur la roue",
          en: "The numbers on the grape bunches help you select the right aromas on the wheel"
        }
      ],
      solution: {
        fr: "Pour chaque étiquette, placez vous sur la couleurs correspondante de la roue des arômes et comptez en suivant le sens de la flèche. Placez le bouchon correspondant sur la trappe :\n<span style=\"color: #a855f7\">Jacinthe (5)</span> – <span style=\"color: #3b82f6\">Gibier (4)</span> – <span style=\"color: #ef4444\">Amande (18)</span> – <span style=\"color: #22c55e\">Pin (11)</span> – <span style=\"color: #f97316\">Laurier (2)</span>",
        en: "For each label, position yourself on the corresponding color of the aroma wheel and count following the arrow direction. Place the corresponding cork on the hatch:\n<span style=\"color: #a855f7\">Hyacinth (5)</span> – <span style=\"color: #3b82f6\">Game (4)</span> – <span style=\"color: #ef4444\">Almond (18)</span> – <span style=\"color: #22c55e\">Pine (11)</span> – <span style=\"color: #f97316\">Bay leaf (2)</span>"
      }
    }
  ],

  victory: {
    fr: {
      title: "Félicitations",
      congratulations: "Bravo à vous !",
      message: "Vous avez déjoué tous les pièges de l'oncle Gaspard et vous êtes parvenus à trouver la bouteille cachée dans cette mystérieuse malle !",
      tastingTime: "C'est maintenant l'heure de la dégustation !",
      enjoyMessage: "Nous espérons que vous avez apprécié cette expérience inédite !",
      feedbackPrompt: "Si vous avez apprécié, n'hésitez pas nous laisser un commentaire juste ici !",
      transportNote: "Pour faciliter le transport, merci de replacer l'intégralité des éléments de jeu à l'intérieur de la box et de suivre les indications qui vous ont été données lors du retrait de la malle.",
      farewell: "Et maintenant il ne me reste plus qu'à vous souhaiter",
      bonAppetit: "Bonne Dégustation"
    },
    en: {
      title: "Congratulations",
      congratulations: "Well done!",
      message: "You've overcome all of Uncle Gaspard's traps and managed to find the bottle hidden in this mysterious trunk!",
      tastingTime: "It's now time for the tasting!",
      enjoyMessage: "We hope you enjoyed this unique experience!",
      feedbackPrompt: "If you enjoyed it, please leave us a review right here!",
      transportNote: "For transport, please put all game elements back inside the box and follow the instructions given when you picked up the trunk.",
      farewell: "And now, all that's left is to wish you",
      bonAppetit: "Enjoy Your Tasting"
    }
  },

  feedbackUrl: "https://g.page/r/escape-yourself/review"
}
