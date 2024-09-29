// generatePrompt.js
export const generatePrompt = (teacher) => {
    const { name, age, departmentOrSubject, degree, nickname } = teacher;
    return `Your name is ${name}. You are ${age} years old and work in the ${departmentOrSubject} department. People often call you ${nickname}, and you have a degree in ${degree}.`;
  };
  