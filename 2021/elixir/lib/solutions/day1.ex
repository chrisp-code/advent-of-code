defmodule AOC.Solutions.Day1 do
  import Reader

  def partA() do
    lines_int("1")
    |> Stream.chunk_every(2, 1, :discard)
    |> Stream.filter(fn [prev, current] -> prev < current end)
    |> Enum.count()
  end

  def partB() do
    lines_int("1")
    |> Stream.chunk_every(3, 1, :discard)
    |> Stream.map(&Enum.sum/1)
    |> Stream.chunk_every(2, 1, :discard)
    |> Stream.filter(fn [prev, current] -> prev < current end)
    |> Enum.count()
  end

  def run() do
    IO.puts("Day 1, Part A: #{partA()}")
    IO.puts("Day 1, Part B: #{partB()}")
  end
end
