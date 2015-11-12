class IndexController < ApplicationController
  def welcome
  
  end
  def products
    @products = Product.all
    respond_to do |format|
      format.html
      format.json { render json:  @products }
    end
  end
end
