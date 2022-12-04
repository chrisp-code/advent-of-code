defmodule Test1 do
  def test(text) do
    IO.puts("#{text}")
  end
end

defmodule AOC.Solutions do
  def run(year, day) do
    apply(String.to_existing_atom("Elixir.AOC.Solutions.Y#{year}.D#{day}"), :run, [year, day])
  end
end
