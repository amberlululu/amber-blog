require 'rails_helper'

RSpec.describe Api::V1::RecipesController, type: :controller do
  describe "GET#Index" do
    let!(:user1) { FactoryBot.create(:user) }   
    let!(:recipe1) {Recipe.create(label:"Apple & blueberry Bircher", image:"https://www.edamam.com/web-img/340/340bc6ce5f396151a0f58da90d7a3102.jpg", url: "http://www.bbcgoodfood.com/recipes/1755652/apple-and-blueberry-bircher")}
    let!(:recipe2) {Recipe.create(label: "Water Toast", image: "https://www.edamam.com/web-img/3c2/3c222611473e0d79953a24cd91a0c8e2.jpg", url: "http://www.saveur.com/article/Recipes/Water-Toast")}
    let!(:user_recipe1){UserRecipe.create(user: user1, recipe: recipe1)}
    let!(:user_recipe2){UserRecipe.create(user: user1, recipe: recipe2)}
   
    it "returns a status of 200" do     
      sign_in user1
      get :index
    
      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
    end

    it "returns all the recipes in the database" do
      sign_in user1
      get :index
      returned_json = JSON.parse(response.body)
  
      expect(returned_json[0]["label"]).to eq(recipe1.label)
      expect(returned_json[0]["url"]).to eq(recipe1.url)
      expect(returned_json[0]["image"]).to eq(recipe1.image)

      expect(returned_json[1]["label"]).to eq(recipe2.label)
      expect(returned_json[1]["url"]).to eq(recipe2.url)
      expect(returned_json[1]["image"]).to eq(recipe2.image)

    end
  end

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

  describe 'GET#search' do
    let!(:user1) { FactoryBot.create(:user) } 

    it 'makes a request to the external API based on the params' do

      pending("VCR works locally but not on condeship cli")
      VCR.use_cassette('get_recipes') do
        sign_in user1
        get :search, params: {query: 'chicken'}
        parsed_response = JSON.parse(response.body)
        results = parsed_response['result']['hits']
      
        # expect(results[0]["recipe"]).to have_key 'label'
        # expect(results[0]["recipe"]).to have_key 'url'
        # expect(results[0]["recipe"]).to have_key 'image'
        
        expect(results[0]["recipe"]['label']).to eq 'Chicken Vesuvio'
        expect(results[0]["recipe"]['image']).to eq 'https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg'
        expect(results[0]["recipe"]['url']).to eq 'http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html'
      end
    end
  end

end 