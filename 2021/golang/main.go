package main

import (
	"aoc/solutions"
	"aoc/utils"
	"fmt"
	"os"
)

func main() {
	solutionNumber := os.Args[1]

	f, ok := solutions.Solutions[utils.ToInt(solutionNumber)]
	if !ok {
		fmt.Println("no function for day")
		os.Exit(1)
	}

	f()
}
