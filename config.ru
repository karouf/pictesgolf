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
  run lambda { |env|
    [
      200,
      {
        'Content-Type'  => 'text/html',
        'Cache-Control' => 'public, max-age=86400'
      },
      File.open('public/index.html', File::RDONLY)
    ]
  }
end

app = Rack::Builder.new do
  map '/api' do
    run api
  end
  map '/' do
    run frontend
  end
end
run app
