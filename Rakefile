require 'rake'
require 'active_record'

include ActiveRecord::Tasks
DatabaseTasks.env = :development
DatabaseTasks.db_dir = 'db'
DatabaseTasks.migrations_paths = 'db'
DatabaseTasks.database_configuration = YAML::load(File.open('./config/database.yml'))

task :environment do
    ActiveRecord::Base.configurations = DatabaseTasks.database_configuration
    ActiveRecord::Base.establish_connection DatabaseTasks.env
end

load 'active_record/railties/databases.rake'
