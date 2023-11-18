// lib/fetchData.js
import sanityClient from '../lib/sanity';

// Function to fetch all teachers
export const fetchAllTeachers = async () => {
  const query = '*[_type == "teacher"]{name, departmentOrSubject, photo, slug}';
  const fetchedTeachers = await sanityClient.fetch(query);
  return fetchedTeachers;
};

// Function to fetch a teacher by slug
export const fetchTeacherBySlug = async (slug) => {
  const query = `*[_type == "teacher" && slug.current == "${slug}"]{...}`;
  const fetchedTeacher = await sanityClient.fetch(query);
  return fetchedTeacher;
};
