// src/types/express.d.ts

import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Replace 'any' with a more specific type if possible
    }
  }
}
