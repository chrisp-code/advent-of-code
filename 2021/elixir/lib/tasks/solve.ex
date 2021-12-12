defmodule Mix.Tasks.Solve do
  use Mix.Task

  alias AOC.Solutions

  def run([day]) do
    Solutions.run(day)
  end
end
