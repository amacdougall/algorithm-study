const GraphNode = require("./graph_node.js");

const is = value => {
  return candidate => candidate === value;
};

class HasRoute {
  /**
   * True if there is a route between two nodes of a directed graph.
   * Implemented using depth-first search, which is unlikely to be efficient
   * for this problem.
   *
   * @param {Node} origin - A node of a directed graph.
   * @param {Node} destination - A node of a directed graph.
   * @param {Array} [visited] - A list of nodes already visited.
   */
  static depthFirstSearch(origin, destination, visited = []) {
    if (visited.some(is(origin))) {
      return false; // cycle detected: abandon this branch to prevent an infinite loop
    } else if (origin.edges.length === 0) {
      return false; // node has no exits
    } else if (origin.edges.some(is(destination))) {
      return true; // node directly links to target
    } else {
      return origin.edges.some(node => HasRoute.depthFirstSearch(node, destination, visited.concat(origin)));
    }
  }

  /**
   * True if there is a route between the two supplied graph nodes.
   *
   * @param {GraphNode} origin - A node of a directed graph.
   * @param {GraphNode} destination - A node of a directed graph.
   */
  static breadthFirstSearch(origin, destination) {
    const visited = new Set();
    const unvisited = [origin];

    while (unvisited.length > 0) {
      let current = unvisited.pop();
      if (current === destination) {
        return true;
      } else if (!visited.has(current)) {
        visited.add(current);
        current.edges.forEach(node => unvisited.unshift(node));
      }
    }

    return false;
  }
}

module.exports = HasRoute;
