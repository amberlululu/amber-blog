# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).


user1 = User.create(first_name: "Amber", last_name: "Bai", username:"Amber", email: "123@gmail.com", password:"123456")
user2 = User.create(first_name: "Dennis", last_name: "He", username: "Dennis", email: "456@gmail.com", password:"1234567")

article1 = Article.create(title:"Life Is About Experiences", description:"I am a self-proclaimed experience junkie. There is nothing I love more than going somewhere or doing something new. Most people think I am weird, but I am just wired differently. Whether it is traveling to a new country, trying a new experience, or meeting new people, novel experiences are my happy place.

  I’ve moved 12 times since graduating college, traveled to over 40 countries, and tried all kinds of crazy sports. I’ve taken trapeze lessons, went hang gliding in Brazil, fly boarding in Vietnam, skydiving in Dubai, did a kickboxing training camp in Thailand, volunteered with monkeys in South Africa, rescued street dogs in Greece, lived on a catamaran in St. Vincent, flew planes and helicopters, took a boat down the Amazon, and had many other amazing experiences.
  
  Each experience broadened my mind and changed my life. Every year, when I make my annual New Year’s goals, I always include the countries I want to visit that year and the experiences I want to have. A lot of people get very caught up in the things they want, but the memories are what really count, in my opinion.
  
  And, according to an article in Elite Daily, people who spend money on experiences instead of things are happier. I have encountered thousands of people in my travels and work, and there is no doubt the people who “live life” are happier.", user_id: user1.id)

review1 = Review.create(rating:5, body:"I love your article!!! Break your routine. Try something new. Better your life.", user_id: user2.id, article_id: article1.id)
  
  
  
  
  
  
  

