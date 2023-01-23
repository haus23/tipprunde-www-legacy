import { useAppData } from './($championshipId)';

export const handle = { view: 'spiele' };

export default function Spiele() {
  useAppData();

  return (
    <div>
      <h2>Spiele</h2>
    </div>
  );
}
