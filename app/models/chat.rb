class Chat < ApplicationRecord
  has_many :messages, dependent: :destroy
  has-many :users, -> {distinct}, through: :messages

end