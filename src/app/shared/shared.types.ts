export interface Page <T> {
  readonly totalElements: number;
  readonly totalPages: number;
  readonly content: T[];
}
