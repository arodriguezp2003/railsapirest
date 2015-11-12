class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :sku
      t.string :description

      t.timestamps null: false
    end
  end
end
