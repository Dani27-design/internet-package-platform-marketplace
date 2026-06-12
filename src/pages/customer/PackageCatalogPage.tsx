import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPackages } from '../../api/queries';
import { ResponsiveGrid } from '../../components/common/Page';
import { EmptyState } from '../../components/common/QueryState';
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
    <Stack spacing={{ xs: 1.5, sm: 2.5 }}>
      <Box
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.86)',
          border: 1,
          borderColor: 'rgba(15, 23, 42, 0.08)',
          borderRadius: 2,
          boxShadow: '0 12px 34px rgba(15, 23, 42, 0.05)',
          p: { xs: 1, sm: 1.25 },
        }}
      >
      <Stack direction={{ xs: 'row', sm: 'row' }} spacing={{ xs: 0.75, sm: 1 }}>
        <TextField
          fullWidth
          aria-label="Search Package"
          hiddenLabel
          onChange={(event) => updateParam('search', event.target.value)}
          placeholder="Search plans"
          size="small"
          sx={{
            '& .MuiInputBase-root': {
              bgcolor: '#ffffff',
              borderRadius: 1.5,
              fontWeight: 800,
              minHeight: { xs: 40, sm: 44 },
            },
            '& .MuiInputBase-input': {
              fontSize: { xs: '0.88rem', sm: '0.95rem' },
              px: { xs: 1.25, sm: 1.5 },
            },
          }}
          value={search}
        />
        <FormControl
          sx={{
            flex: { xs: '0 0 132px', sm: '0 0 220px' },
            '& .MuiInputBase-root': {
              bgcolor: '#ffffff',
              borderRadius: 1.5,
              fontWeight: 900,
              minHeight: { xs: 40, sm: 44 },
            },
            '& .MuiSelect-select': {
              fontSize: { xs: '0.88rem', sm: '0.95rem' },
              py: { xs: 1, sm: 1.15 },
            },
          }}
          size="small"
        >
          <InputLabel id="provider-filter-label" sx={{ display: 'none' }}>
            Provider
          </InputLabel>
          <Select
            aria-label="Provider"
            displayEmpty
            labelId="provider-filter-label"
            onChange={(event) => updateParam('provider', event.target.value)}
            renderValue={(value) => (value ? value : 'All networks')}
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
      </Box>

      {filteredPackages.length > 0 ? (
        <ResponsiveGrid>
          {filteredPackages.map((packageItem) => (
            <PackageCard
              key={packageItem.id}
              packageItem={packageItem}
              onSelect={(packageId) =>
                navigate(ROUTES.customer.packageDetailPath(packageId))
              }
            />
          ))}
        </ResponsiveGrid>
      ) : (
        <EmptyState message="No packages found" />
      )}
    </Stack>
  );
}
