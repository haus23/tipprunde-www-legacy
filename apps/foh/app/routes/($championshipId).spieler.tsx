import { useAppData } from './($championshipId)';

export const handle = { view: 'spieler' };

export default function Spieler() {
  useAppData();

  return (
    <div>
      <h2>Spieler</h2>
    </div>
  );
}
