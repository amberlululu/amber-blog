class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :body, :created_at, :commenter_name

  def commenter_name
    object.user.username
  end 
end
