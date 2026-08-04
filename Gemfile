source "https://rubygems.org"

# This gem bundles the exact Jekyll + plugin versions GitHub Pages uses in
# production, so what you see locally matches what gets deployed.
gem "github-pages", group: :jekyll_plugins

group :jekyll_plugins do
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-feed"
end

# Windows/JRuby compatibility. wdm powers file-watching for `jekyll serve`;
# 0.1.1 is from 2014 and will not compile against Ruby 3.x, so 0.2 is the
# floor now.
gem "wdm", "~> 0.2.0", platforms: [:mingw, :x64_mingw, :mswin]
gem "tzinfo-data", platforms: [:mingw, :x64_mingw, :mswin, :jruby]

# Ruby 3.0 dropped webrick from the standard library, and the Jekyll version
# github-pages pins still uses it to serve. Without this, `jekyll serve` dies
# with "cannot load such file -- webrick". GitHub's builder ignores this file,
# so it only affects local preview.
gem "webrick", "~> 1.8"
