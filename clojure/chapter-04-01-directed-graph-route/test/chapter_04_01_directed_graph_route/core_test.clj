(ns chapter-04-01-directed-graph-route.core-test
  (:require [clojure.test :refer :all]
            [chapter-04-01-directed-graph-route.core :refer :all]
            [chapter-04-01-directed-graph-route.graph :as g]))

(deftest breadth-first-search-test
  (let [graph (-> (g/empty-graph)
                  (g/add-path :a :c :g)
                  (g/add-path :c :d :e :f :b :d))]
    (testing "a node without exits"
      (is (not (has-route? graph :g :a))))
    (testing "a node which connects directly to the destination"
      (is (has-route? graph :a :c)))
    (testing "a short indirect path"
      (is (has-route? graph :a :d)))
    (testing "a longer indirect path"
      (is (has-route? graph :a :b))) ; a, c, d, e, f, b
    (testing "a dead end"
      (is (not (has-route? graph :c :a))))
    (testing "a failed search with a cycle"
      (is (not (has-route? graph :b :a))))))
