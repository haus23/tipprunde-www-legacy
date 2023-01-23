import { useAppData } from './($championshipId)';

export const handle = { view: '' };

export default function Tabelle() {
  useAppData();

  return (
    <div>
      <h2>Tabelle</h2>
    </div>
  );
}
