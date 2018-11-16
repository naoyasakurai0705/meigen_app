class RenameImageColumnToMeigenss < ActiveRecord::Migration[5.2]
  def change
    rename_column :meigens, :image, :content
    rename_column :meigens, :save_image, :save_content
  end
end
