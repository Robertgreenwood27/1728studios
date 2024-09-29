// premiumContext.js
import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseClient";
import isUserPremium from "../stripe/isUserPremium";

export const PremiumContext = createContext();

export function PremiumProvider({ children }) {
  const [premium, setPremium] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscribed = true;
    onAuthStateChanged(auth, async user => {
      if (subscribed) {
        if (user) {
          const isPremium = await isUserPremium(user);
          setPremium(isPremium);
        } else {
          setPremium(false);  
        }
        setLoading(false);
      }
    });
    return () => subscribed = false;
  }, []);

  return (
    <PremiumContext.Provider value={{premium, loading}}>
      {children}
    </PremiumContext.Provider>
  );  
}