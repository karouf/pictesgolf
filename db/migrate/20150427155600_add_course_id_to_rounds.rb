class AddCourseIdToRounds < ActiveRecord::Migration
  def self.up
    add_column :rounds, :course_id, :integer, null: false
  end

  def self.down
    remove_column :rounds, :course_id
  end
end

