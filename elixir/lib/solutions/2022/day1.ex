defmodule AOC.Solutions.Y2022.D1 do
  import Reader

  def partA(year, day) do
    [head] =
      calculateCalories(year, day)
      |> Enum.take(1)

    head
  end

  def partB(year, day) do
    calculateCalories(year, day)
    |> Enum.take(3)
    |> Enum.reduce(0, fn x, acc -> x + acc end)
  end

  def run(year, day) do
    IO.puts("Day 1, Part A: #{partA(year, day)}")
    IO.puts("Day 1, Part B: #{partB(year, day)}")
  end

  defp calculateCalories(year, day) do
    read(year, day)
    |> String.split("\n\n")
    |> Enum.map(fn individual ->
      individual
      |> String.split("\n")
      |> Enum.map(&String.to_integer/1)
      |> Enum.reduce(0, fn x, acc -> x + acc end)
    end)
    |> Enum.sort(:desc)
  end
end
