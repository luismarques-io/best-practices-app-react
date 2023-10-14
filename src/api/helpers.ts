import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

/**
 * Type guard function that checks if an error is a `FetchBaseQueryError`.
 * @param {unknown} error
 * @returns {error is FetchBaseQueryError}
 */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

/**
 * Type guard function that checks if an object is an error with a message property.
 * @param {unknown} error - The object to check.
 * @returns {error is { message: string }} - True if the object is an error with a message property, false otherwise.
 */
export function isErrorWithMessage(error: unknown): error is { message: string } {
  return typeof error === 'object' && error != null && 'message' in error && typeof (error as any).message === 'string';
}

/**
 * Returns an error message based on the error object passed as argument.
 * @param {unknown} error - The error object to extract the message from.
 * @returns {string} - The error message or 'Unknown error' if the message cannot be extracted.
 */
export function getErrorMessage(error: unknown) {
  if (isFetchBaseQueryError(error)) {
    const message = 'error' in error ? error.error : (error as { data: { message?: string } }).data.message;
    return message ?? 'Unknown error';
  } else if (isErrorWithMessage(error)) {
    return error.message;
  }
  return 'Unknown error';
}
