import { useState } from 'react';
import { Select } from '~/components/elements/select';
import { useChampionship } from '~/hooks/use-championship';
import { useMasterdata } from '~/hooks/use-masterdata';
import { useStandings } from '~/hooks/use-standings';

export const handle = { view: 'spieler' };

export default function Spieler() {
  const championship = useChampionship();
  const { players } = useStandings();
  const { players: allPlayers } = useMasterdata();

  const [selectedPlayerId, setSelectedPlayerId] = useState(players[0].id);

  return (
    <div>
      <div className="flex items-center gap-x-2 sm:gap-x-4 mx-2 sm:mx-0">
        <h2 className="text-xl font-semibold">
          <span className="hidden sm:inline">{championship.name} - </span>Tipps von
          <Select
            options={players}
            value={selectedPlayerId}
            onValueChange={setSelectedPlayerId}
            displayValue={(p) => allPlayers[p.playerId].name}
          />
        </h2>
      </div>
    </div>
  );
}
