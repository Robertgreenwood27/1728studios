// stripe/isUserPremium.ts
import { auth } from "../firebase/firebaseClient";

export default async function isUserPremium(): Promise<boolean> {
  try {
    const user = auth.currentUser;
    if (!user) {
      return false;
    }
    await user.getIdToken(true);
    const decodedToken = await user.getIdTokenResult();
    // Directly return the evaluation of whether stripeRole is present
    return !!decodedToken?.claims?.stripeRole;
  } catch (error) {
    console.error("Error checking user premium status:", error);
    // Return false or handle the error as appropriate for your application
    return false;
  }
}