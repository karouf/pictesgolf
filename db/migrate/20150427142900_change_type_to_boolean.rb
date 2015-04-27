class ChangeTypeToBoolean < ActiveRecord::Migration
  def self.up
    add_column :rounds, :competition, :boolean, null: false

    Round.all.each do |round|
      round.competition = round.type == 'competition'
      round.save
    end

    remove_column :rounds, :type
  end

  def self.down
    add_column :rounds, :type, :string, null: false

    Round.all.each do |round|
      if round.competition
        round.type = 'competition'
      else
        round.type = 'amical'
      end
      round.save
    end

    remove_column :rounds, :competition
  end
end

