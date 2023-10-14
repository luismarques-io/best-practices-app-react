import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export function isErrorWithMessage(error: unknown): error is { message: string } {
  return typeof error === 'object' && error != null && 'message' in error && typeof (error as any).message === 'string';
}

export function getErrorMessage(error: unknown) {
  if (isFetchBaseQueryError(error)) {
    const message = 'error' in error ? error.error : (error as { data: { message?: string } }).data.message;
    return message ?? 'Unknown error';
  } else if (isErrorWithMessage(error)) {
    return error.message;
  }
  return 'Unknown error';
}
