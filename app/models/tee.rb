class Tee < ActiveRecord::Base
  include Grape::Entity::DSL

  belongs_to :course

  entity :id, :color, :slope, :sss
end
