import { DosageFormCategory, PharmacyDossier } from '../types/pharmacy';

export const DOSAGE_FORM_LIST: DosageFormCategory[] = [
  'TABLETS',
  'CAPSULES',
  'SYRUPS',
  'INJECTIONS',
  'OINTMENTS & CREAMS',
  'EYE/EAR DROPS',
  'LIQUID DOSAGE FORMS',
  'TOPICAL PREPARATIONS',
  'INHALATION PRODUCTS',
  'SPECIAL DOSAGE FORMS',
  'SUPPOSITORIES',
  'PARENTERALS & MISC.',
  'PASTES',
  'SOLUTIONS',
  'SUSPENSIONS',
  'GARGLES',
  'MOUTHWASH',
  'POWDERS',
  'NASAL DROPS',
];

export const PHARMACY_DOSSIERS: Record<DosageFormCategory, PharmacyDossier> = {
  TABLETS: {
    category: 'TABLETS',
    shortName: 'Tablets',
    categoryTag: 'Solid Oral Unit Dosage Form',
    image: '/images/dosage-forms/tablets.jpg',
    imageCaption: 'Compressed pharmaceutical tablets in blister packaging with light-resistant protective cavities.',
    definition: 'Tablets are solid pharmaceutical dosage forms containing drug substances with or without suitable diluents, prepared either by compression or molding methods as per USP/BP monographs.',
    classification: [
      'Compressed Tablets (Standard oral)',
      'Film-Coated & Sugar-Coated Tablets',
      'Enteric-Coated Tablets (Delay gastric release)',
      'Extended / Sustained-Release (ER/SR/CR)',
      'Effervescent Tablets (CO2 generating)',
      'Chewable & Sublingual/Buccal Tablets'
    ],
    routesOfAdministration: ['Oral', 'Sublingual', 'Buccal', 'Vaginal (Vaginal Tablets)'],
    commonExcipients: [
      'Diluents / Fillers: Microcrystalline cellulose (Avicel), Lactose, Dicalcium phosphate',
      'Binders: Polyvinylpyrrolidone (Povidone), Starch paste, Gelatin',
      'Disintegrants: Sodium starch glycolate, Croscarmellose sodium, Crospovidone',
      'Glidants & Lubricants: Magnesium stearate, Colloidal silicon dioxide (Aerosil), Stearic acid',
      'Film Coating: Hypromellose (HPMC), Ethylcellulose, Methacrylic acid polymers (Eudragit)'
    ],
    keyAdvantages: [
      'Exact unit dosage with high chemical and physical stability',
      'Convenient, tamper-resistant packaging and high patient compliance',
      'Cost-effective high-speed manufacturing (rotary tablet presses)',
      'Versatile release profiles (immediate, controlled, or pulsed release)'
    ],
    disadvantagesOrLimitations: [
      'Difficult swallowing in pediatric and geriatric dysphagia patients',
      'First-pass hepatic metabolism reduces bioavailability of certain active drugs',
      'Slower onset of therapeutic action compared to parenteral formulations'
    ],
    pharmaceuticalQualityTests: [
      'Uniformity of Dosage Units (Weight variation & Content uniformity)',
      'Tablet Friability Test (Roche Friabilator, NMT 1.0% weight loss)',
      'Tablet Breaking Force / Hardness Test (Monsanto / Erweka tester)',
      'Disintegration Testing (USP Apparatus: 15-30 min for uncoated tablets)',
      'In Vitro Dissolution Testing (USP Apparatus 1 Basket / 2 Paddle)'
    ],
    studentDispensingTips: [
      'Counsel patients never to crush or split enteric-coated or extended-release tablets.',
      'Advise drinking a full glass of water (240 mL) to prevent esophageal adherence.',
      'Check for score lines before recommending half-tablet division.'
    ],
    exampleProducts: [
      {
        productName: 'Paracetamol & Caffeine Tablets',
        strength: '500 mg / 65 mg',
        route: 'Oral (Swallowed whole with water)',
        instructions: 'Take 1 to 2 tablets every 4 to 6 hours as needed for pain or fever. Maximum 8 tablets in 24 hours.',
        sideEffects: 'Rare: skin rash, nausea. Caution: hepatotoxicity with excessive dosage.',
        storage: 'Store below 25°C in a dry place. Protect from moisture and direct light.',
        batch: 'TAB-2025-014',
        expiry: '2027-08',
        rxType: 'OTC',
        warnings: 'Do not take with other acetaminophen-containing medications. Consult doctor if fever persists > 3 days.',
        manufacturer: 'Apex Pharma Laboratories Inc.'
      },
      {
        productName: 'Metformin HCl Extended-Release Tablets',
        strength: '500 mg ER',
        route: 'Oral',
        instructions: 'Take 1 tablet once daily with evening meal. Swallow whole; do not chew or crush.',
        sideEffects: 'Diarrhea, nausea, stomach upset, metallic taste. Rare: lactic acidosis.',
        storage: 'Store between 20°C to 25°C (68°F to 77°F).',
        batch: 'MET-8921-ER',
        expiry: '2027-03',
        rxType: 'Rx Only',
        warnings: 'Take with food to minimize GI distress. Inactive shell may appear in stool.',
        manufacturer: 'Global Bioscience Pharma'
      }
    ]
  },

  CAPSULES: {
    category: 'CAPSULES',
    shortName: 'Capsules',
    categoryTag: 'Enclosed Solid Unit Dosage Form',
    image: '/images/dosage-forms/capsules.webp',
    imageCaption: 'Two-piece hard gelatin capsules with color-coded body and cap containing active pharmaceutical powder.',
    definition: 'Capsules are solid dosage forms in which one or more medicinal and inert substances are enclosed within a small soluble shell, usually composed of gelatin or vegetable polymers like hydroxypropyl methylcellulose (HPMC).',
    classification: [
      'Hard Gelatin Capsules (Two-piece: Cap and Body)',
      'Soft Gelatin Capsules / Softgels (One-piece hermetically sealed)',
      'Vegetarian / HPMC Capsules (Gelatin-free, low moisture)',
      'Delayed-Release & Enteric-Coated Capsule Shells'
    ],
    routesOfAdministration: ['Oral', 'Inhalation (Dry powder inhaler capsule shells)', 'Rectal / Vaginal (Specialized)'],
    commonExcipients: [
      'Shell components: Gelatin Type A/B or Hypromellose, Plasticizers (Glycerin, Sorbitol in softgels)',
      'Colorants & Opacifiers: Titanium dioxide, FD&C dyes, Iron oxides',
      'Fillers & Lubricants: Starch, Lactose, Microcrystalline cellulose, Talc, Magnesium stearate'
    ],
    keyAdvantages: [
      'Effectively masks unpleasant odors and bitter taste of active pharmaceutical ingredients (APIs)',
      'Flexibility in compounding combinations of incompatible powders or mini-tablets',
      'Softgels enhance dissolution and bioavailability of hydrophobic, lipophilic drugs'
    ],
    disadvantagesOrLimitations: [
      'Sensitive to environmental relative humidity (high humidity causes softening, low humidity causes brittleness)',
      'Cannot encapsulate highly soluble effervescent salts or liquids that dissolve gelatin'
    ],
    pharmaceuticalQualityTests: [
      'Weight Variation & Content Uniformity (USP <905>)',
      'Capsule Disintegration Time (USP apparatus: typically within 15-30 min)',
      'Dissolution Testing (USP Basket or Paddle with sinker)',
      'Moisture Content Determination (Karl Fischer titration, 13-16% for hard gelatin)',
      'Microbial Limit Testing for gelatin shell raw material'
    ],
    studentDispensingTips: [
      'Instruct patients to swallow capsules with ample water while in an upright posture.',
      'Check whether beads inside are modified-release before allowing contents to be mixed with applesauce.',
      'Store in airtight containers with desiccant to prevent shell embrittlement or sticking.'
    ],
    exampleProducts: [
      {
        productName: 'Amoxicillin Capsules USP',
        strength: '500 mg',
        route: 'Oral',
        instructions: 'Take 1 capsule orally every 8 hours with or without food. Complete entire course prescribed.',
        sideEffects: 'Diarrhea, mild nausea, rash. Seek emergency care if anaphylaxis occurs.',
        storage: 'Store at 20°C to 25°C (68°F to 77°F). Keep tightly closed in a dry place.',
        batch: 'AMX-4410-C',
        expiry: '2027-05',
        rxType: 'Rx Only',
        warnings: 'Contraindicated in penicillin allergic patients. Complete full course to prevent antibiotic resistance.',
        manufacturer: 'Zenith BioPharma Corp.'
      },
      {
        productName: 'Omeprazole Delayed-Release Capsules',
        strength: '20 mg',
        route: 'Oral',
        instructions: 'Take 1 capsule once daily in the morning, 30 to 60 minutes before breakfast.',
        sideEffects: 'Headache, abdominal pain, flatulence, hypomagnesemia on prolonged use.',
        storage: 'Store between 15°C to 30°C. Protect from moisture and light.',
        batch: 'OMP-7729',
        expiry: '2026-12',
        rxType: 'OTC',
        warnings: 'Do not chew or crush pellets inside the capsule. Swallow intact.',
        manufacturer: 'TheraCare Laboratories'
      }
    ]
  },

  SYRUPS: {
    category: 'SYRUPS',
    shortName: 'Syrups',
    categoryTag: 'Aqueous Viscous Oral Liquid',
    image: 'https://images.pexels.com/photos/36854177/pexels-photo-36854177.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    imageCaption: 'Viscous oral medicinal syrup being dispensed with calibrated pharmaceutical spoon/cup.',
    definition: 'Syrups are concentrated aqueous solutions of sugar or sugar substitutes with or without flavoring agents and medicinal substances. Simple Syrup USP contains approximately 85% w/v (65% w/w) sucrose, imparting high osmotic pressure and self-preserving properties.',
    classification: [
      'Simple Syrup (85% w/v sucrose aqueous solution)',
      'Medicated Syrups (Antitussives, Antihistamines, Antibiotics)',
      'Flavored / Non-Medicated Syrups (Vehicle for compounding)',
      'Sugar-Free Syrups (Formulated with Sorbitol, Glycerin, Aspartame, or Sucralose for diabetics)'
    ],
    routesOfAdministration: ['Oral'],
    commonExcipients: [
      'Sweeteners & Viscosity builders: Sucrose, Sorbitol 70%, High fructose corn syrup, Glycerol',
      'Antimicrobial Preservatives: Methylparaben, Propylparaben, Sodium benzoate, Potassium sorbate',
      'Flavoring & Colorants: Cherry, Orange, Peppermint, FD&C Certified Red/Yellow food coloring',
      'Buffers: Citric acid, Sodium citrate (pH stability 4.5 - 6.5)'
    ],
    keyAdvantages: [
      'Ideal for pediatric and geriatric patients who cannot swallow solid pills',
      'High sucrose concentration masks bitter, nauseous medicinal active compounds',
      'High osmotic pressure prevents microbial proliferation in properly sealed bottles'
    ],
    disadvantagesOrLimitations: [
      'High sugar concentration unsuitable for uncontrolled diabetic patients without sugar-free alternatives',
      'Potential risk of cap-locking due to sucrose crystallization on the neck of bottles',
      'Susceptible to fermentation or fungal growth if diluted or improperly stored'
    ],
    pharmaceuticalQualityTests: [
      'Specific Gravity and Density measurement (Hydrometer or Pycnometer, ~1.313 for Simple Syrup)',
      'Viscosity testing (Brookfield or Ostwald Viscometer)',
      'pH Determination (Electrometric pH meter)',
      'Microbial Enumeration & Total Yeast/Mold Count',
      'Active Ingredient Assay by HPLC / UV-Vis Spectrophotometry'
    ],
    studentDispensingTips: [
      'Always supply a calibrated oral dosing syringe or medicinal spoon; never household teaspoons.',
      'Check if formulation contains sorbitol which can cause osmotic diarrhea in excessive quantities.',
      'Instruct parents to wipe bottle threads to prevent bacterial growth and cap locking.'
    ],
    exampleProducts: [
      {
        productName: 'Dextromethorphan HBr Cough Syrup',
        strength: '15 mg / 5 mL',
        route: 'Oral',
        instructions: 'Adults: Take 10 mL every 6 to 8 hours as needed for dry cough. Do not exceed 40 mL in 24 hours.',
        sideEffects: 'Drowsiness, dizziness, nausea, mild sedation.',
        storage: 'Store at 20°C to 25°C (68°F to 77°F). Do not refrigerate. Protect from freezing.',
        batch: 'SYR-9801-D',
        expiry: '2027-02',
        rxType: 'OTC',
        warnings: 'Do not use in patients taking MAO inhibitors. Keep out of reach of children.',
        manufacturer: 'Vanguard Remedies Inc.'
      },
      {
        productName: 'Cetirizine HCl Pediatric Oral Syrup',
        strength: '5 mg / 5 mL',
        route: 'Oral',
        instructions: 'Children 2-6 years: 2.5 mL once daily. Children 6+ years: 5 mL once daily. Use calibrated cup.',
        sideEffects: 'Mild drowsiness, dry mouth, headache.',
        storage: 'Store between 15°C and 30°C in original amber container.',
        batch: 'CET-3012',
        expiry: '2026-10',
        rxType: 'OTC',
        warnings: 'Shake gently before administration. Close cap tightly after each use.',
        manufacturer: 'MediHealth Pediatric Care'
      }
    ]
  },

  INJECTIONS: {
    category: 'INJECTIONS',
    shortName: 'Injections & Syringes',
    categoryTag: 'Sterile Parenteral Formulation',
    image: 'https://images.pexels.com/photos/5922104/pexels-photo-5922104.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    imageCaption: 'Calibrated hypodermic syringe balanced next to sterile multidose vaccine and therapeutic vials.',
    definition: 'Injections are sterile, pyrogen-free preparations intended for parenteral administration through one or more layers of skin or mucous membrane via hypodermic needles, catheters, or jet injectors.',
    classification: [
      'Solutions for Injection (Aqueous or non-aqueous clear liquids)',
      'Dry Powders for Reconstitution (Lyophilized freeze-dried cakes)',
      'Injectable Suspensions (Sterile microcrystalline suspensions, e.g., Depo-Provera)',
      'Injectable Emulsions (e.g., Propofol, Total parenteral lipid emulsions)',
      'Prefilled Syringes & Auto-injectors (Epinephrine EpiPen, Insulin pens)'
    ],
    routesOfAdministration: [
      'Intravenous (IV) - Rapid 100% bioavailability, bolus or infusion',
      'Intramuscular (IM) - Deltoid, gluteus medius, vastus lateralis',
      'Subcutaneous (SC / Sub-Q) - Adipose tissue, abdomen, thigh',
      'Intradermal (ID) - Tuberculin Mantoux, allergy skin tests',
      'Specialized: Intrathecal, Epidural, Intra-articular, Intra-cardiac'
    ],
    commonExcipients: [
      'Vehicles: Water for Injection (WFI), Bacteriostatic WFI, Sterile sesame oil or ethyl oleate',
      'Tonicity Adjusters: Sodium chloride (0.9%), Dextrose (5%), Mannitol',
      'Buffers: Acetate, Phosphate, Citrate buffers (physiological pH ~7.4)',
      'Preservatives: Benzyl alcohol (0.9%), Phenol, Chlorobutanol, Parabens (contraindicated in neonates)',
      'Antioxidants: Sodium metabisulfite, Ascorbic acid, EDTA'
    ],
    keyAdvantages: [
      'Immediate therapeutic onset in emergency situations (anaphylaxis, cardiac arrest, status epilepticus)',
      'Complete (100%) bioavailability by direct entry into systemic circulation (IV route)',
      'Applicable in unconscious, uncooperative, vomiting, or fasting patients',
      'Enables administration of drugs destroyed by gastric acid or digestive enzymes (Insulin, Heparin, Monoclonal Antibodies)'
    ],
    disadvantagesOrLimitations: [
      'Invasive, causes discomfort and anxiety in patients (needle phobia)',
      'Once injected, drug removal or reversal is difficult or impossible',
      'Strict requirement for absolute sterility and absence of bacterial endotoxins; high manufacturing cost',
      'Requires trained healthcare personnel and aseptic administration protocol'
    ],
    pharmaceuticalQualityTests: [
      'Sterility Testing (Membrane Filtration & Direct Inoculation, USP <71>)',
      'Bacterial Endotoxins Test (Limulus Amebocyte Lysate / LAL Test, USP <85>)',
      'Particulate Matter Testing (Light Obscuration & Microscopic Particle Count, USP <788>)',
      'Tonicity and Osmolality Determination (Freezing point depression osmometer, ~290 mOsm/kg)',
      'Container-Closure Integrity (CCI) & Leak Testing (Vacuum decay or dye ingress)'
    ],
    studentDispensingTips: [
      'Verify needle gauge and needle length based on route: 18-20G for draw, 21-23G for IM, 25-30G for SC/ID.',
      'Check visual clarity before dispensing: discard immediately if turbidity, discoloration, or precipitates are detected in solutions.',
      'Never use multidose vials containing benzyl alcohol preservative in neonates (Gasping syndrome).',
      'For reconstituted antibiotics, note exact time of reconstitution, diluent used, and beyond-use date (BUD).'
    ],
    exampleProducts: [
      {
        productName: 'Insulin Glargine Injection (rDNA origin)',
        strength: '100 units / mL (3 mL SoloStar prefilled pen)',
        route: 'Subcutaneous (SC) injection into abdomen, thigh, or upper arm',
        instructions: 'Inject subcutaneously once daily at the same time each day. Rotate injection sites within chosen area.',
        sideEffects: 'Hypoglycemia, injection site lipodystrophy, peripheral edema, allergic reactions.',
        storage: 'Store unopened in refrigerator (2°C to 8°C). Do not freeze. In-use pen stable at room temp (<30°C) for 28 days.',
        batch: 'INS-9941-GL',
        expiry: '2026-11',
        rxType: 'Rx Only',
        warnings: 'DO NOT administer intravenously or via insulin pump. Do not dilute or mix with other insulins.',
        manufacturer: 'Apex Biologics & Vaccines Ltd'
      },
      {
        productName: 'Ceftriaxone for Injection USP',
        strength: '1 g / Vial (Powder for Reconstitution)',
        route: 'Intramuscular (IM) or Intravenous (IV)',
        instructions: 'Reconstitute with 1% Lidocaine for IM or Sterile WFI for IV infusion over 30 minutes.',
        sideEffects: 'Pain at injection site, diarrhea, elevated transaminases, thrombophlebitis.',
        storage: 'Store dry powder below 25°C. Protect from light. Use reconstituted solution within 24 hours at room temp.',
        batch: 'CFT-6218-ST',
        expiry: '2027-04',
        rxType: 'Rx Only',
        warnings: 'Do not mix or co-infuse with calcium-containing IV solutions (risk of precipitation in lungs and kidneys).',
        manufacturer: 'Hospital Parenteral Formulations Inc.'
      }
    ]
  },

  'OINTMENTS & CREAMS': {
    category: 'OINTMENTS & CREAMS',
    shortName: 'Ointments & Creams',
    categoryTag: 'Semisolid Dermatological Dosage Form',
    image: 'https://images.pexels.com/photos/12969381/pexels-photo-12969381.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    imageCaption: 'Pharmaceutical aluminum collapsible tubes and cosmetic topical dermatology creams.',
    definition: 'Ointments and creams are semisolid preparations intended for external application to the skin or mucous membranes. Ointments typically contain hydrocarbon bases with >50% lipids, while creams are multiphase emulsions (oil-in-water or water-in-oil) containing >20% water and volatiles.',
    classification: [
      'Oleaginous / Hydrocarbon Bases (White petrolatum, paraffin)',
      'Absorption Bases (Anhydrous lanolin, Aquaphor)',
      'Water-Removable Bases (O/W creams, vanishing cream)',
      'Water-Soluble Bases (Polyethylene glycol / PEG ointments)',
      'Hydrophobic W/O Creams (Cold cream type, protective barriers)'
    ],
    routesOfAdministration: ['Topical (Cutaneous)', 'Rectal', 'Vaginal', 'Nasal mucous membrane'],
    commonExcipients: [
      'Bases: White soft paraffin, Liquid paraffin, Cetostearyl alcohol, Stearic acid',
      'Emulsifiers: Polysorbate 60/80 (Tween), Sorbitan monostearate (Span), Sodium lauryl sulfate',
      'Humectants: Glycerin, Propylene glycol',
      'Preservatives: Methylparaben, Propylparaben, Chlorocresol',
      'Skin penetration enhancers: Oleic acid, Dimethyl sulfoxide (DMSO)'
    ],
    keyAdvantages: [
      'Direct localized therapy with reduced systemic adverse effects',
      'Ointments provide excellent occlusive emollient barrier, locking in skin moisture',
      'O/W creams are cosmetically elegant, non-greasy, and easily washed off with water'
    ],
    disadvantagesOrLimitations: [
      'Ointments can feel greasy, stain clothing, and are difficult to remove from hairy areas',
      'Creams require chemical preservatives to prevent bacterial and fungal spoilage',
      'Risk of contact dermatitis or sensitization to emulsifiers and fragrances'
    ],
    pharmaceuticalQualityTests: [
      'Rheological Behavior & Viscosity (Cone and plate or Helipath viscometer)',
      'Spreadability & Extrudability from collapsible tubes',
      'Content Uniformity & Homogeneity (Grindometer fineness of dispersion)',
      'In Vitro Skin Permeation testing (Franz Diffusion Cell)',
      'Microbial Limit & Preservative Efficacy Testing (USP <51>)'
    ],
    studentDispensingTips: [
      'Use the Fingertip Unit (FTU) rule: 1 FTU (~0.5g) covers both hands of an adult.',
      'Creams are favored for weeping, acute eczema; ointments for dry, chronic, scaly lesions.',
      'Instruct patients to wash hands before and after application.'
    ],
    exampleProducts: [
      {
        productName: 'Hydrocortisone 1% Topical Cream',
        strength: '1.0% w/w (30 g tube)',
        route: 'Topical cutaneous application',
        instructions: 'Apply sparingly to affected skin area 2 to 3 times daily. Rub in gently until absorbed.',
        sideEffects: 'Skin burning, irritation, dry skin, skin thinning on prolonged excessive usage.',
        storage: 'Store at 20°C to 25°C. Do not freeze. Keep tube tightly closed.',
        batch: 'HYD-5509-CR',
        expiry: '2027-01',
        rxType: 'OTC',
        warnings: 'For external use only. Avoid contact with eyes. Do not use on broken infected skin without physician oversight.',
        manufacturer: 'DermaCare Laboratories'
      },
      {
        productName: 'Betamethasone Dipropionate Ointment',
        strength: '0.05% w/w (15 g tube)',
        route: 'Topical',
        instructions: 'Apply thin layer once or twice daily. Do not apply under occlusive dressings unless instructed.',
        sideEffects: 'Folliculitis, hypertrichosis, acneiform eruptions, skin atrophy.',
        storage: 'Store between 15°C and 30°C. Protect from excessive heat.',
        batch: 'BTM-1044',
        expiry: '2026-09',
        rxType: 'Rx Only',
        warnings: 'Potent topical corticosteroid. Limit use to consecutive 2 weeks.',
        manufacturer: 'Apex Dermatology Ltd'
      }
    ]
  },

  'EYE/EAR DROPS': {
    category: 'EYE/EAR DROPS',
    shortName: 'Eye & Ear Drops',
    categoryTag: 'Sterile Ophthalmic & Otic Formulations',
    image: 'https://images.pexels.com/photos/35874415/pexels-photo-35874415.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    imageCaption: 'Sterile ophthalmic dropper bottle dispensing calibrated micro-drops.',
    definition: 'Ophthalmic solutions are sterile, particle-free aqueous or oily solutions or suspensions formulated for instillation into the conjunctival sac. Otic preparations are viscous solutions or suspensions instilled into the external auditory canal for localized antibacterial, anti-inflammatory, or ceruminolytic action.',
    classification: [
      'Ophthalmic Solutions (Sterile, isotonic, neutral pH eyedrops)',
      'Ophthalmic Suspensions (Micronized particles < 10 microns to avoid cornea scratching)',
      'Ophthalmic Ointments & Gels (Extended precorneal residence time)',
      'Preservative-Free Unit-Dose Pipettes (Single use for dry eyes / surgery)',
      'Otic Solutions & Ear Drops (Antibiotics, Antifungals, Cerumen softeners)'
    ],
    routesOfAdministration: ['Ophthalmic (Conjunctival sac)', 'Otic (External ear canal)'],
    commonExcipients: [
      'Sterile Vehicle: Purified Water for Injection, Propylene glycol, Glycerin (in otic drops)',
      'Preservatives: Benzalkonium chloride (BAK 0.01%), Polyquaternium-1 (Polyquad), Purite',
      'Tonicity Adjusters: Sodium chloride, Boric acid, Potassium chloride (~0.9% NaCl equivalent)',
      'Viscosity Enhancers: Hydroxypropyl methylcellulose (Hypromellose), Carboxymethylcellulose (CMC), Carbomer',
      'Buffers: Phosphate buffer, Borate buffer (pH 6.5 - 7.8)'
    ],
    keyAdvantages: [
      'Localized ocular delivery avoids first-pass metabolism and systemic toxicities',
      'High target tissue concentration in anterior segment of the eye',
      'Non-invasive administration directly to cornea or auditory canal'
    ],
    disadvantagesOrLimitations: [
      'Rapid nasolacrimal drainage: over 90% of an instilled eye drop is cleared within 2 minutes',
      'Benzalkonium chloride preservative can bind to and damage soft contact lenses',
      'Risk of ocular microbial infection if dropper tip touches eye or eyelashes'
    ],
    pharmaceuticalQualityTests: [
      'Sterility Testing (Pharmacopeial USP <71> criteria)',
      'Ocular Irritancy & Cytotoxicity testing (Draize test alternatives, HET-CAM)',
      'Particulate Matter Determination (Zero macroscopic particles, particle sizing < 10 µm for suspensions)',
      'Osmolality & Tonicity (Target 290 to 310 mOsm/kg)',
      'pH Determination (Electrometric testing: physiological pH tolerance 6.6 to 7.8)'
    ],
    studentDispensingTips: [
      'Crucial rule: "EYE drops can go into the EAR, but EAR drops can NEVER go into the EYE" (ear drops are non-sterile, hypertonic, or acidic).',
      'Instruct patient to apply punctual occlusion (pressing inner corner of eye for 1-2 minutes) to prevent systemic drainage.',
      'Advise removing contact lenses before instilling eyedrops and waiting at least 15 minutes before reinserting.',
      'Check Beyond-Use Date (BUD): Multi-dose eyedrops must be discarded 28 days after opening.'
    ],
    exampleProducts: [
      {
        productName: 'Ciprofloxacin Ophthalmic Solution USP',
        strength: '0.3% w/v (5 mL dropper bottle)',
        route: 'Ophthalmic (Instill into affected eye)',
        instructions: 'Corneal ulcers: 2 drops every 15 minutes for first 6 hours, then 2 drops every 30 minutes. Bacterial conjunctivitis: 1-2 drops every 2 hours while awake.',
        sideEffects: 'Transient burning, white crystalline precipitate on corneal defect, bitter taste.',
        storage: 'Store between 2°C and 25°C. Protect from light. Discard 28 days after first opening.',
        batch: 'CIP-8812-EY',
        expiry: '2026-10',
        rxType: 'Rx Only',
        warnings: 'Sterile formulation. Do not touch dropper tip to eye or fingers. Remove contact lenses during treatment.',
        manufacturer: 'Apex Vision Pharma'
      },
      {
        productName: 'Ofloxacin Otic Solution',
        strength: '0.3% w/v (10 mL)',
        route: 'Otic (For ear use only)',
        instructions: 'Instill 5 to 10 drops into affected ear canal once to twice daily. Lie with affected ear upward for 5 minutes.',
        sideEffects: 'Application site earache, pruritus, dizziness.',
        storage: 'Store at 20°C to 25°C. Do not freeze.',
        batch: 'OFL-4109',
        expiry: '2027-03',
        rxType: 'Rx Only',
        warnings: 'FOR EAR USE ONLY. Warm bottle in hands before instilling to avoid vestibular dizziness.',
        manufacturer: 'Aura Otic Health'
      }
    ]
  },

  'LIQUID DOSAGE FORMS': {
    category: 'LIQUID DOSAGE FORMS',
    shortName: 'Liquid Dosage Forms',
    categoryTag: 'Oral & General Liquid Dispersions',
    image: 'https://images.pexels.com/photos/10022079/pexels-photo-10022079.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    imageCaption: 'Assortment of pharmaceutical liquid dispersions, suspensions, emulsions, and oral solutions in amber bottles.',
    definition: 'Liquid dosage forms encompass pourable pharmaceutical preparations containing active drug substances dispersed or dissolved in suitable vehicles. These include monophasic solutions, elixirs, linctuses, and biphasic systems such as suspensions and emulsions.',
    classification: [
      'Oral Solutions (Monophasic homogeneous liquid systems)',
      'Oral Suspensions (Coarse biphasic dispersions, insoluble particles dispersed in liquid)',
      'Oral Emulsions (Thermodynamically unstable biphasic O/W systems stabilized with emulsifying agents)',
      'Elixirs (Clear, sweetened hydroalcoholic liquids containing 5-40% ethanol)',
      'Linctuses & Gargles (Viscous oral or oropharyngeal liquids)'
    ],
    routesOfAdministration: ['Oral', 'Sublingual', 'Oropharyngeal'],
    commonExcipients: [
      'Suspending Agents: Xanthan gum, Acacia, Tragacanth, Carbomer, Methylcellulose',
      'Emulsifiers: Polysorbate 80, Lecithin, Span 80, Sodium lauryl sulfate',
      'Solvents & Cosolvents: Purified Water, Ethanol (USP), Propylene glycol, Glycerol',
      'Flavoring & Sweeteners: Cherry, Bubblegum, Sucralose, Sodium saccharin',
      'Buffers & Antioxidants: Citric acid, Sodium metabisulfite, Disodium EDTA'
    ],
    keyAdvantages: [
      'Faster absorption rate and bioavailability than compressed solid tablets and capsules',
      'Flexible, adjustable dosing tailored to patient body weight or pediatric surface area',
      'Easiest dosage form for swallowing in infants, elderly, and patients with nasogastric tubes'
    ],
    disadvantagesOrLimitations: [
      'Prone to sedimentation, caking, and phase separation (creaming, cracking in emulsions)',
      'Bulky and fragile glass packaging creates transportation and storage challenges',
      'Shorter shelf life and higher susceptibility to microbial growth than dry solids'
    ],
    pharmaceuticalQualityTests: [
      'Sedimentation Volume Ratio (F = Vu / Vo) & Ease of Redispersibility',
      'Zeta Potential Determination (Colloidal electrical charge, ±30 mV for stable suspension)',
      'Particle Size Distribution (Laser diffraction / Microscopic analysis)',
      'Viscosity & Rheology (Rheometer / Viscometer)',
      'Microbial Contamination & Preservative Content'
    ],
    studentDispensingTips: [
      'CRITICAL: Always affix the auxiliary label "SHAKE WELL BEFORE USE" on all suspensions and emulsions!',
      'Confirm that the measuring device supplied is calibrated in mL (avoid household spoons which vary between 3 to 9 mL).',
      'Check for irreversible caking (hard sediment that cannot be resuspended upon vigorous shaking).'
    ],
    exampleProducts: [
      {
        productName: 'Ibuprofen Pediatric Oral Suspension USP',
        strength: '100 mg / 5 mL (120 mL)',
        route: 'Oral',
        instructions: 'Dosed by child body weight (typically 10 mg/kg every 6 to 8 hours). Shake bottle vigorously before each dose.',
        sideEffects: 'Dyspepsia, stomach upset, nausea. Take with food or milk.',
        storage: 'Store at 20°C to 25°C (68°F to 77°F). Do not freeze.',
        batch: 'IBU-9201-LQ',
        expiry: '2026-12',
        rxType: 'OTC',
        warnings: 'SHAKE WELL BEFORE USE. Do not use in dehydrated children without medical guidance. NSAID warning for GI bleeding.',
        manufacturer: 'Pediatric Solutions Pharma'
      },
      {
        productName: 'Antacid Aluminum & Magnesium Hydroxide with Simethicone',
        strength: '400 mg / 400 mg / 40 mg per 10 mL',
        route: 'Oral',
        instructions: 'Take 10 to 20 mL between meals and at bedtime, or as directed for heartburn.',
        sideEffects: 'Mild laxative effect or constipation (balanced combination), chalky taste.',
        storage: 'Store between 15°C and 30°C. Protect from freezing.',
        batch: 'ANT-7731',
        expiry: '2027-06',
        rxType: 'OTC',
        warnings: 'Shake well before using. Separate administration from other oral medications by at least 2 hours.',
        manufacturer: 'GastroMed Healthcare'
      }
    ]
  },

  'TOPICAL PREPARATIONS': {
    category: 'TOPICAL PREPARATIONS',
    shortName: 'Topical Preparations',
    categoryTag: 'External Cutaneous & Transdermal Applications',
    image: 'https://images.pexels.com/photos/10157940/pexels-photo-10157940.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    imageCaption: 'Topical dermatological formulations, lotions, and therapeutic gels being applied to cutaneous tissue.',
    definition: 'Topical preparations include liquid, semisolid, or solid formulations designed for direct localized cutaneous application to intact or damaged skin, hair, nails, or mucosal surfaces. These include gels, lotions, liniments, collodions, powders, and pastes.',
    classification: [
      'Gels / Jellies (Semisolid systems of organic macromolecules penetrated by a liquid)',
      'Lotions (Fluid suspensions or emulsions formulated for external application)',
      'Pastes (Semisolid preparations with high solid powder content, typically 20-50% e.g., Zinc oxide paste)',
      'Liniments & Lotions (Counter-irritant rubefacient hydroalcoholic solutions)',
      'Collodions & Medicated Paints (Pyroxylin-based flexible films for warts/corns)'
    ],
    routesOfAdministration: ['Topical cutaneous', 'Epicutaneous', 'Oropharyngeal mucosal'],
    commonExcipients: [
      'Gelling Agents: Carbopol (Carbomer 934/940), Hydroxyethyl cellulose (HEC), Sodium alginate',
      'Neutralizing Bases: Triethanolamine (TEA), Sodium hydroxide (for Carbomer gelation)',
      'Penetration Enhancers: Propylene glycol, Isopropyl myristate, Menthol, Camphor',
      'Preservatives & Stabilizers: Chlorhexidine, Benzoic acid, EDTA'
    ],
    keyAdvantages: [
      'Direct target-site delivery minimizing systemic drug exposure',
      'Gels provide pleasant cooling effect on inflamed, burning skin surfaces',
      'Pastes absorb wound exudates and protect peri-wound skin from excoriation'
    ],
    disadvantagesOrLimitations: [
      'Variable skin permeability influenced by stratum corneum hydration and thickness',
      'Gels may dry rapidly and leave a powdery residue on the skin surface',
      'Risk of systemic absorption if applied over large open burned or denuded skin areas'
    ],
    pharmaceuticalQualityTests: [
      'Gel Viscosity & Thixotropy (Yield stress measurement with Cone-and-Plate rheometer)',
      'Skin Irritation & Sensitization Test (Primary Irritation Index / PII)',
      'Bioadhesive Strength & Tackiness',
      'Microbial Contamination & Preservative Challenge Testing'
    ],
    studentDispensingTips: [
      'Ensure clear auxiliary labeling: "FOR EXTERNAL USE ONLY - NOT TO BE TAKEN BY MOUTH".',
      'Never apply rubbing liniments to broken, denuded, or inflamed skin.',
      'Advise patients to allow gel to dry completely before dressing to avoid fabric staining.'
    ],
    exampleProducts: [
      {
        productName: 'Diclofenac Diethylamine Topical Gel',
        strength: '1.16% w/w (Equivalent to 1% Diclofenac Sodium)',
        route: 'Topical cutaneous application',
        instructions: 'Apply 2 g to 4 g gently to the affected painful joint or muscle 3 to 4 times daily. Wash hands after application.',
        sideEffects: 'Local dermatitis, erythema, pruritus, contact eczema.',
        storage: 'Store below 30°C. Do not freeze. Keep tube tightly closed.',
        batch: 'DIC-3310-TP',
        expiry: '2026-11',
        rxType: 'OTC',
        warnings: 'FOR EXTERNAL USE ONLY. Avoid open cuts, mucous membranes, or sun exposure. Do not apply under airtight occlusive bandages.',
        manufacturer: 'Apex Musculoskeletal Care'
      },
      {
        productName: 'Zinc Oxide Compound Paste BP',
        strength: '25% w/w (50 g jar)',
        route: 'Topical',
        instructions: 'Apply generously to diaper rash or irritated skin area after cleaning and drying thoroughly.',
        sideEffects: 'Mild localized skin sensitivity.',
        storage: 'Store at room temperature in a tightly closed container.',
        batch: 'ZNC-7712',
        expiry: '2027-08',
        rxType: 'OTC',
        warnings: 'External use only. Avoid contact with eyes. Thick barrier paste; wipe gently.',
        manufacturer: 'DermaSafe Pharmaceuticals'
      }
    ]
  },

  'INHALATION PRODUCTS': {
    category: 'INHALATION PRODUCTS',
    shortName: 'Inhalation Products',
    categoryTag: 'Pulmonary & Aerosol Drug Delivery Systems',
    image: 'https://images.pexels.com/photos/30425693/pexels-photo-30425693.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    imageCaption: 'Metered dose inhaler (MDI) aerosol device delivering micronized pulmonary bronchodilator medicine.',
    definition: 'Inhalation products are pharmaceutical dosage forms designed to deliver micronized active drug substances directly into the tracheobronchial tree and alveoli via aerosolized droplets or solid micro-particles.',
    classification: [
      'Pressurized Metered Dose Inhalers (pMDIs - Hydrofluoroalkane HFA propellants)',
      'Dry Powder Inhalers (DPIs - Breath-actuated, e.g., Turbuhaler, Diskus, Accuhaler)',
      'Soft Mist Inhalers (SMIs - Propellant-free, e.g., Respimat)',
      'Nebulizer Solutions & Suspensions (Jet, Ultrasonic, and Vibrating Mesh nebulizers)',
      'Nasal Sprays & Aerosols (Targeting nasal mucosa with droplet sizes > 50 µm to avoid deep lung deposition)'
    ],
    routesOfAdministration: ['Inhalation (Pulmonary tracheobronchial)', 'Nasal inhalation'],
    commonExcipients: [
      'Propellants: Hydrofluoroalkanes (HFA-134a, HFA-227ea, zero ozone depletion)',
      'Carriers: Inhalation-grade Coarse α-Lactose Monohydrate (50-100 µm, DPI carrier)',
      'Surfactants: Oleic acid, Sorbitan trioleate, Polyethylene glycol',
      'Cosolvents: Dehydrated Ethanol (USP, solubilizes API in HFA)',
      'Nebulizer vehicle: Sterile 0.9% Sodium Chloride'
    ],
    keyAdvantages: [
      'Rapid bronchodilation within minutes directly at beta-2 adrenergic and muscarinic receptors in airways',
      'Lower systemic drug dose needed compared to oral route, dramatically reducing cardiac side effects',
      'Bypasses gastrointestinal degradation and hepatic first-pass metabolism'
    ],
    disadvantagesOrLimitations: [
      'Requires strict patient hand-breath coordination with standard pMDIs (addressed by spacers or DPIs)',
      'Oropharyngeal deposition causes local side effects (oral candidiasis/thrush with inhaled steroids)',
      'High fraction of drug swallowed if inhalation technique is poor'
    ],
    pharmaceuticalQualityTests: [
      'Aerodynamic Particle Size Distribution (APSD - Next Generation Impactor / NGI or Andersen Cascade Impactor)',
      'Fine Particle Fraction (FPF - particles < 5 µm reaching deep lung alveoli)',
      'Delivered Dose Uniformity (DDU) through the life of the inhaler can',
      'Shot Weight Consistency & Plume Geometry / Spray Pattern (High-speed laser imaging)',
      'Leak Rate & Container Closure Testing for pressurized canisters'
    ],
    studentDispensingTips: [
      'Teach the 4-step MDI technique: Shake -> Exhale fully -> Inhale slowly and deeply while pressing -> Hold breath for 10 seconds.',
      'Always advise patients taking inhaled corticosteroids to rinse mouth with water and spit out after each use to prevent thrush.',
      'Recommend a spacer (holding chamber) for pediatric, elderly, and uncoordinated patients.'
    ],
    exampleProducts: [
      {
        productName: 'Salbutamol / Albuterol Sulfate Inhaler (HFA)',
        strength: '100 mcg / actuation (200 metered actuations)',
        route: 'Oral Inhalation (Bronchodilator)',
        instructions: 'Acute asthma relief: Inhale 1 to 2 puffs every 4 to 6 hours as needed. Shake inhaler well before each puff.',
        sideEffects: 'Fine skeletal muscle tremor, tachycardia, palpitations, headache, hypokalemia at high doses.',
        storage: 'Store below 30°C. Protect from direct frost and sunlight. Do not puncture or burn pressurized canister.',
        batch: 'SAL-1029-INH',
        expiry: '2026-12',
        rxType: 'Rx Only',
        warnings: 'SHAKE WELL BEFORE USE. Seek emergency medical attention if asthma symptoms fail to improve after 2 puffs.',
        manufacturer: 'Apex Respiratory Biopharma'
      },
      {
        productName: 'Budesonide & Formoterol Dry Powder Inhaler',
        strength: '160 mcg / 4.5 mcg per inhalation',
        route: 'Oral Inhalation (Maintenance therapy)',
        instructions: 'Inhale 1 to 2 inhalations twice daily (morning and evening). Rinse mouth with water after use.',
        sideEffects: 'Oral candidiasis (thrush), dysphonia, pharyngitis, mild tachycardia.',
        storage: 'Store at 20°C to 25°C in a dry place. Keep cover closed.',
        batch: 'BUD-6481-DPI',
        expiry: '2027-05',
        rxType: 'Rx Only',
        warnings: 'Rinse mouth and spit after use. DPI is breath-actuated: do not blow into the mouthpiece.',
        manufacturer: 'AeroPulmo Global Inc.'
      }
    ]
  },

  'SPECIAL DOSAGE FORMS': {
    category: 'SPECIAL DOSAGE FORMS',
    shortName: 'Special Dosage Forms',
    categoryTag: 'Novel & Advanced Drug Delivery Systems (NDDS)',
    image: '/images/special_dosage.jpg',
    imageCaption: 'Advanced transdermal therapeutic patches and bioerodible sublingual drug delivery films.',
    definition: 'Special dosage forms represent advanced, targeted, or novel drug delivery systems (NDDS) designed to achieve controlled release kinetics, site-specific targeting, improved patient compliance, or overcome biological barriers.',
    classification: [
      'Transdermal Drug Delivery Systems (TDDS - Matrix & Reservoir skin patches)',
      'Fast-Dissolving Oral Thin Films (ODFs / Wafer films dissolving in seconds)',
      'Subcutaneous Implants & Rods (Etonogestrel contraceptive rods, Zoladex)',
      'Liposomes, Niosomes & Nanoparticles (Doxorubicin PEG-liposomes, mRNA lipid nanoparticles)',
      'Osmotic Drug Delivery Systems (OROS push-pull osmotic pump tablets)'
    ],
    routesOfAdministration: ['Transdermal', 'Sublingual', 'Subdermal implant', 'Intravenous nanocarrier'],
    commonExcipients: [
      'Polymer Matrix: Polyacrylate adhesives, Polyisobutylene, Silicone adhesives, Ethylcellulose',
      'Film Formers: Pullulan, Hydroxypropyl cellulose, Polyvinyl alcohol',
      'Permeation Enhancers: Azone, Terpenes, Propylene glycol monolaurate',
      'Lipids: Phosphatidylcholine, Cholesterol, DSPE-PEG 2000'
    ],
    keyAdvantages: [
      'Maintains constant zero-order therapeutic plasma levels for 24 hours to 7 days',
      'Eliminates peaks and troughs associated with repetitive dosing, minimizing side effects',
      'Allows instantaneous cessation of drug input by simply peeling off the transdermal patch'
    ],
    disadvantagesOrLimitations: [
      'Limited to potent molecules (daily dose < 20 mg) with moderate lipophilicity (LogP 1-3) and low molecular weight (< 500 Da)',
      'Localized contact dermatitis or erythema under patch adhesive',
      'High residual drug remains in discarded patches presenting poisoning hazard to children and pets'
    ],
    pharmaceuticalQualityTests: [
      'In Vitro Drug Release & Dissolution (USP Apparatus 5 Paddle over Disk, USP 6 Cylinder, USP 7 Reciprocating Holder)',
      'Adhesive Peel Adhesion (180° peel test) and Tackiness test (Rolling ball / Probe tack)',
      'Cold Flow testing (Polymer adhesive shear resistance during storage)',
      'Moisture Permeation & Moisture Absorption kinetics'
    ],
    studentDispensingTips: [
      'Counsel patients to rotate patch application sites (e.g., upper arm, chest, flank) to prevent skin irritation.',
      'Instruct to fold used patches in half with adhesive sides touching before disposal in trash.',
      'Do not apply heating pads or take hot baths over patches (heat accelerates drug release causing toxicity).'
    ],
    exampleProducts: [
      {
        productName: 'Fentanyl Transdermal System Patch',
        strength: '25 mcg / hr (Delivering 25 mcg/hour for 72 hours)',
        route: 'Transdermal cutaneous application to flat intact skin',
        instructions: 'Apply 1 patch every 72 hours to clean, dry, hairless skin on upper torso or arm. Press firmly for 30 seconds.',
        sideEffects: 'Respiratory depression, sedation, constipation, nausea, application site erythema.',
        storage: 'Store at 20°C to 25°C. Keep in original sealed pouch until immediate application.',
        batch: 'FNT-9904-TD',
        expiry: '2026-11',
        rxType: 'Controlled Substance',
        warnings: 'SCHEDULE II CONTROLLED DRUG. For opioid-tolerant patients only. Do not expose to heating pads. Dispose by folding sticky sides together.',
        manufacturer: 'Apex Specialty Formulations'
      },
      {
        productName: 'Nicotine Transdermal System Step 1',
        strength: '21 mg / 24 hours (Extended-Release Patch)',
        route: 'Transdermal',
        instructions: 'Apply 1 new patch every morning to clean, dry, non-hairy skin. Wear for 24 hours then remove and discard.',
        sideEffects: 'Vivid dreams, sleep disturbances, skin redness, mild dizziness.',
        storage: 'Store below 25°C. Protect from excessive heat.',
        batch: 'NIC-4821',
        expiry: '2027-07',
        rxType: 'OTC',
        warnings: 'Do not smoke while wearing patch. Remove before MRI scans to avoid skin burns from metallic backing.',
        manufacturer: 'Cessation Therapeutics'
      }
    ]
  },

  SUPPOSITORIES: {
    category: 'SUPPOSITORIES',
    shortName: 'Suppositories & Inserts',
    categoryTag: 'Semisolid/Solid Cavity Insertion Forms',
    image: '/images/suppositories.jpg',
    imageCaption: 'Torpedo-shaped rectal suppositories and vaginal pessaries in sterile protective plastic blister molds.',
    definition: 'Suppositories are solid dosage forms of various sizes and shapes adapted for introduction into the rectal, vaginal, or urethral orifices of the human body. They usually melt, soften, or dissolve at body temperature (37°C) to exert localized or systemic therapeutic action.',
    classification: [
      'Rectal Suppositories (Torpedo/bullet shaped, adult ~2g, pediatric ~1g)',
      'Vaginal Suppositories / Pessaries (Globular or oviform, typically 3-5g)',
      'Urethral Suppositories / Bougies (Slender pencil-like cylinders for local urethral delivery)'
    ],
    routesOfAdministration: ['Rectal', 'Vaginal', 'Urethral'],
    commonExcipients: [
      'Fatty / Oleaginous Bases: Theobroma Oil (Cocoa Butter - exhibits polymorphism α, β, γ), Synthetic triglycerides (Witepsol, Suppocire)',
      'Water-Soluble / Water-Miscible Bases: Glycerinated Gelatin (Gelatin 20%, Glycerin 70%, Water 10%), Polyethylene Glycols (PEG 1000, 4000, 6000 mixtures)',
      'Emulsifying Bases: Tweens, Spans, Glyceryl monostearate'
    ],
    keyAdvantages: [
      'Bypasses approximately 50-70% of first-pass hepatic metabolism via the middle and inferior rectal veins',
      'Crucial alternative in actively vomiting, convulsing (status epilepticus), or uncooperative pediatric patients',
      'Provides targeted treatment for local conditions: hemorrhoids, proctitis, vaginal candidiasis'
    ],
    disadvantagesOrLimitations: [
      'Patient aversion, cultural hesitance, and inconvenience of administration',
      'Erratic rectal absorption influenced by fecal contents, pH, and small mucosal fluid volume (~3 mL)',
      'Cocoa butter polymorphic transitions: overheating during compounding can lower melting point below room temp'
    ],
    pharmaceuticalQualityTests: [
      'Melting Range / Liquefaction Time determination (Target < 30 min at 37°C in water bath)',
      'Breaking Force / Hardness / Mechanical Strength (Erweka suppository hardness tester, > 1.5 - 2 kg)',
      'Disintegration Test for water-soluble PEG suppositories',
      'Uniformity of Mass and Active Drug Content',
      'Ash content & Acid/Saponification value of suppository base'
    ],
    studentDispensingTips: [
      'Instruct patient to unwrap the protective plastic/foil shell before insertion (common error!).',
      'Moisten PEG-based suppositories with clean water before insertion to avoid stinging and mucosal dehydration.',
      'Advise patient to lie down on their side with one knee bent for 10-15 minutes after insertion to prevent expulsion.',
      'Store refrigerated (2°C - 8°C) in warm climates so they do not melt into liquid.'
    ],
    exampleProducts: [
      {
        productName: 'Paracetamol / Acetaminophen Rectal Suppositories',
        strength: '250 mg (Pediatric Suppository)',
        route: 'Rectal insertion',
        instructions: 'Insert 1 suppository rectally every 6 hours as needed for fever in vomiting infants. Unwrap protective foil first.',
        sideEffects: 'Mild rectal irritation, rare anal spasm.',
        storage: 'Store between 2°C and 15°C. Keep away from direct sunlight. Do not freeze.',
        batch: 'SUP-4491-PC',
        expiry: '2026-10',
        rxType: 'OTC',
        warnings: 'FOR RECTAL USE ONLY - UNWRAP FOIL BEFORE INSERTION. Do not exceed 4 doses in 24 hours.',
        manufacturer: 'Pediatric Care Laboratories'
      },
      {
        productName: 'Clotrimazole Vaginal Pessary with Applicator',
        strength: '500 mg (Single-Dose Pessary)',
        route: 'Vaginal insertion',
        instructions: 'Insert 1 pessary high into the vagina at bedtime using the enclosed applicator as a single treatment.',
        sideEffects: 'Mild vaginal burning, pruritus, pelvic cramping.',
        storage: 'Store below 25°C in a dry place.',
        batch: 'CLT-8820',
        expiry: '2027-03',
        rxType: 'OTC',
        warnings: 'For vaginal use only. Avoid intercourse during treatment. Do not use tampons.',
        manufacturer: 'GynePharma Specialists'
      }
    ]
  },

  'PARENTERALS & MISC.': {
    category: 'PARENTERALS & MISC.',
    shortName: 'Large Volume Parenterals & Misc.',
    categoryTag: 'Large Volume Intravenous Infusions & Dialysis',
    image: 'https://images.pexels.com/photos/6129691/pexels-photo-6129691.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    imageCaption: 'Hospital Large Volume Parenteral (LVP) intravenous infusion bag with calibrated drip chamber line.',
    definition: 'Large Volume Parenterals (LVPs) are single-dose sterile injections packaged in containers containing > 100 mL intended for intravenous infusion to replenish fluids, electrolytes, calories, or serve as continuous medication carrier vehicles. Miscellaneous dosage forms include peritoneal dialysis solutions, irrigation fluids, and diagnostic radiopharmaceuticals.',
    classification: [
      'Crystalloid Solutions (0.9% Normal Saline, 5% Dextrose D5W, Ringer\'s Lactate)',
      'Colloid Solutions (Hydroxyethyl starch, Albumin 5% / 25%, Dextran)',
      'Total Parenteral Nutrition (TPN 3-in-1: Amino acids, Dextrose, Lipid emulsion)',
      'Peritoneal Dialysis Solutions (Hypertonic dextrose exchanges)',
      'Surgical Irrigation Solutions (Sterile WFI, Glycine 1.5% for TURP)'
    ],
    routesOfAdministration: ['Intravenous Infusion (IV Piggyback or continuous line)', 'Intraperitoneal (Dialysis)', 'Surgical Irrigation'],
    commonExcipients: [
      'Vehicles: Water for Injection (USP WFI, sterile and pyrogen-free)',
      'Osmotic Agents: Sodium chloride, D-Glucose anhydrous, Sodium lactate, Potassium chloride',
      'Container Materials: Flexible polyvinyl chloride (PVC) with DEHP-free plasticizers, Polyolefin / EVA bags',
      'Zero Preservatives: Preservatives are strictly prohibited in Large Volume Parenterals due to massive volume toxicity'
    ],
    keyAdvantages: [
      'Rapidly restores extracellular fluid volume, hemodynamic stability, and electrolyte balance in shock and sepsis',
      'Enables continuous titration of critical vasoactive medications (Norepinephrine, Dopamine)',
      'Provides complete caloric and nutritional life support in gastrointestinal failure (TPN)'
    ],
    disadvantagesOrLimitations: [
      'Risk of circulatory fluid overload (hypervolemia), pulmonary edema, and congestive heart failure',
      'Risk of thrombophlebitis, catheter-related bloodstream infections (CRBSI), and air embolism',
      'Preservative-free formulation means zero antimicrobial protection if contaminated during compounding'
    ],
    pharmaceuticalQualityTests: [
      'Sterility Testing (Pharmacopeial USP <71> large volume protocol)',
      'Bacterial Endotoxin Limit (USP <85>, extremely stringent: < 0.5 EU/mL for LVP water)',
      'Particulate Matter Inspection (Subvisible particles: USP <788> light obscuration test)',
      'Osmolarity / Tonicity Verification (Osmometer, calculated theoretical mOsm/L vs measured)',
      'Integrity of Primary Container & Port Seal under hydraulic pressure'
    ],
    studentDispensingTips: [
      'NEVER add preservatives to Large Volume Parenterals: a 1000 mL bag would deliver a fatal toxic dose of preservative.',
      'Always inspect the bag against black and white backgrounds for particulate floaters, discoloration, and port leaks before dispensing.',
      'Check IV drug compatibility chart before piggybacking drugs into dextrose or saline lines (e.g., Ceftriaxone + Calcium = lethal precipitate).',
      'Ensure infusion rate calculations: Drops/min = (Total Volume in mL × Drop Factor) / (Time in minutes).'
    ],
    exampleProducts: [
      {
        productName: 'Sodium Chloride 0.9% IV Infusion (Normal Saline)',
        strength: '0.9% w/v (1000 mL sterile flexible infusion bag)',
        route: 'Intravenous (IV) Infusion via calibrated administration set',
        instructions: 'Administer intravenously as prescribed by physician according to hydration status, central venous pressure, and electrolyte panel.',
        sideEffects: 'Hypervolemia, fluid overload, peripheral edema, hyperchloremic metabolic acidosis with excessive infusion.',
        storage: 'Store between 15°C and 25°C. Protect from freezing and excessive heat. Do not use if container leaks or liquid is cloudy.',
        batch: 'NS-9011-LVP',
        expiry: '2027-09',
        rxType: 'Hospital Use Only',
        warnings: 'STERILE & NON-PYROGENIC. Single use only; discard unused portion immediately. Do not connect flexible bags in series to avoid air embolism.',
        manufacturer: 'Baxter Parenteral Solutions'
      },
      {
        productName: 'Dextrose 5% in Water (D5W) Infusion USP',
        strength: '5% w/v (500 mL)',
        route: 'Intravenous Infusion',
        instructions: 'Infuse via IV line as directed for fluid replenishment and caloric supply (170 kcal/L).',
        sideEffects: 'Hyperglycemia, hypokalemia, osmotic diuresis, vein irritation.',
        storage: 'Store at 20°C to 25°C. Single use.',
        batch: 'D5W-3301',
        expiry: '2027-04',
        rxType: 'Hospital Use Only',
        warnings: 'Isotonic in container, but acts as hypotonic free water once dextrose is metabolized. Monitor blood glucose.',
        manufacturer: 'Apex Parenterals Ltd'
      }
    ]
  },

  PASTES: {
    category: 'PASTES',
    shortName: 'Pastes',
    categoryTag: 'Stiff Semisolid High-Solid Dermatological Form',
    image: '/images/dosage-forms/pastes.jpg',
    imageCaption: 'Thick white zinc oxide pharmaceutical paste in a wide-mouth amber jar being lifted with a compounding spatula next to a collapsible tube.',
    definition: 'Pastes are stiff, semisolid preparations containing a high proportion (typically 20–50%) of finely powdered solid ingredients dispersed in a fatty base (e.g., white petrolatum) or an aqueous mucilaginous base. Intended for external application to skin or mucous membranes, they firm up on standing and form a tenacious protective layer that does not soften appreciably at body temperature.',
    classification: [
      'Fatty / Oleaginous Pastes (Zinc Oxide Paste BP, Lassar\'s Paste)',
      'Aqueous Pastes / Gel Pastes (Glycerin and mucilage-based pastes)',
      'Dental Pastes / Dentifrices (Toothpaste with abrasives like hydrated silica)',
      'Oral Mucosal Pastes (Corticosteroid dental pastes adhering to buccal mucosa)',
      'Gelatin-Based Pastes (Unna\'s Boot paste bandages)'
    ],
    routesOfAdministration: ['Topical cutaneous', 'Oral mucosal (buccal / gingival)', 'Dental'],
    commonExcipients: [
      'Stiffening Powders: Zinc oxide, Starch, Titanium dioxide, Kaolin (up to 50% w/w)',
      'Fatty Bases: White soft paraffin, Liquid paraffin, Wool fat (anhydrous lanolin)',
      'Aqueous / Mucilage Pastes: Glycerol, Methylcellulose, Sodium carboxymethylcellulose, Tragacanth mucilage',
      'Toothpaste Components: Abrasives (Calcium carbonate, Hydrated silica), Surfactant (Sodium lauryl sulfate), Humectant (Sorbitol 70%)',
      'Preservatives: Benzoic acid, Parabens'
    ],
    keyAdvantages: [
      'High solid content forms a stiff, opaque protective barrier over lesions, absorbing wound exudates and serous secretions',
      'Adheres to moist, weeping areas where greasy ointments would slide off',
      'Less greasy and less occlusive than ointments; lower risk of folliculitis and skin maceration',
      'Ideal protective coating around wounds (peri-wound skin) and in diaper dermatitis'
    ],
    disadvantagesOrLimitations: [
      'Stiff consistency is difficult to spread and painful to apply on inflamed skin',
      'Not suited for hairy body areas — difficult application and removal',
      'High powder fraction can overdry fissured or cracked skin',
      'The gritty solid particles make the paste abrasive, so never rub onto broken skin'
    ],
    pharmaceuticalQualityTests: [
      'Fineness of Dispersion / Particle Size (Hegman grind gauge / microscopy, grit-free)',
      'Rheology & Extrudability (Yield value and tube extrusion force)',
      'Uniformity of Drug Content in the stiff matrix',
      'pH of aqueous pastes and dentifrices',
      'Microbial Limit Testing (USP <61>)'
    ],
    studentDispensingTips: [
      'Apply with a clean spatula in a thick layer and press gently — never rub a paste vigorously.',
      'Affix auxiliary label: "FOR EXTERNAL USE ONLY"; for dental pastes add "DO NOT EAT OR DRINK FOR 30 MINUTES AFTER APPLICATION".',
      'Remove residual paste at change of dressing using a vegetable oil-soaked cotton swab, never dry gauze.',
      'Cap jars and tubes tightly immediately after use: pastes dry out and harden on exposure to air.'
    ],
    exampleProducts: [
      {
        productName: 'Zinc Oxide & Salicylic Acid Paste BP (Lassar\'s Paste)',
        strength: 'Zinc Oxide 24% + Salicylic Acid 2% + Starch 24% w/w (100 g jar)',
        route: 'Topical cutaneous application',
        instructions: 'Apply a thick layer over the affected area once or twice daily, covering with a light dressing if needed.',
        sideEffects: 'Mild stinging, local irritation; salicylate sensitivity (ringing in ears if used over very large areas).',
        storage: 'Store below 25°C in a tightly closed wide-mouth container. Protect from moisture.',
        batch: 'PST-2011-ZN',
        expiry: '2027-06',
        rxType: 'OTC',
        warnings: 'FOR EXTERNAL USE ONLY. Do not apply to large broken skin areas in children (risk of salicylism).',
        manufacturer: 'DermaSafe Pharmaceuticals'
      },
      {
        productName: 'Triamcinolone Acetonide Dental Paste USP',
        strength: '0.1% w/w (5 g tube)',
        route: 'Oral mucosal (applied to mouth ulcers)',
        instructions: 'Dab a small amount (about 0.5 cm) onto the mouth ulcer at bedtime and after meals; do not rub in.',
        sideEffects: 'Local burning, oral candidiasis (thrush) with prolonged use, taste alteration.',
        storage: 'Store at 20°C to 25°C. Keep tube tightly closed.',
        batch: 'TAP-6620',
        expiry: '2026-11',
        rxType: 'Rx Only',
        warnings: 'For application inside the mouth only. Do not use in untreated oral fungal, viral (herpes), or tuberculous infections.',
        manufacturer: 'OroMed Therapeutics'
      }
    ]
  },

  SOLUTIONS: {
    category: 'SOLUTIONS',
    shortName: 'Solutions',
    categoryTag: 'Monophasic Clear Liquid Dosage Form',
    image: '/images/dosage-forms/solutions.jpg',
    imageCaption: 'Crystal-clear monophasic oral solution in an amber pharmaceutical bottle beside a calibrated dosing cup of transparent liquid.',
    definition: 'Solutions are clear, homogeneous, monophasic liquid preparations containing one or more chemical substances completely dissolved at the molecular level (< 1 nm) in a suitable solvent or a mixture of mutually miscible solvents. Because the drug is fully dissolved, no sediment forms, the liquid does not scatter light (no Tyndall effect), and the dose is perfectly uniform throughout the container.',
    classification: [
      'Oral Solutions (e.g., ORS solution, potassium chloride solution)',
      'Aqueous Solutions (Aromatic waters, douches, enemas)',
      'Non-Aqueous Solutions (Elixirs — hydroalcoholic; Spirits — alcoholic; Collodions — ether-based)',
      'Isotonic Solutions (0.9% NaCl eye/nasal lavages)',
      'Mouthwashes & Gargles (specialized oropharyngeal solutions)'
    ],
    routesOfAdministration: ['Oral', 'Topical (lotions, liniments)', 'Otic / Nasal', 'Rectal (enema, douche)', 'Parenteral (aqueous injections)'],
    commonExcipients: [
      'Primary Solvent: Purified Water IP (freshly boiled and cooled where specified)',
      'Cosolvents: Ethanol USP, Glycerin, Propylene glycol, PEG 400 (for poorly soluble APIs)',
      'Preservatives: Sodium benzoate (0.1%), Methyl/Propyl parabens, Benzalkonium chloride',
      'Stabilizers: Antioxidants (Sodium metabisulfite, Ascorbic acid), Chelating agent (Disodium EDTA)',
      'Organoleptics: Sweeteners (Sucrose, Sorbitol, Sodium saccharin), Flavors, Buffers (Citrate, Phosphate)'
    ],
    keyAdvantages: [
      'Drug is already molecularly dissolved — the fastest GI absorption of any dosage form, no dissolution step needed',
      'Absolute dose uniformity: every 1 mL contains exactly the same amount of drug',
      'Easy to swallow for pediatric, geriatric, and dysphagic patients',
      'Flexible, immediately adjustable dosing with a calibrated cup or syringe'
    ],
    disadvantagesOrLimitations: [
      'Dissolved drugs are more prone to hydrolysis and oxidation — shorter shelf life than dry forms',
      'Bitter or unpleasant tastes are fully exposed and need flavouring/sweetening',
      'Bulky, heavy, fragile packaging; inconvenient for transport',
      'Drugs that are insoluble or unstable in the vehicle simply cannot be formulated as solutions'
    ],
    pharmaceuticalQualityTests: [
      'Clarity & Absence of Particulate Matter (visual inspection against black/white backgrounds)',
      'pH Determination (electrometric pH meter)',
      'Assay of Active Ingredient (HPLC / UV-Vis spectrophotometry / titration)',
      'Specific Gravity & Density (pycnometer)',
      'Microbial Enumeration & Preservative Content (USP <61>/<51>)'
    ],
    studentDispensingTips: [
      'Always issue a calibrated measure — never a household teaspoon (3–9 mL variability error).',
      'Label the strength unambiguously (e.g., % w/v or mg/mL) and add "DILUTE BEFORE USE" for concentrated solutions.',
      'Use amber bottles for light-sensitive solutions; record the date of opening/discarding on the label.',
      'For externally applied solutions (antiseptics, lotions) affix "FOR EXTERNAL USE ONLY — NOT TO BE TAKEN".'
    ],
    exampleProducts: [
      {
        productName: 'Oral Rehydration Salts Solution (WHO ORS)',
        strength: 'NaCl 2.6 g + KCl 1.5 g + Sodium citrate 2.9 g + Dextrose 13.5 g per litre',
        route: 'Oral (sipped frequently in small volumes)',
        instructions: 'Dissolve entire contents in 1 litre of clean drinking water. Sip 50–100 mL after each loose stool. Discard unused solution after 24 hours.',
        sideEffects: 'Rare: vomiting if gulped quickly; hypernatremia if insufficient water is used for dilution.',
        storage: 'Store powder sachet below 30°C in a dry place. Use reconstituted solution within 24 hours.',
        batch: 'ORS-7710-S',
        expiry: '2027-05',
        rxType: 'OTC',
        warnings: 'Use exactly 1 litre of water per sachet — wrong dilution can worsen electrolyte imbalance. Continue normal feeding during therapy.',
        manufacturer: 'HydraCare Wellness Ltd'
      },
      {
        productName: 'Povidone-Iodine Topical Solution USP',
        strength: '10% w/v (Equivalent to 1% available iodine)',
        route: 'Topical (applied to skin or wound with cotton/gauze)',
        instructions: 'Apply undiluted to the affected area 1–3 times daily and allow to dry. May be covered with a sterile bandage.',
        sideEffects: 'Local skin irritation, staining of skin/fabric, rare iodine hypersensitivity.',
        storage: 'Store below 25°C, protected from light, in a tightly closed container.',
        batch: 'PVP-3398',
        expiry: '2026-12',
        rxType: 'OTC',
        warnings: 'FOR EXTERNAL USE ONLY. Avoid in patients with thyroid disorders or iodine allergy; not for prolonged use on deep wounds or severe burns.',
        manufacturer: 'SteriShield Antiseptics'
      }
    ]
  },

  SUSPENSIONS: {
    category: 'SUSPENSIONS',
    shortName: 'Suspensions',
    categoryTag: 'Biphasic Coarse Dispersion Liquid',
    image: '/images/dosage-forms/suspensions.jpg',
    imageCaption: 'Cloudy pediatric oral suspension being shaken in an amber bottle to uniformly redisperse the settled insoluble drug particles.',
    definition: 'Suspensions are biphasic liquid dosage forms in which finely divided insoluble solid particles (the dispersed or internal phase, typically 0.5–100 µm) are uniformly distributed throughout a liquid vehicle (the continuous or external phase) with the help of wetting and suspending agents. Because the drug does not dissolve, particles settle on standing and the product MUST be shaken before every dose.',
    classification: [
      'Oral Suspensions (Antibiotic & antipyretic syrups with insoluble APIs)',
      'Dry Powders for Reconstitution ("Dry syrup" — reconstitute with boiled & cooled water)',
      'Topical Suspensions / Lotions (Calamine lotion, shake-lotions)',
      'Parenteral Depot Suspensions (Sterile microcrystalline IM suspensions — slow release)',
      'Ophthalmic & Otic Suspensions (Sterile micronized suspensions, particles < 10 µm)'
    ],
    routesOfAdministration: ['Oral', 'Topical', 'Intramuscular (depot)', 'Ophthalmic / Otic'],
    commonExcipients: [
      'Suspending Agents (increase viscosity): Xanthan gum, Acacia, Tragacanth, Sodium carboxymethylcellulose, Bentonite/Veegum',
      'Wetting Agents: Polysorbate 20/80 (Tween), Sodium lauryl sulfate',
      'Flocculating Agents (prevent hard caking): Electrolytes such as Potassium chloride, Aluminium chloride, Sodium citrate',
      'Sweeteners & Flavors: Sucrose, Sorbitol, Tutti-frutti/Banana flavors for pediatric masking',
      'Preservatives: Methylparaben, Propylparaben, Sodium benzoate',
      'Buffers: Citrate or Phosphate buffers for pH stability'
    ],
    keyAdvantages: [
      'Enables convenient liquid dosing of drugs that are completely insoluble in water',
      'Masks bitter, nauseous drugs far better than solutions (drug stays as tasteless solid particles)',
      'Higher chemical stability than solutions for drugs that degrade rapidly in dissolved form (e.g., ampicillin in dry syrup)',
      'Depot IM suspensions provide prolonged sustained release lasting days to months'
    ],
    disadvantagesOrLimitations: [
      'CRITICAL: dose uniformity is lost if the bottle is not shaken — risk of underdosing or overdosing',
      'Sedimentation over time can form an irreversible hard "cake" at the bottom that cannot be redispersed',
      'Bulky product with shorter beyond-use dating (reconstituted antibiotic syrups: usually 7–14 days)',
      'Grittiness and poor elegance if particle size exceeds ~75 µm for oral use'
    ],
    pharmaceuticalQualityTests: [
      'Sedimentation Volume Ratio (F = Vu/Vo, target close to 1) & Redispersibility (number of inversions to rehomogenize)',
      'Particle Size Distribution (Microscopy / laser diffraction, particles < 75 µm oral, < 10 µm ophthalmic)',
      'Viscosity & Rheological Profile (pseudoplastic/thixotropic flow preferred)',
      'Zeta Potential (colloid stability indicator, ~± 20–30 mV for flocculated suspensions)',
      'pH, Assay/Content Uniformity after shaking, Microbial Limit Testing'
    ],
    studentDispensingTips: [
      'GOLDEN RULE: Always affix the auxiliary label "SHAKE WELL BEFORE USE" on every suspension.',
      'For dry syrups: demonstrate reconstitution, mark the water fill-line, and give the beyond-use date (e.g., 7 days refrigerated).',
      'Check for irreversible caking before dispensing — a hard sediment that stays put on vigorous shaking means reject the bottle.',
      'Advise measuring each dose with the supplied calibrated syringe/cup immediately after shaking.'
    ],
    exampleProducts: [
      {
        productName: 'Amoxicillin for Oral Suspension USP (Dry Syrup)',
        strength: '125 mg / 5 mL after reconstitution (60 mL bottle)',
        route: 'Oral',
        instructions: 'Add boiled & cooled water up to the mark and shake well. Children: 5 mL every 8 hours. Shake before every dose.',
        sideEffects: 'Diarrhea, nausea, skin rash; stop and seek care if breathing difficulty or facial swelling occurs (allergy).',
        storage: 'Store dry powder below 25°C. After reconstitution refrigerate (2–8°C) and discard after 7 days.',
        batch: 'AMS-5520-DS',
        expiry: '2026-10 (dry powder)',
        rxType: 'Rx Only',
        warnings: 'SHAKE WELL BEFORE USE. Discard any remaining reconstituted suspension after 7 days. Not for penicillin-allergic patients.',
        manufacturer: 'Zenith BioPharma Corp.'
      },
      {
        productName: 'Calamine Lotion IP',
        strength: 'Calamine 15% + Zinc Oxide 5% w/v (100 mL)',
        route: 'Topical (applied to skin)',
        instructions: 'Shake the bottle well, then dab onto the affected itchy skin with cotton 2–3 times daily and allow to dry.',
        sideEffects: 'Very safe; mild skin dryness or slight irritation.',
        storage: 'Store in a cool place below 30°C. Do not freeze.',
        batch: 'CAL-8845',
        expiry: '2027-03',
        rxType: 'OTC',
        warnings: 'SHAKE WELL BEFORE USE. For external use only — avoid eyes and mucous membranes; do not apply on oozing infected wounds.',
        manufacturer: 'DermaCare Laboratories'
      }
    ]
  },

  GARGLES: {
    category: 'GARGLES',
    shortName: 'Gargles',
    categoryTag: 'Oropharyngeal Medicated Liquid (Expectorated)',
    image: '/images/dosage-forms/gargles.jpg',
    imageCaption: 'Antiseptic povidone-iodine gargle concentrate in an amber bottle with its small measuring cup for dilution before gargling.',
    definition: 'Gargles are aqueous solutions — frequently dispensed as concentrates to be diluted with warm water — intended for intimate agitated contact with the mucous membrane of the pharynx and throat. The head is tilted back and air is bubbled through the liquid for 15–30 seconds, after which the gargle is ALWAYS expectorated (spit out) and never swallowed. They deliver antiseptic, astringent, analgesic, or soothing action to the pharynx in pharyngitis and tonsillitis.',
    classification: [
      'Antiseptic/Antibacterial Gargles (Povidone-iodine 2%, Chlorhexidine)',
      'Analgesic / Anti-inflammatory Gargles (Benzydamine HCl rinse)',
      'Concentrated Gargles for Dilution (Potassium permanganate 1:1000, Hydrogen peroxide 3% diluted)',
      'Saline / Hypertonic Gargles (Warm salt water, competitive osmotic soothing)',
      'Phenolated / Thymolated Gargles (Compound thymol glycerin gargle BPC)'
    ],
    routesOfAdministration: ['Oropharyngeal (topical contact — expectorated, never swallowed)'],
    commonExcipients: [
      'Vehicle: Purified Water IP, often with Glycerol as a soothing demulcent',
      'Antimicrobials: Povidone-iodine 2% w/v, Chlorhexidine gluconate 0.2%, Thymol, Menthol',
      'Cosolvents: Ethanol (5–20%) for thymol/menthol solubilization',
      'Flavors: Peppermint, Menthol, Eucalyptus oil (cooling demulcent sensation)',
      'Sweeteners & Buffers: Sodium saccharin, Citrate buffer (a slightly acidic pH suits antibacterials)'
    ],
    keyAdvantages: [
      'Delivers a very high local drug concentration directly onto inflamed pharyngeal tissue',
      'Negligible systemic absorption — very safe adjunctive therapy',
      'Rapid symptomatic relief of sore-throat pain, dryness, and odour',
      'Simple and inexpensive; can even be prepared extemporaneously (warm saline)'
    ],
    disadvantagesOrLimitations: [
      'Contact time with the pharynx is brief — needs repeating 3–4 or more times daily',
      'Completely unsuitable for young children (generally < 6–8 years) who cannot gargle safely',
      'Accidental swallowing of concentrated antiseptics (iodine, permanganate) can be harmful',
      'Reaches only the pharynx — ineffective for deep laryngeal or tracheal infection'
    ],
    pharmaceuticalQualityTests: [
      'Assay of Antiseptic Content (available iodine by thiosulfate titration for PVP-I)',
      'pH Determination & Specific Gravity',
      'Clarity & Absence of Particulate Matter',
      'Microbial Limit & Preservative Efficacy Testing',
      'Alcohol Content (where ethanol is a cosolvent, USP <611>)'
    ],
    studentDispensingTips: [
      'Bold auxiliary label is mandatory: "FOR GARGLE ONLY — DO NOT SWALLOW".',
      'Concentrates must be diluted exactly as directed (commonly ~15 mL in a glass of warm water) — demonstrate the dilution.',
      'Advise gargling for 15–30 seconds per mouthful, 3–4 times daily, ideally after meals.',
      'Warn that young children unable to gargle should use an alternative (throat spray/lozenge) instead.',
      'Advise avoiding food or drink for 30 minutes after use so the antiseptic film keeps working.'
    ],
    exampleProducts: [
      {
        productName: 'Povidone-Iodine Germicide Gargle',
        strength: '2% w/v (100 mL with measuring cup)',
        route: 'Oropharyngeal gargle (expectorated)',
        instructions: 'Dilute with an equal volume of warm water. Gargle with 10–15 mL for 30 seconds and spit out. Repeat up to 4 times daily. DO NOT SWALLOW.',
        sideEffects: 'Temporary brown staining, altered taste, mouth irritation; rare iodine hypersensitivity.',
        storage: 'Store below 25°C, protected from light. Do not refrigerate.',
        batch: 'GRG-4417-PV',
        expiry: '2026-11',
        rxType: 'OTC',
        warnings: 'DO NOT SWALLOW. Not for children under 6 years. Avoid in thyroid disease, pregnancy, or iodine allergy unless prescribed.',
        manufacturer: 'SteriShield Antiseptics'
      },
      {
        productName: 'Benzydamine HCl Gargle / Oral Rinse',
        strength: '0.15% w/v (300 mL)',
        route: 'Oropharyngeal rinse',
        instructions: 'Gargle or rinse with 15 mL (undiluted) every 1.5–3 hours as needed for painful mouth and throat conditions, then spit out.',
        sideEffects: 'Numbness or stinging of the mouth, nausea if swallowed in quantity.',
        storage: 'Store below 30°C. Discard 6 months after opening.',
        batch: 'BNZ-2180',
        expiry: '2027-02',
        rxType: 'Rx Only',
        warnings: 'Expectorate after use — do not swallow. Not recommended in children under 12 years.',
        manufacturer: 'OroMed Therapeutics'
      }
    ]
  },

  MOUTHWASH: {
    category: 'MOUTHWASH',
    shortName: 'Mouthwashes',
    categoryTag: 'Antiseptic Oral Hygiene Rinse',
    image: '/images/dosage-forms/mouthwash.jpg',
    imageCaption: 'Bottle of mint-green antiseptic mouthwash with its dosing cap filled, used for plaque control and oral cavity hygiene.',
    definition: 'Mouthwashes (oral rinses / mouth rinses) are aqueous, usually pleasantly flavoured liquid preparations containing antiseptics, astringents, deodorants, fluoride salts and/or flavours, used to rinse the entire oral cavity. They are swished vigorously around the mouth, between the teeth and along the gumline for about 30 seconds and then expectorated, to reduce dental plaque and gingivitis, prevent caries, treat halitosis and freshen breath. They are classified as cosmetic or therapeutic (medicated) rinses.',
    classification: [
      'Therapeutic Antiseptic Rinses (Chlorhexidine gluconate 0.2% — the "gold standard")',
      'Anticariogenic Fluoride Rinses (Sodium fluoride 0.05% daily / 0.2% weekly)',
      'Antiplaque Essential-Oil Rinses (Thymol + Menthol + Eucalyptol + Methyl salicylate)',
      'Cetylpyridinium Chloride (CPC 0.05%) quaternary ammonium rinses',
      'Desensitizing & Whitening Rinses (Potassium nitrate 3%, Hydrogen peroxide 1.5%)'
    ],
    routesOfAdministration: ['Oral cavity topical rinse (swished and expectorated — never swallowed)'],
    commonExcipients: [
      'Vehicle: Purified Water IP, frequently with 0–27% v/v Ethanol as cosolvent (alcohol-free variants use propylene glycol)',
      'Antiseptics: Chlorhexidine gluconate 0.12–0.2%, Cetylpyridinium chloride 0.05%, Essential oils',
      'Humectants: Glycerol, Sorbitol solution 70%',
      'Surfactants: Poloxamer 407, Sodium lauryl sulfate (foaming and dispersal of actives)',
      'Sweeteners & Flavors: Saccharin sodium, Xylitol, Peppermint/Menthol/Methyl salicylate oils; approved food colors'
    ],
    keyAdvantages: [
      'Reaches interdental spaces, gingival crevices, and posterior areas that a toothbrush misses',
      'Clinically proven adjunct (with brushing) for plaque, gingivitis and caries control',
      'Freshens breath immediately and masks oral malodor (halitosis)',
      'Simple self-administration improves patient compliance, including post-surgery when brushing is painful'
    ],
    disadvantagesOrLimitations: [
      'An adjunct, never a substitute for mechanical brushing and flossing',
      'Chlorhexidine causes brown extrinsic staining of teeth/tongue and taste alteration with courses > 2 weeks',
      'Alcohol-based rinses cause burning/dryness and are unsuitable for children and recovering alcoholics',
      'Swallowing fluoride rinses risks fluorosis in young children — supervise ages 6–12, avoid under 6'
    ],
    pharmaceuticalQualityTests: [
      'Assay of active antiseptic (e.g., chlorhexidine by HPLC) and fluoride content (fluoride ion-selective electrode)',
      'pH Determination (typically 4.2–7.0 depending on active)',
      'Alcohol Content by GC where ethanol is present (label claim ± 5%)',
      'Specific Gravity / Density & Clarity',
      'Microbial Limit Testing (total aerobic count, absence of Pseudomonas aeruginosa)'
    ],
    studentDispensingTips: [
      'Counsel the correct technique: 10–20 mL undiluted, swish vigorously for 30 seconds, spit out fully — do NOT swallow.',
      'Advise use at a DIFFERENT time from toothbrushing, or ≥ 30 minutes after: toothpaste SLS inactivates chlorhexidine.',
      'Do not eat, drink, or rinse with water for 30 minutes afterwards to prolong the substantivity effect.',
      'Chlorhexidine courses should normally not exceed 2 weeks due to tooth staining — advise brushing removable stains.',
      'Keep away from children; alcohol-containing rinses should be dispensed with child-resistant caps.'
    ],
    exampleProducts: [
      {
        productName: 'Chlorhexidine Gluconate Mouthwash IP',
        strength: '0.2% w/v (150 mL with 15 mL cap)',
        route: 'Oral rinse (expectorated)',
        instructions: 'Rinse with 10–15 mL undiluted for 30 seconds twice daily (morning and night), then spit out. Do not swallow.',
        sideEffects: 'Reversible brown staining of teeth and tongue, altered taste, mild oral mucosal irritation.',
        storage: 'Store below 25°C, protected from light. Discard 1 month after opening.',
        batch: 'CHX-9034-MW',
        expiry: '2026-12',
        rxType: 'OTC',
        warnings: 'DO NOT SWALLOW. Use ≥ 30 minutes apart from toothpaste. Limit to 2-week courses to prevent staining.',
        manufacturer: 'DentoGuard Oral Care'
      },
      {
        productName: 'Sodium Fluoride Anticavity Mouth Rinse',
        strength: '0.05% w/v NaF (226 ppm fluoride, 250 mL)',
        route: 'Oral rinse',
        instructions: 'Once daily at bedtime after brushing, swish 10 mL vigorously for 1 minute and spit out. Do not eat or drink for 30 minutes.',
        sideEffects: 'Minimal; nausea or abdominal upset if large volumes are swallowed.',
        storage: 'Store at 20–25°C in the original plastic container (fluoride attacks glass).',
        batch: 'FLR-6511',
        expiry: '2027-04',
        rxType: 'OTC',
        warnings: 'DO NOT SWALLOW. Not for children under 6 years; supervise children 6–12 years. Fluoride rinse — store in plastic only.',
        manufacturer: 'DentoGuard Oral Care'
      }
    ]
  },

  POWDERS: {
    category: 'POWDERS',
    shortName: 'Powders',
    categoryTag: 'Dry Finely Divided Solid Dosage Form',
    image: '/images/dosage-forms/powders.jpg',
    imageCaption: 'Finely divided white medicinal powder heaped on a glass slab with a spatula, mortar and pestle, and unit-dose sachets for oral use.',
    definition: 'Powders are intimate mixtures of dry, finely divided drugs and/or chemicals intended for internal administration (oral powders dissolved or suspended in water) or for external application (dusting powders). They are dispensed either as bulk powders measured by the patient or as divided powders — individual unit doses wrapped in papers or sealed in sachets. Powders are also the starting material for granules, tablets, and capsules.',
    classification: [
      'Bulk Oral Powders (Antacid powders, ORS powders — dosed with a spoon/scoop)',
      'Divided (Unit-Dose) Powders (Sealed papers or sachets, e.g., headache powders, ORS sachets)',
      'Dusting Powders (Sterile/topical — talc, antifungal powders for skin folds)',
      'Dentifrices / Tooth Powders (Abrasive dental powders)',
      'Effervescent Powders (Citric acid + Sodium bicarbonate + Tartaric acid granulated pair)',
      'Insufflations (Fine powders blown into ear/nose/throat or body cavities)'
    ],
    routesOfAdministration: ['Oral (after mixing with water)', 'Topical (dusting on skin)', 'Nasal / Otic insufflation', 'Reconstitution into solutions or suspensions'],
    commonExcipients: [
      'Diluents / Carriers: Lactose monohydrate, Starch, Mannitol, Dextrose',
      'Glidants (improve flow): Colloidal silicon dioxide, Purified talc',
      'Adsorbents: Light kaolin, Magnesium carbonate (for bulky antacid powders)',
      'Effervescent Couple: Citric acid + Sodium bicarbonate (CO2 liberation aids dispersal and palatability)',
      'Sweeteners & Flavors (oral powders): Sucrose, Aspartame, Fruit flavors',
      'Lubricants for insufflators and moisture scavengers: rarely added — dryness itself is the stabilizer'
    ],
    keyAdvantages: [
      'Maximum chemical and physical stability — no water means almost no hydrolysis or microbial growth',
      'Rapid onset once swallowed: enormous surface area gives ready dispersion and quick absorption',
      'Ideal for bulky, large-dose drugs (ORS salts, kaolin) that cannot fit inside a tablet or capsule',
      'Simple, economical manufacturing and easy compounding; no swallowing difficulty for children or the elderly'
    ],
    disadvantagesOrLimitations: [
      'Unpleasant or bitter drug tastes are NOT masked — poor palatability without flavouring',
      'Bulk powder dosing with spoons is inaccurate and non-uniform',
      'Hygroscopic and deliquescent powders cake and liquefy on exposure to humid air — demand airtight packaging',
      'Fine powders are a dust/inhalation hazard during manufacture and handling',
      'Unsuitable as bulk powders for potent very-low-dose drugs (dose-measuring error is dangerous)'
    ],
    pharmaceuticalQualityTests: [
      'Particle Size Analysis (Sieve analysis IP / laser diffraction; dusting powders pass 150 µm sieve)',
      'Flow Properties: Angle of Repose (target < 30° free-flowing), Carr\'s Compressibility Index (< 25%)',
      'Bulk & Tapped Density (USP <616>)',
      'Moisture Content (Loss on Drying — usually NMT 1–2% w/w)',
      'Uniformity of Weight of Divided Powders (unit-dose sachets) & Uniformity of Content',
      'Effervescence Time & Solution Clarity for effervescent powders'
    ],
    studentDispensingTips: [
      'Use GEOMETRIC DILUTION when weighing potent drugs with diluents: triturate the smallest quantity first with an equal bulk of diluent, doubling stepwise.',
      'Always pack hygroscopic powders in airtight, wide-mouth, moisture-proof containers with the label "KEEP TIGHTLY CLOSED — STORE DRY".',
      'Oral powders: label clearly "DISSOLVE OR MIX IN WATER BEFORE USE" and state the exact volume of water per dose.',
      'ORS sachets: counsel use of exactly the stated volume of safe drinking water and discard reconstituted solution after 24 hours.',
      'Dusting powders: apply a thin layer to clean dry skin; avoid inhaling and never dust talc onto deep wounds.'
    ],
    exampleProducts: [
      {
        productName: 'Oral Rehydration Salts IP (ORS Sachet)',
        strength: 'Sodium chloride 0.52 g, Potassium chloride 0.30 g, Sodium citrate 0.58 g, Dextrose anhydrous 2.70 g per 4.1 g sachet (for 200 mL)',
        route: 'Oral — dissolve entire sachet in 200 mL of clean water',
        instructions: 'Dissolve the complete contents of one sachet in 200 mL of boiled & cooled drinking water. Sip frequently after each loose stool. Discard unused solution after 24 hours.',
        sideEffects: 'Well tolerated; vomiting if gulped; hypernatremia only if diluted in less than the stated water volume.',
        storage: 'Store sachets below 30°C, protected from moisture, in the original pouch.',
        batch: 'ORS-2215-PW',
        expiry: '2027-08',
        rxType: 'OTC',
        warnings: 'Use the EXACT 200 mL water volume per sachet. Do not add extra sugar or salt. Solution older than 24 hours must be thrown away.',
        manufacturer: 'HydraCare Wellness Ltd'
      },
      {
        productName: 'Clotrimazole Antifungal Dusting Powder',
        strength: '1% w/w (75 g container with sprinkle top)',
        route: 'Topical (dusted onto skin folds)',
        instructions: 'Dust a thin layer over the affected dry skin area and into socks/footwear 2–3 times daily. Continue for 2 weeks after symptoms clear.',
        sideEffects: 'Mild local irritation or burning; rare allergic contact dermatitis.',
        storage: 'Store below 30°C in a tightly closed container. Keep dry.',
        batch: 'CLT-5502-DP',
        expiry: '2027-01',
        rxType: 'OTC',
        warnings: 'FOR EXTERNAL USE ONLY. Avoid inhaling the powder and contact with eyes. Do not apply to broken blistered skin without medical advice.',
        manufacturer: 'DermaSafe Pharmaceuticals'
      }
    ]
  },

  'NASAL DROPS': {
    category: 'NASAL DROPS',
    shortName: 'Nasal Drops & Sprays',
    categoryTag: 'Intranasal Mucosal Dosage Form',
    image: '/images/dosage-forms/nasal-drops.jpg',
    imageCaption: 'Plastic squeeze dropper bottle of isotonic saline nasal drops alongside a metered nasal spray pump for intranasal administration.',
    definition: 'Nasal drops and nasal sprays are sterile or near-sterile aqueous (rarely oily) solutions or suspensions of drugs instilled dropwise into, or sprayed onto, the nasal mucosa. Formulated nearly isotonic with nasal secretions (~0.9% NaCl) and at a slightly acidic pH of 5.5–6.5, they act locally as decongestants, anti-allergics and corticosteroids, and also serve as a convenient systemic route (e.g., desmopressin, naloxone) that bypasses first-pass metabolism through the highly vascular nasal epithelium.',
    classification: [
      'Nasal Decongestants (Xylometazoline 0.1%, Oxymetazoline 0.05% — sympathomimetic vasoconstrictors)',
      'Saline Nasal Drops & Sprays (0.65–0.9% isotonic; 2–3% hypertonic moisturizing lavage)',
      'Nasal Corticosteroid Sprays (Mometasone, Fluticasone — allergic rhinitis)',
      'Nasal Antihistamines & Anticholinergics (Azelastine, Ipratropium)',
      'Systemic-Acting Nasal Preparations (Desmopressin, Calcitonin, Naloxone rescue spray)'
    ],
    routesOfAdministration: ['Intranasal — local mucosal action', 'Intranasal — systemic absorption (olfactory and respiratory mucosa)'],
    commonExcipients: [
      'Vehicle: Purified Water IP (never plain tap water; oily bases are rarely used due to lipoid pneumonia risk on aspiration)',
      'Tonicity Adjusters: Sodium chloride to ~0.9% (isotonic with nasal secretions)',
      'Buffers: Phosphate/citrate buffers to pH 5.5–6.5',
      'Preservatives (multidose containers): Benzalkonium chloride 0.01%, Phenylethyl alcohol, Thimerosal (declining use)',
      'Viscosity Enhancers: Methylcellulose, HPMC (prolong mucosal contact against mucociliary clearance)',
      'Humectants: Glycerol; Antioxidants: Sodium metabisulfite (caution — sulfite sensitivity)'
    ],
    keyAdvantages: [
      'Rapid relief of nasal congestion and rhinitis directly at the site of action within minutes',
      'Needle-free systemic route that bypasses hepatic first-pass metabolism (peptides, naloxone, migraine triptans)',
      'Small doses, minimal systemic side effects for locally acting agents',
      'Very convenient patient self-administration with metered sprays delivering exact volumes'
    ],
    disadvantagesOrLimitations: [
      'RHINITIS MEDICAMENTOSA: decongestant sprays used over 5–7 days cause rebound congestion worse than the original',
      'Nasal mucociliary clearance removes the drug within ~15–30 minutes — short residence time',
      'Hand-operated nasal drops give poorer dose precision than metered pump sprays',
      'Benzalkonium preservative can irritate and damage ciliary function with long-term use',
      'Dropper tip contamination risks cross-infection — bottles are strictly single-patient use'
    ],
    pharmaceuticalQualityTests: [
      'pH Determination (5.5–6.5 physiological nasal tolerance)',
      'Osmolality / Tonicity (~240–450 mOsm/kg tolerated; target ~isotonic)',
      'Delivered Dose Uniformity & Droplet/Particle Size Distribution for metered sprays (droplets > 50 µm to avoid lung deposition)',
      'Clarity, Particulate Matter & Leaker Testing of the container-closure system',
      'Assay, Weight per Drop, Microbial Limit & Preservative Efficacy Testing (USP <51>)'
    ],
    studentDispensingTips: [
      'Teach the technique: blow the nose gently, tilt the head back ("Mecca position"), instill drops and stay reclined 1–2 minutes; for sprays keep the head upright and sniff gently.',
      'Warn in bold: "DECONGESTANT DROPS — MAXIMUM 5 TO 7 DAYS OF USE" to prevent rhinitis medicamentosa.',
      'Instruct never to touch the dropper/nozzle tip to the nose or fingers, and never to share the bottle between family members.',
      'Prime metered sprays before first use (a few test sprays into the air) and clean the nozzle after each use.',
      'For infants, saline drops given 15 minutes before feeds and sleep clear secretions without any drug.'
    ],
    exampleProducts: [
      {
        productName: 'Xylometazoline HCl Nasal Drops IP',
        strength: '0.1% w/v (Adult; 10 mL dropper bottle)',
        route: 'Intranasal instillation',
        instructions: 'Instill 2–3 drops into each nostril every 8–10 hours as needed for blocked nose. Maximum 7 days continuous use.',
        sideEffects: 'Transient nasal burning/stinging, sneezing, dryness; rebound congestion on prolonged use.',
        storage: 'Store below 30°C. Discard 28 days after first opening. Keep away from children.',
        batch: 'XYL-7741-ND',
        expiry: '2026-12',
        rxType: 'OTC',
        warnings: 'Do NOT exceed 7 days of use (risk of rhinitis medicamentosa/rebound congestion). Use the 0.05% paediatric strength for children 6–12 years only. Not for infants.',
        manufacturer: 'RespiCare Remedies'
      },
      {
        productName: 'Sodium Chloride Nasal Drops (Saline)',
        strength: '0.9% w/v (Isotonic; 15 mL squeeze bottle)',
        route: 'Intranasal',
        instructions: 'Instill 2–6 drops into each nostril as often as required to moisturize and clear the nose. Safe from birth.',
        sideEffects: 'Virtually none; slight transient stinging if the mucosa is raw.',
        storage: 'Store below 30°C. Discard 28 days after opening.',
        batch: 'SAL-3390',
        expiry: '2027-06',
        rxType: 'OTC',
        warnings: 'Single-patient use only — do not share the bottle. Discard if the solution becomes cloudy.',
        manufacturer: 'RespiCare Remedies'
      }
    ]
  }
};
