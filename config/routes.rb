Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  
  get '/articles', to: "homes#index"
  get '/articles/new', to: "homes#authenticated"
  get '/articles/:id', to: "homes#index"
  get '/restaurants/search', to: 'homes#search'
  post '/restaurants/search', to: 'homes#search'
   
  namespace :api do
    namespace :v1 do
      resources :restaurants, only:[:search]
      resources :articles, only: [:index, :show, :create, :destroy] do
        resources :reviews, only:[:create, :destroy]
      end     
    end
  end 
end
