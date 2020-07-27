class Article < ApplicationRecord
  validates :title, presence: true, length: { minimum: 6, maximum: 100}
  validates :description, presence: true, length: {minimum: 10, maximum: 300}
  
  belongs_to :user
  has_many :reviews


  def user_name
    user.username
  end

  def created_date
    created_at.strftime("%-m/%-d/%Y")
  end 


end 