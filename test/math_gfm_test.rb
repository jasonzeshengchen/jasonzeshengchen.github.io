# frozen_string_literal: true

require "minitest/autorun"
require "kramdown"
require_relative "../_plugins/math_gfm"

class MathGFMTest < Minitest::Test
  def render(markdown)
    Kramdown::Document.new(
      markdown,
      input: "MathGFM",
      math_engine: "mathjax"
    ).to_html
  end

  def test_single_dollar_math_is_protected_from_markdown
    html = render('A set $A_\alpha=\{x:x\in B_\beta\}$ is definable.')

    assert_includes html, '\(A_\alpha=\{x:x\in B_\beta\}\)'
    refute_includes html, "<em>"
  end

  def test_multiple_inline_expressions_do_not_create_emphasis
    html = render('A $\Sigma^1_2$ set containing $y_\ast\in B_A\setminus A$.')

    assert_includes html, '\(\Sigma^1_2\)'
    assert_includes html, '\(y_\ast\in B_A\setminus A\)'
    refute_includes html, "<em>"
  end

  def test_standalone_double_dollars_remain_display_math
    html = render(<<~'MARKDOWN')
      Before.

      $$
      x_\alpha\in\{0,1\}
      $$

      After.
    MARKDOWN

    assert_includes html, "\\[x_\\alpha\\in\\{0,1\\}\\]"
    refute_includes html, "\\(x_\\alpha"
  end

  def test_inline_and_fenced_code_are_not_parsed_as_math
    html = render("`$x_y$`\n\n```text\n$x_y$\n```")

    assert_includes html, "<code>$x_y$</code>"
    assert_includes html, "$x_y$"
    refute_includes html, "\\(x_y\\)"
  end

  def test_escaped_dollar_and_currency_are_not_parsed_as_math
    html = render('The price is \\$5, not $5 and $10.')

    assert_includes html, "The price is $5, not $5 and $10."
    refute_includes html, "\\("
  end

  def test_escaped_dollar_inside_math_is_preserved
    html = render('The amount is $c=\$5$.')

    assert_includes html, '\(c=\\$5\)'
  end

  def test_unbalanced_delimiter_is_left_as_text
    html = render('An unfinished $x_\alpha expression.')

    assert_includes html, '$x_\alpha expression.'
    refute_includes html, "\\("
  end

  def test_legacy_raw_html_math_is_left_for_mathjax
    html = render("<div>\n$x_y$ and $A=\\{0,1\\}$\n</div>")

    assert_includes html, '$x_y$ and $A=\\{0,1\\}$'
    refute_includes html, "<em>"
  end

  def test_largest_countable_post_regression
    source = File.read(
      File.expand_path("../_posts/2026-08-19-largest-countable-exercises.md", __dir__)
    )
    body = source.sub(/\A---\r?\n.*?\r?\n---\r?\n/m, "")
    html = render(body)

    assert_includes html, 'is a countable \(\Sigma^1_2\) set, and since \(y_\ast\in B_A\setminus A\),'
    assert_includes html, '\[C:=\{x\in 2^\omega \mid x\in L_{\omega_1^x}\}.\]'
    assert_includes html, '\[\gamma = \min\{\rho(y) : y \in C \setminus A\},\]'
    assert_includes html, '\[B_A \subseteq A \cup E_{y_\ast}.\]'
    refute_match(/\$\\Sigma\^1<em>|\$y<em>/, html)
  end

  def test_hjorth_post_display_math_regression
    source = File.read(
      File.expand_path("../_posts/2022-09-02-hjorth-handbook-remark.md", __dir__)
    )
    body = source.sub(/\A---\r?\n.*?\r?\n---\r?\n/m, "")
    html = render(body)

    assert_includes html, '\[x=y\Leftrightarrow (f(x)(n)=f(y)(n) \text{ for all but finitely many } n)\]'
    assert_includes html, '\[xE_0 y \Leftrightarrow x(n)=y(n) \text{ for all but finitely many } n\]'
  end
end
