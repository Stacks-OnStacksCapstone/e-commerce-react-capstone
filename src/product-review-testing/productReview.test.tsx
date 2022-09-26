import React from 'react';
import { render, screen } from '@testing-library/react';
import { ReviewCard } from '../components/reviews/ReviewCard';
import ProductReview from '../models/ProductReview';
import { apiGetAllReviews } from '../remote/e-commerce-api/productReviewService';
import { apiLogin } from '../remote/e-commerce-api/authService';

interface reviewProps {
    review: ProductReview,
    key: number
    refreshReviews: any
}


test('Test successfull database pull and display', async () => {

    // retrieve all reviews
    const user = await apiLogin("rc@mail.com", "12345");
    const reviews = await apiGetAllReviews()
    
    // render the first review
    render(<ReviewCard key={0} review={reviews.payload[0]} refreshReviews={(refresh: boolean) => { }}></ReviewCard>);

    // check if first element was properly rendered
    const linkElement = screen.getByText(reviews.payload[0].comment);
    expect(linkElement).toBeInTheDocument();
});
