module Api
	module V1
    class RestapiController < ApplicationController
        respond_to :json
        def index
          render json: {result: "V1"}
        end
        def products
           render json: {result: "ACK" , obj: Product.all}
        end
        def product
          product = Product.where(id: params[:id])
          if product.count == 0
            render json: {result: "NACK"}
          else
            render json: {result: "ACK" , obj: product[0]}
          end
        end
    end
  end
end
