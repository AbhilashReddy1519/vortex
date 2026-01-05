import type { Response } from 'express';

export function success(
  res: Response,
  { status = 'Success', message = '', code = 200, ...data }: ResponseType
) {
  return res.status(code).json({
    success: true,
    status,
    message,
    data,
  });
}

export function failed(
  res: Response,
  { status = 'Failed', error = '', code = 200, ...data }: ResponseType
) {
  return res.status(code).json({
    success: false,
    status,
    error: typeof error === 'string' ? error : JSON.stringify(error, null, 2),
    data: { ...data },
  });
}
