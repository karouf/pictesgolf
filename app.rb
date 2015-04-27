require 'grape'
require 'grape-entity'
require 'active_record'

dbconfig = YAML::load(File.open('./config/database.yml'))
ActiveRecord::Base.establish_connection(dbconfig[ENV['RACK_ENV']])

class Round < ActiveRecord::Base
end

class Course < ActiveRecord::Base
  include Grape::Entity::DSL

  has_many :tees
  has_many :holes

  entity :id, :name do
    expose(:tees) { |entity| entity.tees.pluck(:id) }
    expose(:holes) { |entity| entity.holes.pluck(:id) }
  end
end

class Hole < ActiveRecord::Base
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

  get :rounds do
    { rounds: Round.all }
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
end
