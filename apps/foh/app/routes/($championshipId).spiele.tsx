import { useStandings } from '~/hooks/use-standings';

export const handle = { view: 'spiele' };

export default function Spiele() {
  useStandings();

  return (
    <div>
      <h2>Spiele</h2>
    </div>
  );
}
