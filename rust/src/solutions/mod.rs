use crate::common::{DayFn, NotImplementedSolution, Solution};

pub mod y_2021;
pub mod y_2022;

pub fn get_year(year: u32) -> DayFn {
    match year {
        2021 => y_2021::get_day,
        2022 => y_2022::get_day,
        _ => {
            println!("Unknown year: {}", year);

            |_day: u32| -> Box<&'static dyn Solution> { Box::new(&NotImplementedSolution {}) }
        }
    }
}
