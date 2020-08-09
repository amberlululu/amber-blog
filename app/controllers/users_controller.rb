class UsersController < ApiController

  def index 
    @user = User.all    
  end 
end 