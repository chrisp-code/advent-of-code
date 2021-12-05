package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

// readValues reads a whole file into memory
// and returns a slice of its lines as integers.
func readValues(path string) ([]int, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var values []int
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		val, err := strconv.Atoi(scanner.Text())
		if err != nil {
			log.Fatalf("strconv.Atoi %s", err)
		}
		values = append(values, val)
	}

	return values, scanner.Err()
}

func computeIncreases(values []int) int {
	increases := 0

	for i := 1; i < len(values); i++ {
		previous := values[i-1]
		current := values[i]

		if previous < current {
			increases += 1
		}
	}

	return increases
}

func main() {
	values, err := readValues("../input/01.txt")

	if err != nil {
		log.Fatalf("readValues: %s", err)
	}

	increases := computeIncreases(values)

	fmt.Println(increases)
}
