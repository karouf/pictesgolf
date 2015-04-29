class CreateScores < ActiveRecord::Migration
  def self.up
    create_table :scores do |t|
      t.integer :strokes, null: false
      t.integer :received_strokes, null: false
      t.references :scorecard, null: false
      t.references :hole, null: false
    end
  end

  def self.down
    drop_table :scores
  end
end

