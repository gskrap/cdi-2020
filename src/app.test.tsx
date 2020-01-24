import React from 'react';
import { render } from '@testing-library/react';
import App from './app';

test('renders', () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});
