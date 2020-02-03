export class AuthError extends Error {
  code: string;
  constructor(code: string, ...params: any[]) {
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthError);
    }

    this.name = 'AuthError';
    this.code = code;
  }
}
