package solutions

import (
	utils "aoc/utils"
	"fmt"
	"log"
)

func init() {
	Solutions[1] = Day1
}

func sumWindow(values []int, windowSize int) []int {
	sums := make([]int, 0)

	for i := 0; i < len(values)-2; i++ {
		sum := 0
		for s := 0; s < windowSize; s++ {
			sum = sum + values[i+s]
		}
		sums = append(sums, sum)
	}

	return sums
}

func computeIncreases(values []int) int {
	increases := 0

	previous := values[0]
	for i := 1; i < len(values); i++ {
		current := values[i]
		if previous < current {
			increases += 1
		}
		previous = current
	}

	return increases
}

func Day1() {
	values, err := utils.ReadLinesInt("1")

	if err != nil {
		log.Fatal(err)
	}

	day1PartA(values)
	day1PartB(values)
}

func day1PartA(values []int) {
	fmt.Printf("Day 1, Part A: %v\n", computeIncreases(values))
}

func day1PartB(values []int) {
	fmt.Printf("Day 1, Part B: %v\n", computeIncreases(sumWindow(values, 3)))
}
