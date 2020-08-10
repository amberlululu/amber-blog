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
    result = edamam_recipe_search(params[:query])
    
    # take this data structure and clean it up 
    render json: {result: result}
  end


  private

  def edamam_recipe_search(query)

    # if Rails.env.test?
    #   #pass back fake data (only if VCR is not working in codeship) 
    #   result = {
    #     result: {
    #       hits: [
    #         {
    #           recipe: {
    #             label: "Fake Recipe Label",
    #             image: "fakeurlforimage.com",
    #             url: "fakerecipeurl.com"
    #           }
    #         }
    #       ]
    #     }
    #   }
    # else 
      url = "https://api.edamam.com/search?q=#{query}&app_id=#{ENV["APP_ID"]}&app_key=#{ENV["APP_KEY"]}"
      api_response = Faraday.get(url)  
      parsed_response = JSON.parse(api_response.body)
      result = parsed_response
    # end
   
    # makes the request 
    # parses it from json

    #potentially add in error handling to see that either edamam was communicated with correctly, or that VCR correctly served up a fake response

    # clean up the data so that you only have key/value pairs of info that you need (or you could seperate this step into its own method)
    # (OR you could make a plain old ruby class to help you, but hold off on this until your test suite is running on codeship) 
  end

  def recipe_params
    params.require(:recipe).permit(:label, :image, :url)
  end

  def authenticate_user
    if !user_signed_in?
      render json: {error: ["You need to be signed in first"]}
    end
  end
 
end 