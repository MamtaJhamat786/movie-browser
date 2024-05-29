import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Typography, CircularProgress } from '@mui/material';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../store'; 
import Movies from '../views/Movies';

import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';

import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();
const queryClient = new QueryClient();

beforeEach(() => {
    fetchMock.resetMocks();
});

afterEach(cleanup);

function testLoadingState(isLoading: boolean, isError: boolean) {
    render(
        <div>
            {isLoading ? <CircularProgress /> : isError ? <Typography color="error">Error loading movies. Please try again.</Typography> : null}
        </div>
    );

    if (isLoading) {
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    } else if (isError) {
        expect(screen.getByText(/Error loading movies/i)).toBeInTheDocument();
    } else {
        expect(screen.queryByRole('progressbar')).toBeNull();
        expect(screen.queryByText(/Error loading movies/i)).toBeNull();
    }
}

const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <ReduxProvider store={store}>
            <QueryClientProvider client={queryClient}>
                {ui}
            </QueryClientProvider>
        </ReduxProvider>
    );
};

describe('Movies Component', () => {
    test('renders the title "List of Movies"', async () => {
        renderWithProviders(<Movies />);
        expect(screen.getByText('List of Movies')).toBeInTheDocument();
    });

    test('handles input change correctly', async () => {
        renderWithProviders(<Movies />);
        const searchInput = screen.getByLabelText(/Search for movies/i);
        fireEvent.change(searchInput, { target: { value: 'civil war' } });
        expect(searchInput).toHaveValue('civil war');
    });

    test('renders loading spinner when isLoading is true', () => {
        testLoadingState(true, false);
    });

    test('renders error message when isError is true', () => {
        testLoadingState(false, true);
    });

    test('renders neither loading spinner nor error message when both are false', () => {
        testLoadingState(false, false);
    });

    
});    

