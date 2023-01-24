import { useMasterdata } from '~/hooks/use-masterdata';
import { useStandings } from '~/hooks/use-standings';

export const handle = { view: '' };

export default function Tabelle() {
  const { championship, players } = useMasterdata();
  const { players: ranks } = useStandings();

  return (
    <div>
      <h2>
        {championship.name} - {championship.completed ? 'Abschlusstabelle' : 'Aktuelle Tabelle'}
      </h2>
      <table>
        <thead>
          <tr>
            <th>Platz</th>
            <th>Name</th>
            <th>Punkte</th>
          </tr>
        </thead>
        <tbody>
          {ranks
            .sort((a, b) => a.rank - b.rank)
            .map((r) => (
              <tr key={r.id}>
                <td>{r.rank}</td>
                <td>{players[r.playerId].name}</td>
                <td>{r.totalPoints}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
