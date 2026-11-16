import { useState } from 'react';
import { PROFESSIONS } from '../data/professions';

export function useProfessions() {
  const [professions] = useState(PROFESSIONS);
  return { professions, loading: false };
}
