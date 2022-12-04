package main

import (
	"aoc/solutions"
	"fmt"
	"os"
)

func main() {
	year := os.Args[1]
	day := os.Args[2]

	f, ok := solutions.Solutions[fmt.Sprintf("%s/%s", year, day)]
	if !ok {
		fmt.Println("no function for day")
		os.Exit(1)
	}

	f()
}
