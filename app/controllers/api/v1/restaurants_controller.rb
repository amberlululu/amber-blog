class Api::V1::RestaurantsController < ApiController

  def search
    @restaurants = Restaurant.where("name ILIKE ? OR description ILIKE ?", "%#{params['search_string']}%", "%#{params['search_string']}%")
    render json: @restaurants
  end
end 