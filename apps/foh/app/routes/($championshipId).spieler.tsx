import { useStandings } from '~/hooks/use-standings';

export const handle = { view: 'spieler' };

export default function Spieler() {
  useStandings();

  return (
    <div>
      <h2>Spieler</h2>
    </div>
  );
}
