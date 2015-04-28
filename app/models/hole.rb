class Hole < ActiveRecord::Base
  include Grape::Entity::DSL

  belongs_to :course

  entity :id, :number, :par, :stroke_index do
    expose(:course) { |entity| entity.course.id }
  end
end
