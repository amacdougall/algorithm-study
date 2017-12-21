require "set"
require "./graph_node"

module HasRoute
  # Returns true if there is a path between the two supplied GraphNodes.
  def self.breadth_first_search(origin, destination)
    visited = Set.new
    unvisited = [origin]

    while !unvisited.empty? do
      current = unvisited.pop
      if current == destination
        return true
      elsif
        !visited.include?(current)
        visited << current
        current.edges.each { |node| unvisited.unshift(node) }
      end
    end

    return false # explicit return added for consistency, but not strictly needed
  end
end
