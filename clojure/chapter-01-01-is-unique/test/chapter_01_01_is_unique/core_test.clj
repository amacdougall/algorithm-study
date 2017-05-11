(ns chapter-01-01-is-unique.core-test
  (:require [clojure.test :refer :all]
            [chapter-01-01-is-unique.core :refer :all]))

(defn test-uniqueness-function [f]
  (testing "strings of unique characters"
    (is (f "") "The empty string should be unique")
    (is (f "a") "A single character should be unique")
    (is (f "ab") "Two non-repeating characters should be unique"))
  (testing "strings of repeating characters"
    (is (not (f "aa"))
        "Consecutive repeating characters should not be unique")
    (is (not (f "aba"))
        "Non-contiguous repeating characters should not be unique")))

(deftest test-naive-is-unique
  (test-uniqueness-function naive-is-unique?))

(deftest test-fast-is-unique
  (test-uniqueness-function fast-is-unique?))
