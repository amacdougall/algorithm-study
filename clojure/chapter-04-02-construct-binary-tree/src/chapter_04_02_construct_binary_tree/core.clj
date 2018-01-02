(ns chapter-04-02-construct-binary-tree.core)

(defn build-binary-tree
  "Given a sorted sequence of integers, returns a binary tree of minimal
  height; that is, one balanced to minimize nesting levels. When given
  an empty sequence, returns nil."
  [xs]
  (if (empty? xs)
    nil
    (let [pivot (Math/floor (/ (count xs) 2))
          left-side (take pivot xs)
          right-side (take-last (- (count xs) (inc pivot)) xs)]
      {:value (nth xs pivot)
       :left (build-binary-tree left-side)
       :right (build-binary-tree right-side)})))
