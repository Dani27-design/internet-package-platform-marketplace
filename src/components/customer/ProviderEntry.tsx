import { Button } from '@mui/material';
import type { Provider } from '../../domain/types';

type ProviderEntryProps = {
  provider: Provider;
  onSelect: (provider: Provider) => void;
};

export function ProviderEntry({ provider, onSelect }: ProviderEntryProps) {
  return (
    <Button onClick={() => onSelect(provider)} variant="outlined">
      {provider}
    </Button>
  );
}
