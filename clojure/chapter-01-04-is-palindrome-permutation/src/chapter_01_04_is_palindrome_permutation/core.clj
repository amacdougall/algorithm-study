(ns chapter-01-04-is-palindrome-permutation.core)

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

(defn is-palindrome-permutation?
  "True if any permutation of the supplied string is a palindrome."
  [string]
  (>= 1 (->> (character-frequency string) (vec) (map last) (filter odd?) (count))))
