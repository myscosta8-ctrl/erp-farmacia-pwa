import crypto from 'crypto';

export const generateSaleNumber = (): string => {
  const date = new Date();
  const timestamp = date.getTime().toString().slice(-8);
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `VND${timestamp}${random}`;
};

export const generateInternalCode = (): string => {
  return `PROD${Date.now()}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
};

export const calculateProfitMargin = (costPrice: number, salePrice: number): number => {
  return ((salePrice - costPrice) / salePrice) * 100;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const generateHash = (text: string): string => {
  return crypto.createHash('sha256').update(text).digest('hex');
};

export const removeMask = (text: string): string => {
  return text.replace(/\D/g, '');
};

export const formatPhone = (phone: string): string => {
  const clean = removeMask(phone);
  if (clean.length === 11) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7)}`;
  }
  return phone;
};

export const calculateDaysUntilExpiry = (expiryDate: Date): number => {
  const now = new Date();
  const diff = expiryDate.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};
