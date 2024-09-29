// src/server/authorizedUids.ts

const authorizedUidsString = process.env.AUTHORIZED_UIDS || '';
export const authorizedUids: string[] = authorizedUidsString.split(',').map(uid => uid.trim());

export function isAuthorizedUid(uid: string): boolean {
  return authorizedUids.includes(uid);
}

// For debugging (remove in production)
console.log('Authorized UIDs:', authorizedUids);