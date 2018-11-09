class CreateMeigens < ActiveRecord::Migration[5.2]
  def change
    create_table :meigens do |t|
      t.references :user,           null: false, foreign_key: true
      t.string :image,              null: false
      t.string :book_url,           null: false
      t.timestamps null: false
    end
  end
end
