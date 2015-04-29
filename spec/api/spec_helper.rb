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

class Hash
  def delete_param(param)
    key, sep, left = param.partition(':')
    if left.empty?
      delete(key.to_sym)
    else
      self[key.to_sym].delete_param(left)
    end
    self
  end

  def change_param(param, value)
    key, sep, left = param.partition(':')
    if left.empty?
      delete(key.to_sym)
      self[key.to_sym] = value
    else
      self[key.to_sym].change_param(left, value)
    end
    self
  end
end
