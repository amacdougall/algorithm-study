(ns chapter-01-04-is-palindrome-permutation.core-test
  (:require [clojure.test :refer :all]
            [chapter-01-04-is-palindrome-permutation.core
             :refer [is-palindrome-permutation?]]))

(deftest test-is-palindrome-permutation
  (is (is-palindrome-permutation? ""))
  (is (is-palindrome-permutation? "a"))
  (is (is-palindrome-permutation? "aa"))
  (is (not (is-palindrome-permutation? "ab")))
  (is (is-palindrome-permutation? "aab"))
  (is (is-palindrome-permutation? "aabb"))
  (is (is-palindrome-permutation? "aabcb"))
  (is (not (is-palindrome-permutation? "aabcbd"))))
