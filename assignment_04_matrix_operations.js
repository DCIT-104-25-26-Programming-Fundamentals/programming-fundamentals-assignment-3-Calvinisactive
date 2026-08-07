// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function promptPositiveInteger(promptText) {
  const input = readlineSync.question(promptText);
  const value = Number(input);
  if (!Number.isInteger(value) || value <= 0) {
    return null;
  }
  return value;
}

function readMatrix(rows, cols, label) {
  const matrix = [];
  for (let i = 0; i < rows; i += 1) {
    const rowInput = readlineSync.question(`Enter row ${i + 1} ${label}: `);
    const parts = rowInput.trim().split(' ').filter((part) => part !== '');
    if (parts.length !== cols) {
      console.log(`Error: Expected ${cols} values but got ${parts.length}.`);
      return null;
    }

    const row = [];
    for (let j = 0; j < cols; j += 1) {
      const value = Number(parts[j]);
      if (Number.isNaN(value)) {
        console.log('Error: All entries must be numeric.');
        return null;
      }
      row.push(value);
    }
    matrix.push(row);
  }
  return matrix;
}

function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];
  for (let j = 0; j < cols; j += 1) {
    const newRow = [];
    for (let i = 0; i < rows; i += 1) {
      newRow.push(matrix[i][j]);
    }
    result.push(newRow);
  }
  return result;
}

function addMatrices(matrixA, matrixB) {
  const rows = matrixA.length;
  const cols = matrixA[0].length;
  const result = [];

  for (let i = 0; i < rows; i += 1) {
    const row = [];
    for (let j = 0; j < cols; j += 1) {
      row.push(matrixA[i][j] + matrixB[i][j]);
    }
    result.push(row);
  }
  return result;
}

function multiplyMatrices(matrixA, matrixB) {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const colsB = matrixB[0].length;
  const result = [];

  for (let i = 0; i < rowsA; i += 1) {
    const row = [];
    for (let j = 0; j < colsB; j += 1) {
      let sum = 0;
      for (let k = 0; k < colsA; k += 1) {
        sum += matrixA[i][k] * matrixB[k][j];
      }
      row.push(sum);
    }
    result.push(row);
  }
  return result;
}

function getCellWidth(matrix) {
  let width = 0;
  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix[i].length; j += 1) {
      const length = String(matrix[i][j]).length;
      if (length > width) {
        width = length;
      }
    }
  }
  return width;
}

function printMatrix(matrix) {
  const width = getCellWidth(matrix);
  for (let i = 0; i < matrix.length; i += 1) {
    let line = '';
    for (let j = 0; j < matrix[i].length; j += 1) {
      const cell = String(matrix[i][j]);
      const padding = ' '.repeat(width - cell.length + 1);
      line += cell + padding;
    }
    console.log(line.trimEnd());
  }
}

function main() {
  // Part A: Transpose a matrix
  const rowsA = promptPositiveInteger('Enter number of rows: ');
  const colsA = promptPositiveInteger('Enter number of columns: ');
  if (rowsA === null || colsA === null) {
    console.log('Error: Rows and columns must be positive integers.');
    return;
  }

  const matrixA = readMatrix(rowsA, colsA, '(matrix A)');
  if (matrixA === null) {
    return;
  }

  const transposedA = transposeMatrix(matrixA);
  console.log('\nOriginal Matrix:');
  printMatrix(matrixA);
  console.log('\nTransposed Matrix:');
  printMatrix(transposedA);

  // Part B: Add two matrices
  console.log('\nMatrix addition requires two matrices of the same size.');
  const rowsB = promptPositiveInteger('Enter number of rows: ');
  const colsB = promptPositiveInteger('Enter number of columns: ');
  if (rowsB === null || colsB === null) {
    console.log('Error: Rows and columns must be positive integers.');
    return;
  }

  if (rowsB !== rowsA || colsB !== colsA) {
    console.log('Error: Matrices must have the same dimensions for addition.');
    return;
  }

  const matrixB = readMatrix(rowsB, colsB, '(matrix B)');
  if (matrixB === null) {
    return;
  }

  const sumMatrix = addMatrices(matrixA, matrixB);
  console.log('\nSum of Matrices:');
  printMatrix(sumMatrix);

  // Part C: Multiply two matrices
  console.log('\nMatrix multiplication requires A columns to equal B rows.');
  const rowsC = promptPositiveInteger('Enter number of rows for matrix A: ');
  const colsC = promptPositiveInteger('Enter number of columns for matrix A: ');
  const rowsD = promptPositiveInteger('Enter number of rows for matrix B: ');
  const colsD = promptPositiveInteger('Enter number of columns for matrix B: ');

  if (rowsC === null || colsC === null || rowsD === null || colsD === null) {
    console.log('Error: Rows and columns must be positive integers.');
    return;
  }

  if (colsC !== rowsD) {
    console.log('Error: Number of columns in A must equal number of rows in B.');
    return;
  }

  const matrixC = readMatrix(rowsC, colsC, '(matrix A)');
  if (matrixC === null) {
    return;
  }

  const matrixD = readMatrix(rowsD, colsD, '(matrix B)');
  if (matrixD === null) {
    return;
  }

  const productMatrix = multiplyMatrices(matrixC, matrixD);
  console.log('\nProduct of Matrices:');
  printMatrix(productMatrix);
}

main();

