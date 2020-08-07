require 'rails_helper'

RSpec.describe Api::V1::RecipesController, type: :controller do
  # describe "GET#Index" do
  #   let!(:user1) { FactoryBot.create(:user) }   
  #   # let!(:recipe1) {{recipe:{label:"Apple & blueberry Bircher", image:"https://www.edamam.com/web-img/340/340bc6ce5f396151a0f58da90d7a3102.jpg", url: "http://www.bbcgoodfood.com/recipes/1755652/apple-and-blueberry-bircher"},user_id: user1.id}}
  #   let!(:recipe1) {Recipe.create(label: "Water Toast", image: "https://www.edamam.com/web-img/3c2/3c222611473e0d79953a24cd91a0c8e2.jpg", url: "http://www.saveur.com/article/Recipes/Water-Toast")}
   
  #   it "returns a status of 200" do     
  #     sign_in user1
  #     get :index
    
  #     expect(response.status).to eq 200
  #     expect(response.content_type).to eq "application/json"
  #   end

  #   it "returns all the recipes in the database" do
  #     sign_in user1
  #     get :index
  #     returned_json = JSON.parse(response.body)
  #    binding.pry
  #     expect(returned_json[""][0]["label"]).to eq()
  #     expect(returned_json[""][0]["url"]).to eq()
  #     expect(returned_json[""][0]["image"]).to eq()

  #     expect(returned_json[""][1][""]).to eq()
  #     expect(returned_json[""][1][""]).to eq()
  #     expect(returned_json[""][1][""]).to eq()

  #   end
  # end

  describe "POST#Create" do
    let!(:user1) { FactoryBot.create(:user) }
    let!(:recipe_data) { {recipe: {label: "Apple & blueberry Bircher", image:"https://www.edamam.com/web-img/340/340bc6ce5f396151a0f58da90d7a3102.jpg", url: "http://www.bbcgoodfood.com/recipes/1755652/apple-and-blueberry-bircher" }} }
       
    context "when a request with the correct params is made" do
      it "adds a new recipe to the database" do
       sign_in user1

        previous_count = Recipe.count
        post :create, params: recipe_data     
        new_count = Recipe.count

        expect(response.status).to eq 200
        expect(response.content_type).to eq "application/json"
        expect(new_count).to eq(previous_count + 1)
      end
  
      it "returns the newley added recipe as a json object" do     
        sign_in user1
        post :create, params: recipe_data

        returned_json = JSON.parse(response.body)
       
        expect(returned_json["label"]).to eq("Apple & blueberry Bircher")
        expect(returned_json["image"]).to eq("https://www.edamam.com/web-img/340/340bc6ce5f396151a0f58da90d7a3102.jpg")
        expect(returned_json["url"]).to eq("http://www.bbcgoodfood.com/recipes/1755652/apple-and-blueberry-bircher")
      end   
    end
  end 

  describe "DELETE#destroy" do
    let!(:user1) { FactoryBot.create(:user) }
    let!(:recipe1) {Recipe.create(label:"Cider Vinaigrette", image:"https://www.edamam.com/web-img/7d1/7d1b0bd8c82a4a818942befcde4166a4.jpg", url:"http://www.lottieanddoof.com/2008/12/arugula-salad-with-cider-vinaigrette/")}
   
    it "should destroy the selected recipe if sign in" do     
      sign_in user1

      previous_count = Recipe.count
      delete :destroy, params: {id: recipe1.id }     
      new_count = Article.count

      expect(response.content_type).to eq "application/json"
      expect(new_count).to eq(previous_count - 1)
    end
  end

end 