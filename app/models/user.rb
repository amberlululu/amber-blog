class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  #                      uniqueness: { case_sensitive: false },
  #                      length: { minimum: 3, maximum: 25 }
  # VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  # validates :email, presence: true, 
  #                      uniqueness: { case_sensitive: false }, 
  #                      length: { maximum: 105},
  #                      format: { with: VALID_EMAIL_REGEX }
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :username, presence: true
  validates :email, presence: true
  
  has_many :articles

  has_many :user_recipes
  has_many :recipes, through: :user_recipes

  # mount_uploader :profile_photo, ProfilePhotoUploader

  def admin?
    role == "admin"
  end
  
end
