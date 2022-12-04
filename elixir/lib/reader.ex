defmodule Reader do
  def lines(year, day) do
    File.stream!(Path.relative("../input/#{year}/#{day}.txt"))
    |> Stream.map(&String.trim/1)
  end

  def lines_int(year, day) do
    lines(year, day)
    |> Stream.map(&String.to_integer/1)
  end
end
