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
    describe 'with valid params' do
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

    describe 'with no params' do
      before do
        post '/rounds'
      end

      it 'responds with HTTP 400' do
        last_response.must_be :bad_request?
      end
    end

    [
      'round',
      'round:date',
      'round:course_id',
      'round:holes_played',
      'round:scoring',
      'round:competition'
    ].each do |missing_param|
      describe "with missing '#{missing_param} param" do
        let(:params) { { round: { date: '2015-04-01', course_id: 1, holes_played: 9, scoring: 'stableford', competition: false } } }

        before do
          FactoryGirl.create(:course)
          params.delete_param(missing_param)
          post '/rounds', params
        end

        it 'responds with HTTP 400' do
          last_response.must_be :bad_request?
        end
      end
    end

    [
      # Prolly due to a bug in Grape
      #['round', 'string'],
      ['round:date', 42],
      ['round:course_id', 'string'],
      ['round:holes_played', 'string'],
      ['round:scoring', 42],
      ['round:competition', 'string']
    ].each do |param, invalid_value|
      describe "with an invalid '#{param}' param" do
        let(:params) { { round: { date: '2015-04-01', course_id: 1, holes_played: 9, scoring: 'stableford', competition: false } } }

        before do
          FactoryGirl.create(:course)
          params.change_param(param, invalid_value)
          post '/rounds', params
        end

        it 'responds with HTTP 400' do
          last_response.must_be :bad_request?
        end
      end
    end
  end
end
