# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).


user1 = User.create(first_name: "Amber", last_name: "Bai", username:"Amber", email: "123@gmail.com", password:"123456")
user2 = User.create(first_name: "Dennis", last_name: "He", username: "Dennis", email: "456@gmail.com", password:"1234567")

article1 = Article.create(title:"Healthy Eating", description:"Eating a healthy diet is not about strict limitations, staying unrealistically thin, or depriving yourself of the foods you love. Rather, it’s about feeling great, having more energy, improving your health, and boosting your mood.

  Healthy eating doesn’t have to be overly complicated. If you feel overwhelmed by all the conflicting nutrition and diet advice out there, you’re not alone. It seems that for every expert who tells you a certain food is good for you, you’ll find another saying exactly the opposite. The truth is that while some specific foods or nutrients have been shown to have a beneficial effect on mood, it’s your overall dietary pattern that is most important. The cornerstone of a healthy diet should be to replace processed food with real food whenever possible. Eating food that is as close as possible to the way nature made it can make a huge difference to the way you think, look, and feel.
  
  By using these simple tips, you can cut through the confusion and learn how to create—and stick to—a tasty, varied, and nutritious diet that is as good for your mind as it is for your body. The Harvard Healthy Eating Pyramid represents the latest nutritional science. The widest part at the bottom is for things that are most important. The foods at the narrow top are those that should be eaten sparingly, if at all.", user_id: user1.id)

review1 = Review.create(rating:5, body:"I love your article!!! Eat healty. Better your life.", user_id: user2.id, article_id: article1.id)
  

  
  
  
  

