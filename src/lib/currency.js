/**
 * Format number to Indonesian Rupiah currency
 * @param {number} amount - Amount to format
 * @param {boolean} useShortFormat - Use short format (e.g., "5jt" instead of "5.000.000")
 * @returns {string} Formatted currency string
 */
export const formatRupiah = (amount, useShortFormat = false) => {
  if (!amount && amount !== 0) return 'Rp 0';
  
  const numAmount = Number(amount);
  
  if (useShortFormat) {
    // Short format: Rp 5jt, Rp 500rb, etc.
    if (numAmount >= 1000000000) {
      return `Rp ${(numAmount / 1000000000).toFixed(1)}M`;
    } else if (numAmount >= 1000000) {
      return `Rp ${(numAmount / 1000000).toFixed(1)}jt`;
    } else if (numAmount >= 1000) {
      return `Rp ${(numAmount / 1000).toFixed(0)}rb`;
    }
    return `Rp ${numAmount}`;
  }
  
  // Full format: Rp 5.000.000
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numAmount);
};

/**
 * Format number to Indonesian number format (with dots as thousand separator)
 * @param {number} amount - Amount to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (amount) => {
  if (!amount && amount !== 0) return '0';
  return new Intl.NumberFormat('id-ID').format(Number(amount));
};

/**
 * Parse Rupiah string to number
 * @param {string} rupiahString - Rupiah string (e.g., "Rp 5.000.000")
 * @returns {number} Parsed number
 */
export const parseRupiah = (rupiahString) => {
  if (!rupiahString) return 0;
  return Number(rupiahString.replace(/[^0-9]/g, ''));
};

export default {
  formatRupiah,
  formatNumber,
  parseRupiah,
};
