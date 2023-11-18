import React, { useMemo } from 'react';
import builder from '../lib/imageUrlBuilder';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const CharacterCard = ({ teacher }) => {
  const imageUrl = builder
    .image(teacher.photo)
    .width(200)
    .height(200)
    .auto('format')
    .fit('crop')
    .url();

  const randomBgNumber = useMemo(() => Math.floor(Math.random() * 10) + 1, []);
  const bgImagePath = `/bg${randomBgNumber}.png`;

  return (
    // Use the teacher's slug for the URL
    <Link href={`/teacher/${teacher.slug?.current}`}>
        <Card className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
          <CardHeader className="flex flex-col items-center">
            <div 
              className="rounded-full overflow-hidden"
              style={{
                backgroundImage: `url('${bgImagePath}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <img src={imageUrl} alt={teacher.name} className="max-w-[200px] max-h-[200px]" />
            </div>
            <CardTitle>{teacher.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <CardDescription>{teacher.departmentOrSubject}</CardDescription>
          </CardContent>
        </Card>
    </Link>
  );
};

export default CharacterCard;
