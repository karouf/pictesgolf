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

  entity :id, :name do
    expose(:tees) { |entity| entity.tees.pluck(:id) }
  end
end

class Tee < ActiveRecord::Base
  belongs_to :course
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
end
