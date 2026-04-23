export interface Certificate {
  id: string;
  name: string;
  provider: string;
  issueDate: string;
  expiryDate?: string;
  verifyUrl?: string;
  pdfUrl?: string;
  description: string;
}

export const fallbackCertificates: Certificate[] = [];

