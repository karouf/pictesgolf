require_relative 'app'

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
