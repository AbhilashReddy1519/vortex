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

function normalizeError(error: unknown) {
  if (error instanceof Error) {
    return { message: error.message };
  }
  return error;
}

export function failed(
  res: Response,
  { status = 'Failed', error = '', code = 400, ...data }: ResponseType
) {
  return res.status(code).json({
    success: false,
    status,
    error: normalizeError(error),
    data: { ...data },
  });
}
