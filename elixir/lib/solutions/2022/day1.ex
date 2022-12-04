defmodule AOC.Solutions.Y2022.D1 do
  import Reader

  def partA(year, day) do
    lines_int(year, day)
    |> Stream.chunk_every(2, 1, :discard)
    |> Stream.filter(fn [prev, current] -> prev < current end)
    |> Enum.count()
  end

  def partB(year, day) do
    lines_int(year, day)
    |> Stream.chunk_every(3, 1, :discard)
    |> Stream.map(&Enum.sum/1)
    |> Stream.chunk_every(2, 1, :discard)
    |> Stream.filter(fn [prev, current] -> prev < current end)
    |> Enum.count()
  end

  def run(year, day) do
    IO.puts("Day 1, Part A: #{partA(year, day)}")
    IO.puts("Day 1, Part B: #{partB(year, day)}")
  end
end
