
class Api::V1::UsersController < ApiController
  protect_from_forgery unless: -> { request.format.json? }

  def show  
    # binding.pry
    render json: { user_id: current_user.id, username: current_user.username}
  end

end 

