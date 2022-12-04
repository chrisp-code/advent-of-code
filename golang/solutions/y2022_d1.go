package solutions

import (
	utils "aoc/utils"
	"fmt"
	"log"
)

func init() {
	Solutions["2022/1"] = Year2022_Day1
}

func Year2022_Day1() {
	values, err := utils.ReadLinesInt("2022", "1")

	if err != nil {
		log.Fatal(err)
	}

	year2022_day1_partA(values)
	year2022_day1_partB(values)
}

func year2022_day1_partA(values []int) {
	fmt.Printf("Day 1, Part A: %v\n", values)
}

func year2022_day1_partB(values []int) {
	fmt.Printf("Day 1, Part B: %v\n", values)
}
