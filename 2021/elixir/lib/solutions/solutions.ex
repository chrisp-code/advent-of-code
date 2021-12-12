defmodule Test1 do
  def test(text) do
    IO.puts("#{text}")
  end
end

defmodule AOC.Solutions do
  def run(day) do
    apply(String.to_existing_atom("Elixir.AOC.Solutions.Day#{day}"), :run, [])
  end
end
