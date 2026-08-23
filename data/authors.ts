/**
 * Люди, которые подписывают материалы сайта.
 *
 * До 23 августа 2026 здесь было пять несуществующих человек: Alex Castells
 * («Founder & CEO», «helped 200+ businesses achieve remarkable growth»),
 * Sarah Martinez, Michael Chen, Emily Davis и David Park. У каждого стояло
 * фото со стока, выдуманная почта вида alex@castells.media и ссылки на
 * несуществующие профили в LinkedIn и Twitter. Их подписи стояли под
 * статьями блога и под страницами кейсов.
 *
 * Осталcя один человек, настоящий. Новые появятся здесь, когда в агентстве
 * появятся новые люди, а не раньше.
 */

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  expertise: string[];
  caseStudies?: string[];
}

export const AUTHORS: Author[] = [
  {
    id: 'dmitrii',
    name: 'Dmitrii Z.',
    role: 'Founder, Castells Media',
    bio: 'Runs the agency and the client work. If you write to us, you are talking to him.',
    avatar: '',
    email: 'contact@castells.media',
    expertise: ['Growth Strategy', 'Paid Media', 'Web Development'],
  },
];

export const findAuthorById = (id: string): Author | undefined =>
  AUTHORS.find((author) => author.id === id);

export const findAuthorByName = (name: string): Author | undefined =>
  AUTHORS.find((author) => author.name.toLowerCase() === name.toLowerCase());

export const DEFAULT_AUTHOR = AUTHORS[0];
