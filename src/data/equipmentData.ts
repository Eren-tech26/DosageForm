import { DosageFormCategory } from '../types/pharmacy';

export type EquipmentId =
  | 'digital-mini-incubator'
  | 'hot-air-oven'
  | 'tablet-friability-machine'
  | 'ir-spectrophotometer'
  | 'cyclone-separator'
  | 'quartz-muffle-tray';

export interface EquipmentGuide {
  id: EquipmentId;
  name: string;
  category: string;
  department: string;
  assetTag: string;
  modelExample: string;
  image: string;
  imageCaption: string;
  definition: string;
  principle: string;
  uses: string[];
  specifications: [string, string][];
  operation: string[];
  precautions: string[];
  qcChecks: string[];
  sopBrief: string;
  safetyCaution: string;
  relatedDosageForms: DosageFormCategory[];
  permanentUrl: string;
}

export const EQUIPMENT_LIST: EquipmentGuide[] = [
  {
    id: 'digital-mini-incubator',
    name: 'Digital Mini Incubator',
    category: 'Pharmacy Microbiology',
    department: 'Microbiology & Sterility Testing Lab',
    assetTag: 'PHARM-MIC-INC-01',
    modelExample: 'Benchmark Scientific myTemp™ Mini H2200-H',
    image: '/images/equipment/digital-mini-incubator.jpg',
    imageCaption: 'Benchtop digital heating incubator with precision microprocessor temperature control and transparent inner observation door.',
    definition: 'A compact, microprocessor-controlled constant-temperature laboratory chamber designed to cultivate, maintain, and enumerate microbial cultures (bacteria, fungi, and yeasts) at method-specified incubation temperatures.',
    principle: 'Electric resistance heating elements controlled by a digital PID microprocessor and temperature sensor circulate warmth uniformly throughout the chamber. Thermal convection maintains stable setpoints (typically 30–35°C for bacteria, 20–25°C for fungi) to promote optimal biological replication without thermal shock.',
    sopBrief: 'Set method temperature · Stabilize 30 min · Invert agar plates · Log temp twice daily',
    safetyCaution: 'Heat-only: not an autoclave. No biosafety containment. Do not incubate volatile solvents.',
    uses: [
      'Microbial Limits Testing (MLT) for pharmaceutical raw materials, finished products, and purified water (USP <61>/<62>, IP)',
      'Growth promotion testing (GPT) of prepared solid and liquid culture media (Soybean Casein Digest, Nutrient Agar, Sabouraud Dextrose Agar)',
      'Incubation of environmental monitoring sedimentation and contact plates from cleanrooms and laminar air flow (LAF) benches',
      'Microbiological bioassay of antibiotics (cylinder plate or turbidimetric assays) to determine potency',
      'Preservative efficacy testing (PET) / antimicrobial effectiveness testing (AET) according to pharmacopoeial monographs'
    ],
    specifications: [
      ['Example Model', 'Benchmark Scientific myTemp™ Mini H2200-H'],
      ['Chamber Capacity', '20 Liters (0.75 cu. ft.)'],
      ['Operating Temperature Range', 'Ambient +5°C to 60°C (heat-only digital model)'],
      ['Temperature Accuracy', '±0.5°C at 37°C (calibrated RTD sensor)'],
      ['Temperature Uniformity', '±1.5°C at 37°C throughout chamber'],
      ['Display & Controls', 'Digital LED display with 1°C push-button increments'],
      ['Chamber Construction', 'Corrosion-resistant stainless interior with 2 adjustable shelves'],
      ['Power Rating', '115V / 230V AC, 50/60 Hz, 70W heating power']
    ],
    operation: [
      'Position the incubator on a level, vibration-free laboratory bench with at least 10 cm clearance on all sides for ventilation.',
      'Connect to a stable electrical supply. Switch the power ON and set the required incubation temperature (e.g., 32.5°C ± 2.5°C for bacterial count, 22.5°C ± 2.5°C for fungal count).',
      'Allow the chamber to equilibrate for at least 30–45 minutes until the digital display stabilizes at the target setpoint.',
      'Verify the chamber temperature with an independent, calibrated traceable thermometer or thermocouple placed on the working shelf.',
      'Load labelled culture tubes, Petri dishes (inverted to prevent condensation droplets onto agar), or flasks without blocking airflow grilles.',
      'Keep door opening to an absolute minimum during incubation; log temperature readings twice daily in the microbiology equipment logbook.'
    ],
    precautions: [
      'NOT an autoclave or sterilizer: an incubator cannot sterilize contaminated materials or destroy spore-forming pathogens.',
      'NOT a biosafety containment cabinet: provides no operator or environmental protection; all infectious culture transfers must occur inside a Class II Biosafety Cabinet or Laminar Airflow Bench.',
      'Heat-only limitation: cannot cool below ambient room temperature. If ambient temperature exceeds setpoint (e.g., summer room at 32°C for 25°C fungal incubation), a refrigerated BOD incubator is required.',
      'Never incubate open flammable, explosive, or volatile organic solvents inside the chamber due to ignition hazards.',
      'Disinfect inner chamber surfaces weekly with 70% sterile Isopropyl Alcohol (IPA); disconnect power before any wet cleaning.'
    ],
    qcChecks: [
      'Daily 2-point temperature logging (morning & afternoon) from a calibrated external temperature sensor.',
      'Annual multi-point thermal mapping and temperature calibration using certified standard thermometers.',
      'Chamber decontamination cycle documentation and HEPA-filtered cleanroom environmental monitoring.',
      'Seal integrity and magnetic door gasket inspection to prevent thermal leakage.'
    ],
    relatedDosageForms: ['INJECTIONS', 'EYE/EAR DROPS', 'SYRUPS', 'PARENTERALS & MISC.'],
    permanentUrl: 'https://dosage-form.vercel.app/?equipment=digital-mini-incubator'
  },
  {
    id: 'hot-air-oven',
    name: 'Hot Air Oven (Dry Heat Sterilizer)',
    category: 'Sterilization & Drying',
    department: 'Pharmaceutics & Sterile Products Lab',
    assetTag: 'PHARM-STER-OVN-02',
    modelExample: 'Kintek Benchtop Dry Heat Sterilizer & Drying Oven',
    image: '/images/equipment/hot-air-oven.webp',
    imageCaption: 'Laboratory stainless steel forced-convection hot air oven with digital temperature controller for dry heat sterilization and moisture evaporation.',
    definition: 'An electrically heated, forced-convection thermal instrument used in pharmaceutical manufacturing and analytical testing for dry-heat sterilization of heat-stable articles, depyrogenation of glassware, and moisture-content drying (Loss on Drying).',
    principle: 'Forced hot air is circulated throughout an insulated stainless-steel chamber by a motorized blower fan. Dry heat transfers thermal energy to the load, destroying microorganisms primarily by oxidative destruction of cellular constituents, protein denaturation, and toxic electrolyte concentration. Common pharmacopoeial dry-heat sterilization cycles are 160°C for 120 minutes or 170°C for 60 minutes.',
    sopBrief: 'Wrap clean glassware · 160°C for 120 min or 170°C for 60 min · Cool to <60°C before opening',
    safetyCaution: 'Burn & thermal shock hazard! Never load rubber, plastics, or volatile solvents. Wear heat gloves.',
    uses: [
      'Dry-heat sterilization of heat-resistant laboratory glassware (Petri dishes, volumetric flasks, pipettes, graduated cylinders, beakers)',
      'Sterilization of metallic surgical and laboratory instruments (spatulas, forceps, scissors, scalpels, stainless steel trays)',
      'Sterilization of anhydrous non-aqueous liquids, oils, and waxes (liquid paraffin, white soft paraffin, fixed oils, glycerol) which cannot be penetrated by moist steam',
      'Sterilization of heat-stable dry powders (talc, zinc oxide, kaolin, sulfonamide powders) in thin layers (<6 mm depth)',
      'Depyrogenation (destruction of bacterial endotoxins/pyrogens) of glass vials and ampoules at 250°C for 30–60 minutes',
      'Moisture determination (Loss on Drying / LOD) and drying of chemical reagents and granules at 105°C'
    ],
    specifications: [
      ['Example Model', 'Kintek / Memmert Benchtop Dry Heat Sterilizer'],
      ['Operating Temperature Range', '50°C to 250°C (high-temp models up to 300°C)'],
      ['Temperature Fluctuation', '±0.5°C at 160°C with digital PID controller'],
      ['Air Circulation Mechanism', 'Forced-air blower convection fan with adjustable exhaust damper'],
      ['Chamber Material', 'Heavy-duty AISI 304 mirror-polished stainless steel'],
      ['Insulation', 'High-density mineral wool / ceramic fiber insulation (cool-touch exterior)'],
      ['Safety Over-temperature Cutoff', 'Independent DIN 12880 Class 3.1 safety thermostat'],
      ['Timer Function', 'Digital countdown timer 1 to 999 minutes with auto shut-off']
    ],
    operation: [
      'Clean and thoroughly dry all glassware and metallic articles before loading. Moisture causes uneven heating and steam generation.',
      'Wrap glassware individually in aluminum foil or unglazed brown paper; plug pipettes and test tubes with non-absorbent cotton wool.',
      'Arrange items evenly on perforated shelves leaving at least 2.5 cm gaps between articles for unobstructed air circulation. Do not overload shelves.',
      'Close and latch the insulated door tightly. Set target temperature (e.g. 160°C or 170°C) and initiate heating.',
      'Start timing ONLY when the internal chamber thermometer confirms that the target sterilizing temperature has been reached (sterilization holding period: 160°C for 2 hours, 170°C for 1 hour, or 180°C for 30 minutes).',
      'Turn off heating upon cycle completion. Allow the oven to cool down slowly to below 60°C before opening the door to prevent glass shattering from thermal shock.'
    ],
    precautions: [
      'NEVER sterilize surgical dressings, rubber tubing, plastics, volatile liquids, or flammable organic solvents in a hot air oven.',
      'Do not place articles on the bottom floor of the chamber directly over heating elements; always use perforated wire shelves.',
      'Never open the oven door during sterilization; cold air rush causes rapid glass breakage and destroys cycle sterility.',
      'Wear heat-insulated aramid/leather lab gloves and safety glasses when unloading warm items.',
      'Use chemical sterilization indicators (e.g. Browne’s tubes Type 3 green spot) or biological indicators (Bacillus atrophaeus / B. subtilis spores) to validate sterility.'
    ],
    qcChecks: [
      'Biological indicator challenge using Bacillus atrophaeus (ATCC 9372) spore strips (D160-value ≥ 2.5 min).',
      'Periodic calibration of internal temperature probe against a calibrated multi-channel RTD master probe.',
      'Airflow velocity and fan motor operational check to ensure uniform heat distribution without dead zones.'
    ],
    relatedDosageForms: ['INJECTIONS', 'PARENTERALS & MISC.', 'EYE/EAR DROPS', 'OINTMENTS & CREAMS'],
    permanentUrl: 'https://dosage-form.vercel.app/?equipment=hot-air-oven'
  },
  {
    id: 'tablet-friability-machine',
    name: 'Tablet Friability Test Apparatus',
    category: 'Tablet Quality Control',
    department: 'Industrial Pharmacy & Solid Dosage Lab',
    assetTag: 'PHARM-SOL-FRB-03',
    modelExample: 'Electrolab / Campbell Digital Single & Dual Drum Friabilator',
    image: '/images/equipment/tablet-friability-machine.jpg',
    imageCaption: 'Pharmaceutical tablet friability tester featuring clear acrylic drum with internal curved scoop rotating at 25 RPM for mechanical durability testing.',
    definition: 'A specialized pharmacopoeial testing apparatus designed to evaluate the physical resistance of compressed, uncoated tablets to mechanical abrasion, chipping, edge-capping, and breakage during coating, packaging, transportation, and dispensing.',
    principle: 'Tablets are introduced into a transparent cylindrical drum fitted with a curved internal vane (Roche drum). The drum rotates on a horizontal axis at a regulated speed of 25 ± 1 RPM. In each revolution, tablets are carried upward by the internal scoop and dropped from a height of 156 mm (6 inches) onto the drum wall, subjecting them to standardized tumbling friction and shock forces.',
    sopBrief: 'Dedust & weigh initial (W1) · Rotate 100 rev @ 25 RPM · Dedust & reweigh (W2) · Limit: NMT 1.0%',
    safetyCaution: 'Check drum for cracks. Any cleaved/broken tablet = test failure. Clean acrylic with mild wipe only.',
    uses: [
      'Official pharmacopoeial physical evaluation of compressed tablets (IP 2.9.7, USP <1216>, EP 2.9.7, BP)',
      'Determining tablet formulation durability during compression tool optimization and binder selection',
      'Assessing tablet core mechanical integrity prior to aqueous or organic film-coating operations',
      'Quality control release testing for commercial pharmaceutical tablet batches',
      'Investigating capping, lamination, and chipping defects caused by low binder concentration or excessive compression speed'
    ],
    specifications: [
      ['Standard Drum Speed', '25 ± 1 RPM (electronically governed drive)'],
      ['Rotation Count / Time', '100 revolutions in 4.0 minutes (or method-specified cycle)'],
      ['Drum Fall Height', '156 mm ± 2 mm (6.14 in) internal drop height'],
      ['Drum Material', 'Optically clear, anti-static polymethyl methacrylate (PMMA / Plexiglas)'],
      ['Drum Dimensions', 'Inside diameter ~287 mm, depth 38 mm with curved scoop vane'],
      ['Display & Controls', 'Digital LED rotation counter with pre-set auto stop and reverse discharge'],
      ['Standard Acceptance Limit', 'Not more than 1.0% weight loss for most official pharmaceutical tablets'],
      ['Pharmacopoeial Compliance', 'Harmonized compliance with USP <1216>, IP 2.9.7, and Ph. Eur. 2.9.7']
    ],
    operation: [
      'Sample selection: For tablets with unit mass ≤650 mg, weigh a whole tablet sample corresponding as close as possible to 6.5 g. For tablets with unit mass >650 mg, select exactly 10 whole tablets.',
      'Dedust tablets carefully using a soft camel-hair brush to remove loose surface powder adhering from tableting.',
      'Accurately weigh the dedusted tablet sample on an analytical balance (precision 0.001 g) and record initial weight as W1.',
      'Remove the drum thumb-screw, mount the clean dry drum onto the motor spindle, and place the weighed tablets into the drum cavity.',
      'Program the instrument for 100 rotations (or set timer for 4 minutes at 25 RPM) and press START.',
      'After 100 rotations, remove the drum, dedust the tablets again with the soft brush, and inspect visually for capping, cracking, or cleaving.',
      'If no cracked or broken tablets are observed, weigh the intact tablets together on the analytical balance and record as W2.',
      'Calculate percentage friability: % Friability = [(W1 - W2) / W1] × 100. Check against acceptance criterion (NMT 1.0%).'
    ],
    precautions: [
      'If obviously cracked, cleaved, or broken tablets are present after tumbling, the sample FAILS the friability test immediately regardless of percentage weight loss.',
      'Coated tablets, chewable tablets, and effervescent tablets typically have different specifications or are exempt from standard friability tests.',
      'Ensure the drum is mounted in the correct rotational direction so the internal scoop scoops tablets upward rather than sliding underneath them.',
      'Clean the acrylic drum with mild lint-free wipes and water or dilute neutral detergent; NEVER use acetone or high-concentration alcohols which cause crazing/cracking of acrylic.',
      'Verify balance calibration and leveling before taking initial and final weights.'
    ],
    qcChecks: [
      'Tachometer verification of drum rotation speed (must remain within 25 ± 1 RPM).',
      'Revolution counter calibration to confirm exact 100-cycle shutoff.',
      'Visual inspection of drum surface for internal scratches, chips, or vane distortion.',
      'Repeat testing protocol: If % loss is >1.0% or results are borderline, repeat test twice and take average of 3 runs (average must not exceed 1.0%).'
    ],
    relatedDosageForms: ['TABLETS', 'SPECIAL DOSAGE FORMS'],
    permanentUrl: 'https://dosage-form.vercel.app/?equipment=tablet-friability-machine'
  },
  {
    id: 'ir-spectrophotometer',
    name: 'FTIR Spectrophotometer (Infrared)',
    category: 'Pharmaceutical Analysis',
    department: 'Pharmaceutical Chemistry & CAIF Lab',
    assetTag: 'PHARM-ANA-FTIR-04',
    modelExample: 'FTIR-7600 / Shimadzu IRTracer-100 Fourier Transform Infrared Spectrometer',
    image: '/images/equipment/ir-spectrophotometer.jpg',
    imageCaption: 'Fourier Transform Infrared (FTIR) spectrometer equipped with Attenuated Total Reflectance (ATR) diamond crystal accessory for rapid non-destructive molecular fingerprinting.',
    definition: 'A sophisticated analytical optical instrument that measures the absorption of mid-infrared electromagnetic radiation by organic molecules, providing a characteristic vibrational absorption spectrum used as a definitive molecular "fingerprint" for pharmaceutical identification.',
    principle: 'Polychromatic infrared radiation passes through a Michelson interferometer containing a beamsplitter, fixed mirror, and moving mirror to produce an interferogram. When directed through a sample, covalent chemical bonds absorb infrared photon energies matching their natural vibrational frequencies (symmetric/asymmetric stretching, scissoring, rocking, wagging, and twisting). A mathematical Fourier Transform algorithm converts the time-domain interferogram into a frequency-domain absorption/transmission spectrum versus wavenumber (cm⁻¹).',
    sopBrief: 'Clean ATR crystal · Collect air background · Apply powder & clamp pressure · Scan 4000-400 cm⁻¹',
    safetyCaution: 'Do not scratch ATR crystal. Moisture damages KBr optics; maintain dry desiccant. Wear PPE.',
    uses: [
      'Official pharmacopoeial identification (Test A) of active pharmaceutical ingredients (APIs) and raw excipients by spectral matching against certified reference standards (USP <197>, IP)',
      'Polymorphism screening and pseudo-polymorph characterization in preformulation drug development',
      'Drug-excipient compatibility testing to detect hydrogen bonding, chemical degradation, or complex formation in solid dosage formulations',
      'Functional group identification (carbonyl C=O at ~1700 cm⁻¹, hydroxyl O-H at ~3300 cm⁻¹, amine N-H at ~3400 cm⁻¹, aromatic rings at ~1600 cm⁻¹)',
      'Verification of packaging polymers, container closures (elastomers), and counterfeit medicine detection'
    ],
    specifications: [
      ['Example Instrument', 'FTIR-7600 Benchtop Infrared Spectrometer'],
      ['Spectral Wavenumber Range', '4000 cm⁻¹ to 400 cm⁻¹ (Mid-Infrared analytical region)'],
      ['Spectral Resolution', '0.5, 1.0, 2.0, 4.0, 8.0, 16.0 cm⁻¹ (selectable)'],
      ['Wavenumber Precision', '±0.01 cm⁻¹ (internal reference He-Ne laser calibration)'],
      ['Interferometer Design', 'Michelson interferometer with 30° incident angle and KBr beamsplitter'],
      ['Sampling Accessory', 'Single-reflection monolithic Diamond ATR (Attenuated Total Reflectance) with calibrated torque pressure clamp'],
      ['Detector', 'High-sensitivity temperature-stabilized DLATGS / DTGS pyroelectric detector'],
      ['Signal-to-Noise Ratio', '>30,000:1 (peak-to-peak, 4 cm⁻¹, 1 min scan at 2100 cm⁻¹)']
    ],
    operation: [
      'Power on the spectrometer and analytical workstation; allow the IR source and laser to thermally stabilize for 20–30 minutes.',
      'Thoroughly clean the diamond ATR sampling stage using spectroscopic-grade isopropanol or methanol and lint-free optical lens paper.',
      'Collect a clean air Background Spectrum (16–32 scans at 4 cm⁻¹ resolution) to account for atmospheric water vapor (H2O) and carbon dioxide (CO2).',
      'Place a minute quantity (few milligrams) of finely powdered solid sample or a single drop of liquid directly onto the center of the ATR crystal.',
      'Lower the pressure clamp anvil and apply controlled torque until optimal intimate optical contact is achieved without crushing the crystal.',
      'Initiate Sample Scan (32 scans averaged). View the resulting spectrum in % Transmittance vs. Wavenumber (cm⁻¹).',
      'Perform baseline correction, find peak frequencies, and execute library correlation search against the Pharmacopoeial Reference Standard spectrum.',
      'Release clamp pressure, carefully clean crystal with solvent wipe, and verify baseline return to 100% transmission.'
    ],
    precautions: [
      'Moisture hazard: Fused KBr optics and beamsplitters are hygroscopic; keep instrument continuously purged or ensure internal silica desiccant packs are fresh (blue, not pink).',
      'Never use metallic or sharp steel tools on the ATR crystal face; use soft wooden/plastic spatulas.',
      'Samples containing moisture show broad O-H stretching around 3300–3500 cm⁻¹ and 1640 cm⁻¹ which can obscure critical functional groups; dry samples thoroughly before testing.',
      'An FTIR match confirms chemical identity and functional groups, but does NOT establish quantitative purity or microbiological sterility on its own.',
      'Handle toxic APIs and fine unknown powders inside a dedicated analytical chemical fume hood.'
    ],
    qcChecks: [
      'Polystyrene film calibration: Scan certified 0.05 mm polystyrene film to verify band positions (e.g. 3060, 2849, 1942, 1601, 1028 cm⁻¹) within ±1.0 cm⁻¹ limits.',
      '100% Line flat-line noise and drift test to confirm detector sensitivity.',
      'Laser wavenumber accuracy check using internal He-Ne / solid-state reference laser.',
      'Desiccant status check and humidity sensor monitoring inside optical bench.'
    ],
    relatedDosageForms: ['TABLETS', 'CAPSULES', 'SPECIAL DOSAGE FORMS', 'LIQUID DOSAGE FORMS'],
    permanentUrl: 'https://dosage-form.vercel.app/?equipment=ir-spectrophotometer'
  },
  {
    id: 'cyclone-separator',
    name: 'Cyclone Separator',
    category: 'Powder Processing',
    department: 'Pharmaceutical Engineering & Pilot Plant',
    assetTag: 'PHARM-ENG-CYC-05',
    modelExample: 'Sanitary High-Efficiency Stainless Steel Cyclone Powder Collector',
    image: '/images/equipment/cyclone-separator.jpg',
    imageCaption: 'Pharmaceutical sanitary stainless steel (316L) cyclone separator installed in an active pharmaceutical ingredient solid processing and spray drying line.',
    definition: 'A centrifugal unit operation device without moving parts designed to separate, classify, and collect solid powder particles from a high-velocity carrier gas or air stream utilizing the principles of vortex inertia and centrifugal acceleration.',
    principle: 'Powder-laden gas enters tangentially at high velocity into the upper cylindrical barrel of the cyclone, forming an intense swirling vortex. Centrifugal acceleration (often hundreds of times greater than gravity) throws the heavier solid particles radially outward toward the cyclone wall. As particles collide with the conical wall, friction slows their velocity and gravity draws them down into the bottom collection receiver. Meanwhile, the clean gas reaches the bottom of the cone and reverses direction, forming an ascending inner vortex that exits upward through the central top vortex finder tube.',
    sopBrief: 'Verify earthing & receiver seal · Start blower · Feed powder tangentially · Purge 2 min before shutoff',
    safetyCaution: 'Combustible dust explosion hazard! Continuous static grounding mandatory. Wear N95 respirator.',
    uses: [
      'Collection of micronized pharmaceutical powders downstream of spray dryers, flash dryers, and fluid bed dryers (FBD)',
      'Particle size classification and dust collection during pharmaceutical milling, pulverizing, and dry granulation operations',
      'Recovery of valuable active pharmaceutical ingredient (API) aerosols in inhalation powder processing',
      'Air pollution abatement and secondary product recovery in pharmaceutical solids pilot plants',
      'Teaching classical pharmaceutical unit operations: particle fluid mechanics, vortex separation, and Stokes’ law centrifugal separation'
    ],
    specifications: [
      ['Construction Material', 'Pharmaceutical cGMP grade AISI 316L Stainless Steel (interior mirror polish Ra < 0.4 µm)'],
      ['Inlet Air Velocity', '15 to 25 meters/second (optimal tangential entry velocity)'],
      ['Cut-off Diameter (d50)', '2.0 to 5.0 µm (high-efficiency Stairmand or Lapple design)'],
      ['Collection Efficiency', '>98% for particles >10 µm; 70–85% for sub-micron fine particles'],
      ['Pressure Drop (ΔP)', 'Typical 750 to 1800 Pa across cyclone body during standard operation'],
      ['Receiver Type', 'Quick-release sanitary clamp sealed collection hopper with butterfly isolation valve'],
      ['Grounding & Bonding', 'Continuous copper grounding straps with static discharge dissipation studs'],
      ['Cleanability', 'Fully clean-in-place (CIP) and steam-in-place (SIP) compatible design']
    ],
    operation: [
      'Inspect cyclone interior, silicone gaskets, and receiver connections; verify that the bottom collection bin is hermetically clamped.',
      'Inspect electrical earthing connections: ensure grounding clamp is securely fastened to eliminate static charge buildup.',
      'Start the induced-draft / forced-draft blower fan; verify the differential pressure gauge across inlet and outlet indicates normal operating flow.',
      'Gradually introduce the powder-air mixture into the tangential inlet at the validated feed rate. Avoid slugging or surging.',
      'Continuously monitor the pressure drop across the manometer and inspect for any air leakage around the bottom receiver clamp.',
      'At the end of processing, stop the powder feed first, allowing clean air to purge the cyclone for 2 minutes to clear residual particulate.',
      'Turn off the blower fan. Wait until internal air movement ceases, then isolate the collection valve and safely dismount the powder receiver.',
      'Log powder recovery mass, calculate yield percentage, and execute cleaning SOP to prevent cross-batch contamination.'
    ],
    precautions: [
      'Dust explosion hazard: Fine organic pharmaceutical powders (starches, lactose, APIs) suspended in air create explosive air-fuel mixtures. Continuous bonding and static earthing are MANDATORY.',
      'Never unclamp or open the bottom powder receiver while the system is operating under negative/positive pressure; doing so disrupts the vortex and releases dust clouds.',
      'Operators must wear certified N95/P3 particulate respirators, safety goggles, and conductive anti-static lab footwear.',
      'Inlet velocity must be maintained within the design range: too low velocity reduces centrifugal separation; too high velocity causes re-entrainment of collected powder into the exhaust.',
      'Clean all internal weld seams thoroughly between product campaigns to eliminate cross-contamination.'
    ],
    qcChecks: [
      'Mass balance and recovery yield calculation: (Collected powder mass / Total input feed mass) × 100.',
      'Particle size distribution (PSD) analysis of collected fraction using sieve shaker or laser diffraction (Malvern).',
      'Static earth continuity test (<10 Ohms resistance from cyclone body to ground).',
      'Gasket vacuum seal integrity test to prevent air infiltration at cone apex.'
    ],
    relatedDosageForms: ['TABLETS', 'CAPSULES', 'INHALATION PRODUCTS'],
    permanentUrl: 'https://dosage-form.vercel.app/?equipment=cyclone-separator'
  },
  {
    id: 'quartz-muffle-tray',
    name: 'Quartz Muffle Tray (Crucible Boat)',
    category: 'Analytical Labware & Ash Testing',
    department: 'Pharmaceutical Chemistry & Pharmacognosy',
    assetTag: 'PHARM-ANA-QTZ-06',
    modelExample: 'High-Purity Fused Transparent Quartz Combustion Boat with Loop Handle',
    image: '/images/equipment/quartz-muffle-tray.jpg',
    imageCaption: 'Ultra-high-purity fused transparent quartz sample boat with integral handling ring for pharmacopoeial ash determination in high-temperature muffle furnaces.',
    definition: 'An ultra-pure, thermal-shock resistant fused silica laboratory sample vessel used to hold crucibles, crude drugs, or inorganic compounds inside high-temperature muffle furnaces (up to 1100°C) during official pharmacopoeial ignition and ashing tests.',
    principle: 'Fused transparent quartz (amorphous silicon dioxide, SiO₂ > 99.99%) possesses an extremely high melting point (~1700°C), an extraordinarily low coefficient of thermal expansion (5.5 × 10⁻⁷ /°C), and exceptional chemical resistance to strong acids. When placed inside a muffle furnace, radiant heat incinerates organic matter at 500°C–800°C into volatile gases (CO₂, H₂O, SO₂), leaving only pure inorganic mineral residue (ash), without sample contamination, vessel softening, or reaction with the furnace hearth.',
    sopBrief: 'Tare boat to constant wt @ 600°C · Weigh 1-2 g drug · Ignite in muffle furnace · Cool in desiccator',
    safetyCaution: 'Extreme heat (600-1000°C)! Use muffle tongs and heat gloves. Never touch hot quartz to cold wet tile.',
    uses: [
      'Total Ash value determination of herbal crude drugs and plant-derived pharmaceuticals (IP, BP, USP)',
      'Acid-Insoluble Ash testing to detect silica, earthy matter, and sand contamination in raw drugs',
      'Sulfated Ash / Residue on Ignition (ROI) testing according to official pharmacopoeial monographs (USP <281>, IP 2.4.19)',
      'Water-Soluble Ash determination to verify exhausted or extracted crude drugs',
      'High-temperature fusion and gravimetric ignition of inorganic pharmaceutical active ingredients to constant weight'
    ],
    specifications: [
      ['Material Composition', 'High-purity fused transparent silica / quartz (SiO₂ purity ≥ 99.99%)'],
      ['Maximum Operating Temperature', 'Continuous service: 1050°C; Peak short-term limit: 1200°C'],
      ['Coefficient of Thermal Expansion', '5.5 × 10⁻⁷ /°C (20°C to 1000°C) — virtually zero thermal distortion'],
      ['Softening Point', '1683°C (high dimensional stability under furnace heat)'],
      ['Chemical Resistance', 'Inert to concentrated HNO₃, H₂SO₄, HCl, aqua regia; attacked only by HF and strong hot alkalis'],
      ['Handling Feature', 'Integral fused quartz hook/loop handle for secure tong manipulation'],
      ['Optical Clarity', 'High optical transparency allowing visual inspection of sample ash during and after heating'],
      ['Typical Dimensions', 'Length: 80–120 mm; Width: 20–30 mm; Depth: 12–15 mm']
    ],
    operation: [
      'Inspect the quartz boat under strong light for hairline cracks, devitrification (milky white spots), or surface pitting.',
      'Wash thoroughly with dilute nitric acid (10%), rinse with deionized water, and dry in an oven at 110°C.',
      'Pre-ignite the empty quartz boat/crucible in the muffle furnace at 600°C ± 25°C for 30 minutes. Cool in a desiccator for 30 minutes and weigh accurately on a microbalance (W1) to constant weight.',
      'Accurately weigh 1.000 g to 2.000 g of finely ground drug sample into the tared quartz vessel; record total weight as W2 (sample mass = W2 - W1).',
      'For Total Ash: gently char the sample over a low Bunsen flame until carbonized, then place the quartz boat onto the furnace shelf using long muffle tongs.',
      'Heat in the muffle furnace at 550°C to 650°C until the carbon is completely burnt and light grey/white ash remains.',
      'Using muffle tongs, carefully transfer the hot quartz boat to a heat-resistant cooling tile for 1 minute, then transfer into a silica-gel desiccator until cooled to room temperature.',
      'Weigh the boat and ash on the analytical balance (W3). Calculate: % Ash = [(W3 - W1) / (W2 - W1)] × 100.'
    ],
    precautions: [
      'EXTREME THERMAL BURN HAZARD: Muffle furnace temperatures exceed 600°C to 1000°C. ALWAYS wear heavy-duty aluminized heat-resistant gloves, protective eye goggles, and use long stainless steel tongs.',
      'Never place a red-hot quartz boat onto a cold, wet, or conductive metal surface; although quartz has low thermal expansion, drastic thermal shocks or liquid splatters can cause shattering.',
      'Do not touch quartz surfaces with bare hands: finger oils contain sodium and potassium salts which catalyze high-temperature devitrification (crystallization of amorphous silica into cristobalite, making it brittle and milky).',
      'Hydrofluoric acid (HF) rapidly dissolves quartz and must NEVER be used on quartz ware.',
      'Always cool samples inside a sealed desiccator before weighing; hygroscopic ash absorbs moisture from atmospheric air within seconds, distorting analytical weights.'
    ],
    qcChecks: [
      'Ignition to constant weight verification: consecutive weighings must not differ by more than 0.5 mg.',
      'Devitrification inspection: discard or recondition quartz boats showing opaque white crystallization.',
      'Desiccator desiccant activity check (fresh blue silica gel indicator) to ensure anhydrous cooling conditions.',
      'Muffle furnace pyrometer and thermocouple calibration check against standard temperature cones.'
    ],
    relatedDosageForms: ['TABLETS', 'CAPSULES', 'SPECIAL DOSAGE FORMS'],
    permanentUrl: 'https://dosage-form.vercel.app/?equipment=quartz-muffle-tray'
  }
];

export const EQUIPMENT_BY_ID = Object.fromEntries(
  EQUIPMENT_LIST.map((item) => [item.id, item])
) as Record<EquipmentId, EquipmentGuide>;
