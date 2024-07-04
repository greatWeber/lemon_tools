use std::{error::Error, path::Path};

use base64::{
    engine::{self, general_purpose},
    Engine as _,
};
use image::ImageFormat;
use regex::Regex;

/**
 * 根据传入的base64数据，生成不同尺寸的图片
 */
pub async fn create(
    base64_string: &str,
    sizes: &Vec<String>,
    path: &str,
    format: &str,
) -> Result<(), Box<dyn Error>> {
    // println!("creating base64 {:?}", base64_string);

    let image_data = general_purpose::STANDARD.decode(base64_string).unwrap();
    // println!("image_data: {:?}", image_data);
    let image: image::DynamicImage = image::load_from_memory(&image_data).unwrap();

    async fn save_icon(
        image: &image::DynamicImage,
        size: &str,
        path: &str,
        format_str: &str,
    ) -> Result<(), Box<dyn Error>> {
        let width = size.parse::<u32>().unwrap();
        // 转换图片尺寸
        let small_image = image.resize(width, width, image::imageops::FilterType::Triangle);
        // 保存图片
        let size_owned = size.to_owned();
        let path_owned = path.to_owned();
        let format_owned = format_str.to_owned();
        let re = Regex::new(r"\{\}").unwrap();

        //   tokio::task::spawn_blocking({
        //     let size_owned = size_owned.clone();
        //     let path_owned = path_owned.clone();
        //     let small_image = small_image.clone();
        //     let format_str = format_owned.clone();
        //     move || {
        //         let name = re.replace_all(&format_str, &size_owned);
        //         let path = Path::new(&path_owned).join(&format!("{}.png", name));
        //         small_image.save_with_format(&path, ImageFormat::Png).unwrap();
        //     }
        // }).await.unwrap();

        tokio::task::spawn_blocking(move || {
            let name = re.replace_all(&format_owned, &size_owned);
            let path = Path::new(&path_owned).join(&format!("{}.png", name));
            small_image
                .save_with_format(&path, ImageFormat::Png)
                .unwrap();
        })
        .await
        .unwrap();

        Ok(())
    }

    let handles: Vec<_> = sizes
        .iter()
        .map(|s| {
            let s = s.to_string();
            let image = image.clone();
            let path = path.to_string();
            let format = format.to_string();
            tokio::spawn(async move {
                match save_icon(&image, &s, &path, &format).await {
                    Ok(_) => println!("{}", s),
                    Err(e) => eprintln!("{}", e),
                }
            })
        })
        .collect();

    for handle in handles {
        let _ = handle.await;
    }

    Ok(())
}
