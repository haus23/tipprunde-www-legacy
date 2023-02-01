import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import Logo from '~/components/brand/logo';

export default function ErrorBoundary() {
  const error = useRouteError();
  let errorMsg = 'Das hätte nicht passieren dürfen.';

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      errorMsg = 'Hier wurde nichts gefunden?!';
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="basis-2/3 flex flex-col justify-center items-center">
        <Logo className="text-brand12 h-48 block m-4" />
        <div className="text-xl font-semibold text-radix-red11 space-y-2 text-center">
          <p>Hoppla!</p>
          <p>{errorMsg}</p>
          <Link className="block text-xl text-brand12 underline underline-offset-2" to="/">
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
