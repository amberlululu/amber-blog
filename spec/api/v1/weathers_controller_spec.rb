# require 'rails_helper'

# RSpec.describe Api::V1::WeathersController, type: :controller do

#   describe 'GET#search' do
#     let!(:user1) { FactoryBot.create(:user) } 

#     it 'makes a request to the external API based on the params' do
#       VCR.use_cassette('get_weather') do
#         sign_in user1
#         get :search, params: {query: 'boston'}
#         parsed_response = JSON.parse(response.body)
        
#         result = parsed_response['result']
      
#         expect(result["weather"][0]).to have_key 'main'
#         expect(result["main"]).to have_key 'temp'
#         expect(result["sys"]).to have_key 'country'
#         expect(result["name"]).to eq 'Boston'
#       end
#     end
#   end
# end 