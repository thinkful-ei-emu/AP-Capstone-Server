const ReviewsService = {

    getAllReviews(db){
        return db
        .select(
          'reviews.id',
          'reviews.text',
          'reviews.rating',
          'reviews.date_created',
          'reviews.park_id'
        )
        .from('reviews')
    },

    insertReview(db, newReview){
      return db
      .insert(newReview)
      .into('reviews')
      .returning('*')
      .then(([review])=>review)
    }
}

module.exports = ReviewsService