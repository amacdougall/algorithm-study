(ns chapter-01-02-is-permutation.core
  (:require [clojure.string :as s]))

(defn- character-frequency
  "Returns a map character occurrence frequency, keyed by character. Note that
  the keys will be characters, e.g. \\a, not strings or symbols."
  ; For this internal use case, the unconventional keys are fine; saves a step.
  [string]
  (reduce (fn [frequencies character]
            (if (frequencies character)
              (update frequencies character inc)
              (assoc frequencies character 1)))
          {}
          (vec string)))

(defn is-permutation?
  "True if one supplied string is a permutation of the other."
  [a b]
  (cond
    ; short-circuit the two cases we can check without frequency counts
    (not= (count a) (count b)) false
    (= a b) true
    (= (character-frequency a) (character-frequency b)) true
    :else false))
