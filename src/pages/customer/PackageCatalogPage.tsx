import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPackages } from '../../api/queries';
import { PackageCard } from '../../components/customer/PackageCard';
import { PROVIDERS } from '../../domain/constants';
import type { Provider } from '../../domain/types';
import { ROUTES } from '../../routes/paths';

export function PackageCatalogPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const packagesQuery = useQuery({
    queryKey: ['packages'],
    queryFn: getPackages,
  });

  const search = searchParams.get('search') ?? '';
  const provider = searchParams.get('provider') ?? '';
  const packages = packagesQuery.data ?? [];
  const filteredPackages = packages.filter((packageItem) => {
    const matchesSearch =
      search.trim().length === 0 ||
      `${packageItem.provider} ${packageItem.name}`
        .toLowerCase()
        .includes(search.trim().toLowerCase());
    const matchesProvider = provider.length === 0 || packageItem.provider === provider;

    return matchesSearch && matchesProvider;
  });

  const updateParam = (key: string, value: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }

    setSearchParams(nextParams);
  };

  return (
    <Stack spacing={3}>
      <Typography component="h1" variant="h4">
        Packages
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          fullWidth
          label="Search Package"
          onChange={(event) => updateParam('search', event.target.value)}
          value={search}
        />
        <FormControl fullWidth>
          <InputLabel id="provider-filter-label">Provider</InputLabel>
          <Select
            label="Provider"
            labelId="provider-filter-label"
            onChange={(event) => updateParam('provider', event.target.value)}
            value={provider}
          >
            <MenuItem value="">All Providers</MenuItem>
            {PROVIDERS.map((providerName: Provider) => (
              <MenuItem key={providerName} value={providerName}>
                {providerName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {filteredPackages.length > 0 ? (
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(3, minmax(0, 1fr))',
            },
          }}
        >
          {filteredPackages.map((packageItem) => (
            <PackageCard
              key={packageItem.id}
              packageItem={packageItem}
              onSelect={(packageId) =>
                navigate(ROUTES.customer.packageDetailPath(packageId))
              }
            />
          ))}
        </Box>
      ) : (
        <Typography color="text.secondary">No packages found</Typography>
      )}
    </Stack>
  );
}
