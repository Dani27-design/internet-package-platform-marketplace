import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

type PlaceholderPageProps = {
  title: string;
  parameterName?: string;
};

export function PlaceholderPage({ title, parameterName }: PlaceholderPageProps) {
  const params = useParams();
  const parameterValue = parameterName ? params[parameterName] : undefined;

  return (
    <Box component="main" sx={{ p: 3 }}>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      {parameterName ? (
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          {parameterName}: {parameterValue}
        </Typography>
      ) : null}
    </Box>
  );
}
