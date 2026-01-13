import { Deal } from "@/types/deal";

export const MOCK_DEALS: Deal[] = [
  { id: '1', title: 'Website Redesign', value: 12000, company: 'Acme Corp', tags: ['Web', 'Urgent'] },
  { id: '2', title: 'SEO Audit', value: 3500, company: 'Local Biz', tasksDue: true },
  { id: '3', title: 'Marketing Campaign', value: 15000, company: 'TechStart Inc' },
  { id: '4', title: 'App Development', value: 45000, company: 'MobileFirst', tags: ['App'] },
  { id: '5', title: 'Logo Design', value: 500, company: 'Bakery', tags: ['Design'] },
];

export const INITIAL_DEALS_MAP: Record<string, Deal[]> = {
  'new': [MOCK_DEALS[0], MOCK_DEALS[1]],
  'contact': [MOCK_DEALS[2]],
  'qualified': [MOCK_DEALS[3]],
  'offer': [],
  'won': [MOCK_DEALS[4]]
};
