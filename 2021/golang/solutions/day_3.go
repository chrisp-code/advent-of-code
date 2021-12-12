package solutions

import (
	utils "aoc/utils"
	"fmt"
	"log"
	"strconv"
	"strings"
)

func init() {
	Solutions[3] = Day3
}

func Day3() {
	lines, err := utils.ReadLines("3")

	if err != nil {
		log.Fatal(err)
	}

	day3PartA(lines)
	day3PartB(lines)
}

func computeReport(lines []string) [][]int {
	report := make([][]int, len(lines))

	for index, line := range lines {
		for _, char := range line {
			num := utils.ToInt(string(char))
			report[index] = append(report[index], num)
		}
	}

	return report
}

func getColumn(column int, report [][]int) []int {
	numbers := make([]int, len(report))

	for rowIndex, row := range report {
		numbers[rowIndex] = row[column]
	}

	return numbers
}

// *************************
// * Part 1 implementation *
// *************************

func getMostCommon(numbers []int) int {
	occurrences := make([]int, 2)

	for _, val := range numbers {
		occurrences[val] = occurrences[val] + 1
	}

	max := -int(^uint(0)>>1) - 1
	mostCommon := -1

	for occurrence, val := range occurrences {
		if val > max || (val == max && occurrence == 1) {
			max = val
			mostCommon = occurrence
		}
	}

	return mostCommon
}

func getLeastCommon(numbers []int) int {
	occurrences := make([]int, 2)

	for _, val := range numbers {
		occurrences[val] += 1
	}

	least := int(^uint(0) >> 1)
	leastCommon := -1

	for occurrence, val := range occurrences {
		if val < least || (val == least && occurrence == 0) {
			least = val
			leastCommon = occurrence
		}
	}

	return leastCommon
}

func day3PartA(lines []string) {
	report := computeReport(lines)

	columns := len(report[0])
	gamma := ""
	epsilon := ""

	for i := 0; i < columns; i++ {
		column := getColumn(i, report)

		mostCommon := getMostCommon(column)
		leastCommon := getLeastCommon(column)

		gamma += strconv.Itoa(mostCommon)
		epsilon += strconv.Itoa(leastCommon)
	}

	gammaRate, _ := strconv.ParseInt(gamma, 2, 64)
	epsilonRate, _ := strconv.ParseInt(epsilon, 2, 64)

	fmt.Printf("Day 2, Part A: %v\n", gammaRate*epsilonRate)
}

// *************************
// * Part 2 implementation *
// *************************

func filterToCommon(getCommon func(numbers []int) int, report [][]int, columnNumber int) []int {
	numberOfLines := len(report)
	columns := len(report[0])

	if numberOfLines == 1 || columnNumber > columns {
		return report[0]
	}

	column := getColumn(columnNumber, report)
	common := getCommon(column)

	filteredReport := make([][]int, 0)
	for i := 0; i < numberOfLines; i++ {
		if column[i] == common {
			filteredReport = append(filteredReport, report[i])
		}
	}

	return filterToCommon(getCommon, filteredReport, columnNumber+1)
}

func intListToString(list []int) string {
	return strings.Trim(strings.Replace(fmt.Sprint(list), " ", "", -1), "[]")
}

func day3PartB(lines []string) {
	report := computeReport(lines)

	oxygen := filterToCommon(getMostCommon, report, 0)
	co2 := filterToCommon(getLeastCommon, report, 0)

	oxygenGeneratorRating, _ := strconv.ParseInt(intListToString(oxygen), 2, 64)
	CO2ScrubberRating, _ := strconv.ParseInt(intListToString(co2), 2, 64)

	lifeSupportRating := oxygenGeneratorRating * CO2ScrubberRating

	fmt.Printf("Day 2, Part B: %v\n", lifeSupportRating)
}
