ENV['RACK_ENV'] ||= 'development'

require 'rake'
require 'rake/testtask'
require 'active_record'

seed_loader = Class.new do
  def load_seed
    load "#{DatabaseTasks.db_dir}/seeds.rb"
  end
end

include ActiveRecord::Tasks
DatabaseTasks.env = ENV['RACK_ENV'].to_sym
DatabaseTasks.db_dir = 'db'
DatabaseTasks.migrations_paths = 'db'
DatabaseTasks.seed_loader = seed_loader.new

task :environment do
  require_relative 'app'
end

load 'active_record/railties/databases.rake'

Rake::TestTask.new do |t|
  t.name = 'spec'
  t.description = 'Run all specs'
  t.libs.push 'app'
  t.test_files = FileList['spec/**/*_spec.rb']
  t.verbose = true
end

desc 'List all endpoints'
task :endpoints => :environment do
  puts
  puts "Version\t\tMethod\t\tPath\t\t\t\tDescription"
  puts
  API.routes.sort_by { |i| [i.route_version, i.route_path, i.route_method] }.each do |route|
    print "#{route.route_version}\t\t"
    print "#{route.route_method}\t\t"
    print "#{route.route_path}\t\t\t\t"
    print "#{route.route_description}\n"
  end
  puts
end
