import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FractionService {

  generateMatrix(rows: number, columns: number): number[][] {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        row.push(Math.floor(Math.random() * 100)); // Генеруємо випадкові числа від 0 до 99
      }
      matrix.push(row);
    }
    return matrix;
  }

  calculateAverage(matrix: number[][]): number {
    const total = matrix.flat().reduce((sum, value) => sum + value, 0);
    return total / (matrix.length * matrix[0].length);
  }

  highlightAboveAverage(matrix: number[][]): { value: number, highlight: boolean }[][] {
    const average = this.calculateAverage(matrix);
    return matrix.map(row =>
      row.map(value => ({ value, highlight: value > average }))
    );
  }
}


