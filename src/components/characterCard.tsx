import React, { useMemo } from 'react';
import Link from 'next/link';

const CharacterCard = ({ teacher }) => {
  const imageUrl = useMemo(() => {
    // I'm assuming you have a method to build the image URL. 
    // Replace this with your actual method if different.
    return `/path/to/images/${teacher.photo}`;
  }, [teacher.photo]);

  const randomBgNumber = useMemo(() => Math.floor(Math.random() * 10) + 1, []);
  const bgImagePath = `/bg${randomBgNumber}.png`;

  return (
    <Link href={`/teacher/${teacher.slug?.current}`}>
      <div className="card flex flex-col items-center transform hover:scale-105 transition-transform duration-300 border-blue-800 rounded-xl">
        <div className="card-header flex flex-col items-center">
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
          <div className="card-title">{teacher.name}</div>
        </div>
        <div className="card-content flex flex-col items-center">
          <div className="card-description">{teacher.departmentOrSubject}</div>
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;
