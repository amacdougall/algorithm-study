(ns chapter-04-02-construct-binary-tree.core-test
  (:require [clojure.test :refer :all]
            [chapter-04-02-construct-binary-tree.core :refer :all]))

(deftest construct-binary-tree-test
  (testing "an empty sequence"
    (is (= (build-binary-tree '()) nil)))
  (testing "a single value"
    (let [xs [1]]
      (is (= (build-binary-tree xs) {:value 1 :left nil :right nil}))))
  ; for the following tests, remember that range excludes the second argument
  (testing "a simple case"
    (is (= (build-binary-tree (range 1 4))
           {:value 2
            :left {:value 1 :left nil :right nil}
            :right {:value 3 :left nil :right nil}})))
  (testing "a simple unbalanced case"
    (is (= (build-binary-tree (range 1 3))
           {:value 2
            :left {:value 1 :left nil :right nil}
            :right nil})))
  (testing "a larger case"
    ; From [1 2 3 4 5 6 7], should produce:
    ;             4
    ;         2       6
    ;       1   3   5   7
    (is (= (build-binary-tree (range 1 8)))
        {:value 4
         :left {:value 2
                :left {:value 1, :left nil, :right nil}
                :right {:value 3, :left nil, :right nil}}
         :right {:value 6
                 :left {:value 5, :left nil, :right nil}
                 :right {:value 7, :left nil, :right nil}}})))
