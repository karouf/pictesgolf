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
      json['rounds'].must_equal []
    end
  end

  describe "POST /rounds" do
    before do
      FactoryGirl.create(:course)
      post '/rounds', round: { date: '2015-04-01', course_id: 1, holes_played: 9, scoring: 'stableford', competition: false }
    end

    it 'responds with HTTP 201' do
      last_response.must_be :created?
    end

    it 'returns the id of the created round' do
      json['rounds']['id'].must_equal 1
    end
  end
end
