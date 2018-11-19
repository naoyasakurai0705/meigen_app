class BooksAPI
  require 'net/http'
  require 'uri'
  require 'json'

  # https://www.googleapis.com/books/v1/volumes?q=inauthor:尾田+intitle:WANTEDq=inauthor:尾田+intitle:WANTED&key=yourAPIKey

#ページネーションのせいで１０個しか取れない！！
  def self.fetch(url, query)
    title = query[:title].present?? "intitle:"+query[:title] + "&" : ""
    author = query[:author].present?? "inauthor:"+query[:author] + "&" : ""
    uri = URI.parse url

    uri.query ="q=#{title}#{author}key=#{ENV['GOOGLE_API_KEY']}"

    https = Net::HTTP.new(uri.host, uri.port)
    https.use_ssl = true
    res = https.start {
      https.get(uri.request_uri)
    }

    if res.code == '200'
      result = JSON.parse(res.body)
      # Railsだったらこう書ける`require 'json'`なしで
      # result = ActiveSupport::JSON.decode res.body
    else
      puts "OMG!! #{res.code} #{res.message}"
    end

    return result
  end
end
