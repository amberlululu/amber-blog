class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :created_at, :updated_at, :article_creater

  def article_creater
    object.user.username
  end 

end
