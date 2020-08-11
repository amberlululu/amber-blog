require 'rails_helper'

RSpec.describe User, type: :model do
  
  describe 'associations' do
    it { should have_many(:articles) }
    it { should have_many(:recipes).through(:user_recipes) }
    it { should have_many(:user_recipes) }
  end
 
  describe 'validations' do
    let!(:user1) { FactoryBot.create(:user) }
    it { should validate_presence_of(:first_name) }
    it { should validate_presence_of(:last_name) }
    it { should validate_presence_of(:username) }
    it { should validate_presence_of(:email) }
  end 

  describe "#admin?" do
  it "is not an admin if the role is not admin" do
    user = FactoryBot.create(:user, role: "member")
    expect(user.admin?).to eq(false)
  end

  it "is an admin if the role is admin" do
    user = FactoryBot.create(:user, role: "admin")
    expect(user.admin?).to eq(true)
  end
end
end
