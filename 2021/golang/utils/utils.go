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
func ReadLines(filename string) ([]string, error) {
	file, err := os.Open(fmt.Sprintf("../input/%s.txt", filename))
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var lines []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		if line != "" {
			lines = append(lines, scanner.Text())
		}
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	return lines, scanner.Err()
}

func ReadLinesInt(filename string) ([]int, error) {
	lines, err := ReadLines(filename)
	if err != nil {
		log.Fatal(err)
	}

	values := make([]int, 0)
	for i := 0; i < len(lines); i++ {
		values = append(values, ToInt(lines[i]))
	}

	return values, err
}
