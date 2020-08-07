class CreateRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :recipes do |t|
      t.string :label, null: false
      t.string :image, null: false
      t.string :url, null: false
      
      t.timestamps
    end
  end
end
