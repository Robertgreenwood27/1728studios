// src/server/firebaseAdmin.ts
import * as admin from 'firebase-admin';
import { isAuthorizedUid } from './authorizedUids';

if (!admin.apps.length) {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : undefined;
  
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
      console.error('Missing Firebase Admin SDK configuration. Please check your environment variables.');
      throw new Error('Missing Firebase Admin SDK configuration');
    }
  
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: privateKey,
        }),
      });
      console.log('Firebase Admin SDK initialized successfully');
    } catch (error) {
      console.error('Error initializing Firebase Admin SDK:', error);
      throw error;
    }
  }

export const setFreeAccessClaim = async (uid: string) => {
  console.log(`Checking free access claim for user: ${uid}`);
  if (!isAuthorizedUid(uid)) {
    console.log(`User ${uid} is not authorized for free access`);
    return false;
  }

  try {
    await admin.auth().setCustomUserClaims(uid, { freeAccess: true });
    console.log(`Free access claim successfully set for user: ${uid}`);
    
    // Force token refresh
    await admin.auth().revokeRefreshTokens(uid);
    console.log(`Refresh tokens revoked for user: ${uid}`);
    
    // Verify the claim was set
    const user = await admin.auth().getUser(uid);
    console.log(`Updated user claims:`, user.customClaims);
    
    return true;
  } catch (error) {
    console.error(`Error setting free access claim for user ${uid}:`, error);
    return false;
  }
};

export const auth = admin.auth();
export const firestore = admin.firestore();