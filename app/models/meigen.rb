class Meigen < ApplicationRecord
require 'RMagick'
  attr_accessor :image
  belongs_to :user
  mount_uploader :image, ImageUploader

  def create_image(sentence,user)
 	  img = Magick::ImageList.new("app/assets/images/sample/sample.jpg")
    img_resize = img.resize_to_fit(600, 314)
    dr = Magick::Draw.new
    dr.annotate(img_resize, 0, 0, 0, 0, sentence) do
      self.fill = 'black'
      self.font = 'ArialUnicode'
      self.pointsize = 20
      self.gravity = Magick::CenterGravity
    end
    img_resize.write("public/images/#{user.id}-#{Time.now.to_s.delete!(' +:-')}.jpg")
  end
end