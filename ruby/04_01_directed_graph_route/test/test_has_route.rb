require "minitest/autorun"
require "./lib/graph_node"
require "./lib/has_route"

class TestHasRoute < MiniTest::Unit::TestCase
  def setup
    # A    B <- F
    # |    |    ^
    # v    v    |
    # C -> D -> E
    # |
    # v
    # G
    @graph_node_a = GraphNode.new
    @graph_node_b = GraphNode.new
    @graph_node_c = GraphNode.new
    @graph_node_d = GraphNode.new
    @graph_node_e = GraphNode.new
    @graph_node_f = GraphNode.new
    @graph_node_g = GraphNode.new

    @graph_node_a.edges = [@graph_node_c];
    @graph_node_b.edges = [@graph_node_d];
    @graph_node_c.edges = [@graph_node_d, @graph_node_g];

    # D -> E -> F -> B -> D is an infinite cycle
    @graph_node_d.edges = [@graph_node_e];
    @graph_node_e.edges = [@graph_node_f];
    @graph_node_f.edges = [@graph_node_b];

    # G has no edges, or at least no edges which lead to other nodes.
  end

  def test_degenerate_case
    refute(HasRoute::breadth_first_search(@graph_node_g, @graph_node_a))
  end

  def test_base_case
    assert(HasRoute::breadth_first_search(@graph_node_a, @graph_node_c))
  end

  def test_indirect_links
    assert(HasRoute::breadth_first_search(@graph_node_a, @graph_node_d))
    assert(HasRoute::breadth_first_search(@graph_node_a, @graph_node_b))
  end

  def test_failing_case
    refute(HasRoute::breadth_first_search(@graph_node_b, @graph_node_a))
  end
end
