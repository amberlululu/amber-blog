# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).


user1 = User.create(first_name: "Amber", last_name: "Bai", username:"Amber", email: "123@gmail.com", password:"123456", role: "admin")
user2 = User.create(first_name: "Dennis", last_name: "He", username: "Dennis", email: "456@gmail.com", password:"1234567")


article1 = Article.create(title:"Healthy Diet", description:"Eating a healthy diet is not about strict limitations, staying unrealistically thin, or depriving yourself of the foods you love. Rather, it’s about feeling great, having more energy, improving your health, and boosting your mood.

  Healthy eating doesn’t have to be overly complicated. If you feel overwhelmed by all the conflicting nutrition and diet advice out there, you’re not alone. It seems that for every expert who tells you a certain food is good for you, you’ll find another saying exactly the opposite. The truth is that while some specific foods or nutrients have been shown to have a beneficial effect on mood, it’s your overall dietary pattern that is most important. The cornerstone of a healthy diet should be to replace processed food with real food whenever possible. Eating food that is as close as possible to the way nature made it can make a huge difference to the way you think, look, and feel.
  
  By using these simple tips, you can cut through the confusion and learn how to create—and stick to—a tasty, varied, and nutritious diet that is as good for your mind as it is for your body. The Harvard Healthy Eating Pyramid represents the latest nutritional science. The widest part at the bottom is for things that are most important. The foods at the narrow top are those that should be eaten sparingly, if at all. Switching to a healthy diet doesn’t have to be an all or nothing proposition. You don’t have to be perfect, you don’t have to completely eliminate foods you enjoy, and you don’t have to change everything all at once—that usually only leads to cheating or giving up on your new eating plan.

  A better approach is to make a few small changes at a time. Keeping your goals modest can help you achieve more in the long term without feeling deprived or overwhelmed by a major diet overhaul. Think of planning a healthy diet as a number of small, manageable steps—like adding a salad to your diet once a day. As your small changes become habit, you can continue to add more healthy choices. Fruit and vegetables are low in calories and nutrient dense, which means they are packed with vitamins, minerals, antioxidants, and fiber. Focus on eating the recommended daily amount of at least five servings of fruit and vegetables and it will naturally fill you up and help you cut back on unhealthy foods. A serving is half a cup of raw fruit or veg or a small apple or banana, for example. Most of us need to double the amount we currently eat.", image:"https://images-na.ssl-images-amazon.com/images/I/81qFWdf1%2BPL._AC_SL1500_.jpg", user_id: user1.id)

review1 = Review.create(rating:5, body:"I love your article!!! Eat healthy. Better your life.", user_id: user2.id, article_id: article1.id)

  

  
  
  
  

  
