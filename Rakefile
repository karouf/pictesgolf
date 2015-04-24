ENV['RACK_ENV'] ||= 'development'

require 'rake'
require 'active_record'
require_relative 'app'

seed_loader = Class.new do
  def load_seed
    load "#{DatabaseTasks.db_dir}/seeds.rb"
  end
end

include ActiveRecord::Tasks
DatabaseTasks.env = :development
DatabaseTasks.db_dir = 'db'
DatabaseTasks.migrations_paths = 'db'
DatabaseTasks.database_configuration = YAML::load(File.open('./config/database.yml'))
DatabaseTasks.seed_loader = seed_loader.new

task :environment do
  ActiveRecord::Base.configurations = DatabaseTasks.database_configuration
  ActiveRecord::Base.establish_connection DatabaseTasks.env
end

load 'active_record/railties/databases.rake'
