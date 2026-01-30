// js/bjcp-2021.js

// 1. ELENCO STILI (BJCP 2021 Corretto + Local Styles)
export const bjcpCatalog = [
    {
        family: "1. Standard American Beer",
        styles: ["1A. American Light Lager", "1B. American Lager", "1C. Cream Ale", "1D. American Wheat Beer"]
    },
    {
        family: "2. International Lager",
        styles: ["2A. International Pale Lager", "2B. International Amber Lager", "2C. International Dark Lager"]
    },
    {
        family: "3. Czech Lager",
        styles: ["3A. Czech Pale Lager", "3B. Czech Premium Pale Lager", "3C. Czech Amber Lager", "3D. Czech Dark Lager"]
    },
    {
        family: "4. Pale Malty European Lager",
        styles: ["4A. Munich Helles", "4B. Festbier", "4C. Helles Bock"]
    },
    {
        family: "5. Pale Bitter European Beer",
        styles: ["5A. German Leichtbier", "5B. Kölsch", "5C. German Helles Exportbier", "5D. German Pils"]
    },
    {
        family: "6. Amber Malty European Lager",
        styles: ["6A. Märzen", "6B. Rauchbier", "6C. Dunkles Bock"]
    },
    {
        family: "7. Amber Bitter European Beer",
        styles: ["7A. Vienna Lager", "7B. Altbier"] 
    },
    {
        family: "8. Dark European Lager",
        styles: ["8A. Munich Dunkel", "8B. Schwarzbier"]
    },
    {
        family: "9. Strong European Beer",
        styles: ["9A. Doppelbock", "9B. Eisbock", "9C. Baltic Porter"]
    },
    {
        family: "10. German Wheat Beer",
        styles: ["10A. Weissbier", "10B. Dunkles Weissbier", "10C. Weizenbock"]
    },
    {
        family: "11. British Bitter",
        styles: ["11A. Ordinary Bitter", "11B. Best Bitter", "11C. Strong Bitter"]
    },
    {
        family: "12. Pale Commonwealth Beer",
        styles: ["12A. British Golden Ale", "12B. Australian Sparkling Ale", "12C. English IPA"]
    },
    {
        family: "13. Brown British Beer",
        styles: ["13A. Dark Mild", "13B. British Brown Ale", "13C. English Porter"]
    },
    {
        family: "14. Scottish Ale",
        styles: ["14A. Scottish Light", "14B. Scottish Heavy", "14C. Scottish Export"]
    },
    {
        family: "15. Irish Beer",
        styles: ["15A. Irish Red Ale", "15B. Irish Stout", "15C. Irish Extra Stout"]
    },
    {
        family: "16. Dark British Beer",
        styles: ["16A. Sweet Stout", "16B. Oatmeal Stout", "16C. Tropical Stout", "16D. Foreign Extra Stout"]
    },
    {
        family: "17. Strong British Ale",
        styles: ["17A. British Strong Ale", "17B. Old Ale", "17C. Wee Heavy", "17D. English Barleywine"]
    },
    {
        family: "18. Pale American Ale",
        styles: ["18A. Blonde Ale", "18B. American Pale Ale"]
    },
    {
        family: "19. Amber and Brown American Beer",
        styles: ["19A. American Amber Ale", "19B. California Common", "19C. American Brown Ale"]
    },
    {
        family: "20. American Porter and Stout",
        styles: ["20A. American Porter", "20B. American Stout", "20C. Imperial Stout"]
    },
    {
        family: "21. IPA",
        styles: ["21A. American IPA", "21B. Specialty IPA", "21C. Hazy IPA"]
    },
    {
        family: "22. Strong American Ale",
        styles: ["22A. Double IPA", "22B. American Strong Ale", "22C. American Barleywine", "22D. Wheatwine"]
    },
    {
        family: "23. European Sour Ale",
        styles: ["23A. Berliner Weisse", "23B. Flanders Red Ale", "23C. Oud Bruin", "23D. Lambic", "23E. Gueuze", "23F. Fruit Lambic", "23G. Gose"]
    },
    {
        family: "24. Belgian Ale",
        styles: ["24A. Witbier", "24B. Belgian Pale Ale", "24C. Bière de Garde"]
    },
    {
        family: "25. Strong Belgian Ale",
        styles: ["25A. Belgian Blond Ale", "25B. Saison", "25C. Belgian Golden Strong Ale"]
    },
    {
        family: "26. Trappist Ale",
        styles: ["26A. Trappist Single", "26B. Belgian Dubbel", "26C. Belgian Tripel", "26D. Belgian Dark Strong Ale"]
    },
    {
        family: "27. Historical Beer",
        styles: ["27. Historical Beer"]
    },
    {
        family: "28. American Wild Ale",
        styles: ["28A. Brett Beer", "28B. Mixed-Fermentation Sour Beer", "28C. Wild Specialty Beer"]
    },
    {
        family: "29. Fruit Beer",
        styles: ["29A. Fruit Beer", "29B. Fruit and Spice Beer", "29C. Specialty Fruit Beer"]
    },
    {
        family: "30. Spiced Beer",
        styles: ["30A. Spice, Herb, or Vegetable Beer", "30B. Autumn Seasonal Beer", "30C. Winter Seasonal Beer"]
    },
    {
        family: "31. Alternative Fermentables",
        styles: ["31A. Alternative Grain Beer", "31B. Alternative Sugar Beer"]
    },
    {
        family: "32. Smoked Beer",
        styles: ["32A. Classic Style Smoked Beer", "32B. Specialty Smoked Beer"]
    },
    {
        family: "33. Wood Beer",
        styles: ["33A. Wood-Aged Beer", "33B. Specialty Wood-Aged Beer"]
    },
    {
        family: "34. Specialty Beer",
        styles: ["34A. Commercial Specialty Beer", "34B. Mixed-Style Beer", "34C. Experimental Beer"]
    },
    {
        family: "X. Local Styles (Appendix B)",
        styles: ["X1. Dorada Pampeana", "X2. IPA Argenta", "X3. Italian Grape Ale", "X4. Catharina Sour", "X5. New Zealand Pilsner"]
    }
];

// 2. REGOLE SPECIALI DI UI
export const specialStyleRules = {
    // 9A. Doppelbock (MODIFICATO: Default Dark)
    "9A": {
        type: "options",
        label: "Variante Colore:",
        choices: ["Pale", "Dark"],
        default: "Dark" // <--- NUOVO CAMPO
    },

    // 21B. Specialty IPA
    "21B": {
        type: "complex_ipa",
        dropdownLabel: "Sotto-famiglia:",
        dropdownOptions: ["", "Belgian IPA", "Black IPA", "Brown IPA", "Brut IPA", "Red IPA", "Rye IPA", "White IPA"],
        strengthLabel: "Forza:",
        strengthOptions: ["Session", "Standard", "Double"],
        defaultStrength: "Standard",
        textLabel: "Altro / Dettagli:"
    },

    // 23F. Fruit Lambic
    "23F": {
        type: "text_only",
        placeholder: "Es. Ciliegie, Lamponi...",
        hint: "⚠️ Ricorda di specificare la frutta utilizzata!"
    },

    // 24C. Bière de Garde
    "24C": {
        type: "options",
        label: "Variante Colore:",
        choices: ["Blond", "Amber", "Brown"]
    },

    // 25B. Saison
    "25B": {
        type: "complex_saison",
        colorLabel: "Colore:",
        colorOptions: ["Pale", "Dark"],
        strengthLabel: "Forza:",
        strengthOptions: ["Table", "Standard", "Super"],
        defaultStrength: "Standard",
        textLabel: "Note Aggiuntive (Opzionale):"
    },

    // 27. Historical Beer
    "27": {
        type: "dropdown_plus_text",
        dropdownLabel: "Stile Storico:",
        dropdownOptions: ["Kellerbier", "Kentucky Common", "Lichtenhainer", "London Brown Ale", "Piwo Grodziskie", "Pre-Prohibition Lager", "Pre-Prohibition Porter", "Roggenbier", "Sahti"],
        textLabel: "Altro / Dettagli:"
    },

    // Generici
    "28A": { type: "text_only", required: true }, "28B": { type: "text_only", required: true }, "28C": { type: "text_only", required: true },
    "29A": { type: "text_only", required: true }, "29B": { type: "text_only", required: true }, "29C": { type: "text_only", required: true },
    "30A": { type: "text_only", required: true }, "30B": { type: "text_only", required: true }, "30C": { type: "text_only", required: true },
    "31A": { type: "text_only", required: true }, "31B": { type: "text_only", required: true },
    "32A": { type: "text_only", required: true }, "32B": { type: "text_only", required: true },
    "33A": { type: "text_only", required: true }, "33B": { type: "text_only", required: true },
    "34A": { type: "text_only", required: true }, "34B": { type: "text_only", required: true }, "34C": { type: "text_only", required: true }
};