import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'src/firebase/firebaseClient';
import usePremiumStatus from 'src/stripe/usePremiumStatus';
import { fetchTeacherBySlug } from '../../lib/fetchData';
import TeacherChat from '@/components/TeacherChat';
import { createCheckoutSession } from 'src/stripe/createCheckoutSession';

const TeacherSlug = () => {
  const [teacher, setTeacher] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  const [userIsPremium, premiumLoading] = usePremiumStatus(user ?? null);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (loading || premiumLoading) {
      console.log('Waiting for auth or premium status loading');
      return; // Wait for both user and premium status to be determined
    }

    console.log('Auth status:', { user, error });
    console.log('Premium status:', { userIsPremium, premiumLoading });

    if (error) {
      console.error('Authentication error:', error);
      return; // Handle authentication error
    }

    if (!user) {
      console.log('No user found, redirecting to /signIn');
      router.push('/signIn'); // Redirect to sign-in if not authenticated
      return;
    }

    const checkoutInitiated = localStorage.getItem('checkoutInitiated');

    if (user && !userIsPremium) {
      console.log('Non-premium user, redirecting to goPremium page');
      router.push('/goPremium'); // Redirect non-premium users to the goPremium page immediately
      return;
    }    

    if (userIsPremium && slug) {
      if (checkoutInitiated) {
        localStorage.removeItem('checkoutInitiated');
      }

      const fetchTeacher = async () => {
        try {
          const fetchedTeacher = await fetchTeacherBySlug(slug);
          setTeacher(fetchedTeacher[0]);
        } catch (e) {
          console.error('Error fetching teacher:', e);
          // Handle fetch error, e.g., show an error message or take other actions
        }
      };

      fetchTeacher();
    }
  }, [slug, user, loading, userIsPremium, premiumLoading]);

  if (loading || premiumLoading) {
    return <div>Loading...</div>;
  }

  if (!teacher) {
    // Consider handling this state differently, e.g., "Teacher not found" message
    return <div>Loading teacher data...</div>;
  }

  return (
    <div>
      <TeacherChat teacher={teacher} />
    </div>
  );
};

export default TeacherSlug;
