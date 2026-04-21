export interface ContactSubmission {
  name: string;
  email: string;
  contactType: "Individual" | "Business" | "Company";
  companyName: string;
  jobTitle: string;
  interest: string;
  budget: string;
  timeline: string;
  location: string;
  linkedinUrl: string;
  whatsapp: string;
  gender: string;
  maritalStatus: string;
  message: string;
  newsletterOptIn: boolean;
}
