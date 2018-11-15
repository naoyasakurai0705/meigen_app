class TwitterController < ApplicationController
  before_action :set_twitter_client

  def tweet
    @twitter.update("テスト1\nテストしています。(後で消します)")
    redirect_to root_path
  end

  private

  def set_twitter_client
    @twitter = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV["TWITTER_API_KEY"]
      config.consumer_secret     = ENV["TWITTER_API_SECRET"]
      config.access_token        = session[:oauth_token]
      config.access_token_secret = session[:oauth_token_secret]
    end
  end
end
