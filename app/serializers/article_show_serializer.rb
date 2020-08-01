class ArticleShowSerializer < ActiveModel::Serializer
  attributes :id, :title, :description

  has_many :reviews
end
