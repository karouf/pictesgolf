class CreateHoles < ActiveRecord::Migration
  def self.up
    create_table :holes do |t|
      t.integer :number, null: false
      t.integer :par, null: false
      t.integer :stroke_index, null: false
      t.references :course
    end
  end

  def self.down
    drop_table :holes
  end
end
