(ns chapter-01-01-is-unique.core
  (:require [clojure.string :as str]))

(defn naive-is-unique?
  "True if the supplied string contains no repeating characters."
  [s]
  ; simplistic, but will validate the test suite
  (apply distinct? (str/split s #"")))

(defn fast-is-unique? [s]
  (cond
    (< (count s) 2) true ; 0 and 1-length strings are unique
    :else
    (every? false? (for [i (range (count s))
                         j (range (inc i) (count s))]
                     (= (nth s i) (nth s j))))))
