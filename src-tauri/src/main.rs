// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::Serialize;

#[derive(Serialize)]
struct Pic {
    width: usize,
    height: usize,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)

}
#[tauri::command]
fn get_pic(size: usize) -> Pic {
    let pic = Pic {
        width: size,
        height: size
    };
    pic
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet,get_pic])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
