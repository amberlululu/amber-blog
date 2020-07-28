require 'rails_helper'

RSpec.describe Api::V1::ReviewsController, type: :controller do
  describe "GET#Index" do
    let!(:user1) {FactoryBot.create(:user)}
    let!(:user2) {FactoryBot.create(:user)}
    let!(:article1){Article.create(title:"Glowbal Warming",description:"It is a big issue", user: user1)}
    let!(:review1) {Review.create(rating: 5, body:"This is a good article", article: article1, user: user2)}
    let!(:review2) {Review.create(rating: 4, body:"nice article", article: article1, user: user2)}

    it "returns a status of 200" do
      get :index, params: { article_id: article1.id, id: review1.id}

      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
    end

    it "returns all the reviews of the product in the database" do
      get :index, params: {article_id: article1.id, id: review1.id}
      returned_json = JSON.parse(response.body)

      expect(returned_json[0]["rating"]).to eq(review1.rating)
      expect(returned_json[0]["body"]).to eq(review1.body)
      expect(returned_json[0]["username"]["username"]).to eq(review1.user.username)

      expect(returned_json[1]["rating"]).to eq(review2.rating)
      expect(returned_json[1]["body"]).to eq(review2.body)
      expect(returned_json[1]["username"]["username"]).to eq(review2.user.username)
    end
  end
end 