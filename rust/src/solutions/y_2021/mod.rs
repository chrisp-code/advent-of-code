use crate::common::{Solution, NotImplementedSolution};

pub mod day_01;
pub mod day_02;
pub mod day_03;

pub fn get_day(day: u32) -> Box<&'static dyn Solution> {
    return match day {
        1 => Box::new(&day_01::Day01 {}),
        2 => Box::new(&day_02::Day02 {}),
        3 => Box::new(&day_03::Day03 {}),
        _ => {
            println!("Unknown day: {}", day);
            return Box::new(&NotImplementedSolution {});
        }
    }
}