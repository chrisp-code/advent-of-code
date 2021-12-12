package solutions

import (
	utils "aoc/utils"
	"fmt"
	"log"
	"strconv"
	"strings"
)

func init() {
	Solutions[2] = Day2
}

type Direction string

const (
	Forward  Direction = "forward"
	Backward           = "backward"
	Down               = "down"
	Up                 = "up"
)

func parseDirection(s string) (c Direction, err error) {
	directions := map[Direction]struct{}{
		Forward:  {},
		Backward: {},
		Down:     {},
		Up:       {},
	}

	dir := Direction(s)
	_, ok := directions[dir]

	if !ok {
		return c, fmt.Errorf(`cannot parse:[%s] as Direction`, s)
	}

	return dir, nil
}

type Instruction struct {
	Command Direction
	Value   int
}

type LocationP1 struct {
	position int
	depth    int
}

type LocationP2 struct {
	position int
	depth    int
	aim      int
}

type Submarine interface {
	forward(value int)
	backward(value int)
	down(value int)
	up(value int)
	location() int
}

// *************************
// * Part 1 implementation *
// *************************

func (lp1 *LocationP1) forward(value int) {
	lp1.position += value
}

func (lp1 *LocationP1) backward(value int) {
	lp1.position -= value
}

func (lp1 *LocationP1) down(value int) {
	lp1.depth += value
}

func (lp1 *LocationP1) up(value int) {
	lp1.depth -= value
}

func (lp1 *LocationP1) location() int {
	return lp1.position * lp1.depth
}

// *************************
// * Part 2 implementation *
// *************************

func (lp2 *LocationP2) forward(value int) {
	lp2.position += value
	lp2.depth = lp2.depth + lp2.aim*value
}

func (lp2 *LocationP2) backward(value int) {
	lp2.position -= value
	lp2.depth = lp2.depth - lp2.aim*value
}

func (lp2 *LocationP2) down(value int) {
	lp2.aim += value
}

func (lp2 *LocationP2) up(value int) {
	lp2.aim -= value
}

func (lp2 *LocationP2) location() int {
	return lp2.position * lp2.depth
}

// *************************
// * Cordinator            *
// *************************

func Day2() {
	lines, err := utils.ReadLines("2")

	if err != nil {
		log.Fatal(err)
	}

	instructions := make([]Instruction, len(lines))
	for index, line := range lines {
		split := strings.Split(line, " ")

		command, _ := parseDirection(split[0])
		value, _ := strconv.Atoi(split[1])

		instructions[index] = Instruction{
			Command: command,
			Value:   value,
		}
	}

	day2PartA(instructions)
	day2PartB(instructions)
}

func process(sub Submarine, instructions []Instruction) {
	for _, instruction := range instructions {
		switch instruction.Command {
		case Forward:
			sub.forward(instruction.Value)
		case Backward:
			sub.backward(instruction.Value)
		case Down:
			sub.down(instruction.Value)
		case Up:
			sub.up(instruction.Value)
		}
	}
}

func day2PartA(instructions []Instruction) {
	sub := LocationP1{0, 0}
	process(&sub, instructions)
	fmt.Printf("Day 2, Part A: %v\n", sub.location())
}

func day2PartB(instructions []Instruction) {
	sub := LocationP2{0, 0, 0}
	process(&sub, instructions)
	fmt.Printf("Day 2, Part B: %v\n", sub.location())
}
