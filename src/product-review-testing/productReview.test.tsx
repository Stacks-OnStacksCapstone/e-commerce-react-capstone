import React from 'react';
import { render, screen } from '@testing-library/react';
import { ReviewCard } from '../components/reviews/ReviewCard';
import ProductReview from '../models/ProductReview';
import { apiGetAllReviews } from '../remote/e-commerce-api/productReviewService';
interface reviewProps {
    review: ProductReview,
    key: number
    refreshReviews: any
}


test('Test successfull database pull and display', async() => {
    const reviews = await apiGetAllReviews()
   console.log (reviews.payload[0]);
  render(<ReviewCard key={0} review={ reviews.payload[0]} refreshReviews= {(refresh: boolean) => {}}></ReviewCard>);

  const linkElement = screen.getByText(/ /i + reviews.payload.comment);
  expect(linkElement).toBeInTheDocument();
});
