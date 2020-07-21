class Api::V1::ArticlesController < ApiController
  # protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Article.all
  end

  # example of show endpoint
  def show
    # binding.pry
    article = Article.find(params[:id])
    render json: article
  end


  def create
    article = Article.new(article_params)

    if article.save
      render json: article
    else 
      render json: {error: article.errors.messages}, status: 422
    end 
      
  end 

  def update
    article = Article.find(params[:id])

    if article.update(article_params)
      render json: article
    else 
      render json: {error: article.errors.messages}, status: 422
    end 

  end 


  def destroy 
    article = Article.find(params[:id])

    if article.destroy
      # redirect_to json: articles
    else 
      render json: {error: article.errors.messages}, status: 422
    end 

  end 


  private

  def article_params
    params.require(:article).permit(:title,:description)
  end 

end
