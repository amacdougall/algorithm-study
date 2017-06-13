(ns chapter-01-02-is-permutation.core-test
  (:require [clojure.test :refer :all]
            [chapter-01-02-is-permutation.core :refer [is-permutation?]]))

(deftest a-test
  (is (is-permutation? "" ""))
  (is (is-permutation? "a" "a"))
  (is (not (is-permutation? "a" "aa")))
  (is (not (is-permutation? "a" "ab")))
  (is (is-permutation? "ab" "ba"))
  (is (is-permutation? "aba" "baa")))
