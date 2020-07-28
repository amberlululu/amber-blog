require 'rails_helper'

RSpec.describe Review, type: :model do
  it { should belong_to(:article) }
  it { should belong_to(:user) }
  it { should validate_presence_of(:rating) }
  it { should validate_presence_of(:body) }

  it do
    should validate_numericality_of(:rating).
      only_integer.
      is_greater_than_or_equal_to(1).
      is_less_than_or_equal_to(5)
  end
 
  it do
    should validate_length_of(:body).
    is_at_least(10).is_at_most(300)
  end
end