import { ZodError } from 'zod';
import { Response } from 'express';

function formatZodIssues(error: ZodError) {
  return error.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
    code: issue.code,
    expected: (issue as any).expected,
    received: (issue as any).received,
  }));
}

function combineZodMessages(error: ZodError) {
  return error.issues
    .map((issue) => {
      const path = issue.path.join('.');
      return path ? `${path}: ${issue.message}` : issue.message;
    })
    .join(', ');
}

export function handleZodBodyError<T>(
  parsed: { success: boolean; error?: ZodError },
  res: Response,
  customMessage = 'Invalid request body'
): parsed is { success: true; data: T } {
  if (!parsed.success && parsed.error) {
    const details = formatZodIssues(parsed.error);
    const message = combineZodMessages(parsed.error);

    res.status(400).json({
      error: customMessage,
      message,
      //details,
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
  if (!parsed.success && parsed.error) {
    const details = formatZodIssues(parsed.error);
    const message = combineZodMessages(parsed.error);

    res.status(400).json({
      error: customMessage,
      message,
      //details,
    });

    return false;
  }

  return true;
}
