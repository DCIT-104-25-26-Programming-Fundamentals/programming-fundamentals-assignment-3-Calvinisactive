// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 5
// =============================================================================
//
// TASK: Fibonacci Sequence Generator
//
// The Fibonacci sequence is a series of numbers where each number is the sum
// of the two numbers before it:
//
//   0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
//
// Write a JavaScript program with TWO parts, each implemented as a function.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_05_fibonacci_sequence.js
//
// -----------------------------------------------------------------------------
// PART A — Print the First N Terms
// -----------------------------------------------------------------------------
// - Ask the user how many terms (N) to display.
// - Print the first N numbers of the Fibonacci sequence on one line.
//
// Example:
//   How many terms? 7
//   Fibonacci sequence: 0 1 1 2 3 5 8
//
// -----------------------------------------------------------------------------
// PART B — Check if a Number Belongs to the Sequence
// -----------------------------------------------------------------------------
// - Ask the user to enter a number.
// - Determine whether that number is a Fibonacci number.
// - Print an appropriate message.
//
// Example:
//   Enter a number to check: 13
//   13 is a Fibonacci number.
//
//   Enter a number to check: 20
//   20 is NOT a Fibonacci number.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use a loop (not recursion) to generate the sequence in both parts.
// - N must be a positive integer. If it is not, print an error message.
// - Each part must be implemented in its own function (see scaffold below).
//

//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function generateFibonacciTerms(n) {
  const terms = [];
  if (n >= 1) {
    terms.push(0);
  }
  if (n >= 2) {
    terms.push(1);
  }

  for (let i = 2; i < n; i += 1) {
    const next = terms[i - 1] + terms[i - 2];
    terms.push(next);
  }

  return terms;
}

function isFibonacciNumber(value) {
  if (value < 0 || !Number.isInteger(value)) {
    return false;
  }

  if (value === 0 || value === 1) {
    return true;
  }

  let a = 0;
  let b = 1;
  while (b < value) {
    const next = a + b;
    a = b;
    b = next;
  }

  return b === value;
}

function main() {
  const nInput = readlineSync.question('How many terms? ');
  const n = Number(nInput);

  if (!Number.isInteger(n) || n <= 0) {
    console.log('Error: N must be a positive integer.');
    return;
  }

  const sequence = generateFibonacciTerms(n);
  console.log(`Fibonacci sequence: ${sequence.join(' ')}`);

  const valueInput = readlineSync.question('Enter a number to check: ');
  const value = Number(valueInput);

  if (!Number.isInteger(value) || value < 0) {
    console.log(`${valueInput} is NOT a Fibonacci number.`);
    return;
  }

  if (isFibonacciNumber(value)) {
    console.log(`${value} is a Fibonacci number.`);
  } else {
    console.log(`${value} is NOT a Fibonacci number.`);
  }
}

main();

