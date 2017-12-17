require "minitest/autorun"
require "./lib/example"

class TestAlgorithm < MiniTest::Unit::TestCase
  def test_algorithm_success
    assert true
  end

  def test_algorithm_failure
    refute true
  end
end
