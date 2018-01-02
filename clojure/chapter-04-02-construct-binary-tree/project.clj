(defproject chapter-04-02-construct-binary-tree "0.1.0-SNAPSHOT"
  :description "Function to construct a balanced binary tree from an ordered sequence of integers."
  :dependencies [[org.clojure/clojure "1.8.0"]]
  :plugins [[com.jakemccrary/lein-test-refresh "0.10.0"]]
  :test-refresh {:notify-command ["lein-test-refresh-notify"]
                 :notify-on-success true
                 :quiet true})
