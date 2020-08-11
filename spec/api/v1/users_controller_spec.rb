require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  describe "GET#Show" do
    let!(:user1) { FactoryBot.create(:user) }
    
    it "returns a status of 200" do 
      get :show, params: { id: user1.id }

      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
    end

    it "returns json of /users/:id" do
      get :show, params: { id: user1.id }
      returned_json = JSON.parse(response.body)      
      expect(returned_json["first_name"]).to eq(user1.first_name) 
      expect(returned_json["last_name"]).to eq(user1.last_name)
      expect(returned_json["username"]).to eq(user1.username) 
      expect(returned_json["email"]).to eq(user1.email)
    end
  end 
end 