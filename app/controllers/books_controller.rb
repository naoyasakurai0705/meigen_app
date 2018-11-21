class BooksController < ApplicationController
  require "./app/modules/book"

  def new
    url = "https://www.googleapis.com/books/v1/volumes"
    query = {title: params["title"], author:params["author"]}
    @book = BooksAPI.fetch(url, query)
    render :json => @book
  end

end
