class Meigen < ApplicationRecord
require 'RMagick'
  belongs_to :user
  mount_uploader :image, ImageUploader

  def create_image(sentence, meigen ,user)
 	  img = Magick::ImageList.new("app/assets/images/sample.jpg")
    img_resize = img.resize_to_fit(600, 314)
    dr = Magick::Draw.new
    dr.annotate(img_resize, 0, 0, 0, 0, sentence) do
      self.fill = 'black'
      self.font = 'ArialUnicode'
      self.pointsize = 20
      self.gravity = Magick::CenterGravity
    end
    img_resize.write("app/assets/images/meigen_image/#{user.id}.jpg")
  end
end
