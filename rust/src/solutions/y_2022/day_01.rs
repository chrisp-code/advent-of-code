use crate::common::{load, Solution};

pub struct Day01 {}

fn calculate_calories(year: u32, day: u32) -> Vec<u32> {
    let mut data = load(year, day)
        .split("\n\n")
        .map(|individual| -> u32 {
            individual
                .split('\n')
                .map(|x| x.parse::<u32>().unwrap())
                .reduce(|acc, item| acc + item)
                .unwrap()
        })
        .collect::<Vec<u32>>();

    data.sort();
    data.reverse();
    data
}

impl Solution for Day01 {
    fn name(&self) -> String {
        "Calorie Counting".to_owned()
    }

    fn part_a(&self, year: u32, day: u32) -> String {
        calculate_calories(year, day).first().unwrap().to_string()
    }

    fn part_b(&self, year: u32, day: u32) -> String {
        calculate_calories(year, day)
            .drain(0..2)
            .reduce(|acc, calories| acc + calories)
            .unwrap()
            .to_string()
    }
}
