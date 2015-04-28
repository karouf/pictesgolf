require 'grape'
require 'grape-entity'
require 'active_record'
require 'hashie-forbidden_attributes'

dbconfig = YAML::load(File.open('./config/database.yml'))
ActiveRecord::Base.establish_connection(dbconfig[ENV['RACK_ENV']])

class Round < ActiveRecord::Base
  include Grape::Entity::DSL

  belongs_to :course

  entity :id, :date, :holes_played, :scoring, :competition do
    expose(:course) { |entity| entity.course.id }
  end
end

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

class Hole < ActiveRecord::Base
  include Grape::Entity::DSL

  belongs_to :course

  entity :id, :number, :par, :stroke_index do
    expose(:course) { |entity| entity.course.id }
  end
end

class Tee < ActiveRecord::Base
  include Grape::Entity::DSL

  belongs_to :course

  entity :id, :color, :slope, :sss
end

class Player < ActiveRecord::Base
end

class API < Grape::API
  format :json

  resource:rounds do
    get do
      { rounds: Round.all }
    end

    params do
      requires :round, type: Hash do
        requires :date, type: Date
        requires :course_id, type: Integer
        requires :holes_played, type: Integer, values: [9, 18]
        requires :scoring, type: String, values: ['stableford', 'strokeplay']
        requires :competition, type: Boolean
      end
    end
    post do
      error! unless course = Course.find(params[:round][:course_id])

      round = Round.new
      round.date = params[:round][:date]
      round.course = course
      round.holes_played = params[:round][:holes_played]
      round.scoring = params[:round][:scoring]
      round.competition = params[:round][:competition]

      if round.save
        present :rounds, round
      else
        error!
      end
    end
  end

  resource :scorecards do
    params do
      requires :scorecard, type: Hash do
        requires :round_id, type: Integer
        requires :player_id, type: Integer
        requires :tee_id, type: Integer
      end
    end
    post do
      error! unless round = Round.find(params[:scorecard][:round_id])
      error! unless player = Player.find(params[:scorecard][:player_id])
      error! unless tee = Tee.find(params[:scorecard][:tee_id])

      scorecard = Scorecard.new
      scorecard.round = round
      scorecard.player = player
      scorecard.tee = tee

      if scorecard.save
        present :scorecards, scorecard
      else
        error!
      end
    end
  end

  get :courses do
    courses = Course.all
    present :courses, courses
  end

  get :players do
    { players: Player.all }
  end

  resource :tees do
    route_param :id do
      get do
        tee = Tee.find(params[:id])
        present :tees, tee
      end
    end
  end

  resource :holes do
    route_param :id do
      get do
        hole = Hole.find(params[:id])
        present :holes, hole
      end
    end
  end
end
