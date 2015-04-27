class CreateTees < ActiveRecord::Migration
  def self.up
    create_table :tees do |t|
      t.string :color, null: false
      t.integer :slope, null: false
      t.decimal :sss, null: false, precision: 3, scale: 1
      t.references :course
    end
  end

  def self.down
    drop_table :tees
  end
end
