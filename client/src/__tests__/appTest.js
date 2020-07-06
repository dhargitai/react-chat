import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
    test('renders App component', () => {
        render(<App />);

        expect(screen.getByText('Chat')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByText('Waiting for connection...')).toBeInTheDocument();
    });
});
