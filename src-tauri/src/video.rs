
use std::process::Command;

// 转换视频格式
pub fn convert_video_format(suffix: &str, input_path: &str, output_path: &str, captions: bool) -> std::io::Result<()> {
    let mut output;
    if suffix == "mp4" {
        // ffmpeg -i input.mkv -c copy -c:a aac -movflags +faststart output.mp4
        output = Command::new("ffmpeg")
        .arg("-i")
        .arg(input_path)
        .arg("-c")
        .arg("copy")
        .arg("-c:a")
        .arg("aac")
        .arg("-movflags")
        .arg("+faststart")
        .arg(output_path)
        .output()?;
    }else if captions && suffix == "mp4" {
        // ffmpeg -i input.mkv -c copy -c:a aac -scodec copy output.mp4
        // ffmpeg -i input.mkv -c:v copy -c:a aac -map 0 output.mp4
        output = Command::new("ffmpeg")
        .arg("-i")
        .arg(input_path)
        .arg("-c")
        .arg("copy")
        .arg("-c:a")
        .arg("aac")
        .arg("-scodec")
        .arg("copy")
        .arg(output_path)
        .output()?;
    }
    
    else {
        output = Command::new("ffmpeg")
        .arg("-i")
        .arg(input_path)
        .arg("-vcodec")
        .arg("copy")
        .arg("-acodec")
        .arg("copy")
        .arg(output_path)
        .output()?;
    }
    

    if !output.status.success() {
        return Err(std::io::Error::new(std::io::ErrorKind::Other, "ffmpeg failed"));
    }

    Ok(())
}