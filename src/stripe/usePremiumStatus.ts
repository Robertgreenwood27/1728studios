//stripe/usePremiumStatus.ts
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import isUserPremium from "./isUserPremium";

export default function usePremiumStatus(user: User | null): [boolean, boolean] {
  const [premiumStatus, setPremiumStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const checkPremiumStatus = async () => {
      try {
        if (user) {
          const isPremium = await isUserPremium();
          if (isMounted) {
            setPremiumStatus(isPremium);
          }
        } else {
          if (isMounted) {
            setPremiumStatus(false);
          }
        }
      } catch (error) {
        console.error("Error checking premium status:", error);
        if (isMounted) {
          // Handle error state if necessary, for now, setting premiumStatus to false
          setPremiumStatus(false);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Invoke the function only if the user exists
    if (user) {
      setIsLoading(true);
      checkPremiumStatus();
    } else {
      // Immediately set loading to false if there is no user
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [user]);

  return [premiumStatus, isLoading];
}
