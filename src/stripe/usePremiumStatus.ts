///stripe/usePremiumStatus.ts
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import isUserPremium from "./isUserPremium";

export default function usePremiumStatus(user: User | null): [boolean, boolean] {
  const [premiumStatus, setPremiumStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Add a loading state

  useEffect(() => {
    let isMounted = true; // This will help us to avoid state updates on unmounted components

    const checkPremiumStatus = async () => {
      if (user) {
        setIsLoading(true); // Start loading when the check begins
        const isPremium = await isUserPremium();
        if (isMounted) {
          setPremiumStatus(isPremium);
          setIsLoading(false); // Stop loading when the check is complete
        }
      } else {
        if (isMounted) {
          setPremiumStatus(false); // If there's no user, set premium status to false
          setIsLoading(false); // Not loading since no user check is necessary
        }
      }
    };

    checkPremiumStatus();

    return () => {
      isMounted = false; // Set isMounted to false when the component unmounts
    };
  }, [user]);

  return [premiumStatus, isLoading]; // Return both the premium status and the loading state
}
