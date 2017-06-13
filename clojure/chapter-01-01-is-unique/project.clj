(defproject chapter-01-01-is-unique "0.1.0-SNAPSHOT"
  :description "Function to determine whether all characters in a string are unique."
  :dependencies [[org.clojure/clojure "1.8.0"]]
  :plugins [[com.jakemccrary/lein-test-refresh "0.10.0"]]
  :test-refresh {:notify-command ["lein-test-refresh-notify"]
                 :notify-on-success true
                 :quiet true})
