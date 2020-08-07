require 'faraday'

class Api::V1::WeathersController < ApiController
  protect_from_forgery unless: -> { request.format.json? }

  def search      
    query = params[:query]
    url = "https://api.openweathermap.org/data/2.5/weather?q=#{query}&units=metric&appid=#{ENV["WEATHER_API_KEY"]}"
    api_response = Faraday.get(url)  
    parsed_response = JSON.parse(api_response.body)
    result = parsed_response
    render json: {result: result}
  end
end 