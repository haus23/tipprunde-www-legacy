import { useState } from 'react';
import { Select } from '~/components/elements/select';
import { useChampionship } from '~/hooks/use-championship';
import { useMasterdata } from '~/hooks/use-masterdata';
import { useStandings } from '~/hooks/use-standings';

export default function Matches() {
  const { teams } = useMasterdata();
  const championship = useChampionship();
  const { matches, rounds } = useStandings();

  const [matchId, setMatchId] = useState(matches[0].id);
  const match = matches.find((m) => m.id === matchId);

  return (
    <>
      <header className="flex items-center gap-x-4 mx-2 sm:mx-0">
        <h2 className="flex gap-x-2 text-xl font-semibold tracking-tight">
          <span className="hidden sm:block">{championship.name} -</span>
          <span>Tipps für</span>
          <span className="sr-only">{`${match && teams[match.hometeamId].name} - ${
            match && teams[match.awayteamId].name
          }`}</span>
        </h2>
        <Select
          options={matches}
          value={matchId}
          onValueChange={setMatchId}
          displayValue={(item) =>
            `${teams[item.hometeamId].shortname} - ${teams[item.awayteamId].shortname}`
          }
          groups={rounds}
          groupKey="roundId"
          groupDisplayValue={(item) => `Runde ${item.nr}`}
        />
      </header>
    </>
  );
}
