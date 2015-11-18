class Product < ActiveRecord::Base
   after_create {|product| product.message 'create' }

   def message action
      msg = { resource: 'products',
              action: action,
              id: self.id,
              obj: self }

      $redis.publish 'rt-change', msg.to_json
    end

end
