import { Scholarship } from '../types/scholarship';

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'ssp-karnataka-obc',
    title: 'Post-Matric Scholarship for Backward Classes (Karnataka)',
    portal: 'Karnataka State Scholarship Portal (SSP)',
    issuingAuthority: 'Backward Classes Welfare Department, Govt. of Karnataka',
    description: 'Covers full college maintenance allowance and course fee reimbursement for students enrolled in professional and general degree tracks in recognized state colleges.',
    amount: '₹25,000 – ₹55,000 / yr',
    deadline: 'Deadline: Nov 30, 2024',
    statusBadgeText: 'Eligible to apply',
    statusBadgeColor: 'emerald',
    applyUrl: 'https://ssp.postmatric.karnataka.gov.in',
    gazetteUrl: 'https://bcwd.karnataka.gov.in',
    gazetteRef: 'BCWD/SCH/NOTIF-2024/772-B',
    gazetteDate: 'August 14, 2024',
    gazetteSummary: 'Section 4(2) of the Karnataka State Welfare Act provides 100% course fee subsidy and ₹3,500/month living stipend for hostelers (₹1,500/month for day scholars) enrolled in B.Tech, MBBS, B.Sc, B.Com, and polytechnic streams.',
    states: ['KA'],
    degrees: ['UG', 'PG', '12', 'POLYTECHNIC'],
    categories: ['OBC', 'EWS'],
    maxIncome: 250000,
    minMarks: 50,
    specialCriteria: 'Karnataka domicile required. Student must possess RD number on caste & income certificate issued via Nadakacheri.',
    documentsRequired: [
      'Income Certificate (Issued by Revenue Dept / Nadakacheri)',
      'Caste Certificate with valid RD Number',
      'Previous Year Marksheet (minimum 50%)',
      'College Fee Receipt & Bonafide Certificate',
      'Aadhaar-seeded Bank Account passbook copy'
    ],
    disbursementType: 'Direct Benefit Transfer (DBT) directly into Aadhaar-linked savings account.',
    applicationSteps: [
      'Create student login on Karnataka SSP using Aadhaar and Nadakacheri RD Number.',
      'Enter College Registration / USN number to automatically fetch enrolled fee details.',
      'Upload e-Attested previous year marksheet and fee receipt.',
      'Submit application and download acknowledgment slip for college verification.'
    ],
    departmentPhone: '080-35254757',
    departmentEmail: 'postmatric-feedback@karnataka.gov.in'
  },
  {
    id: 'nsp-pm-usp',
    title: 'PM-USP Central Sector Scheme for College and University Students',
    portal: 'National Scholarship Portal (Central Sector)',
    issuingAuthority: 'Department of Higher Education, Ministry of Education, Govt. of India',
    description: 'Direct cash transfers deposited into student bank accounts through DBT for undergraduate and postgraduate degree study at any UGC/AICTE-accredited institution in India.',
    amount: '₹12,000 / year',
    deadline: 'Status: Open on NSP (Dec 15, 2024)',
    statusBadgeText: 'Eligible to apply',
    statusBadgeColor: 'emerald',
    applyUrl: 'https://scholarships.gov.in',
    gazetteUrl: 'https://www.education.gov.in/higher_education',
    gazetteRef: 'MoE/HE/CSSS/GZ-2024-89',
    gazetteDate: 'July 1, 2024',
    gazetteSummary: 'Annual allocation of 82,000 fresh scholarships (41,000 for boys and 41,000 for girls) for pursuing graduate/post-graduate degrees. Beneficiaries must fall within the top 20th percentile of their respective Higher Secondary Board.',
    states: ['ALL', 'KA', 'MH', 'UP', 'TN', 'DL', 'OTHER'],
    degrees: ['UG', 'PG'],
    categories: ['GENERAL', 'OBC', 'SC', 'ST', 'EWS'],
    maxIncome: 450000,
    minMarks: 70,
    specialCriteria: 'Must be in the top 20th percentile of your Class 12 board examination. Bank account must be seeded with Aadhaar in NPCI mapper.',
    documentsRequired: [
      'Class 12 Passing Certificate & Official Marksheet',
      'Income Certificate signed by Competent Revenue Authority (< ₹4.5L)',
      'Bonafide Student Certificate issued by Head of University/College',
      'Bank Account Passbook with Aadhaar NPCI Linkage Confirmation'
    ],
    disbursementType: 'Direct Benefit Transfer (DBT) under Ministry of Education guidelines.',
    applicationSteps: [
      'Register on National Scholarship Portal (NSP 2.0 / scholarships.gov.in) with OTR (One Time Registration).',
      'Select Department of Higher Education -> Central Sector Scheme.',
      'Enter Class 12 Board Roll number, Year of Passing, and College AISHE code.',
      'Submit application online; Institute Nodal Officer (INO) performs biometric eKYC.'
    ],
    departmentPhone: '0120-6619540',
    departmentEmail: 'helpdesk@scholarships.gov.in'
  },
  {
    id: 'aicte-pragati-saksham',
    title: 'AICTE Technical Degree Grant (Pragati / Saksham Scheme)',
    portal: 'AICTE Pragati / Saksham Scheme',
    issuingAuthority: 'All India Council for Technical Education (AICTE)',
    description: 'Financial assistance for female candidates and specially-abled candidates pursuing approved technical education programs (Degree & Diploma levels).',
    amount: '₹50,000 / year',
    deadline: 'Verified guidelines (Dec 31, 2024)',
    statusBadgeText: 'Borderline Eligibility Check',
    statusBadgeColor: 'amber',
    applyUrl: 'https://www.aicte-india.org/schemes/students-development-schemes',
    gazetteUrl: 'https://www.aicte-india.org/sites/default/files/pragati-guidelines.pdf',
    gazetteRef: 'AICTE/StD/Pragati-Saksham/2024-25',
    gazetteDate: 'May 28, 2024',
    gazetteSummary: 'Provides ₹50,000 per year directly to female and specially-abled students for every year of technical study to cover college fees and books.',
    states: ['ALL', 'KA', 'MH', 'UP', 'TN', 'DL', 'OTHER'],
    degrees: ['UG', 'POLYTECHNIC'],
    categories: ['GENERAL', 'OBC', 'SC', 'ST', 'EWS'],
    maxIncome: 800000,
    minMarks: 50,
    specialCriteria: 'Reserved criteria: Women candidates (up to 2 girls per family) or PwD candidates with minimum 40% disability.',
    womenOnly: true,
    documentsRequired: [
      'Class 10th & 12th Marksheet',
      'Admission allotment letter from centralized admission authority (KEA/CET/JEE/MHT-CET)',
      'Tuition fee paid receipt for current academic year',
      'Family Income Certificate not exceeding ₹8,00,000/annum',
      'Disability Certificate (if applying under Saksham category)'
    ],
    disbursementType: 'Annual DBT installment of ₹50,000 credited directly by AICTE.',
    applicationSteps: [
      'Apply on National Scholarship Portal under AICTE Schemes.',
      'Provide College Admission number and AICTE college permanent ID.',
      'Attach admission fee receipt and Aadhaar consent letter.',
      'Head of Institute approves the candidate record in AICTE portal.'
    ],
    departmentPhone: '011-29581333',
    departmentEmail: 'pragatisaksham@aicte-india.org'
  },
  {
    id: 'post-matric-scst',
    title: 'Post-Matric Scholarship for SC/ST Students',
    portal: 'Ministry of Social Justice & Empowerment / Tribal Affairs',
    issuingAuthority: 'Centrally Sponsored Scheme implemented by State Governments',
    description: 'Covers 100% compulsory non-refundable university fees plus monthly living stipend for students enrolled in Class 11, degree, engineering, medical, or post-grad tracks.',
    amount: 'Up to ₹1.2L / yr',
    deadline: 'Active for 2024-25',
    statusBadgeText: 'Eligible to apply',
    statusBadgeColor: 'emerald',
    applyUrl: 'https://scholarships.gov.in',
    gazetteUrl: 'https://socialjustice.gov.in/schemes/post-matric-scholarship-sc',
    gazetteRef: 'MSJE-11014/03/2021-SCD-V',
    gazetteDate: 'February 10, 2024',
    gazetteSummary: 'Revised Central Sector sharing ratio (60:40) guaranteeing that zero SC/ST students drop out due to economic hardship. Complete tuition fee waiver transferred to institution and maintenance allowance directly to student account.',
    states: ['ALL', 'KA', 'MH', 'UP', 'TN', 'DL', 'OTHER'],
    degrees: ['UG', 'PG', '12', '10', 'PHD', 'POLYTECHNIC'],
    categories: ['SC', 'ST'],
    maxIncome: 250000,
    minMarks: 40,
    specialCriteria: 'Available for all SC/ST domicile students. No cap on number of students per family.',
    documentsRequired: [
      'Official Caste Certificate issued by Sub-Divisional Magistrate (SDM) / Tehsildar',
      'Family Income Certificate (below ₹2,50,000/yr)',
      'Hostel certificate (if claiming hosteler maintenance rates)',
      'College fee structure signed by Registrar / Principal'
    ],
    disbursementType: 'Direct DBT to student savings account for maintenance; course fees credited via state treasury.',
    applicationSteps: [
      'Register on state welfare portal (e.g., SSP Karnataka, MahaDBT Maharashtra, or NSP for central).',
      'Select SC/ST Post-Matric Welfare category.',
      'Fetch digitally signed caste certificate from DigiLocker or state e-District service.',
      'Institute verifies attendance and marksheet before district release.'
    ],
    departmentPhone: '1800-11-2001',
    departmentEmail: 'scst-scholarships@gov.in'
  },
  {
    id: 'state-merit-cum-means',
    title: 'State Merit-cum-Means Assistance (Higher Education)',
    portal: 'State Social Welfare & Education Directorates',
    issuingAuthority: 'State Government Higher Education Departments',
    description: 'State government specific allocations for meritorious students attending polytechnic, medical, or engineering institutions inside their domicile state.',
    amount: 'Full / Partial Tuition',
    deadline: 'State specific dates',
    statusBadgeText: 'State Scheme',
    statusBadgeColor: 'blue',
    applyUrl: 'https://scholarships.gov.in',
    gazetteUrl: 'https://dbtbharat.gov.in',
    gazetteRef: 'ST-DIR-EDU/MCM-2024/09',
    gazetteDate: 'June 18, 2024',
    gazetteSummary: 'Provides tuition reimbursement up to ₹50,000 or actual college fee (whichever is lower) for state students enrolled in recognized universities located within the state borders.',
    states: ['ALL', 'KA', 'MH', 'UP', 'TN', 'DL', 'OTHER'],
    degrees: ['UG', 'PG', 'POLYTECHNIC'],
    categories: ['GENERAL', 'OBC', 'SC', 'ST', 'EWS'],
    maxIncome: 300000,
    minMarks: 60,
    specialCriteria: 'Candidate must have resided in the home state for at least 5 consecutive years.',
    documentsRequired: [
      'State Domicile / Nativity Certificate',
      'Income Certificate (Under ₹3,00,000 / year)',
      'Academic transcripts of qualifying examination',
      'Admission fee breakdown issued by institution'
    ],
    disbursementType: 'Annual credit via State DBT Treasury Portal.',
    applicationSteps: [
      'Check State Portal window during academic admissions (August - November).',
      'Submit domicile proof and valid academic record.',
      'College nodals review merit roster.'
    ],
    departmentPhone: '1800-425-2424',
    departmentEmail: 'support.statemcm@gov.in'
  },
  {
    id: 'mahadbt-rajarshi-shahu',
    title: 'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti (Maharashtra)',
    portal: 'MahaDBT Portal (Maharashtra)',
    issuingAuthority: 'Directorate of Higher Education, Govt. of Maharashtra',
    description: 'Reimburses 50% of tuition and exam fees for Open/EWS and SEBC students admitted through CAP rounds in professional and higher education colleges.',
    amount: '50% Tuition Fee Reimbursement',
    deadline: 'Dec 15, 2024',
    statusBadgeText: 'Eligible to apply',
    statusBadgeColor: 'emerald',
    applyUrl: 'https://mahadbt.maharashtra.gov.in',
    gazetteUrl: 'https://dhe.maharashtra.gov.in',
    gazetteRef: 'DHE-EBC-2024/CR-104',
    gazetteDate: 'July 25, 2024',
    gazetteSummary: 'Government Resolution No. EBC-2016/CR-221 stipulates that 50% of the approved Fee Regulating Authority (FRA) tuition fees will be directly paid by the State Govt.',
    states: ['MH'],
    degrees: ['UG', 'PG', 'POLYTECHNIC'],
    categories: ['GENERAL', 'EWS', 'OBC'],
    maxIncome: 800000,
    minMarks: 50,
    specialCriteria: 'Maharashtra domicile required. Admission must be through centralized admission process (MHT-CET / CAP). Family income under ₹8 Lakhs.',
    documentsRequired: [
      'Maharashtra Domicile Certificate',
      'Tehsildar issued Family Income Certificate (Below ₹8L)',
      'CAP Allotment Letter',
      'College Fee Receipt for Academic Year 2024-25'
    ],
    disbursementType: 'Two installments directly into student Aadhaar-linked account.',
    applicationSteps: [
      'Register on MahaDBT portal with Aadhaar OTP authentication.',
      'Select Higher Education -> Rajarshi Shahu Maharaj Scheme.',
      'Link CAP Application ID and college roll number.',
      'Institute scrutiny followed by District DHE approval.'
    ],
    departmentPhone: '022-49150800',
    departmentEmail: 'mahadbt.helpdesk@maharashtra.gov.in'
  },
  {
    id: 'up-post-matric-general-obc',
    title: 'UP Post-Matric Scholarship for General & OBC (Fee Reimbursement)',
    portal: 'Uttar Pradesh Scholarship & Fee Reimbursement Online System',
    issuingAuthority: 'Social Welfare & Backward Class Welfare Dept, Govt. of Uttar Pradesh',
    description: 'Direct compensation for university registration and exam fees alongside monthly stipend for Uttar Pradesh residents enrolled in state and central institutions.',
    amount: '₹30,000 – ₹60,000 / yr',
    deadline: 'Dec 20, 2024',
    statusBadgeText: 'Eligible to apply',
    statusBadgeColor: 'emerald',
    applyUrl: 'https://scholarship.up.gov.in',
    gazetteUrl: 'https://scholarship.up.gov.in/rules.aspx',
    gazetteRef: 'UP-SWD-POST-2024/311-A',
    gazetteDate: 'August 02, 2024',
    gazetteSummary: 'Provides complete institutional fee reimbursement and monthly subsistence grant for Class 11, 12, UG, and PG students belonging to OBC and General economically weaker sections.',
    states: ['UP'],
    degrees: ['UG', 'PG', '12', 'POLYTECHNIC'],
    categories: ['GENERAL', 'OBC', 'EWS'],
    maxIncome: 200000,
    minMarks: 50,
    specialCriteria: 'UP Domicile certificate required. Income limit is ₹2,00,000 for General/OBC and ₹2,50,000 for SC/ST.',
    documentsRequired: [
      'UP Domicile (Niwās) Certificate',
      'Income Certificate verified via eDistrict UP portal',
      'High School (Class 10) and Intermediate Marksheets',
      'Annual non-refundable fee receipt'
    ],
    disbursementType: 'PFMS DBT transfer directly into bank account.',
    applicationSteps: [
      'Register on scholarship.up.gov.in with High School Board Roll Number.',
      'Perform DigiLocker Aadhaar eKYC verification.',
      'Fill academic details and submit printout copy to college desk.'
    ],
    departmentPhone: '1800-180-5131',
    departmentEmail: 'scholarshipup2024@gmail.com'
  },
  {
    id: 'tn-post-matric-bc-mbc',
    title: 'Tamil Nadu BC/MBC/DNC Post-Matric Welfare Scholarship',
    portal: 'Tamil Nadu Directorate of Backward Classes Welfare',
    issuingAuthority: 'BC, MBC and Minorities Welfare Department, Tamil Nadu',
    description: 'Free education scheme covering compulsory tuition fees and hostel boarding grants for backward community students in government & aided colleges.',
    amount: '₹15,000 – ₹45,000 / yr',
    deadline: 'Nov 15, 2024',
    statusBadgeText: 'Eligible to apply',
    statusBadgeColor: 'emerald',
    applyUrl: 'https://www.bcmbcmw.tn.gov.in',
    gazetteUrl: 'https://www.bcmbcmw.tn.gov.in/guidelines.html',
    gazetteRef: 'TN-BCW-GO-MS-88',
    gazetteDate: 'June 05, 2024',
    gazetteSummary: 'Full tuition fee waiver for first-generation graduates or backward class families earning under ₹2,50,000 per annum enrolled in state universities.',
    states: ['TN'],
    degrees: ['UG', 'PG', 'POLYTECHNIC'],
    categories: ['OBC', 'GENERAL'],
    maxIncome: 250000,
    minMarks: 50,
    specialCriteria: 'Tamil Nadu domicile required. Special provisions for First Generation Graduate certificate holders.',
    documentsRequired: [
      'Permanent Community Certificate card issued in Tamil Nadu',
      'Income Certificate from Tahsildar',
      'First Graduate Certificate (if applicable)',
      'College Bonafide and fee structure'
    ],
    disbursementType: 'Direct bank transfer via Electronic Clearance System (ECS).',
    applicationSteps: [
      'College scholarship officer enters student roll number into Department portal.',
      'Student submits verification documents at the college administration desk.'
    ],
    departmentPhone: '044-28515450',
    departmentEmail: 'director-bcmw@tn.gov.in'
  },
  {
    id: 'delhi-merit-e-district',
    title: 'Delhi Higher Education Financial Assistance for SC/ST/OBC/Minorities',
    portal: 'Delhi e-District Portal',
    issuingAuthority: 'Department for the Welfare of SC/ST/OBC, Govt. of NCT of Delhi',
    description: 'Reimbursement of tuition and other compulsory fees for students studying in recognized colleges and technical institutions in Delhi.',
    amount: 'Up to ₹40,000 / yr',
    deadline: 'Dec 31, 2024',
    statusBadgeText: 'Eligible to apply',
    statusBadgeColor: 'emerald',
    applyUrl: 'https://edistrict.delhigovt.nic.in',
    gazetteUrl: 'https://edistrict.delhigovt.nic.in/ineligible.html',
    gazetteRef: 'GNCTD-SCST-NOTIF-412',
    gazetteDate: 'July 11, 2024',
    gazetteSummary: 'Financial assistance for candidates whose family income does not exceed ₹3,00,000 per annum. Students scoring 60% or above in previous exams receive accelerated reimbursement.',
    states: ['DL'],
    degrees: ['UG', 'PG', '12', 'POLYTECHNIC'],
    categories: ['OBC', 'SC', 'ST', 'EWS'],
    maxIncome: 300000,
    minMarks: 50,
    specialCriteria: 'Delhi residence proof for the last 3 years is mandatory.',
    documentsRequired: [
      'Delhi Domicile / Voter ID / Ration Card',
      'SDM issued Income Certificate',
      'College Fee Receipt for 2024-25',
      'Self-declaration certificate'
    ],
    disbursementType: 'Direct transfer to Aadhaar seeded bank account.',
    applicationSteps: [
      'Log into edistrict.delhigovt.nic.in using Delhi citizen credentials.',
      'Choose Department for the Welfare of SC/ST/OBC -> Financial Assistance Scheme.',
      'Upload digital certificates and track status with application tracking number.'
    ],
    departmentPhone: '011-23935257',
    departmentEmail: 'edistrict.delhi@gov.in'
  }
];

export const FREQUENTLY_APPLIED_SCHEMES = [
  {
    tag: 'Central Govt',
    amount: 'Up to ₹1.2L / yr',
    title: 'Post-Matric Scholarship for SC/ST Students',
    description: 'Covers non-refundable university fees plus monthly living stipend for students enrolled in Class 11, degree, or post-grad tracks.',
    criteria: [
      'Income ceiling: Under ₹2,50,000 / year',
      'Applicable across all Indian states'
    ],
    status: 'Active for 2024-25',
    portalUrl: 'https://scholarships.gov.in',
    portalLabel: 'View portal'
  },
  {
    tag: 'Ministry of Education',
    amount: '₹12,000 – ₹20,000 / yr',
    title: 'PM-USP College & University Students',
    description: 'Merit-based direct financial support for students scoring in the top 20th percentile in their state board Class 12 exams.',
    criteria: [
      'Income ceiling: Under ₹4,50,000 / year',
      'Direct Bank Transfer (DBT)'
    ],
    status: 'Active for 2024-25',
    portalUrl: 'https://scholarships.gov.in',
    portalLabel: 'View portal'
  },
  {
    tag: 'State Welfare Depts',
    amount: 'Full / Partial Tuition',
    title: 'State Merit-cum-Means Assistance',
    description: 'State government specific allocations for students attending polytechnic, medical, or engineering institutions inside their domicile state.',
    criteria: [
      'Income limits vary by state (₹1.5L – ₹3L)',
      'Administered through state portals'
    ],
    status: 'State specific dates',
    portalUrl: '#quick-checker',
    portalLabel: 'Check state rules'
  }
];

export const FAQS = [
  {
    question: 'Do I need an account or login to use this?',
    answer: 'No. You do not need to create an account, log in, or give us your phone number or email address. You enter basic educational and income criteria into the form, and the list of eligible scholarships appears right away.'
  },
  {
    question: 'Where do you get the scholarship criteria from?',
    answer: 'Our team indexes scheme rules directly from official Gazette notifications published on the National Scholarship Portal (scholarships.gov.in), DBT Bharat (dbtbharat.gov.in), and individual state social welfare portals. We update cutoff dates and rules weekly.'
  },
  {
    question: 'Do you charge any fee or cut from the scholarship?',
    answer: 'Never. ScholarMatch is an entirely free public guide. We do not handle your money, we do not submit forms on your behalf for money, and we do not take any commission. You submit your final application directly on the government portal.'
  },
  {
    question: 'What documents will I need when applying on the official portal?',
    answer: 'Most government scholarships require an income certificate issued by a local revenue authority (such as a Tehsildar), your previous year marksheet, your college bonafide certificate, your bank passbook with Aadhaar linkage, and a community/caste certificate if applying under reserved quotas.'
  },
  {
    question: 'What is Aadhaar NPCI seeding and why is it mandatory?',
    answer: 'Government Direct Benefit Transfer (DBT) funds are credited strictly via Aadhaar Payment Bridge (APB). Your bank account must be actively mapped to the National Payments Corporation of India (NPCI) server. You can check this status on the official UIDAI website or by visiting your bank branch.'
  },
  {
    question: 'Can I apply for more than one scholarship at a time?',
    answer: 'In general, students can submit applications to multiple portals, but central and state regulations state that a student can only receive scholarship benefits from ONE government source per academic year. If multiple are approved, you can choose the higher award.'
  }
];
