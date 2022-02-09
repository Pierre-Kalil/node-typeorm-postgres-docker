import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

export const validate =
  (schema: yup.AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    try {
      const validateData = await schema.validate(body, {
        abortEarly: false,
        stripUnknown: true,
      });
      req.validateData = validateData;
      next();
    } catch (err) {
      next(err);
    }
  };
