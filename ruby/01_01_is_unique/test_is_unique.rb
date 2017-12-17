require "minitest/autorun"
require "./is_unique"

class TestIsUnique < MiniTest::Unit::TestCase
  def test_fast_algorithm_success
    assert IsUnique::fast("ant")
  end

  def test_fast_algorithm_failure
    refute IsUnique::fast("grasshopper")
  end

  def test_compact_algorithm_success
    assert IsUnique::compact("ant")
  end

  def test_compact_algorithm_failure
    refute IsUnique::compact("grasshopper")
  end
end
