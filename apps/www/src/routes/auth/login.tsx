import { useState } from 'react';
import { useRef } from 'react';
import { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

import Button from '~/components/atoms/button';
import { useMasterdata } from '~/hooks/use-masterdata';
import { classes } from '~/utils/classes';

export default function Login() {
  const emailFldRef = useRef<HTMLInputElement>(null);
  const [mailSent, setMailSent] = useState(false);

  const [error, setError] = useState('');

  const { players } = useMasterdata();

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
          setTimeout(() => setMailSent(true), 500);
        }
      }
    }
  }

  return mailSent ? (
    <div className="py-4 mx-4 sm:mx-auto max-w-2xl text-lg brand-app-text-contrast leading-7 text-center space-y-4">
      <div className="flex justify-center">
        <CheckCircleIcon className="text-radix-green11 h-16 w-16" />
      </div>
      <p>Du hast jetzt von uns eine Mail mit einem Anmelde-Link erhalten.</p>
      <p>
        Du kannst dich mit einem Click hier anmelden. Und bleibst das auch in dem jeweiligen
        Browser.
      </p>
      <p>Ein Passwort wird nicht benötigt.</p>
      <Link to="/" className="block mt-4 brand-app-text hover:underline">
        Zur Startseite
      </Link>
    </div>
  ) : (
    <div className="mx-4 py-4 sm:mx-auto max-w-2xl neutral-app-bg-subtl border neutral-border rounded shadow-sm mt-12">
      <h2 className="text-center py-2 text-xl font-semibold">Anmeldung</h2>
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
  );
}
