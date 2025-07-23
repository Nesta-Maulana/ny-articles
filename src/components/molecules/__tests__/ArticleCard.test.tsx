import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ArticleCard } from '../ArticleCard';
import type { NYTArticle } from '../../../types';

const mockArticle: NYTArticle = {
  _id: '1',
  web_url: 'https://www.nytimes.com/article',
  snippet: 'This is a test article snippet that is quite long and should be truncated',
  abstract: 'Test abstract',
  source: 'The New York Times',
  multimedia: {
    thumbnail: {
      url: 'https://example.com/image.jpg',
      height: 100,
      width: 100,
    },
    caption: null,
    credit: null,
  },
  headline: {
    main: 'Test Article Headline',
  },
  keywords: [],
  pub_date: '2024-01-15T10:00:00Z',
  document_type: 'article',
  news_desk: 'National',
  section_name: 'Technology',
  byline: {
    original: 'By John Doe and Jane Smith',
  },
  type_of_material: 'News',
  word_count: 1000,
  uri: 'nyt://article/1',
};

describe('ArticleCard', () => {
  it('renders article information correctly', () => {
    render(<ArticleCard article={mockArticle} />);
    
    expect(screen.getByText('Test Article Headline')).toBeInTheDocument();
    expect(screen.getByText('John Doe and Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
  });

  it('renders thumbnail image when available', () => {
    render(<ArticleCard article={mockArticle} />);
    
    const image = screen.getByAltText('Test Article Headline');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('opens article in new tab when Read More is clicked', async () => {
    const user = userEvent.setup();
    const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    
    render(<ArticleCard article={mockArticle} />);
    
    const readMoreButton = screen.getByRole('button', { name: /read more/i });
    await user.click(readMoreButton);
    
    expect(windowOpenSpy).toHaveBeenCalledWith(
      'https://www.nytimes.com/article',
      '_blank',
      'noopener,noreferrer'
    );
    
    windowOpenSpy.mockRestore();
  });

  it('handles articles without images', () => {
    const articleWithoutImage = { ...mockArticle, multimedia: undefined };
    render(<ArticleCard article={articleWithoutImage} />);
    
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('handles articles without byline', () => {
    const articleWithoutByline = { ...mockArticle, byline: { original: '' } };
    render(<ArticleCard article={articleWithoutByline} />);
    
    expect(screen.getByText('Unknown Author')).toBeInTheDocument();
  });

  it('truncates long snippets', () => {
    const longSnippet = 'A'.repeat(200);
    const articleWithLongSnippet = { ...mockArticle, snippet: longSnippet };
    
    render(<ArticleCard article={articleWithLongSnippet} />);
    
    const snippetElement = screen.getByText(/A+\.\.\.$/);
    expect(snippetElement.textContent?.length).toBeLessThan(200);
  });
});