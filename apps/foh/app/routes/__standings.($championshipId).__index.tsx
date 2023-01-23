import { useRanking } from '~/hooks/use-ranking';

export default function Tabelle() {
  const { ranks } = useRanking();

  return (
    <div>
      <h2>Tabelle</h2>
      {ranks.length}
    </div>
  );
}
