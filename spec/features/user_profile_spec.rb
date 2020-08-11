require "rails_helper"

feature "user see a user profile link and is taken to user profile show page" do
  scenario "click Profile link on the nav bar" do
    user = FactoryBot.create(:user)
    visit user_path(user)
    expect(page).to have_content "hello, welcome to Foodie Monster !"
    expect(page).to have_content user.first_name
    expect(page).to have_content user.last_name
    expect(page).to have_content user.username
    expect(page).to have_content user.email
  end 
  
end 
