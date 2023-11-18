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
  // Assuming usePremiumStatus returns an array [isPremium, isLoading]
  const [userIsPremium, premiumLoading] = usePremiumStatus(user ?? null);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (loading || premiumLoading) return; // Wait for both user and premium status to be determined

    if (!user) {
      router.push('/signIn'); // Redirect to sign-in if not authenticated
      return;
    }

    if (user && !userIsPremium) {
      createCheckoutSession(user.uid); // Prompt non-premium user to upgrade
      return;
    }

    // Fetch teacher data if user is authenticated and premium
    if (slug && userIsPremium) {
      const fetchTeacher = async () => {
        const fetchedTeacher = await fetchTeacherBySlug(slug);
        setTeacher(fetchedTeacher[0]);
      };

      fetchTeacher();
    }
  }, [slug, user, loading, userIsPremium, premiumLoading, router]);

  if (error) return <div>Error: {error.message}</div>;
  if (loading || premiumLoading || !teacher) return <div>Loading...</div>;

  return (
    <div>
      <TeacherChat teacher={teacher} />
    </div>
  );
};

export default TeacherSlug;
