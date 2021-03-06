import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    error.inner.forEach((err) => {
      if (err.path) errors[err.path] = err.errors;
    });

    const printError = error.errors;

    console.error(error);
    return response
      .status(400)
      .json({ message: 'Validation fails.', printError });
  }

  console.error(error);
  return response.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
