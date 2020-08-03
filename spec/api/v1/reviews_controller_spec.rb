require 'rails_helper'

RSpec.describe Api::V1::ReviewsController, type: :controller do
  describe "POST#create" do
    let!(:user1){FactoryBot.create(:user)}
    let!(:article1) {Article.create(title:"Topic about Glowbal Worming", description:"Collectively, global warming and its effects are known as climate change.", user_id: user1.id)}
    let!(:new_review_hash){{review:{
      rating: 5,
      body: "Your article is very impressive"
    }, article_id: article1.id}}
    let!(:bad_review_hash){{review:{
      body: "Your article is very impressive"
    }, article_id: article1.id}}

    it "creates a new review" do
      sign_in user1
      prev_count = Review.count
      post :create, params: new_review_hash, format: :json
      new_count = Review.count

      expect(new_count).to eq(prev_count + 1)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
    end

    it "returns Json with new review information" do
      sign_in user1
      post :create, params: new_review_hash, format: :json
      returned_json = JSON.parse(response.body)
     
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["review"]["rating"]).to eq 5
      expect(returned_json["review"]["body"]).to eq "Your article is very impressive"
      expect(returned_json["review"]["commenter_name"]).to eq user1.username
    end

    it "if invalid form submission, returns the json" do
      sign_in user1
      post :create, params: bad_review_hash, format: :json
      returned_json = JSON.parse(response.body)
     
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["errors"][0]).to eq "Rating can't be blank"
    end
  end

  describe "DELETE#destroy" do
    let!(:user1){FactoryBot.create(:user)}
    let!(:article1) {Article.create(title:"Topic about Glowbal Worming", description:"Collectively, global warming and its effects are known as climate change.", user_id: user1.id)}
    let!(:review1){Review.create(rating: 4, body:"Your article is very impressive", article: article1, user: user1)}

    it "should destroy the selected review if admin" do
      admin_user = FactoryBot.create(:user, :admin)
      sign_in admin_user
  
      previous_count = article1.reviews.count
      delete :destroy, params: {article_id: article1.id, id: review1.id}
      new_count = article1.reviews.count
      
      expect(new_count).to eq(previous_count - 1)
    end 
  end
end 