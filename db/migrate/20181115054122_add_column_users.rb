class AddColumnUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :nickname, :string ,null: false, :after => :name
  end
end
