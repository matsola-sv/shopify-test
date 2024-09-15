import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders CategoryProductView component', () => {
  render(<App />);

  // We check whether the CategoryProductView component is rendered
  const categoryProductViewElement = screen.getByTestId('category-product-view');

  // We use .toBeInTheDocument() to check whether the element is in the DOM
  expect(categoryProductViewElement).toBeInTheDocument();
});
