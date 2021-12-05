defmodule Mix.Tasks.Aoc.One do
  use Mix.Task

  def run(_) do
    File.stream!("../input/01.txt")
    |> Stream.map(&String.trim/1)
    |> Stream.map(fn str ->
      {val, _} = Integer.parse(str)
      val
    end)
    |> Stream.chunk_every(2, 1, :discard)
    |> Stream.filter(fn [prev, current] -> prev < current end)
    |> Enum.count()
    |> IO.inspect()
  end
end
