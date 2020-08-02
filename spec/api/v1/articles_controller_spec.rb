require 'rails_helper'

RSpec.describe Api::V1::ArticlesController, type: :controller do
  describe "GET#Index" do
    let!(:user1) { FactoryBot.create(:user) }
    let!(:article1) {Article.create(title:"Topic about Glowbal Worming", description:"Collectively, global warming and its effects are known as climate change.", user_id: user1.id)}
    let!(:article2) {Article.create(title:"Covid-19 Pandemic", description:"WHO published an updated and detailed timeline of WHO’s response to the pandemic on our website, so the public can have a look at what happened in the past six months in relation to the response.  It illustrates the range of WHO’s work to stop transmission and save lives. ", user_id: user1.id)}
    it "returns a status of 200" do
      get :index
      
      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
    end

    it "returns all the articles in the database" do
      get :index

      returned_json = JSON.parse(response.body)
     
      expect(returned_json["articles"][0]["title"]).to eq(article1.title)
      expect(returned_json["articles"][0]["description"]).to eq(article1.description)
      expect(returned_json["articles"][0]["article_creater"]).to eq(user1.username)

      expect(returned_json["articles"][1]["title"]).to eq(article2.title)
      expect(returned_json["articles"][1]["description"]).to eq(article2.description)
      expect(returned_json["articles"][1]["article_creater"]).to eq(user1.username)

    end
  end
 
  describe "GET#Show" do
    let!(:user1) { FactoryBot.create(:user) }
    let!(:article1) {Article.create(title:"Topic about Glowbal Worming",description:"Collectively, global warming and its effects are known as climate change.", user_id: user1.id)}
    let!(:review1) {Review.create(rating: 1, body:"Everyone should take care of our environment", article: article1, user: user1)}
    let!(:review2) {Review.create(rating: 1, body:"I do think that climate change is occurring, that it is man-caused.", article: article1, user: user1)}

    it "returns a status of 200" do 
      get :show, params: { id: article1.id }

      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
    end

    it "returns json of /articles/:id" do
      get :show, params: { id: article1.id }
      returned_json = JSON.parse(response.body)  

      expect(returned_json["article"]["title"]).to eq(article1.title) 
      expect(returned_json["article"]["description"]).to eq(article1.description)
      expect(returned_json["article"]["article_creater"]).to eq(user1.username) 

      expect(returned_json["article"]["reviews"][0]["rating"]).to eq(review1.rating)
      expect(returned_json["article"]["reviews"][0]["body"]).to eq(review1.body)
      expect(returned_json["article"]["reviews"][0]["commenter_name"]).to eq(user1.username)
    end
  end 

  describe "POST#Create" do
    let!(:user1) { FactoryBot.create(:user) }
    let!(:article_data) { {article: {title: "Global Business", description: "Global business refers to international trade whereas a global business is a company doing business across the world.", user: user1}} }
    let!(:bad_article_data) { {article: {description:"Love and hate That is our fate Round and round we go Tussling and wrestling with ourselves", user: user1}} }
    
    
    context "when a request with the correct params is made" do
      it "adds a new article to the database" do
       sign_in user1
        previous_count = Article.count

        post :create, params: article_data
        
        new_count = Article.count

        expect(response.status).to eq 200
        expect(response.content_type).to eq "application/json"

        expect(new_count).to eq(previous_count + 1)
      end
  
      it "returns the newley added article as a json object" do     
        sign_in user1
        post :create, params: article_data

        returned_json = JSON.parse(response.body)
       
        expect(returned_json["article"]["title"]).to eq("Global Business")
        expect(returned_json["article"]["description"]).to eq("Global business refers to international trade whereas a global business is a company doing business across the world.")
        expect(returned_json["article"]["article_creater"]).to eq(user1.username)
      end   
    end

    context "when a bad request is made" do

      it "should not add the article to the database" do
        sign_in user1
        previous_count = Article.count
        post :create, params: bad_article_data
        new_count = Article.count
        expect(previous_count).to eq(new_count)
      end

      it "returns an error message" do
        sign_in user1
        post :create, params: bad_article_data
        returned_json = JSON.parse(response.body)
        expect(returned_json["error"]["title"][0]).to eq("can't be blank")
      end
    end
  end 

  # describe "DELETE#destroy" do
  #   let!(:user1) { FactoryBot.create(:user) }
  #   let!(:article1) { {article: {title: "Global Business", description: "Global business refers to international trade whereas a global business is a company doing business across the world.", user: user1}} }

  #   it "should destroy the selected article if admin" do
  #     admin_user = FactoryBot.create(:user, :admin)
  #     sign_in admin_user

  #     previous_count = Article.count

  #     delete :destroy, params: article1
      
  #     new_count = Article.count

  #     expect(response.status).to eq 200
  #     expect(response.content_type).to eq "application/json"

  #     expect(new_count).to eq(previous_count - 1)
  #   end

  #   it "should not destroy if not signed in" do
  #   end
  # end
end