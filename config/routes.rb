Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  get '/articles', to: "homes#index"
  get '/articles/new', to: "homes#authenticated"
  get '/articles/:id', to: "homes#index"
  get '/weather', to: "homes#index"
  get '/recipes', to: "homes#index"
  get '/users/:id',to: "homes#index"
  get "/chats/:id", to: "homes#index"
  mount ActionCable.server => '/cable'


  namespace :api do
    namespace :v1 do
      resources :messages, only: [:create]
      get "users/current" => "users#current_user"
      resources :users, only: [:show]
      get '/recipes/search' => "recipes#search"
      resources :recipes, only: [:create, :index, :destroy, :search]
      get '/weathers/search' => "weathers#search"
      resources :weathers, only: [:search]
      resources :articles, only: [:index, :show, :create, :destroy] do
        resources :reviews, only:[:create, :destroy]
      end

    end
  end

  resources :users, only: [:index, :destroy]

  devise_scope :user do
    get "users/sign_out" => "devise/sessions#destroy"
  end
end
