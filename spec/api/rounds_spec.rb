require_relative 'spec_helper'

describe API do
  describe "GET /rounds" do
    before do
      get '/rounds'
    end

    it 'responds with HTTP 200' do
      last_response.must_be :ok?
    end

    it 'returns an empty array of rounds' do
      JSON.parse(last_response.body).must_equal({ 'rounds' => [] })
    end
  end
end
