class Course < ActiveRecord::Base
  include Grape::Entity::DSL

  has_many :rounds
  has_many :tees
  has_many :holes

  entity :id, :name do
    expose(:tees) { |entity| entity.tees.pluck(:id) }
    expose(:holes) { |entity| entity.holes.pluck(:id) }
  end
end
