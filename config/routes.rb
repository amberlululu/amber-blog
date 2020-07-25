Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  
  get '/articles', to: "homes#index"
  get '/articles/new', to: "homes#authenticated"
  get '/articles/:id', to: "homes#index"
  
  namespace :api do
    namespace :v1 do
      resources :articles, only: [:index, :show, :create]      
    end
  end 

  # get '*path', to: 'homes#index', via: :all
end
