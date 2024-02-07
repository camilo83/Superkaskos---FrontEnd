import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from './app';

import { Footer } from '../footer/footer';
import { Header } from '../header/header';

import { Router } from '../router/router';

jest.mock('../footer/footer');
jest.mock('../router/router');
jest.mock('../header/header');
jest.mock('../menu/menu');

describe('Given App component', () => {
  describe('When we instantiate', () => {
    beforeEach(() => {
      render(<App></App>);
    });
    test('renders App with Footer', () => {
      expect(Footer).toHaveBeenCalled();
    });
    test('renders App with List', () => {
      expect(Router).toHaveBeenCalled();
    });
    test('renders App with Header', () => {
      expect(Header).toHaveBeenCalled();
    });
  });
});
