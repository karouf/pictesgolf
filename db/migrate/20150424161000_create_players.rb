class CreatePlayers < ActiveRecord::Migration
  def self.up
    create_table :players do |t|
      t.string :name, null: false
      t.integer :index, null: false
    end
  end

  def self.down
    drop_table :players
  end
end
