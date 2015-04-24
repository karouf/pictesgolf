require 'grape'
require 'active_record'

dbconfig = YAML::load(File.open('./config/database.yml'))
ActiveRecord::Base.establish_connection(dbconfig[ENV['RACK_ENV']])

class Round < ActiveRecord::Base
end

class Course < ActiveRecord::Base
end

class API < Grape::API
  format :json

  get :rounds do
    { rounds: Round.all }
  end

  get :courses do
    { courses: Course.all }
  end
end
