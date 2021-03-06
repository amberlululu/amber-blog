require 'faraday'

class Api::V1::RecipesController < ApiController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user
 
  def index
    user = current_user
    recipes = user.recipes
    render json: recipes

  end 

  def create   
    user = current_user
    recipe = Recipe.new(recipe_params)
    
    if recipe.save
      user.recipes << recipe
      render json: recipe
    else 
      render json: recipe.errors
    end 
  end 


  def destroy
 
    user = current_user
    recipe = Recipe.find(params[:id])    
    recipe.destroy
    recipes = user.recipes
    render json: recipes
  end   

  def search 
         
    query = params[:query]
    url = "https://api.edamam.com/search?q=#{query}&app_id=#{ENV["APP_ID"]}&app_key=#{ENV["APP_KEY"]}"
    api_response = Faraday.get(url)  
    parsed_response = JSON.parse(api_response.body)
    result = parsed_response
    render json: {result: result}
  end


  private

  def recipe_params
    params.require(:recipe).permit(:label, :image, :url)
  end

  def authenticate_user
    if !user_signed_in?
      render json: {error: ["You need to be signed in first"]}
    end
  end
 
end 