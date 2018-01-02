(ns chapter-04-01-directed-graph-route.core
  (:require [chapter-04-01-directed-graph-route.graph :as g]))

(defn has-route?
  "Given a graph object as defined in the graph namespace, return true if there
  is a path from the origin node to the destination node. Nodes must be
  specified by their keys."
  [graph origin destination]
  (loop [visited #{}
         unvisited clojure.lang.PersistentQueue/EMPTY
         current origin]
    (cond
      (nil? current) false
      (contains? visited current) false
      (= current destination) true
      :default (let [unvisited (apply conj unvisited (:edges (g/get-node graph current)))]
                 (recur (conj visited current)
                        (pop unvisited)
                        (peek unvisited))))))
