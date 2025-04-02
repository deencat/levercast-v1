import React from 'react';

declare global {
  // Add any global type definitions here if needed
  namespace JSX {
    interface IntrinsicElements {
      // Allow any JSX elements
      [elemName: string]: any;
    }
  }
}

export {}; 