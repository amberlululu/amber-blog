class UsersController < ApiController

  def index 
    @user = User.all    
  end 

  def show  
    @user = User.find(params[:id])
    render :show
  end

end 