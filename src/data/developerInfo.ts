/**
 * Single source of truth for the developer/author credit shown across the app
 * (footer, developer card, scanned-view credit). Update the values here and every
 * place that displays the credit updates with it.
 */
export interface DeveloperInfo {
  /** Full name of the developer. */
  name: string;
  /** Degree programme. */
  program: string;
  /** Year of study within the programme. */
  year: string;
  /** Class roll number (kept as a string so leading zeros survive). */
  rollNo: string;
  /** Age of the developer. */
  age: number;
  /** Role in this project. */
  projectRole: string;
  /** One-line credit used in the app footer. */
  footerCredit: string;
  /** Longer note rendered inside the developer card. */
  note: string;
}

export const DEVELOPER_INFO: DeveloperInfo = {
  name: 'Rohan Avinash Ishwarkatti',
  program: 'B. Pharmacy',
  year: 'Second Year',
  rollNo: '18',
  age: 20,
  projectRole: 'Developer & Content Curator',
  footerCredit: 'Second Year B. Pharmacy · Roll No. 18 · Age 20',
  note:
    'PharmaQR was designed and built by a pharmacy student, for pharmacy students. The dosage form ' +
    'dossiers, excipient lists, pharmacopeial QC tests and dispensing tips were compiled from the ' +
    'B. Pharm Pharmaceutics syllabus so classmates can revise any dosage form with a single QR scan ' +
    'instead of hunting through notes.'
};
