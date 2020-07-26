class Review < ApplicationRecord
  validates :rating, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }
  validates :body, presence: true, length: {minimum: 10, maximum: 300}
  
  belongs_to :user
  belongs_to :article

end 