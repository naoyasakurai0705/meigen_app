class MeigensController < ApplicationController
  def index
  end

  def new
  	meigen = Meigen.new
  	sentence = params[:sentence]
  	meigen.create_image(sentence , meigen ,current_user)
  	@user = current_user
  end
end