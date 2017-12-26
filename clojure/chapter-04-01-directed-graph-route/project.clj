(defproject chapter-04-01-directed-graph-route "0.1.0-SNAPSHOT"
  :description "Function to determine whether two directed graph nodes are connected."
  :dependencies [[org.clojure/clojure "1.8.0"]]
  :plugins [[com.jakemccrary/lein-test-refresh "0.10.0"]]
  :test-refresh {:notify-command ["lein-test-refresh-notify"]
                 :notify-on-success true
                 :quiet true})
