import { XCircleIcon } from '@heroicons/react/24/outline';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

export default function ErrorBoundary() {
  const error = useRouteError() as { message?: string };

  let errorMsg = error.message || 'Hoppla, das hätte nicht passieren dürfen.';

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      errorMsg = 'Hier wurde nichts gefunden?!';
    }
  }

  return (
    <div className="mt-24 mx-4 sm:mx-auto max-w-2xl text-lg brand-app-text-contrast leading-7 text-center space-y-4">
      <div className="flex justify-center">
        <XCircleIcon className="text-radix-red11 h-16 w-16" />
      </div>
      <p>{errorMsg}</p>
      <Link to="/" className="block mt-4 brand-app-text hover:underline">
        Zur Startseite
      </Link>
    </div>
  );
}
