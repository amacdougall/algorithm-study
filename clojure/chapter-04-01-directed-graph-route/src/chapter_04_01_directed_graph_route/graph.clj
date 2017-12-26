(ns chapter-04-01-directed-graph-route.graph)

(defn empty-graph
  "Returns a new empty graph object, an empty map. All other operations in this
  namespace assume that their graph argument is a map of node keys to edge
  sets."
  []
  {})

(defn has-node?
  "Given a graph and a node key, returns true if the graph contains a node
  with that key."
  [g k]
  (contains? g k))

(defn has-nodes?
  "Given a graph and any number of node keys, returns true if the graph
  contains every node named. Also true if no keys were supplied."
  [g & ks]
  (if (empty? ks)
    true
    (every? (partial has-node? g) ks)))

(defn get-node
  "Given a graph and a node key, return the corresponding node object. nil if
  no such node exists."
  [g k]
  (if (has-node? g k)
    (k g)
    nil))

(defn add-node
  "Given a graph and a keyword, adds an empty node with that key, returning the
  graph. If a node with this key already exists, returns the graph without
  modification."
  [g k]
  (if (has-node? g k)
    g
    (assoc g k {:edges #{}})))

(defn add-nodes
  "Given a graph and an array of keys, adds a node for each key."
  [g & ks]
  (loop [g g, ks ks]
    (if (= (count ks) 0)
      g
      (recur (add-node g (first ks)) (rest ks)))))

(defn has-edge?
  "Given a graph and two node keys, returns true if there is an edge connecting
  the first node to the next. Always false if the origin node does not exist."
  [g origin destination]
  (if (has-nodes? g origin destination)
    (contains? (:edges (get-node g origin)) destination)
    false))

(defn add-edge
  "Given a graph and two node keys, create a one-way edge from the first node
  to the next. If either node does not exist, performs no action. Returns the
  graph, modified or not."
  [g origin destination]
  (if (or (not (has-nodes? g origin destination))
          (has-edge? g origin destination))
    g
    (update-in g [origin :edges] conj destination)))

(defn add-path
  "Given a graph and two or more node keys, create a sequence of edges
  connecting each node in order. Returns the modified graph."
  [g & ks]
  (if (<= (count ks) 1)
    g
    (loop [g (apply add-nodes (into [g] ks)), ks ks]
      (if (= (count ks) 1)
        g
        (let [origin (first ks), destination (second ks)]
          (recur (add-edge g origin destination) (rest ks)))))))
