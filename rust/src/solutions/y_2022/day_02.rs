use crate::common::{self, Solution};

pub struct Day02 {}

fn apply_rules(rounds: Vec<String>) -> i32 {
    rounds
        .into_iter()
        .map(|x| {
            match x.as_str() {
                "A Z" => 3,     // lose
                "B X" => 1,     // lose
                "C Y" => 2,     // lose
                "A X" => 1 + 3, // draw
                "B Y" => 2 + 3, // draw
                "C Z" => 3 + 3, // draw
                "A Y" => 2 + 6, // win
                "B Z" => 3 + 6, // win
                "C X" => 1 + 6, // win
                _ => 0,
            }
        })
        .reduce(|acc, item| acc + item)
        .unwrap()
}

impl Solution for Day02 {
    fn name(&self) -> String {
        "Dive!".to_owned()
    }

    fn part_a(&self, year: u32, day: u32) -> String {
        apply_rules(
            common::load(year, day)
                .split('\n')
                .map(String::from)
                .collect(),
        )
        .to_string()
    }

    fn part_b(&self, year: u32, day: u32) -> String {
        apply_rules(
            common::load(year, day)
                .split('\n')
                .map(|x| {
                    let actions = x.split(' ').collect::<Vec<&str>>();
                    let opp = actions[0];
                    let outcome = actions[1];

                    let converted_character = match outcome {
                        // lose
                        "X" => match opp {
                            "A" => "Z",
                            "B" => "X",
                            "C" => "Y",
                            _ => "",
                        },
                        // draw
                        "Y" => match opp {
                            "A" => "X",
                            "B" => "Y",
                            "C" => "Z",
                            _ => "",
                        },
                        // win
                        "Z" => match opp {
                            "A" => "Y",
                            "B" => "Z",
                            "C" => "X",
                            _ => "",
                        },
                        _ => "",
                    };

                    format!("{opp} {converted_character}")
                })
                .collect(),
        )
        .to_string()
    }
}
