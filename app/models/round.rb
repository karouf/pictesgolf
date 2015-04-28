class Round < ActiveRecord::Base
  include Grape::Entity::DSL

  belongs_to :course

  enum scoring: [:stableford, :strokeplay]

  entity :id, :date, :holes_played, :scoring, :competition do
    expose(:course) { |entity| entity.course.id }
  end
end
