(defproject chapter-01-01-is-unique "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}

  :dependencies [[org.clojure/clojure "1.8.0"]]
  :plugins [[com.jakemccrary/lein-test-refresh "0.10.0"]]
  :test-refresh {:notify-command ["lein-test-refresh-notify"]
                 :notify-on-success true
                 :quiet true})
