import Joi from 'joi';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // Mínimo 8 caracteres, 1 maiúscula, 1 número
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateCNPJ = (cnpj: string): boolean => {
  const cnpjRegex = /^\d{14}$/;
  return cnpjRegex.test(cnpj.replace(/\D/g, ''));
};

export const validateCPF = (cpf: string): boolean => {
  const cpfRegex = /^\d{11}$/;
  return cpfRegex.test(cpf.replace(/\D/g, ''));
};

export const validateBarcode = (barcode: string): boolean => {
  return barcode.length >= 8 && barcode.length <= 14;
};

// Schemas de validação
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
});

export const productSchema = Joi.object({
  internalCode: Joi.string().required(),
  barcode: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().optional(),
  categoryId: Joi.string().required(),
  brandId: Joi.string().optional(),
  supplierId: Joi.string().required(),
  costPrice: Joi.number().positive().required(),
  salePrice: Joi.number().positive().required(),
  minimumStock: Joi.number().min(0).optional(),
});

export const saleSchema = Joi.object({
  type: Joi.string().valid('FISCAL', 'NON_FISCAL', 'COUNTER', 'BUDGET').required(),
  items: Joi.array().min(1).required(),
  customerName: Joi.string().optional(),
  customerCpf: Joi.string().optional(),
  discountValue: Joi.number().min(0).optional(),
});
