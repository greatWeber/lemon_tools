use regex::Regex;
use std::env;
use std::fs;
use std::io;
use std::path::{Path, PathBuf};

pub fn search(path: &Path, search_name: &str) -> io::Result<Vec<PathBuf>> {
    let mut result = Vec::new();

    let full_path = if path.is_relative() {
        env::home_dir()
            .ok_or_else(|| {
                io::Error::new(
                    io::ErrorKind::NotFound,
                    "Unable to determine user's home directory",
                )
            })?
            .join(path)
    } else {
        path.to_path_buf() // 如果path已经是绝对路径，则直接使用它
    };

    let re = Regex::new(&format!("(?i){}", search_name)).unwrap();

    fn traverse(path: &Path, re: &Regex, result: &mut Vec<PathBuf>) -> io::Result<()> {
        if let Ok(entries) = fs::read_dir(path) {
            for entry in entries {
                let entry = entry?;
                let entry_path = entry.path();
                let file_name = entry_path.file_name().unwrap().to_str().unwrap();

                if entry_path.is_file() && re.is_match(file_name) {
                    result.push(entry_path)
                } else if entry_path.is_dir() {
                    traverse(&entry_path, re, result)?;
                }
            }
        }
        Ok(())
    }

    traverse(&full_path, &re, &mut result)?;
    // println!("search path: {:?}", env::home_dir());
    println!("search  result: {:?}", result);
    Ok(result)
}
