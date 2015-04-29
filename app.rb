require 'grape'
require 'grape-entity'
require 'active_record'
require 'hashie-forbidden_attributes'
require 'erb'

require_relative 'app/models'

def dbconfig
  YAML::load(ERB.new(File.read('./config/database.yml')).result)
end
ActiveRecord::Base.establish_connection(dbconfig[ENV['RACK_ENV']])

class API < Grape::API
  format :json

  resource :rounds do
    desc 'Return all rounds'
    get do
      { rounds: Round.all }
    end

    desc 'Create a round'
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
        { rounds: { id: round.id } }
      else
        error!
      end
    end
  end

  resource :scorecards do
    desc 'Create a scorecard'
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

  desc 'Return all courses'
  get :courses do
    courses = Course.all
    present :courses, courses
  end

  desc 'Return all players'
  get :players do
    { players: Player.all }
  end

  resource :tees do
    route_param :id do
      desc 'Return a specific tee'
      get do
        tee = Tee.find(params[:id])
        present :tees, tee
      end
    end
  end

  resource :holes do
    route_param :id do
      desc 'Return a specific hole'
      get do
        hole = Hole.find(params[:id])
        present :holes, hole
      end
    end
  end

  resource :scores do
    desc 'Create a score'
    params do
      requires :score, type: Hash do
        requires :strokes, type: Integer
        requires :received_strokes, type: Integer
        requires :scorecard_id, type: Integer
        requires :hole_id, type: Integer
      end
    end
    post do
      error! "No scorecard with ID #{params[:score][:scorecard_id]}", 400 unless scorecard = Scorecard.find_by(id: params[:score][:scorecard_id])
      error! "No hole with ID #{params[:score][:hole_id]}", 400 unless hole = Hole.find_by(id: params[:score][:hole_id])

      score = Score.new
      score.strokes = params[:score][:strokes]
      score.received_strokes = params[:score][:received_strokes]
      score.scorecard = scorecard
      score.hole = hole

      if score.save
        { scores: { id: score.id } }
      else
        error!
      end
    end
  end
end
