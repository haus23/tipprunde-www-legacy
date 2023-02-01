import { useState } from 'react';
import { Select } from '~/components/elements/select';
import { useChampionship } from '~/hooks/use-championship';
import { useMasterdata } from '~/hooks/use-masterdata';
import { useStandings } from '~/hooks/use-standings';

export default function Players() {
  const { players: masterPlayers } = useMasterdata();
  const championship = useChampionship();
  const { players } = useStandings();

  const [playerId, setPlayerId] = useState(players[0].id);
  const player = players.find((p) => p.id === playerId);

  return (
    <>
      <header className="flex items-center gap-x-2 sm:gap-x-4 mx-2 sm:mx-0">
        <h2 className="flex gap-x-2 text-xl font-semibold tracking-tight">
          <span className="hidden sm:block">{championship.name} -</span>
          <span>Tipps von</span>
          <span className="sr-only">{player && masterPlayers[player.playerId].name}</span>
        </h2>
        <Select
          options={players}
          value={playerId}
          onValueChange={setPlayerId}
          displayValue={(item) => masterPlayers[item.playerId].name}
        />
      </header>
    </>
  );
}
