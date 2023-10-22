export interface ColumnConfig {
  header: string;
  binding: string;
  mergeStart?: number;
  mergeEnd?: number;
}

export const columns: ColumnConfig[] = [
  { header: 'STT', binding: 'stt' },
  { header: 'Vị trí trạm', binding: 'vitri' },
  // ... các cột khác
];
