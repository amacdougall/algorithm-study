require "set"

module IsUnique
  # Returns true if every character in the supplied string is unique. Optimized
  # for CPU time.
  def self.fast(string)
    known = Set.new
    return string.each_char.to_a.none? do |character|
      if known.include? character
        true
      else
        known.add character
        false
      end
    end
  end

  # Returns true if every character in the supplied string is unique. Optimized
  # for memory efficiency.
  def self.compact(string)
    # NOTE: it doesn't seem easy to do this idiomatically in Ruby. You'd just
    # use Enumerable#uniq.
    range = 0..(string.length - 1)
    range.none? do |index|
      string[(index + 1)..-1].each_char.to_a.any? { |c| c == string[index] }
    end
  end
end
