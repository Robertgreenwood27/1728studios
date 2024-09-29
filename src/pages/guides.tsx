import React, { useEffect, useState } from 'react';
import { fetchAllTeachers } from '../lib/fetchData';
import CharacterCard from '@/components/characterCard';

const Guides = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      const fetchedTeachers = await fetchAllTeachers();
      setTeachers(fetchedTeachers);
    };

    fetchTeachers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a teacher..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="bg-black text-white border border-blue-800 rounded-xl p-2 mb-4 w-full"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center">
        {filteredTeachers.map((teacher, index) => (
          <CharacterCard key={index} teacher={teacher} />
        ))}
      </div>
    </div>
  );
};

export default Guides;
