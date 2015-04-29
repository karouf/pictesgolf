require_relative 'spec_helper'

describe API do
  describe "POST /scores" do
    describe 'with valid params' do
      before do
        FactoryGirl.create(:scorecard)
        FactoryGirl.create(:hole)
        post '/scores', score: {strokes: 4, received_strokes: 3, scorecard_id: 1, hole_id: 1}
      end

      it 'responds with HTTP 201' do
        last_response.must_be :created?
      end

      it 'returns the id of the created score' do
        json['scores']['id'].must_equal 1
      end
    end

    describe 'with no params' do
      before do
        post '/scores'
      end

      it 'responds with HTTP 400' do
        last_response.must_be :bad_request?
      end
    end

    describe 'with a non-existent scorecard' do
        let(:params) { { score: { strokes: 4, received_strokes: 3, scorecard_id: 1, hole_id: 1 } } }

      before do
        FactoryGirl.create(:hole)
        post '/scores', params
      end

      it 'responds with HTTP 400' do
        last_response.must_be :bad_request?
      end

      it 'reports that the given scorecard id does not exist' do
        json['error'].must_equal 'No scorecard with ID 1'
      end
    end

    describe 'with a non-existent hole' do
        let(:params) { { score: { strokes: 4, received_strokes: 3, scorecard_id: 1, hole_id: 1 } } }

      before do
        FactoryGirl.create(:scorecard)
        post '/scores', params
      end

      it 'responds with HTTP 400' do
        last_response.must_be :bad_request?
      end

      it 'reports that the given hole id does not exist' do
        json['error'].must_equal 'No hole with ID 1'
      end
    end

    [
      'score',
      'score:strokes',
      'score:received_strokes',
      'score:scorecard_id',
      'score:hole_id',
    ].each do |missing_param|
      describe "with missing '#{missing_param}' param" do
        let(:params) { { score: { strokes: 4, received_strokes: 3, scorecard_id: 1, hole_id: 1 } } }

        before do
          FactoryGirl.create(:scorecard)
          FactoryGirl.create(:hole)
          params.delete_param(missing_param)
          post '/scores', params
        end

        it 'responds with HTTP 400' do
          last_response.must_be :bad_request?
        end
      end
    end

    [
      ['score', 'string'],
      ['score:strokes', 'string'],
      ['score:received_strokes', 'string'],
      ['score:scorecard_id', 'string'],
      ['score:hole_id', 'string']
    ].each do |param, invalid_value|
      describe "with an invalid '#{param}' param" do
        let(:params) { { score: { strokes: 4, received_strokes: 3, scorecard_id: 1, hole_id: 1 } } }

        before do
          params.change_param(param, invalid_value)
          post '/scores', params
        end

        it 'responds with HTTP 400' do
          last_response.must_be :bad_request?
        end
      end
    end
  end
end
