import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FractionService } from 'src/app/services/fraction.service';

@Component({
  selector: 'app-fraction-input',
  templateUrl: './fraction-input.component.html',
  styleUrls: ['./fraction-input.component.scss']
})
export class FractionInputComponent {
  fractionForm: FormGroup;
  matrix: { value: number, highlight: boolean }[][] | null = null;
  average: number | null = null;

  constructor(private formBuilder: FormBuilder, private fractionService: FractionService) {
    this.fractionForm = this.formBuilder.group({
      rows: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      columns: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      generate: [false]
    });
  }

  onSubmit() {
    if (this.fractionForm.valid) {
      const { rows, columns, generate } = this.fractionForm.value;
      let matrix: number[][];

      if (generate) {
        matrix = this.fractionService.generateMatrix(rows, columns);
      } else {
        matrix = this.initializeMatrix(rows, columns);
      }

      this.average = this.fractionService.calculateAverage(matrix);
      this.matrix = this.fractionService.highlightAboveAverage(matrix);
    }
  }

  initializeMatrix(rows: number, columns: number): number[][] {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        row.push(0); // Ініціалізуємо матрицю нулями, користувач може їх змінити
      }
      matrix.push(row);
    }
    return matrix;
  }

  onMatrixInputChange(event: any, row: number, col: number) {
    if (this.matrix) {
      const value = event.target.value;
      this.matrix[row][col].value = value;
      this.average = this.fractionService.calculateAverage(this.getNumericMatrix());
      this.matrix = this.fractionService.highlightAboveAverage(this.getNumericMatrix());
    }
  }

  getNumericMatrix(): number[][] {
    return this.matrix?.map(row => row.map(cell => Number(cell.value))) ?? [];
  }
}




