#gem install --user-install bundler
cd ios
bundle config set --local path vendor/bundle
bundle install
bundle exec pod install