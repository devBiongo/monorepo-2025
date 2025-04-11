// hooks/useZodForm.ts
import { useForm, UseFormProps, UseFormReturn } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export function useZodForm(schema: z.ZodSchema, options?: UseFormProps): UseFormReturn {
  return useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    ...options
  });
}
