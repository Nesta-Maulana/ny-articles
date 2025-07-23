import { describe, it, expect } from 'vitest';
import { APIError } from '../api';

describe('APIError', () => {
  it('should create an APIError with message', () => {
    const error = new APIError('Test error');
    
    expect(error.message).toBe('Test error');
    expect(error.name).toBe('APIError');
    expect(error).toBeInstanceOf(Error);
  });

  it('should create an APIError with status code and original error', () => {
    const originalError = new Error('Original error');
    const error = new APIError('Test error', 404, originalError);
    
    expect(error.message).toBe('Test error');
    expect(error.statusCode).toBe(404);
    expect(error.originalError).toBe(originalError);
  });
});