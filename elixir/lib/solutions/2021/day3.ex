defmodule AOC.Solutions.Y2021.D3 do
  def computeReport(lines) do
    lines
    |> Enum.map(&String.graphemes/1)
    |> Enum.map(fn chars ->
      chars
      |> Enum.map(&String.to_integer/1)
    end)
  end

  def columns(report) do
    report
    |> Enum.zip()
    |> Enum.map(&Tuple.to_list/1)
  end

  def column(report, at) do
    report
    |> columns()
    |> Enum.at(at)
  end

  def getCommon(numbers) do
    numbers
    |> Enum.frequencies()
    |> Enum.min_max_by(fn {_, v} -> v end)
  end

  def partA(year, day) do
    {gamma, epsilon} =
      Reader.lines(year, day)
      |> computeReport()
      |> columns()
      |> Enum.map(&getCommon/1)
      |> Enum.reduce({"", ""}, fn {{leastCommon, _}, {mostCommon, _}}, {gamma, epsilon} ->
        {gamma <> Integer.to_string(mostCommon), epsilon <> Integer.to_string(leastCommon)}
      end)

    String.to_integer(gamma, 2) * String.to_integer(epsilon, 2)
  end

  def filterToCommon(report, minOrMax), do: filterToCommon(report, minOrMax, 0)
  def filterToCommon(report = [_head | []], minOrMax, columnNumber), do: report

  def filterToCommon(report, minOrMax, columnNumber) do
    {{leastCommon, leastOccurrences}, {mostCommon, mostOccurrences}} =
      report
      |> column(columnNumber)
      |> getCommon()

    compare =
      if mostOccurrences == leastOccurrences,
        do:
          if(minOrMax == :max,
            do: 1,
            else: 0
          ),
        else: if(minOrMax == :max, do: mostCommon, else: leastCommon)

    report
    |> Enum.filter(fn line -> Enum.at(line, columnNumber) === compare end)
    |> filterToCommon(minOrMax, columnNumber + 1)
  end

  def partB(year, day) do
    report =
      Reader.lines(year, day)
      |> computeReport()

    [oxygen | []] = filterToCommon(report, :max)
    [co2 | []] = filterToCommon(report, :min)

    oxygenGeneratorRating = String.to_integer(Enum.join(oxygen, ""), 2)
    co2ScrubberRating = String.to_integer(Enum.join(co2, ""), 2)

    oxygenGeneratorRating * co2ScrubberRating
  end

  def run(year, day) do
    IO.puts("Day 2, Part A: #{partA(year, day)}")
    IO.puts("Day 2, Part B: #{partB(year, day)}")
  end
end
