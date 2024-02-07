import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import AboutUs from './about-us';

describe('AboutUs component', () => {
  beforeEach(() => {
    render(<AboutUs />);
  });

  test('renders key elements', () => {
    expect(
      screen.getByRole('heading', { level: 2, name: 'Superkaskos' })
    ).toBeInTheDocument();
  });

  test('renders first section', () => {
    const firstSection = screen.getAllByRole('region');
    expect(firstSection[0]).toBeInTheDocument();
  });
});
