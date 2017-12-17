(ns chapter-01-01-is-unique.core
  (:require [clojure.string :as str]))

(defn naive-is-unique?
  "True if the supplied string contains no repeating characters."
  [s]
  ; simplistic, but will validate the test suite
  (apply distinct? (str/split s #"")))

; This implementation runs in O(n) time, at the cost of maintaining a Set.
(defn fast-is-unique?
  "True if the supplied string contains no repeating characters."
  [s]
  (loop [cs (seq s)
         known #{}]
    (cond
      (contains? known (first cs)) false
      (empty? cs) true
      :else (recur (rest cs) (conj known (first cs))))))

; This implementation uses no additional data structure, and runs in
; amortized O(2n) time.
(defn compact-is-unique? [s]
  (cond
    (< (count s) 2) true ; 0 and 1-length strings are unique
    :else
    (every? false? (for [i (range (count s))
                         j (range (inc i) (count s))]
                     (= (nth s i) (nth s j))))))
