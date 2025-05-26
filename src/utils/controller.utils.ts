import { ZodError } from 'zod';
import { Response } from 'express';

export function handleZodBodyError<T>(
  parsed: { success: boolean; error?: ZodError },
  res: Response,
  customMessage = 'Invalid request body'
): parsed is { success: true; data: T } {
  if (!parsed.success) {
    const message = parsed.error?.issues.map((issue) => issue.message).join(', ') || 'Validation failed';
    res.status(400).json({
      error: customMessage,
      message,
    });
    return false;
  }

  return true;
}

export function handleZodParamsError<T>(
  parsed: { success: boolean; error?: ZodError },
  res: Response,
  customMessage = 'Invalid request parameter'
): parsed is { success: true; data: T } {
  if (!parsed.success) {
    const message = parsed.error?.issues.map((issue) => issue.message).join(', ') || 'Validation failed';
    res.status(400).json({
      error: customMessage,
      message,
    });
    return false;
  }

  return true;
}
