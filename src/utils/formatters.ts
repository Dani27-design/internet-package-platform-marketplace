export function formatPrice(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatQuota(value: number) {
  return `${value}GB`;
}

export function formatValidity(days: number) {
  return `${days} Days`;
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export function formatPercentage(value: number) {
  return `${Math.round(value)}%`;
}

export function calculateUsagePercentage(totalQuota: number, remainingQuota: number) {
  if (totalQuota <= 0) {
    return 0;
  }

  return ((totalQuota - remainingQuota) / totalQuota) * 100;
}
