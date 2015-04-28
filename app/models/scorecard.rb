class Scorecard < ActiveRecord::Base
  include Grape::Entity::DSL

  belongs_to :round
  belongs_to :player
  belongs_to :tee

  entity :id do
    expose(:round) { |entity| entity.round.id }
    expose(:player) { |entity| entity.player.id }
    expose(:tee) { |entity| entity.tee.id }
  end
end
