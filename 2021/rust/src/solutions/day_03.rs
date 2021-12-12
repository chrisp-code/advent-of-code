use crate::common::{self, Solution};
use std::collections::HashMap;

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

fn get_frequencies(line: &Vec<u32>) -> [u32; 2] {
  let frequencies = line
    .into_iter()
    .fold(HashMap::<u32, usize>::new(), |mut m, x| {
      *m.entry(*x).or_default() += 1;
      m
    });

  let min = frequencies
    .clone()
    .into_iter()
    .min_by_key(|(_, v)| *v)
    .map(|(k, _)| k)
    .unwrap();

  let max = frequencies
    .clone()
    .into_iter()
    .max_by_key(|(_, v)| *v)
    .map(|(k, _)| k)
    .unwrap();

  return [min, max];
}

fn get_most_common(line: &Vec<u32>) -> u32 {
  let [min, max] = get_frequencies(line);

  if min == max {
    return 1;
  }

  return max;
}

fn get_least_common(line: &Vec<u32>) -> u32 {
  let [min, max] = get_frequencies(line);

  if min == max {
    return 0;
  }

  return min;
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

    println!(
      "oxygen: {}, co2: {}, oxygenGeneratorRating: {}, CO2ScrubberRating: {}",
      oxygen, co2, oxygen_generator_rating, co2_scrubber_rating
    );

    let life_support_rating = oxygen_generator_rating * co2_scrubber_rating;

    return life_support_rating.to_string();
  }
}
