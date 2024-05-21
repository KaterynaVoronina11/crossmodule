import { TestBed } from '@angular/core/testing';
import { FractionService } from './fraction.service';

describe('FractionService', () => {
  let service: FractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FractionService]
    });
    service = TestBed.inject(FractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a matrix with correct dimensions', () => {
    const rows = 3;
    const columns = 4;
    const matrix = service.generateMatrix(rows, columns);

    expect(matrix.length).toBe(rows);
    expect(matrix.every(row => row.length === columns)).toBe(true);
  });

  it('should calculate the correct average', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    const average = service.calculateAverage(matrix);
    expect(average).toBe(5);
  });

  it('should highlight numbers above the average', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    const highlightedMatrix = service.highlightAboveAverage(matrix);
    const expectedHighlightedMatrix = [
      [{ value: 1, highlight: false }, { value: 2, highlight: false }, { value: 3, highlight: false }],
      [{ value: 4, highlight: false }, { value: 5, highlight: false }, { value: 6, highlight: true }],
      [{ value: 7, highlight: true }, { value: 8, highlight: true }, { value: 9, highlight: true }]
    ];
    expect(highlightedMatrix).toEqual(expectedHighlightedMatrix);
  });
});



