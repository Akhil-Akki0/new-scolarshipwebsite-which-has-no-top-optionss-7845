export interface UserProfile {
  state: string;
  degree: string;
  category: string;
  annualIncome: number;
  marks: number;
  isFemale?: boolean;
  isPwD?: boolean;
}

export type MatchStatus = 'eligible' | 'borderline' | 'ineligible';

export interface CriteriaCheck {
  id: string;
  label: string;
  passed: boolean;
  isWarning?: boolean;
  userValue: string;
  requiredValue: string;
}

export interface Scholarship {
  id: string;
  title: string;
  portal: string;
  issuingAuthority: string;
  description: string;
  amount: string;
  deadline: string;
  statusBadgeText?: string;
  statusBadgeColor?: 'emerald' | 'amber' | 'slate' | 'blue';
  applyUrl: string;
  gazetteUrl: string;
  gazetteRef: string;
  gazetteDate: string;
  gazetteSummary: string;
  
  // Eligibility criteria
  states: string[]; // 'KA', 'MH', 'UP', 'TN', 'DL', 'ALL'
  degrees: string[]; // 'UG', 'PG', '12', '10', 'PHD'
  categories: string[]; // 'OBC', 'SC', 'ST', 'GENERAL', 'EWS'
  maxIncome: number;
  minMarks: number;
  specialCriteria?: string;
  womenOnly?: boolean;
  pwdOnly?: boolean;
  
  // Extra metadata
  documentsRequired: string[];
  disbursementType: string;
  applicationSteps: string[];
  departmentPhone?: string;
  departmentEmail?: string;
}
