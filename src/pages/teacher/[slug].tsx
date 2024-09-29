import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../components/AuthContext';
import usePremiumStatus from '../../stripe/usePremiumStatus';
import TeacherChat from '@/components/TeacherChat';
import { fetchTeacherBySlug } from '../../lib/fetchData';

const SlugPage = () => {
  const [teacher, setTeacher] = useState(null);
  const router = useRouter();
  const { slug } = router.query;
  const { user, isAuthenticated, loading: authLoading, error: authError } = useAuth();
  const [hasAccess, accessLoading] = usePremiumStatus(user);

  useEffect(() => {
    const checkAccessAndFetchTeacher = async () => {
      if (authLoading || accessLoading) {
        console.log('Waiting for user and access status loading');
        return;
      }

      if (authError) {
        console.error('Authentication error:', authError);
        router.push('/signIn');
        return;
      }

      if (!isAuthenticated) {
        console.log('User not authenticated, redirecting to sign in page');
        router.push('/signIn');
        return;
      }

      if (!hasAccess) {
        console.log('User does not have access, redirecting to goPremium page');
        router.push('/goPremium');
        return;
      }

      if (!slug) {
        console.log('No slug provided');
        return;
      }

      try {
        const fetchedTeacher = await fetchTeacherBySlug(slug as string);
        setTeacher(fetchedTeacher[0]);
      } catch (e) {
        console.error('Error fetching teacher:', e);
      }
    };

    checkAccessAndFetchTeacher();
  }, [slug, isAuthenticated, hasAccess, authLoading, accessLoading, authError, router, user]);

  if (authLoading || accessLoading) {
    return <div>Loading...</div>;
  }

  if (authError) {
    return <div>An error occurred. Please try signing in again.</div>;
  }

  if (!isAuthenticated) {
    return <div>Please sign in to access this content.</div>;
  }

  if (!hasAccess) {
    return <div>You do not have access to this content.</div>;
  }

  if (!teacher) {
    return <div>Loading teacher data...</div>;
  }

  return (
    <div>
      <TeacherChat teacher={teacher} />
    </div>
  );
};

export default SlugPage;