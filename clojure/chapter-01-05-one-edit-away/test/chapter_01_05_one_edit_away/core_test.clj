(ns chapter-01-05-one-edit-away.core-test
  (:require [clojure.test :refer :all]
            [chapter-01-05-one-edit-away.core :refer [one-edit-away?]]))

(deftest test-one-edit-away
  ; zero edits away
  (is (one-edit-away? "a" "a"))
  ; deletions
  (is (one-edit-away? "a" ""))
  (is (one-edit-away? "doge" "dog"))
  (is (one-edit-away? "apple" "pple"))
  ; changes
  (is (one-edit-away? "a" "b"))
  (is (one-edit-away? "dog" "bog"))
  (is (one-edit-away? "cat" "cap"))
  ; additions
  (is (one-edit-away? "" "a"))
  (is (one-edit-away? "cut" "cute"))
  (is (one-edit-away? "tray" "stray"))
  ; too many adds/deletes away
  (is (not (one-edit-away? "a" "ant")))
  (is (not (one-edit-away? "tent" "e")))
  ; too many changes away
  (is (not (one-edit-away? "drum" "cram")))
  ; delete, but wrong order
  (is (not (one-edit-away? "abc" "ca")))
  ; add, but wrong order
  (is (not (one-edit-away? "ab" "cba")))
  ; change, but wrong order
  (is (not (one-edit-away? "abc" "cbx"))))
