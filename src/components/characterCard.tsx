import React, { useMemo } from 'react';
import Link from 'next/link';
import builder from '../lib/imageUrlBuilder';

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
    <Link href={`/teacher/${teacher.slug?.current}`} legacyBehavior>
      <a className="block transform hover:scale-105 transition-transform duration-300 border-2 border-blue-800 rounded-xl overflow-hidden">
        <div className="flex flex-col items-center">
          <div 
            className="rounded-full overflow-hidden"
            style={{
              backgroundImage: `url('${bgImagePath}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '200px',
              height: '200px',
              margin: 'auto',
            }}
          >
            <img src={imageUrl} alt={teacher.name} style={{ width: '200px', height: '200px' }} />
          </div>
          <div className="text-center mt-4">
            <div className="text-lg font-bold">{teacher.name}</div>
            <div className="text-sm">{teacher.departmentOrSubject}</div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CharacterCard;
