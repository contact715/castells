export interface Deal {
  id: string;
  title: string;
  value: number;
  company?: string;
  tags?: string[];
  tasksDue?: boolean;
}
