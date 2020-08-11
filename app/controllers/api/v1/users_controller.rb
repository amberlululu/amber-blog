<<<<<<< HEAD
class Api::V1::UsersController < ApplicationController

  def show
    # binding.pry
    render json: { user_id: current_user.id, handle: current_user.handle, icon_num: current_user.icon_num }
  end

end
=======
class Api::V1::UsersController < ApiController
  protect_from_forgery unless: -> { request.format.json? }

  def show  
    user = User.find(params[:id])
    render json: user
  end

end 
>>>>>>> 1e0a5aa7d40844f6111250076cebf3af4d3820fa
