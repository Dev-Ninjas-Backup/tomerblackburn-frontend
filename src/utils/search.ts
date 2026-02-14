// Fast string search using Boyer-Moore inspired algorithm
export function fastSearch(text: string, pattern: string): boolean {
  if (!pattern) return true;
  if (!text) return false;

  const textLower = text.toLowerCase();
  const patternLower = pattern.toLowerCase();
  
  // Quick check using indexOf (optimized in modern JS engines)
  return textLower.includes(patternLower);
}

// Multi-field search with early exit optimization
export function searchSubmission(
  submission: any,
  query: string
): boolean {
  if (!query) return true;

  const searchFields = [
    submission.submissionNumber,
    submission.clientName,
    submission.clientEmail,
    submission.service?.name || '',
  ];

  // Early exit: return true as soon as we find a match
  for (const field of searchFields) {
    if (field && fastSearch(field, query)) {
      return true;
    }
  }

  return false;
}

// Contact search function
export function searchContact(
  contact: any,
  query: string
): boolean {
  if (!query) return true;

  const searchFields = [
    contact.firstName,
    contact.lastName,
    contact.email,
    contact.phone,
    contact.city,
    contact.state,
  ];

  // Early exit: return true as soon as we find a match
  for (const field of searchFields) {
    if (field && fastSearch(field, query)) {
      return true;
    }
  }

  return false;
}
