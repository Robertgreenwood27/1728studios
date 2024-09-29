//stripe/usePremiumStatus.ts
import { useState, useEffect } from "react";
import { User } from "firebase/auth";

export default function usePremiumStatus(user: User | null): [boolean, boolean] {
  const [accessStatus, setAccessStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const checkAccessStatus = async () => {
      try {
        if (user) {
          console.log("Checking access for user:", user.uid);
          const idTokenResult = await user.getIdTokenResult(true);  // Force refresh
          console.log("User claims:", idTokenResult.claims);
          const hasPremiumOrFreeAccess = !!(
            idTokenResult.claims.stripeRole || idTokenResult.claims.freeAccess
          );
          console.log("Has access:", hasPremiumOrFreeAccess);
          if (isMounted) {
            setAccessStatus(hasPremiumOrFreeAccess);
          }
        } else {
          console.log("No user logged in");
          if (isMounted) {
            setAccessStatus(false);
          }
        }
      } catch (error) {
        console.error("Error checking access status:", error);
        if (isMounted) {
          setAccessStatus(false);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (user) {
      setIsLoading(true);
      checkAccessStatus();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [user]);

  return [accessStatus, isLoading];
}