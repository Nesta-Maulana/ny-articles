import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('renders correctly', () => {
    render(<SearchBar onSearch={vi.fn()} />);
    
    expect(screen.getByPlaceholderText('Search for articles...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSearch with the correct query when form is submitted', async () => {
    const onSearch = vi.fn();
    const user = userEvent.setup();
    
    render(<SearchBar onSearch={onSearch} />);
    
    const input = screen.getByPlaceholderText('Search for articles...');
    const button = screen.getByRole('button', { name: /search/i });
    
    await user.type(input, 'climate change');
    await user.click(button);
    
    expect(onSearch).toHaveBeenCalledWith('climate change');
  });

  it('does not call onSearch with empty query', async () => {
    const onSearch = vi.fn();
    const user = userEvent.setup();
    
    render(<SearchBar onSearch={onSearch} />);
    
    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);
    
    expect(onSearch).not.toHaveBeenCalled();
  });

  it('shows clear button when there is input', async () => {
    const onSearch = vi.fn();
    const user = userEvent.setup();
    
    render(<SearchBar onSearch={onSearch} />);
    
    const input = screen.getByPlaceholderText('Search for articles...');
    
    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
    
    await user.type(input, 'test');
    
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  it('clears input and calls onSearch with empty string when clear button is clicked', async () => {
    const onSearch = vi.fn();
    const user = userEvent.setup();
    
    render(<SearchBar onSearch={onSearch} />);
    
    const input = screen.getByPlaceholderText('Search for articles...');
    await user.type(input, 'test query');
    
    const clearButton = screen.getByRole('button', { name: /clear/i });
    await user.click(clearButton);
    
    expect(input).toHaveValue('');
    expect(onSearch).toHaveBeenCalledWith('');
  });

  it('disables input and button when loading', () => {
    render(<SearchBar onSearch={vi.fn()} isLoading={true} />);
    
    expect(screen.getByPlaceholderText('Search for articles...')).toBeDisabled();
    expect(screen.getByRole('button', { name: /search/i })).toBeDisabled();
  });
});