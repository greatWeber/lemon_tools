// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod create_icon;
mod pic_compress;
mod search_file;
mod sys;
mod video;

use std::{path::PathBuf, process::Command};

use serde::Serialize;
use sys::SysInfo;

#[derive(Serialize)]
struct Pic {
    width: usize,
    height: usize,
}

#[derive(Serialize)]
struct ResultInfo<T> {
    code: String,
    data: T,
    message: String,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn create_icon_create(
    base64: &str,
    sizes: Vec<String>,
    path: &str,
    format: &str,
) -> Result<String, String> {
    let rs = create_icon::create(&base64, &sizes, &path, &format).await;
    if rs.is_ok() {
        // 成功后打开目录
        Command::new("open")
            .arg(path)
            .spawn()
            .expect("Failed to open directory");
        Ok("200".to_string())
    } else {
        Err("500".to_string())
    }
}

#[tauri::command]
fn get_system_info() -> SysInfo {
    let sys_info = sys::get_system_info();
    sys_info
}

#[tauri::command]
fn convert_video_format(
    suffix: &str,
    input_path: &str,
    output_path: &str,
    captions: bool,
) -> Result<String, String> {
    let rs = video::convert_video_format(suffix, input_path, output_path, captions);
    if rs.is_ok() {
        Ok("200".to_string())
    } else {
        Err("500".to_string())
    }
}

#[tauri::command]
async fn compress_pic(
    path: &str,
) -> Result<ResultInfo<Option<String>>, ResultInfo<Option<String>>> {
    let rs = pic_compress::compress_pic(path).await;
    if rs.is_ok() {
        Ok(ResultInfo {
            code: "200".to_string(),
            data: None,
            message: "操作成功".to_string(),
        })
    } else {
        Err(ResultInfo {
            code: "500".to_string(),
            data: None,
            message: "操作失败".to_string(),
        })
    }
}

#[tauri::command]
async fn compress_dir(
    path: &str,
) -> Result<ResultInfo<Option<String>>, ResultInfo<Option<String>>> {
    let rs = pic_compress::compress_dir(path).await;
    if rs.is_ok() {
        Ok(ResultInfo {
            code: "200".to_string(),
            data: None,
            message: "操作成功".to_string(),
        })
    } else {
        Err(ResultInfo {
            code: "500".to_string(),
            data: None,
            message: "操作失败".to_string(),
        })
    }
}

#[tauri::command]
fn search(path: &str, search_name: &str) -> Result<ResultInfo<Vec<PathBuf>>, ResultInfo<String>> {
    let path = PathBuf::from(path);
    println!(
        "path:{}, search_name:{}",
        path.to_str().unwrap(),
        search_name
    );
    match search_file::search(&path, search_name) {
        Ok(rs) => Ok(ResultInfo {
            code: "200".to_string(),
            data: rs,
            message: "操作成功".to_string(),
        }),
        Err(err) => Err(ResultInfo {
            code: "500".to_string(),
            data: err.to_string(),
            message: "操作失败".to_string(),
        }),
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_notification::init())
        .invoke_handler(tauri::generate_handler![
            create_icon_create,
            get_system_info,
            convert_video_format,
            compress_pic,
            compress_dir,
            search
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
