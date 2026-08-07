n

const readlineSync = require('readline-sync');

function showMenu() {
  console.log('==============================');
  console.log('   STUDENT RECORD SYSTEM MENU');
  console.log('==============================');
  console.log('1. Add student');
  console.log('2. Display all students');
  console.log('3. Calculate average score');
  console.log('4. Quit');
}

function calculateAverage(scores) {
  if (scores.length === 0) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < scores.length; i += 1) {
    sum += scores[i];
  }
  return sum / scores.length;
}

function addStudent(students) {
  const name = readlineSync.question('Student name: ');
  const idInput = readlineSync.question('Student ID: ');
  const id = Number(idInput);
  if (!Number.isInteger(id)) {
    console.log('Error: Student ID must be a valid number.');
    return;
  }

  const countInput = readlineSync.question('How many scores? ');
  const count = Number(countInput);
  if (!Number.isInteger(count) || count < 0) {
    console.log('Error: Number of scores must be a non-negative integer.');
    return;
  }

  const scores = [];
  for (let i = 0; i < count; i += 1) {
    const scoreInput = readlineSync.question(`Enter score ${i + 1}: `);
    const score = Number(scoreInput);
    if (Number.isNaN(score)) {
      console.log('Error: Score must be a number.');
      return;
    }
    scores.push(score);
  }

  students.push({ name, id, scores });
  console.log(`Student "${name}" added successfully.`);
}

function displayAllStudents(students) {
  if (students.length === 0) {
    console.log('No student records available.');
    return;
  }

  console.log('Student Records:');
  for (let i = 0; i < students.length; i += 1) {
    const student = students[i];
    const average = calculateAverage(student.scores).toFixed(2);
    console.log(`Name: ${student.name}`);
    console.log(`ID: ${student.id}`);
    console.log(`Scores: ${student.scores.join(', ')}`);
    console.log(`Average: ${average}`);
    console.log('------------------------------');
  }
}

function calculateStudentAverage(students) {
  const idInput = readlineSync.question('Enter student ID: ');
  const id = Number(idInput);
  if (!Number.isInteger(id)) {
    console.log('Error: Student ID must be a valid number.');
    return;
  }

  const student = students.find((record) => record.id === id);
  if (!student) {
    console.log('Error: Student ID not found.');
    return;
  }

  const average = calculateAverage(student.scores).toFixed(2);
  console.log(`${student.name}'s average score: ${average}`);
}

function main() {
  const students = [];
  let running = true;

  while (running) {
    showMenu();
    const choice = readlineSync.question('Enter your choice (1-4): ');

    switch (choice) {
      case '1':
        addStudent(students);
        break;
      case '2':
        displayAllStudents(students);
        break;
      case '3':
        calculateStudentAverage(students);
        break;
      case '4':
        console.log('Goodbye!');
        running = false;
        break;
      default:
        console.log('Error: Invalid choice. Please enter a number from 1 to 4.');
    }

    if (running) {
      console.log('');
    }
  }
}

main();

