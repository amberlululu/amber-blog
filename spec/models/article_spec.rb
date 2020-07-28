require 'rails_helper'

RSpec.describe Article, type: :model do
  it { should belong_to(:user) }
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:description) }

    it do
      should validate_length_of(:title). 
      is_at_least(6).is_at_most(100)             
    end
  
    it do
      should validate_length_of(:description).
      is_at_least(10).is_at_most(300)
    end
end