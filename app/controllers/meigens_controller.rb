class MeigensController < ApplicationController
  def index; end

  def new
    @meigen = Meigen.new
  	@user = current_user
    @meigen.create_image(params[:sentence],@user)
    @meigen.content = "#{@user.id}-#{Time.now.to_s.delete!(' +:-')}.jpg"
    @meigen.user = @user
    @meigen.book_url = "www.sakurainaoya"
    @meigen.save
  end
end