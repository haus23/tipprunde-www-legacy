import { Params } from 'react-router-dom';

export function extractMatch(params: Readonly<Params<string>>) {
  const { '*': splat } = params;
  return splat?.split('-').at(0);
}
