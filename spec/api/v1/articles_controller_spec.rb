# require 'rails_helper'

# RSpec.describe Api::V1::ArticlesController, type:
# :controller do
#   describe "GET#Index" do
#     let(:article1) {FactoryBot.create(:article)}
#     let(:article2) {FactoryBot.create(:article)}

#     it "returns a status of 200" do
#       get :Index
#       binding.pry
#       expect(response.status).to eq 200
#       expect(response.content.type).to eq "application/json"
#     end

#     it "returns all the articles in the database" do
#       get :Index
#       return_json = JSON.parse(response.body)

#       expect(returned_json[0]["title"]).to eq(article1.title)
#       expect(returned_json[0]["description"]).to eq(article1.description)
#       expect(returned_json[0]["user_id"]).to eq(article1.user_id)

#       expect(returned_json[1]["title"]).to eq(article2.title)
#       expect(returned_json[1]["description"]).to eq(article2.description)
#       expect(returned_json[1]["user_id"]).to eq(article2.user_id)

#     end
#   end

#   describe "POST#create" do
#     let!(:article_data) {{ article: {name: "New Business is coming", description:"Nowadays, 5G is changing the world quickly", user_id: 1}} }
#     let!(:bad_camper_data) { {camper: {user_id: 1, description: "This is a good article"}} }
#     context "When a request with the correct params is made" do

#       it "adds a new article to the database" do
#         previous_count = Article.count

#         post :create, params: article_data

#         new_count = Article.count

#         expect(response.status).to eq 200
#         expect(response.content_type).to eq "application/json"

#         expect(new_count).to eq(previous_count + 1)
        
#       end

#       it "returns the newly added article as a json object" do
#         post :create, params: article_data
  
#         returned_json = JSON.parse(response.body)
  
#         expect(returned_json)["title"].to eq("New Business is comin")
#         expect(returned_json)["description"].to eq("Nowadays, 5G is changing the world quickly")
#         expect(returned_json)["user_id"].to eq(1)
#       end
      
#     end

#     context " when a bad request is made " do
#       it "should not add the article to the database" do
#         previous_count = Article.count
  
#         post :create, params: bad_article_data

#         new_count = Article.count
  
#         expect(previous_count).to eq(new_count)
#       end
  
#       it "returns an error message" do
#         post :create, params: bad_article_data
  
#         returned_json = JSON.parse(response.body)
  
#         expect(returned_json["errors"][0]).to eq("title can't be blank")
#       end
#     end   
#   end 
# end

