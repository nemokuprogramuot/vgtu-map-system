jest.mock('@react-google-maps/api', () => {
  const React = require('react');
  const fakeMapInstance = { setCenter: jest.fn() };
  return {
    GoogleMap: ({ onLoad, children }) => {
      React.useEffect(() => {
        if (onLoad) {
          onLoad(fakeMapInstance);
        }
      }, []);
      return React.createElement('div', { 'data-testid': 'google-map' }, children);
    },
    Marker: ({ label }) =>
      React.createElement('div', { 'data-testid': 'marker' }, label.text),
    DirectionsRenderer: () => React.createElement('div', { 'data-testid': 'directions-renderer' }),
  };
});

global.navigator.geolocation = {
  watchPosition: jest.fn().mockImplementation((success) => {
    success({ coords: { latitude: 54.722313, longitude: 25.337344 } });
    return 1;
  }),
  clearWatch: jest.fn(),
};

jest.mock('react-router-dom', () => {
  const React = require('react');
  return {
    useParams: () => ({ pageId: 'S1' }),
    BrowserRouter: ({ children }) =>
      React.createElement(React.Fragment, null, children),
    Link: ({ children, ...props }) =>
      React.createElement('a', props, children),
  };
});

jest.mock('./components/PannellumViewer', () => {
  return function MockPannellumViewer(props) {
    return <div data-testid="pannellum-viewer">Panorama Viewer</div>;
  };
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PageTemplate from './PageTemplate';
import { BrowserRouter } from 'react-router-dom';

beforeAll(() => {
  global.window.google = {
    maps: {
      DirectionsService: function () {
        return {
          route: jest.fn((req, callback) => {
            callback({ routes: [] }, 'OK');
          }),
        };
      },
      DirectionsStatus: {
        OK: 'OK',
      },
      TravelMode: {
        WALKING: 'WALKING',
      },
      event: {
        trigger: jest.fn(),
      },
    },
  };
});

const t = (key) => {
  const mockTranslations = {
    'pageTemplate.s1': 'S1 Central Building',
    'pageTemplate.selectStart': 'Select starting position.',
    'pageTemplate.loc1': 'Parking Lot',
    'pageTemplate.startPoint': 'Start Point',
    'pageTemplate.facultyView': '360° View of Faculty Entrance',
  };
  return mockTranslations[key] || key;
};

const renderWithRouter = (ui, { route = '/S1' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('PageTemplate Integration Tests (EN)', () => {
  test('renders the correct header from translations', async () => {
    renderWithRouter(<PageTemplate t={t} />);
    const headerElement = await screen.findByText(/S1 Central Building/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('shows "Start Point" marker after manual position selection', async () => {
    renderWithRouter(<PageTemplate t={t} />);
    const button = screen.getByRole('button', { name: /Parking Lot/i });
    fireEvent.click(button);
    const markerLabel = await waitFor(() => screen.getByText(/Start Point/i));
    expect(markerLabel).toBeInTheDocument();
  });

  test('returns to previous page in under 1 second', async () => {
    renderWithRouter(<PageTemplate t={t} />);
    const button = screen.getByRole('button', { name: /Parking Lot/i });
    fireEvent.click(button);
    const startTime = Date.now();
    window.history.back();
    await waitFor(() => screen.getByText(/S1 Central Building/i));
    const elapsedTime = Date.now() - startTime;
    expect(elapsedTime).toBeLessThanOrEqual(1000);
  });

  test('loads panorama viewer in under 500 ms', async () => {
    const startTime = Date.now();
    renderWithRouter(<PageTemplate t={t} />);
    const panoramaElement = await screen.findByTestId('pannellum-viewer');
    expect(panoramaElement).toBeInTheDocument();
    const elapsedTime = Date.now() - startTime;
    expect(elapsedTime).toBeLessThanOrEqual(500);

    const heading = screen.getByText(/360° View of Faculty Entrance/i);
    expect(heading).toBeInTheDocument();
  });
});
