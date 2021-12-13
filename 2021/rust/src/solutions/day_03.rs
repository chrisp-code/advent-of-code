use crate::common::{self, Solution};

pub struct Day03 {}

fn load() -> Vec<Vec<u32>> {
  return common::load("3")
    .lines()
    .map(|x| {
      x.chars()
        .map(|c| c.to_digit(2).unwrap())
        .collect::<Vec<u32>>()
    })
    .collect::<Vec<Vec<u32>>>();
}

fn get_column(report: &Vec<Vec<u32>>, column: usize) -> Vec<u32> {
  return report
    .into_iter()
    .map(|line| *line.get(column).unwrap())
    .collect();
}

fn get_most_common(line: &Vec<u32>) -> u32 {
  let mut occurrences: [u32; 2] = [0, 0];

  for &val in line.into_iter() {
    if val == 0 {
      occurrences[0] += 1;
    } else {
      occurrences[1] += 1;
    }
  }

  let mut max = 0;
  let mut most_common = 0;

  for i in 0..occurrences.len() {
    let occurrence = occurrences[i];
    if occurrence > max || (occurrence == max && i == 1) {
      max = occurrence;
      most_common = i as u32;
    }
  }

  return most_common;
}

fn get_least_common(line: &Vec<u32>) -> u32 {
  let mut occurrences: [u32; 2] = [0, 0];

  for &val in line.into_iter() {
    if val == 0 {
      occurrences[0] += 1;
    } else {
      occurrences[1] += 1;
    }
  }

  let mut min = 4294967295;
  let mut least_common = 0;

  for i in 0..occurrences.len() {
    let occurrence = occurrences[i];
    if occurrence < min || (occurrence == min && i == 0) {
      min = occurrence;
      least_common = i as u32;
    }
  }

  return least_common;
}

fn filter_to_common(
  report: &Vec<Vec<u32>>,
  get_common: fn(line: &Vec<u32>) -> u32,
  column_number: usize,
) -> String {
  let num_lines = report.len();
  // let columns = report.get(0).unwrap().len();

  if num_lines == 1 {
    return report
      .get(0)
      .unwrap()
      .clone()
      .into_iter()
      .map(|x| x.to_string())
      .collect::<Vec<String>>()
      .join("");
  }

  let column = get_column(&report, column_number);
  let common = get_common(&column);

  let filtered_report = report
    .into_iter()
    .filter(|x| *x.get(column_number).unwrap() == common)
    .cloned()
    .collect::<Vec<Vec<u32>>>();

  filter_to_common(&filtered_report, get_common, column_number + 1)
}

impl Solution for Day03 {
  fn name(&self) -> String {
    "Binary Diagnostic".to_owned()
  }

  fn part_a(&self) -> String {
    let report = load();
    let columns = report.get(0).unwrap().len();

    return (0..columns)
      .map(|x| get_column(&report, x))
      .map(|x| [get_most_common(&x), get_least_common(&x)])
      .fold(
        [String::new(), String::new()],
        |[gamma, epsilon], [m, l]| {
          [
            [gamma, m.to_string()].concat(),
            [epsilon, l.to_string()].concat(),
          ]
        },
      )
      .map(|x| u32::from_str_radix(&x, 2).unwrap())
      .into_iter()
      .fold(1, |acc, x| acc * x)
      .to_string();
  }

  fn part_b(&self) -> String {
    let report = load();

    let oxygen = filter_to_common(&report, get_most_common, 0);
    let co2 = filter_to_common(&report, get_least_common, 0);

    let oxygen_generator_rating = u32::from_str_radix(&oxygen, 2).unwrap();
    let co2_scrubber_rating = u32::from_str_radix(&co2, 2).unwrap();

    let life_support_rating = oxygen_generator_rating * co2_scrubber_rating;

    return life_support_rating.to_string();
  }
}
