Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/articles', to: "homes#index"
  get '/articles/:id', to: "homes#index"


  namespace :api do
    namespace :v1 do
      resources :articles, only: [:index, :show, :create, :update, :destroy]      
    end
  end 

  get '*path', to: 'homes#index', via: :all
end
