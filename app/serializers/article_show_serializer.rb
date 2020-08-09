class ArticleShowSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :image, :article_creater, :admin_user

  def article_creater
    object.user.username
  end 

  def admin_user
    if current_user
      return current_user.admin?
    else
      return false
    end
  end

  has_many :reviews
end
