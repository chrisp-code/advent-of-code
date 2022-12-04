use std::env;
use std::process::exit;

mod common;
mod solutions;

fn main() {
    // Use run args for year, day, and optionally part
    // Run like: cargo run -- <year> <day>
    // Ex: cargo run -- 2021 1
    let (year, day) = get_args();
    let day_fn = solutions::get_year(year)(day);

    for part in ["A", "B"] {
        let start = std::time::Instant::now();
        let out = match part {
            "A" => day_fn.part_a(year, day),
            "B" => day_fn.part_b(year, day),
            _ => return println!("[-] Invalid Part"),
        };
        let time = start.elapsed().as_nanos();

        println!(
            "Year {}, Day {}, Part {}: {} ({})",
            year,
            day,
            part,
            out,
            common::time_unit(time)
        );
    }
}

fn get_args() -> (u32, u32) {
    // fn get_args() -> (Option<u32>, Option<u32>, Option<String>) {
    // let args: Vec<String> = env::args().skip(1).collect();
    // match args.len() {
    //     1 => (parse_int_arg(args[0]), None, None),
    //     2 => (parse_int_arg(args[0]), parse_int_arg(args[1]), None),
    //     3 => (
    //         parse_int_arg(args[0]),
    //         parse_int_arg(args[1]),
    //         Some(args[2].to_uppercase()),
    //     ),
    //     _ => {
    //         eprintln!("Can only accept <year>, <?day>, <?part>");
    //         exit(1);
    //     }
    // }

    let args = env::args()
        .skip(1)
        .map(|val: String| match val.parse::<u32>() {
            Ok(x) => x,
            Err(e) => {
                eprintln!("Value {} is not a valid integer [{}]", val, e);
                exit(1);
            }
        })
        .take(2)
        .collect::<Vec<u32>>();

    (args[0], args[1])
}

// fn parse_int_arg(arg: String) -> Option<u32> {
//     match arg.parse::<u32>() {
//         Ok(x) => Some(x),
//         Err(e) => {
//             eprintln!("Value {} is not a valid integer [{}]", arg, e);
//             None
//         }
//     }
// }
