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
  | 'PARENTERALS & MISC.'
  | 'PASTES'
  | 'SOLUTIONS'
  | 'SUSPENSIONS'
  | 'GARGLES'
  | 'MOUTHWASH'
  | 'POWDERS'
  | 'NASAL DROPS';

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
