const HasRoute = require("../src/has_route.js");
const GraphNode = require("../src/graph_node.js");
const assert = require("assert");

describe("testing node connection", function() {
  /*
   * A    B <- F
   * |    |    ^
   * v    v    |
   * C -> D -> E
   * |
   * v
   * G
   */
  beforeEach(function() {
    this.graphNodeA = new GraphNode();
    this.graphNodeB = new GraphNode();
    this.graphNodeC = new GraphNode();
    this.graphNodeD = new GraphNode();
    this.graphNodeE = new GraphNode();
    this.graphNodeF = new GraphNode();
    this.graphNodeG = new GraphNode();

    this.graphNodeA.edges = [this.graphNodeC];
    this.graphNodeB.edges = [this.graphNodeD];
    this.graphNodeC.edges = [this.graphNodeD, this.graphNodeG];

    // D -> E -> F -> B -> D is an infinite cycle
    this.graphNodeD.edges = [this.graphNodeE];
    this.graphNodeE.edges = [this.graphNodeF];
    this.graphNodeF.edges = [this.graphNodeB];

    // G has no edges, or at least no edges which lead to other nodes.
  });

  const runTestsWith = (description, f) => {
    describe(description, function() {
      it("should return correct results for degenerate case", function() {
        assert(!f(this.graphNodeG, this.graphNodeA)); // G has no exits
      });

      it("should return correct results for base case", function() {
        assert(f(this.graphNodeA, this.graphNodeC)); // A links straight to C
      });

      it("should return correct results for indirect links", function() {
        assert(f(this.graphNodeA, this.graphNodeD)); // A links to D through C
        assert(f(this.graphNodeA, this.graphNodeB)); // A links to B through C, D, E, F
      });

      it("should return false when there is no path", function() {
        assert(!f(this.graphNodeC, this.graphNodeA));
      });

      it("should return false when encountering a cycle instead of the destination", function() {
        assert(!f(this.graphNodeB, this.graphNodeA)); // A does not link to B
      });
    });
  };

  runTestsWith("using depth-first search", HasRoute.depthFirstSearch);
  runTestsWith("using breadth-first search", HasRoute.breadthFirstSearch);
});
