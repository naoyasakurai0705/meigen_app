class AddSaveimageColumnToMeigens < ActiveRecord::Migration[5.2]
  def change
    add_column :meigens, :save_image, :boolean, default: false, null: false , :after => :user_id
  end
end
