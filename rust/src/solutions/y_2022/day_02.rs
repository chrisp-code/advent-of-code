use crate::common::{self, Solution};

pub struct Day02 {}

enum Direction {
  Forward,
  Backward,
  Down,
  Up,
}

struct Instruction {
  command: Direction,
  value: u32,
}

fn load(year: u32, day: u32) -> Vec<Instruction> {
  return common::load(year, day)
    .lines()
    .map(|x| x.split(' ').collect::<Vec<&str>>())
    .map(|x| {
      return Instruction {
        command: match x[0] {
          "forward" => Direction::Forward,
          "backward" => Direction::Backward,
          "down" => Direction::Down,
          "up" => Direction::Up,
          &_ => Direction::Forward,
        },
        value: x[1].parse::<u32>().unwrap(),
      };
    })
    .collect::<Vec<Instruction>>();
}

impl Solution for Day02 {
  fn name(&self) -> String {
    "Dive!".to_owned()
  }

  fn part_a(&self, year: u32, day: u32) -> String {
    let data = load(year, day);
    let mut pos = 0;
    let mut depth = 0;

    for i in 0..data.len() {
      let Instruction { command, value } = &data[i];
      match command {
        Direction::Forward => pos += value,
        Direction::Backward => pos -= value,
        Direction::Down => depth += value,
        Direction::Up => depth -= value,
      }
    }

    return (pos * depth).to_string();
  }

  fn part_b(&self, year: u32, day: u32) -> String {
    let data = load(year, day);
    let mut aim = 0;
    let mut pos = 0;
    let mut depth = 0;

    for i in 0..data.len() {
      let Instruction { command, value } = &data[i];
      match command {
        Direction::Forward => {
          pos += value;
          depth += aim * value;
        }
        Direction::Backward => {
          pos -= value;
          depth -= aim * value;
        }
        Direction::Down => aim += value,
        Direction::Up => aim -= value,
      }
    }

    return (pos * depth).to_string();
  }
}
