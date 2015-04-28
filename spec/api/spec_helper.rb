require_relative '../spec_helper'
require 'rack/test'

module Minitest
  class Spec
    include Rack::Test::Methods

    def app
      API
    end

    def json
      @json ||= JSON.parse(last_response.body)
    end
  end
end
