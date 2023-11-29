// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod create_icon;
mod sys;
mod video;

use std::process::Command;

use serde::Serialize;
use sys::SysInfo;


#[derive(Serialize)]
struct Pic {
    width: usize,
    height: usize,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn create_icon_create(base64: &str,sizes: Vec<String>,path: &str,format: &str) -> Result<String, String> {
    let rs = create_icon::create(&base64,&sizes,&path,&format).await;
    if rs.is_ok() {
        // 成功后打开目录
        Command::new("open")
                .arg(path)
                .spawn()
                .expect("Failed to open directory");
        Ok("200".to_string())
    }else {
        Err("500".to_string())
    }
    
}

#[tauri::command]
fn get_system_info() -> SysInfo{
   let sys_info = sys::get_system_info();
   sys_info
}

#[tauri::command]
fn convert_video_format(suffix: &str, input_path: &str, output_path: &str, captions: bool) -> Result<String, String> {
    let rs = video::convert_video_format(suffix,input_path, output_path,captions);
    if rs.is_ok() {
        Ok("200".to_string())
    }else {
        Err("500".to_string())
    }
}



fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![create_icon_create,get_system_info,convert_video_format])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
