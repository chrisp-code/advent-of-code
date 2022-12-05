package utils

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

func ToInt(s string) (i int) {
	i, err := strconv.Atoi(s)
	if err != nil {
		panic(err)
	}
	return i
}

// readValues reads a whole file into memory
// and returns a slice of its lines as integers.
func ReadLines(year string, day string) ([]string, error) {
	file, err := os.Open(fmt.Sprintf("../input/%s/%s.txt", year, day))
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var lines []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		lines = append(lines, line)
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	return lines, scanner.Err()
}

func ReadLinesInt(year string, day string) ([]int, error) {
	lines, err := ReadLines(year, day)
	if err != nil {
		log.Fatal(err)
	}

	values := make([]int, 0)
	for i := 0; i < len(lines); i++ {
		line := lines[i]
		if line != "" {
			values = append(values, ToInt(line))
		}
	}

	return values, err
}
