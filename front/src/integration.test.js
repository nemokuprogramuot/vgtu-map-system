
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

    test('grįžimas į praeitą puslapį trunka <= 1 sekundę', async () => {
      const { container } = renderWithRouter(<PageTemplate />);
      const button = screen.getByRole('button', { name: /Automobilių stovėjimo aikštelė/i });
      fireEvent.click(button);
      const startTime = Date.now();
      window.history.back();
      await waitFor(() => screen.getByText(/S1 Centriniai rūmai/i));
      const elapsedTime = Date.now() - startTime;
      expect(elapsedTime).toBeLessThanOrEqual(1000);
    });

    test('VMS-72 konversijos procesas trunka mažiau nei <= 500 ms', async () => {
      const startTime = Date.now();
      renderWithRouter(<PageTemplate />);
      const panoramaElement = await screen.findByTestId('pannellum-viewer');
      expect(panoramaElement).toBeInTheDocument();
      const endTime = Date.now();
      const loadingTime = endTime - startTime;
      console.log(`Interactive image loading time: ${loadingTime}ms`);
      expect(loadingTime).toBeLessThanOrEqual(500);
      const panoramaHeading = screen.getByText(/Fakulteto įėjimlo 360 laipsnių vaizdas/i);
      expect(panoramaHeading).toBeInTheDocument();
    });
    
  });
  