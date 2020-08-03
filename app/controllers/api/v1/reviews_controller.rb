class Api::V1::ReviewsController < ApiController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user
  before_action :authorize_user, except: [:create]

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
  
  def destroy
    review = Review.find(params["id"])
    reviews = review.article.reviews
    review.destroy
    render json: reviews
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

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      render json: { error: "Only Admins May Delete Reviews" }
    end
  end

end
