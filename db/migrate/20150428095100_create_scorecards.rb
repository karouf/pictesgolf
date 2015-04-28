class CreateScorecards < ActiveRecord::Migration
  def self.up
    create_table :scorecards do |t|
      t.references :round
      t.references :player
      t.references :tee
    end
  end

  def self.down
    drop_table :scorecards
  end
end
