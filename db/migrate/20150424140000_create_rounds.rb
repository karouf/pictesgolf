class CreateRounds < ActiveRecord::Migration
  def self.up
    create_table :rounds do |t|
      t.date :date, null: false
      t.integer :holes_played, null: false, default: 18
      t.integer :scoring, null: false
      t.integer :type, null: false
    end
  end

  def self.down
    drop_table :rounds
  end
end
