class Score < ActiveRecord::Base
  belongs_to :scorecard
  belongs_to :hole
end
