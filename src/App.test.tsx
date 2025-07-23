import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { articleService } from './services/api';

vi.mock('./services/api');

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders header and search bar', async () => {
    await act(async () => {
      render(<App />);
    });
    
    expect(screen.getByText('Discover Stories That Matter')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search articles/i)).toBeInTheDocument();
  });

  it('shows initial empty state', async () => {
    await act(async () => {
      render(<App />);
    });
    
    expect(screen.getByText('Explore by Topic')).toBeInTheDocument();
  });

  it('performs search and displays results', async () => {
    const mockResponse = {
      status: 'OK',
      copyright: 'Copyright',
      response: {
        docs: [
          {
            _id: '1',
            web_url: 'https://example.com',
            headline: { main: 'Test Article' },
            snippet: 'Test snippet',
            pub_date: '2024-01-15T10:00:00Z',
            byline: { original: 'By Test Author' },
            source: 'NYT',
            keywords: [],
            document_type: 'article',
            news_desk: 'National',
            section_name: 'News',
            type_of_material: 'News',
            word_count: 100,
            uri: 'nyt://1',
          },
        ],
        meta: { hits: 1, offset: 0, time: 50 },
      },
    };

    vi.mocked(articleService.searchArticles).mockResolvedValue(mockResponse);

    const user = userEvent.setup();
    
    await act(async () => {
      render(<App />);
    });

    const searchInput = screen.getByPlaceholderText(/search articles/i);
    const searchButton = screen.getByRole('button', { name: /search/i });

    await act(async () => {
      await user.type(searchInput, 'test query');
      await user.click(searchButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Test Article')).toBeInTheDocument();
      expect(screen.getByText('Test Author')).toBeInTheDocument();
    });
  });

  it('displays error message on search failure', async () => {
    vi.mocked(articleService.searchArticles).mockRejectedValue(new Error('API Error'));

    const user = userEvent.setup();
    
    await act(async () => {
      render(<App />);
    });

    const searchInput = screen.getByPlaceholderText(/search articles/i);
    const searchButton = screen.getByRole('button', { name: /search/i });

    await act(async () => {
      await user.type(searchInput, 'test query');
      await user.click(searchButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/unexpected error occurred/i)).toBeInTheDocument();
    });
  });

  it('shows no results message when search returns empty', async () => {
    const mockResponse = {
      status: 'OK',
      copyright: 'Copyright',
      response: {
        docs: [],
        meta: { hits: 0, offset: 0, time: 50 },
      },
    };

    vi.mocked(articleService.searchArticles).mockResolvedValue(mockResponse);

    const user = userEvent.setup();
    
    await act(async () => {
      render(<App />);
    });

    const searchInput = screen.getByPlaceholderText(/search articles/i);
    const searchButton = screen.getByRole('button', { name: /search/i });

    await act(async () => {
      await user.type(searchInput, 'no results query');
      await user.click(searchButton);
    });

    await waitFor(() => {
      expect(screen.getByText('No articles found')).toBeInTheDocument();
    });
  });
});