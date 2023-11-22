import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PremiumContext } from '../../components/premiumContext';
import TeacherChat from '@/components/TeacherChat';
import { fetchTeacherBySlug } from '../../lib/fetchData';

const SlugPage = () => {
  const [teacher, setTeacher] = useState(null);
  const router = useRouter();
  const { slug } = router.query;
  const { premium, loading } = useContext(PremiumContext);

  useEffect(() => {
    if (loading) {
      console.log('Waiting for premium status loading');
      return;
    }

    if (!premium) {
      console.log('Non-premium user, redirecting to goPremium page');
      router.push('/goPremium');
      return;
    }

    const fetchTeacher = async () => {
      try {
        const fetchedTeacher = await fetchTeacherBySlug(slug);
        setTeacher(fetchedTeacher[0]);
      } catch (e) {
        console.error('Error fetching teacher:', e);
      }
    };

    if (premium && slug) {
      fetchTeacher();
    }
  }, [slug, premium, loading]);

  if (loading) {
    return <div>Loading...</div>;
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
