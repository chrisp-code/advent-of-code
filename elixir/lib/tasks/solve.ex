defmodule Mix.Tasks.Solve do
  use Mix.Task

  alias AOC.Solutions

  def run([year, day]) do
    Solutions.run(year, day)
  end
end
