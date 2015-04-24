require 'grape'
require 'active_record'

dbconfig = YAML::load(File.open('./config/database.yml'))
ActiveRecord::Base.establish_connection(dbconfig[ENV['RACK_ENV']])

class Round < ActiveRecord::Base
end

class API < Grape::API
  format :json
  prefix :api

  get :rounds do
    { rounds: Round.all }
  end
end

api = Rack::Builder.app do
  use ActiveRecord::ConnectionAdapters::ConnectionManagement
  run API
end

frontend = Rack::Builder.app do
  use Rack::Static, 
    :urls => [""], :root => File.expand_path('public'), :index => 'index.html'
  run lambda {|*|}
end

run Rack::Cascade.new([
  api,
  frontend
])
