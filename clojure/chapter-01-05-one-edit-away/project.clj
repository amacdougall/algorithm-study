(defproject chapter-01-05-one-edit-away "0.1.0-SNAPSHOT"
  :description "Function to determine whether two strings are within one edit of one another."
  :dependencies [[org.clojure/clojure "1.8.0"]]
  :plugins [[com.jakemccrary/lein-test-refresh "0.10.0"]]
  :test-refresh {:notify-command ["lein-test-refresh-notify"]
                 :notify-on-success true
                 :quiet true})
