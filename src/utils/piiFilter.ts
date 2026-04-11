/**
 * Responsible AI Utility: PII Filter
 * Redacts sensitive information from user input before sending to LLM.
 */

const PII_PATTERNS = {
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  creditCard: /\b(?:\d[ -]*?){13,16}\b/g,
  // Matches common API key formats (sk-..., AIza..., etc.)
  apiKey: /\b(?:sk-[a-zA-Z0-9]{20,}|AIza[a-zA-Z0-9\-_]{35})\b/g,
  // Basic phone number pattern
  phone: /\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
};

export function redactPII(text: string): string {
  let redacted = text;

  redacted = redacted.replace(PII_PATTERNS.email, "[EMAIL_REDACTED]");
  redacted = redacted.replace(PII_PATTERNS.creditCard, "[CARD_REDACTED]");
  redacted = redacted.replace(PII_PATTERNS.apiKey, "[KEY_REDACTED]");
  redacted = redacted.replace(PII_PATTERNS.phone, "[PHONE_REDACTED]");

  return redacted;
}
