package solutions

import (
	utils "aoc/utils"
	"fmt"
	"log"
)

func init() {
	Solutions["2022/2"] = year2022day2
}

func year2022day2() {
	values, err := utils.ReadLines("2022", "1")

	if err != nil {
		log.Fatal(err)
	}

	year2022day2partA(values)
	year2022day2partB(values)
}

func year2022day2partA(values []string) {
	allCalories := calculateCalories(values)
	fmt.Printf("Year 2022, Day 1, Part A: %v\n", allCalories[0])
}

func year2022day2partB(values []string) {
	topCalories := 0
	for _, calories := range calculateCalories(values)[:3] {
		topCalories += calories
	}

	fmt.Printf("Year 2022, Day 1, Part B: %v\n", topCalories)
}
