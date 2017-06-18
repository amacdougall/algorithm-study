(ns chapter-01-05-one-edit-away.core)

(defn one-edit-away?
  "True if the first string argument is no more than one edit away from the
  second. Trivially true if the strings are identical."
  ([x y]
   (one-edit-away? (seq x) (seq y) 0))
  ([x y faults]
   (cond
     (< 1 faults) false ; more than one edit's difference
     (and (empty? x) (empty? y)) true ; reached end of strings
     :else
     (let [equal? (= (first x) (first y))
           ; When chars are not equal, and x is shorter than y, assume there
           ; was one deletion in x: advance only y, hoping that the next y char
           ; will match the current x char.
           next-x (if (or equal? (>= (count x) (count y)))
                    (rest x)
                    x)
           ; Same logic applies to y.
           next-y (if (or equal? (<= (count x) (count y)))
                    (rest y)
                    y)
           faults (if equal? faults (inc faults))]
       (recur next-x next-y faults)))))
