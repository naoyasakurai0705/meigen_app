class MeigensController < ApplicationController
  before_action :authenticate_user!, only: %i[index new]

  def index
  end

  def new
    @meigen = Meigen.new
  	@user = current_user
    @meigen.create_image(params[:sentence],@user)
    @meigen.content = "#{@user.id}-#{Time.now.to_s.delete!(' +:-')}.jpg"
    @meigen.user = @user
    @meigen.book_url = "www.sakurainaoya"
    @meigen.save
    @twitter_card = "#{root_url}meigens/#{@meigen.id}"
  end

  def show
  	@meigen = Meigen.find(params[:id])
  	@user = @meigen.user
  	@twitter_card = "#{root_url}meigens/#{@meigen.id}"
  	render :layout => 'twitter_card'
  end
end