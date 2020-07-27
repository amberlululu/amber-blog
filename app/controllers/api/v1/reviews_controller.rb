class Api::V1::ReviewsController < ApiController
  before_action :authenticate_user, except: [:index]

  def index
    article = Article.find(params[:article_id])
    reviews = article.reviews
    render json: reviews
  end

  def create 
    article = Article.find(params[:article_id])
    user = current_user
    new_review = Review.new(review_params)
    new_review.article = article
    new_review.user = user
    reviews  = article.reviews
    
    if new_review.save
      render json: reviews
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
