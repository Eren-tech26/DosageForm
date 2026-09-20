export type DosageFormCategory =
  | 'TABLETS'
  | 'CAPSULES'
  | 'SYRUPS'
  | 'INJECTIONS'
  | 'OINTMENTS & CREAMS'
  | 'EYE/EAR DROPS'
  | 'LIQUID DOSAGE FORMS'
  | 'TOPICAL PREPARATIONS'
  | 'INHALATION PRODUCTS'
  | 'SPECIAL DOSAGE FORMS'
  | 'SUPPOSITORIES'
  | 'PARENTERALS & MISC.';

export interface ProductFormData {
  dosageForm: DosageFormCategory;
  productName: string;
  strength: string;
  route: string;
  usageInstructions: string;
  sideEffects?: string;
  storageConditions: string;
  batchNumber?: string;
  expiryDate?: string;
  rxType?: 'Rx Only' | 'OTC' | 'Controlled Substance' | 'Hospital Use Only';
  manufacturer?: string;
  warnings?: string;
}

export interface PharmacyDossier {
  category: DosageFormCategory;
  shortName: string;
  categoryTag: string; // e.g., 'Solid Oral', 'Sterile Parenteral'
  image: string;
  imageCaption: string;
  definition: string;
  classification: string[];
  routesOfAdministration: string[];
  commonExcipients: string[];
  keyAdvantages: string[];
  disadvantagesOrLimitations: string[];
  pharmaceuticalQualityTests: string[];
  studentDispensingTips: string[];
  exampleProducts: {
    productName: string;
    strength: string;
    route: string;
    instructions: string;
    sideEffects: string;
    storage: string;
    batch: string;
    expiry: string;
    rxType: 'Rx Only' | 'OTC' | 'Controlled Substance' | 'Hospital Use Only';
    warnings: string;
    manufacturer: string;
  }[];
}

export interface ScannedRecord {
  id: string;
  timestamp: number;
  rawText: string;
  isStructuredPharma: boolean;
  data: ProductFormData;
}

// --- Equipment Types ---
export type EquipmentId =
  | 'digital-mini-incubator'
  | 'hot-air-oven'
  | 'tablet-friability-machine'
  | 'ir-spectrophotometer'
  | 'cyclone-separator'
  | 'quartz-muffle-tray';

export interface EquipmentDossier {
  id: EquipmentId;
  shortName: string;
  fullName: string;
  categoryTag: string;
  image: string;
  imageCaption: string;
  definition: string;
  workingPrinciple: string;
  construction: string[];
  specifications: [string, string][];
  pharmacyApplications: string[];
  advantages: string[];
  limitations: string[];
  operatingProcedure: string[];
  qualityTests: string[];
  safetyPrecautions: string[];
  exampleModels: { model: string; manufacturer: string; notes: string }[];
  sources?: { label: string; url: string }[];
}
