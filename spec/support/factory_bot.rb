require 'factory_bot'

FactoryBot.define do
  factory :user do
    first_name {'first_name'}
    last_name {'last_name'}
    sequence(:username) {|n| "user#{n}@lulu" }
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }

  end

end
