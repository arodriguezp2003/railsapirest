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
				def add
					sku = params[:sku]
					description = params[:description]
					price = params[:price]

					product = Product.where(sku: sku)

					if product.count > 0
						render json: {result: "NACK", message: "El Producto ya esta ingresado"}
					else
						product = Product.create(sku: sku, description: description, price: price)
						if product.save
							render json: {result: "ACK", obj: product}
						else
							render json: {result: "NACK", message: "Ocurrio un error, vuelva a intentar"}
						end
					end

				end
    end
  end
end
