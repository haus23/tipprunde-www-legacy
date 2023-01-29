import { Logo } from '../brand/logo';

export function AppLoading() {
  return (
    <div className="fixed inset-0 bg-overlay">
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <Logo className="h-60" />
        <div className="mt-4 text-xl">Turnierdaten werden geladen ...</div>
      </div>
    </div>
  );
}
