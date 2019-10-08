const ReviewsService = {

  //get all reviews
  getAllReviews(db){
    return db
      .select(
        'reviews.id',
        'reviews.text',
        'reviews.rating',
        'reviews.date_created',
        'reviews.park_id',
        'reviews.user_id'
      )
      .from('reviews');
  },

  //insert review
  insertReview(db, newReview){
    return db
      .insert(newReview)
      .into('reviews')
      .returning('*')
      .then(([review])=>review);
  }
};

module.exports = ReviewsService;