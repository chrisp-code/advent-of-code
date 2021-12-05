use std::io::{self};

fn main() -> io::Result<()> {
  let mut reader = my_reader::BufReader::open("../input/01.txt")?;
  let mut buffer = String::new();

  let mut previous: Option<u32> = None;
  let mut current: Option<u32>;
  let mut increases: u32 = 0;

  while let Some(line) = reader.read_line(&mut buffer) {
    current = Some(line?.trim().parse::<u32>().unwrap());

    if let Some(_previous) = previous {
      if previous < current {
        increases = increases + 1;
      }
    }

    previous = current;
  }

  println!("{}", increases);

  return Ok(());
}

mod my_reader {
  use std::{
    fs::File,
    io::{self, prelude::*},
  };

  pub struct BufReader {
    reader: io::BufReader<File>,
  }

  impl BufReader {
    pub fn open(path: impl AsRef<std::path::Path>) -> io::Result<Self> {
      let file = File::open(path)?;
      let reader = io::BufReader::new(file);

      Ok(Self { reader })
    }

    pub fn read_line<'buf>(
      &mut self,
      buffer: &'buf mut String,
    ) -> Option<io::Result<&'buf mut String>> {
      buffer.clear();

      self
        .reader
        .read_line(buffer)
        .map(|u| if u == 0 { None } else { Some(buffer) })
        .transpose()
    }
  }
}
