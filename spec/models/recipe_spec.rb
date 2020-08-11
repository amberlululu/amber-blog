require 'rails_helper'

RSpec.describe Recipe, type: :model do
  describe 'associations' do
    it { should have_many(:user_recipes) }
    it { should have_many(:users).through(:user_recipes) }
  end 

  describe 'validations' do
    let!(:user1) { FactoryBot.create(:user) }   
    let!(:recipe1) {Recipe.create(label:"Apple & blueberry Bircher", image:"https://www.edamam.com/web-img/340/340bc6ce5f396151a0f58da90d7a3102.jpg", url: "http://www.bbcgoodfood.com/recipes/1755652/apple-and-blueberry-bircher")}
    let!(:user_recipe1){UserRecipe.create(user: user1, recipe: recipe1)}

    it { should validate_presence_of(:label) }
    it { should validate_presence_of(:image) }
    it { should validate_presence_of(:url) }
  end 
end