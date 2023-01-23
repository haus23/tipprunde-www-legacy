document.documentElement.classList.toggle(
  'dark',
  localStorage.theme === 'dark' ||
    (!localStorage.theme && matchMedia('(prefers-color-scheme: dark)').matches)
);
