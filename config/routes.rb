Rails.application.routes.draw do
  # devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  # twitter認証に必要
  root 'meigens#index'
  resources :meigens, only: [:index, :new ,:show]
  resources :twitters, only: [:update]
  get '/twitter/tweet', to: 'twitter#tweet'
  get'books/new', to: 'books#new'

end
