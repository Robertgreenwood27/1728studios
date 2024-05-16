// CreateCheckoutSession.ts
import { firestore } from '../firebase/firebaseClient';
import { collection, addDoc, doc, onSnapshot, DocumentSnapshot } from 'firebase/firestore';
import getStripe from './initializeStripe';

export async function createCheckoutSession(uid: string) {
  const checkoutSessionRef = await addDoc(collection(firestore, "users", uid, "checkout_sessions"), {
    price: "price_1P5pDaKinDw5GukGVKY6Zvgz", // Replace with your Stripe price ID
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  });

  // Watch the newly created document for changes
  onSnapshot(doc(firestore, "users", uid, "checkout_sessions", checkoutSessionRef.id), 
    async (snap: DocumentSnapshot) => { // Mark this function as async
      const { sessionId } = snap.data() || {};
      if (sessionId) {
        const stripe = await getStripe();
        if (stripe) {
          stripe.redirectToCheckout({ sessionId });
        } else {
          console.error("Stripe not initialized");
          // Handle the error or initialize Stripe
        }
      }
    }
  );
}
