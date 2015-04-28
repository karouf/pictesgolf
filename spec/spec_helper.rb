ENV['RACK_ENV'] = 'test'

require 'minitest/autorun'
require 'factory_girl'

require_relative '../app'

FactoryGirl.find_definitions

module PictesGolf
  module Spec
    module DatabaseLoader
      extend Minitest::Spec::DSL

      before do
        load_schema_from_file = lambda { load "db/schema.rb" }
        silence_stream(STDOUT, &load_schema_from_file)
      end
    end
  end
end

module MiniTest
  class Spec
    include PictesGolf::Spec::DatabaseLoader
  end
end

