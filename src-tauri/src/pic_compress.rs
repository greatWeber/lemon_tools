use std::{
    error::Error,
    fs::{self, File},
    io::{Read, Write},
};

use image::codecs::jpeg::JpegEncoder;
use image::imageops::FilterType;
use image::GenericImageView;

use mozjpeg::Compress;
use oxipng::{InFile, Options, OutFile};
use std::path::Path;

// 压缩图片
pub async fn compress_pic(path: &str) -> Result<(), Box<dyn Error>> {
    let new_path = Path::new(path);

    let extension = new_path
        .extension()
        .and_then(std::ffi::OsStr::to_str)
        .unwrap();
    println!("The file extension is: {}", extension);
    if extension == "png" {
        let options = Options::from_preset(6);
        let input_path = InFile::Path(new_path.to_path_buf());
        let output_path = OutFile::Path {
            path: Some(new_path.to_path_buf()),
            preserve_attrs: true,
        };
        tokio::task::spawn_blocking(move || {
            oxipng::optimize(&input_path, &output_path, &options).unwrap();
        })
        .await
        .unwrap();
    } else if extension == "jpg" || extension == "jpeg" {
        // 没找到一个好的压缩库，下面的压缩有的会增大体积

        let path = path.to_string();

        tokio::task::spawn_blocking(move || {
            // 加载图片
            let img = image::open(&path).unwrap();
            let jpg_path = Path::new(&path);
            std::fs::remove_file(jpg_path).unwrap();

            // 创建一个新的文件用于保存压缩后的图片
            let mut output = std::fs::File::create(jpg_path).unwrap();

            // 创建一个 JPEG 编码器
            let mut encoder = JpegEncoder::new_with_quality(&mut output, 40);

            // 获取图片的宽度和高度
            let dimensions = img.dimensions();

            // 获取图片的颜色数据
            let raw_data = img.to_rgba8().into_raw();

            // 使用编码器将颜色数据写入到新的文件中
            encoder
                .encode(
                    &raw_data,
                    dimensions.0,
                    dimensions.1,
                    image::ColorType::Rgba8,
                )
                .unwrap();
        })
        .await
        .unwrap();
    } else {
        let img = image::open(path).unwrap();
        let (width, height) = img.dimensions();
        let path = path.to_string();
        // FilterType::Nearest：最近邻插值
        // FilterType::Triangle：线性插值
        // FilterType::CatmullRom：Catmull-Rom插值
        // FilterType::Gaussian：高斯插值
        // FilterType::Lanczos3：Lanczos插值
        let compress_img = img.resize(width, height, FilterType::Gaussian);
        tokio::task::spawn_blocking(move || {
            compress_img.save(path).unwrap();
        })
        .await
        .unwrap();
    }
    Ok(())
}

// 遍历文件夹下的图片压缩(一层)
pub async fn compress_dir(path: &str) -> Result<(), Box<dyn Error>> {
    let dir = Path::new(path);
    if dir.exists() && dir.is_dir() {
        let entries = fs::read_dir(dir).unwrap();
        let pic_type = ["jpg", "png", "jpeg"];
        let mut path_array = vec![];
        for entry in entries {
            let entry = entry.unwrap();
            let path = entry.path();
            if path.is_file()
                && pic_type.contains(&path.extension().unwrap_or_default().to_str().unwrap())
            {
                path_array.push(path.clone());
                // println!("{:?}", path);
                // compress_pic(path.to_str().unwrap()).unwrap();
            }
        }

        let path_array_clone = path_array.clone();
        let handles: Vec<_> = path_array_clone
            .iter()
            .map(|path| {
                let path_str = path.to_str().unwrap().to_string();
                tokio::spawn(async move {
                    match compress_pic(&path_str).await {
                        Ok(()) => println!("{}", path_str),
                        Err(e) => eprintln!("{}", e),
                    }
                })
            })
            .collect();

        for handle in handles {
            let _ = handle.await;
        }

        Ok(())
    } else {
        Err("directory not found".into())
    }
}
