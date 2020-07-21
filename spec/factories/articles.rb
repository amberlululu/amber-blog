FactoryBot.define do
  factory :article do
    title  { Faker::Book.title }
    description { Faker::Book::Dune.quote}
    user
  end
end