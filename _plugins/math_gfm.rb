# frozen_string_literal: true

require "kramdown-parser-gfm"

module Kramdown
  module Parser
    # GFM with conventional TeX delimiters: $...$ for inline math and a
    # standalone $$...$$ paragraph for display math. Kramdown normally only
    # protects $$...$$, which lets Markdown emphasis and escapes corrupt
    # single-dollar TeX before MathJax sees it.
    class MathGFM < GFM
      SINGLE_DOLLAR_MATH_START = /\$(?!\$)(?!\s)((?:\\.|[^\\$\n])+?)(?<!\s)\$(?!\$)/

      define_parser(:single_dollar_math, SINGLE_DOLLAR_MATH_START, "\\$")

      def initialize(source, options)
        super
        inline_math_index = @span_parsers.index(:inline_math)
        @span_parsers.insert(inline_math_index, :single_dollar_math)
      end

      def parse_single_dollar_math
        start_line_number = @src.current_line_number
        @src.pos += @src.matched_size
        @tree.children << Element.new(
          :math,
          @src[1],
          nil,
          category: :span,
          location: start_line_number
        )
      end
    end
  end
end
