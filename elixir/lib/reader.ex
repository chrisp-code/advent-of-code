defmodule Reader do
  def read(year, day) do
    fileName(year, day)
    |> File.read!()
  end

  def lines(year, day) do
    fileName(year, day)
    |> File.stream!()
    |> Stream.map(&String.trim/1)
  end

  def lines_int(year, day) do
    lines(year, day)
    |> Stream.map(&String.to_integer/1)
  end

  defp fileName(year, day) do
    Path.relative("../input/#{year}/#{day}.txt")
  end
end
