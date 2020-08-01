class Api::V1::ReviewsController < ApiController
  before_action :authenticate_user
  skip_before_action :verify_authenticity_token

  def create 
    article = Article.find(params[:article_id])
    new_review = Review.new(review_params)
    new_review.article = article
    user = current_user
    new_review.user = user
    
    
    if new_review.save
      render json: new_review
    else
      render json: {errors: new_review.errors.full_messages}
    end
  end

  private
  def review_params
    params.require(:review).permit(:rating, :body)
  end

  def authenticate_user
    if !user_signed_in?
      render json: {error: ["You need to be signed in first"]}
    end
  end

end
