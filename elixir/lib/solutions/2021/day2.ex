defmodule AOC.Solutions.Y2021.D2 do
  def partA(year, day) do
    {pos, depth} =
      Reader.lines(year, day)
      |> Enum.map(fn x -> String.split(x, " ", trim: true) end)
      |> Enum.reduce({0, 0}, fn [direction, val], {pos, depth} ->
        int = String.to_integer(val)

        case direction do
          "forward" -> {pos + int, depth}
          "backward" -> {pos - int, depth}
          "down" -> {pos, depth + int}
          "up" -> {pos, depth - int}
        end
      end)

    pos * depth
  end

  def partB(year, day) do
    {_, pos, depth} =
      Reader.lines(year, day)
      |> Enum.map(fn x -> String.split(x, " ", trim: true) end)
      |> Enum.reduce({0, 0, 0}, fn [direction, val], {aim, pos, depth} ->
        int = String.to_integer(val)

        case direction do
          "forward" -> {aim, pos + int, depth + aim * int}
          "backward" -> {aim, pos - int, depth - aim * int}
          "down" -> {aim + int, pos, depth}
          "up" -> {aim - int, pos, depth}
        end
      end)

    pos * depth
  end

  def run(year, day) do
    IO.puts("Day 2, Part A: #{partA(year, day)}")
    IO.puts("Day 2, Part B: #{partB(year, day)}")
  end
end
