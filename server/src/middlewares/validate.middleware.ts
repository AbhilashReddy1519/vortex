/* eslint-disable @typescript-eslint/no-explicit-any */
import { failed } from '#utils/response.util.js';
import type { NextFunction, Request, Response } from 'express';
import { z, type ZodType } from 'zod';

export const validate =
  (schema: ZodType<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
      const parseResult = schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      if (!parseResult.success) {
        const errors = z.treeifyError(parseResult.error);
        return failed(res, { error: JSON.stringify(errors, null, 2) });
      }
      req.body = parseResult.data.body;
      next();
    };
