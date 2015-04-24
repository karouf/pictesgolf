require 'grape'

class API < Grape::API
  format :json
  prefix :api

  get :rounds do
    { rounds: [] }
  end
end

frontend = Rack::Builder.app do
  use Rack::Static, 
    :urls => [""], :root => File.expand_path('public'), :index => 'index.html'
  run lambda {|*|}
end

run Rack::Cascade.new([
  API,
  frontend
])
