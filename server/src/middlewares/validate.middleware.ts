/* eslint-disable @typescript-eslint/no-explicit-any */
import { failed } from '#utils/response.util.js';
import type { NextFunction, Request, Response } from 'express';
import { z, type ZodType } from 'zod';

export const validate =
  (schema: ZodType<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
      const parseResult = schema.safeParse(req.body);
      console.log(parseResult);
      if (!parseResult.success) {
        const errors = z.treeifyError(parseResult.error);
        console.error(parseResult.error);
        return failed(res, { error: errors, code: 422 });
      }
      req.body = parseResult.data;
      next();
    };
