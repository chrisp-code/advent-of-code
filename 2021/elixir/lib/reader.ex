defmodule Reader do
  def lines(day) do
    File.stream!(Path.relative("../input/#{day}.txt"))
    |> Stream.map(&String.trim/1)
  end

  def lines_int(day) do
    lines(day)
    |> Stream.map(&String.to_integer/1)
  end
end
