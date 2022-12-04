use std::fs;

const TIME_UNITS: &[&str] = &["ns", "μs", "ms", "s"];

pub type DayFn = fn(u32) -> Box<&'static dyn Solution>;

pub fn load(year: u32, day: u32) -> String {
    let file = format!("../input/{}/{}.txt", year, day);
    fs::read_to_string(&file).unwrap_or_else(|_| panic!("Error reading file {}/{}", year, file))
}

pub trait Solution {
    // const NAME: String;
    fn name(&self) -> String;
    fn part_a(&self, year: u32, day: u32) -> String;
    fn part_b(&self, year: u32, day: u32) -> String;
}

pub struct NotImplementedSolution {}

impl Solution for NotImplementedSolution {
    fn name(&self) -> String {
        "NOT IMPLEMENTED".to_owned()
    }

    fn part_a(&self, _year: u32, _day: u32) -> String {
        "".to_string()
    }

    fn part_b(&self, _year: u32, _day: u32) -> String {
        "".to_string()
    }
}

pub fn time_unit(time: u128) -> String {
    let mut time = time;
    for i in TIME_UNITS {
        if time < 1000 {
            return format!("{}{}", time, i);
        }
        time /= 1000;
    }

    format!("{}{}", time, TIME_UNITS.last().unwrap())
}
