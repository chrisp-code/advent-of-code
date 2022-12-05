package solutions

import (
	utils "aoc/utils"
	"fmt"
	"log"
	"sort"
)

func init() {
	Solutions["2022/1"] = Year2022Day1
}

func calculateCalories(values []string) []int {
	allCalories := make([]int, 0)

	calories := 0
	for i := 0; i < len(values); i++ {
		if values[i] == "" {
			allCalories = append(allCalories, calories)
			calories = 0
		} else {
			calories = calories + utils.ToInt(values[i])
		}
	}

	sort.Sort(sort.Reverse(sort.IntSlice(allCalories)))

	return allCalories
}

func Year2022Day1() {
	values, err := utils.ReadLines("2022", "1")

	if err != nil {
		log.Fatal(err)
	}

	year2022Day1PartA(values)
	year2022Day1PartB(values)
}

func year2022Day1PartA(values []string) {
	allCalories := calculateCalories(values)
	fmt.Printf("Year 2022, Day 1, Part A: %v\n", allCalories[0])
}

func year2022Day1PartB(values []string) {
	topCalories := 0
	for _, calories := range calculateCalories(values)[:3] {
		topCalories += calories
	}

	fmt.Printf("Year 2022, Day 1, Part B: %v\n", topCalories)
}
