import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { ExclamationCircleIcon, FaceFrownIcon, FaceSmileIcon } from '@heroicons/react/24/outline';

import Button from '~/components/atoms/button';
import { useMasterdata } from '~/hooks/use-masterdata';
import { classes } from '~/utils/classes';
import { FormEvent } from 'react';
import { checkEmailLink, logOnWithEmailLink } from '~/firebase/auth';

export default function ValidateEmail() {
  const { players } = useMasterdata();

  // Handling the Re-Enter Email address form
  const emailFldRef = useRef<HTMLInputElement>(null);
  const [emailFldErr, setEmailFldError] = useState('');

  // Docs: https://firebase.google.com/docs/auth/web/email-link-auth?authuser=0
  const storedEmail = localStorage.getItem('emailForSignIn');
  const hasSignLink = checkEmailLink(window.location.href);

  // Outcome: player logged on
  const [player, setPlayer] = useState<{ email: string; name: string } | undefined>(undefined);
  // Outcome: sign in error
  const [signInError, setSignInError] = useState(false);

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (emailFldRef.current) {
      emailFldRef.current.dataset['validated'] = '';
      emailFldRef.current.setCustomValidity('');
      setEmailFldError('');

      if (!emailFldRef.current.validity.valid) {
        setEmailFldError('Ungültige Email-Adresse');
      } else {
        const player = Object.values(players).find((p) => p.email === emailFldRef.current?.value);
        if (!player) {
          emailFldRef.current.setCustomValidity('Unbekannte Email-Adresse');
          setEmailFldError('Unbekannte Email-Adresse');
        } else {
          logOnWithEmailLink(emailFldRef.current.value, window.location.href).then((result) => {
            if (result !== false) {
              setPlayer(player);
            } else {
              setSignInError(true);
            }
          });
        }
      }
    }
  }

  // False enter the view
  if (!hasSignLink) {
    throw new Error('Entschuldigung, diese Seite kannst du nur mit einem Login-Link aufrufen.');
  }

  // Best path: User enters from same device with current and working link
  // Good path: other device/browser (storedEmail === null && hasSignLink)
  if (storedEmail !== null && hasSignLink) {
    logOnWithEmailLink(storedEmail, window.location.href).then((result) => {
      if (result !== false) {
        window.localStorage.removeItem('emailForSignIn');
        setPlayer(Object.values(players).find((p) => p.email === storedEmail));
      } else {
        setSignInError(true);
      }
    });
  }

  return player ? (
    <div className="py-4 mx-4 sm:mx-auto max-w-2xl text-lg brand-app-text-contrast leading-7 text-center space-y-4">
      <div className="flex justify-center">
        <FaceSmileIcon className="text-radix-green11 h-16 w-16" />
      </div>
      <p>Hallo {player?.name}, willkommen und viel Spaß!</p>
      <Link to="/" className="block mt-4 brand-app-text hover:underline">
        Zur Startseite
      </Link>
    </div>
  ) : signInError ? (
    <div className="py-4 mx-4 sm:mx-auto max-w-2xl text-lg brand-app-text-contrast leading-7 text-center space-y-4">
      <div className="flex justify-center">
        <FaceFrownIcon className="text-radix-red11 h-16 w-16" />
      </div>
      <p>Hoppla, das hat nicht geklappt.</p>
      <Link to="/" className="block mt-4 brand-app-text hover:underline">
        Zur Startseite
      </Link>
    </div>
  ) : storedEmail === null ? (
    <div className="mx-4 py-4 sm:mx-auto max-w-2xl neutral-app-bg-subtl border neutral-border rounded shadow-sm mt-12">
      <h2 className="text-center py-2 text-xl font-semibold">Anmeldung</h2>
      <p className="px-4 pt-2 text-center">
        Da du einen anderen Browser bzw. ein anderes Gerät benutzt als beim Anfordern des
        Login-Links brauchen wir zur Absicherung nochmal deine Email-Adresse.
      </p>
      <form className="mt-8 mb-2 space-y-8" onSubmit={handleSubmit} noValidate>
        <div className="px-4 sm:px-8">
          <label htmlFor="email" className="sr-only">
            Email:
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              ref={emailFldRef}
              className={classes(
                'form-input peer block w-full rounded-md border-0 py-1.5 neutral-app-bg brand-app-text-contrast shadow-sm ring-1 ring-neutral7 ring-inset placeholder:neutral-app-text focus:ring-2 focus:ring-inset focus:ring-brand7 sm:text-sm sm:leading-6',
                'data-[validated]:invalid:pr-10 data-[validated]:invalid:text-radix-red12 data-[validated]:invalid:ring-radix-red7 data-[validated]:invalid:focus:ring-radix-red7'
              )}
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email-Adresse"
            />
            <div className="hidden peer-[[data-validated]:invalid]:flex pointer-events-none absolute top-2 right-0 items-center pr-3">
              <ExclamationCircleIcon className="h-5 w-5 text-radix-red11" aria-hidden="true" />
            </div>
            <p
              className="hidden peer-[[data-validated]:invalid]:flex mt-2 px-2 text-sm text-radix-red11"
              id="email-error"
            >
              {emailFldErr}
            </p>
          </div>
        </div>
        <div className="text-center">
          <Button type="submit" color="brand" className="w-24">
            Log In
          </Button>
        </div>
      </form>
    </div>
  ) : null;

  /*

  const emailFldRef = useRef<HTMLInputElement>(null);
  const { players } = useMasterdata();

  // This is probably a whole state machine ...
  const [email, setEmail] = useState(localStorage.getItem('emailForSignIn'));
  const [signingIn, setSigningIn] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const [error, setError] = useState('');
  const [player, setPlayer] = useState<{ email: string; name: string } | undefined>(undefined);

  const { isAnonymous, checkEmailLink, logOnWithEmailLink } = useAuth();

  // Early guard: Confirm the link is a sign-in with email link.
  const requestedFromEmailLink = checkEmailLink(window.location.href);
  if (!requestedFromEmailLink) {
    return (
      <div className="py-4 mx-4 sm:mx-auto max-w-2xl text-lg brand-app-text-contrast leading-7 text-center space-y-4">
        <div className="flex justify-center">
          <XCircleIcon className="text-radix-red11 h-16 w-16" />
        </div>
        <p>Entschuldigung, diese Seite kannst du nur mit einem Login-Link aufrufen.</p>
        <Link to="/" className="block mt-4 brand-app-text hover:underline">
          Zur Startseite
        </Link>
      </div>
    );
  }

  if (email) {
    setSigningIn(true);
    logOnWithEmailLink(email, window.location.href)
      .then(() => {
        // Clear email from storage.
        window.localStorage.removeItem('emailForSignIn');
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
        setPlayer(Object.values(players).find((p) => p.email === email));
      })
      .catch((error) => {
        setSignInError(true);
        setError(error.code);
      })
      .finally(() => setSigningIn(false));
  }

  // Early guard: signing in
  // TODO: add spinner if timespan is too long
  if (signingIn) return null;

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (emailFldRef.current) {
      emailFldRef.current.dataset['validated'] = '';
      emailFldRef.current.setCustomValidity('');

      if (!emailFldRef.current.validity.valid) {
        setError('Ungültige Email-Adresse');
      } else {
        const playerIx = Object.values(players).findIndex(
          (p) => p.email === emailFldRef.current?.value
        );
        if (playerIx === -1) {
          emailFldRef.current.setCustomValidity('Unbekannte Email-Adresse');
          setError('Unbekannte Email-Adresse');
        } else {
          setEmail(emailFldRef.current.value);
        }
      }
    }
  }

  return player ? (
    <div className="py-4 mx-4 sm:mx-auto max-w-2xl text-lg brand-app-text-contrast leading-7 text-center space-y-4">
      <div className="flex justify-center">
        <FaceSmileIcon className="text-radix-green11 h-16 w-16" />
      </div>
      <p>Hallo {player?.name}, willkommen und viel Spaß!</p>
      <Link to="/" className="block mt-4 brand-app-text hover:underline">
        Zur Startseite
      </Link>
    </div>
  ) : signInError ? (
    <div className="py-4 mx-4 sm:mx-auto max-w-2xl text-lg brand-app-text-contrast leading-7 text-center space-y-4">
      <div className="flex justify-center">
        <FaceFrownIcon className="text-radix-red11 h-16 w-16" />
      </div>
      <p>Hoppla, das hat nicht geklappt!</p>
      <p>Fehlermeldung: {error}</p>
      <Link to="/" className="block mt-4 brand-app-text hover:underline">
        Zur Startseite
      </Link>
    </div>
  ) : (
    <div className="mx-4 py-4 sm:mx-auto max-w-2xl neutral-app-bg-subtl border neutral-border rounded shadow-sm mt-12">
      <h2 className="text-center py-2 text-xl font-semibold">Anmeldung</h2>
      <p className="px-4 pt-2 text-center">
        Da du einen anderen Browser bzw. ein anderes Gerät benutzt als beim Anfordern des
        Login-Links brauchen wir zur Absicherung nochmal deine Email-Adresse.
      </p>
      <form className="mt-8 mb-2 space-y-8" onSubmit={handleSubmit} noValidate>
        <div className="px-4 sm:px-8">
          <label htmlFor="email" className="sr-only">
            Email:
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              ref={emailFldRef}
              className={classes(
                'peer block w-full rounded-md border-0 py-1.5 neutral-app-bg brand-app-text-contrast shadow-sm ring-1 ring-neutral7 ring-inset placeholder:neutral-app-text focus:ring-2 focus:ring-inset focus:ring-brand7 sm:text-sm sm:leading-6',
                'data-[validated]:invalid:pr-10 data-[validated]:invalid:text-radix-red12 data-[validated]:invalid:ring-radix-red7 data-[validated]:invalid:focus:ring-radix-red7'
              )}
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email-Adresse"
            />
            <div className="hidden peer-[[data-validated]:invalid]:flex pointer-events-none absolute top-2 right-0 items-center pr-3">
              <ExclamationCircleIcon className="h-5 w-5 text-radix-red11" aria-hidden="true" />
            </div>
            <p
              className="hidden peer-[[data-validated]:invalid]:flex mt-2 px-2 text-sm text-radix-red11"
              id="email-error"
            >
              {error}
            </p>
          </div>
        </div>
        <div className="text-center">
          <Button type="submit" color="brand" className="w-24">
            Log In
          </Button>
        </div>
      </form>
    </div>
  ); */
}
