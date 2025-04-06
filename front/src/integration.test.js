
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PageTemplate from './PageTemplate';
import { BrowserRouter } from 'react-router-dom';

jest.mock('@react-google-maps/api', () => {
  const React = require('react');
  const fakeMapInstance = { setCenter: jest.fn() };
  return {
    GoogleMap: ({ onLoad, children }) => {
      React.useEffect(() => {
        if (onLoad) {
          onLoad(fakeMapInstance);
        }
      return <div data-testid="google-map">{children}</div>;
    },
    Marker: ({ label }) => <div data-testid="marker">{label.text}</div>,
  };
});

global.navigator.geolocation = {
  watchPosition: jest.fn().mockImplementation((success) => {
    success({ coords: { latitude: 54.722313, longitude: 25.337344 } });
    return 1; 
  }),
  clearWatch: jest.fn(),
};

jest.mock('react-router-dom', () => ({
  useParams: () => ({ pageId: 'S1' }),
  BrowserRouter: ({ children }) => <>{children}</>,
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
}));

const renderWithRouter = (ui, { route = '/S1' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('PageTemplate Integration Tests', () => {
  test('rodo reikiamą antraštę pagal reikalavimą', async () => {
    renderWithRouter(<PageTemplate />);
    const headerElement = await screen.findByText(/S1 Centriniai rūmai/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('pasirinkus rankinį pozicijos nustatymą rodoma žymė "Pradžios taškas"', async () => {
    renderWithRouter(<PageTemplate />);
    const button = screen.getByRole('button', { name: /Automobilių stovėjimo aikštelė/i });
    fireEvent.click(button);
    const markerLabel = await waitFor(() => screen.getByText(/Pradžios taškas/i));
    expect(markerLabel).toBeInTheDocument();
  });
});
