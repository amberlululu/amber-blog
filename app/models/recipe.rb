class Recipe < ApplicationRecord
  has_many :user_recipes
  has_many :users, through: :user_recipes

  validates :label, presence: true
  validates :image, presence: true
  validates :url, presence: true
 
end 