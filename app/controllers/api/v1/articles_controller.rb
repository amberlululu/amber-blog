class Api::V1::ArticlesController < ApiController
  before_action :authenticate_user, except: [:index, :show]
  before_action :authorize_user, except: [:index, :show, :create]
  
  def index 
    articles = Article.all 
    render json: articles
  end

  def show 
    article = Article.find(params[:id])
    render json: article, serializer: ArticleShowSerializer
  end


  def create
    article = Article.new(article_params)
    article.user = current_user

    if article.save
      render json: article
    else 
      render json: {error: article.errors.messages}
    end       
  end 


  def destroy   
    article = Article.find(params[:id])    
    article.destroy
    render json: articles
  end 


  private

  def article_params
    params.require(:article).permit(:title,:description)
  end 


  def authorize_user
    if !user_signed_in? || !(current_user.role == "admin")
      render json: {error: ["Only admins have access to this feature"]}
    end
  end

  def authenticate_user
    if !user_signed_in?
      render json: {error: ["You need to be signed in first"]}
    end
  end

end
