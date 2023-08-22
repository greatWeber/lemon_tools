
use std::ffi::OsString;

use serde::Serialize;
use sysinfo::{NetworkExt, NetworksExt, ProcessExt, System, SystemExt, ComponentExt, Cpu, Disk, CpuExt, DiskExt};

#[derive(Serialize, Clone)]
pub struct MyCpu {
  name: String,
  cpu_usage: f32,
  frequency: u64,
  vendor_id: String,
  brand: String,
}

#[derive(Serialize, Clone)]
pub struct MyDisk {
  name: OsString,
  total_space: u64,
  available_space: u64,
}


#[derive(Serialize)]
pub struct SysInfo {
  total_memory: u64,
  used_memory: u64,
  cpus: Vec<MyCpu>,
  disks: Vec<MyDisk>,
  system_os_version: String,
  system_host_name: String,
}

pub fn get_system_info() -> SysInfo {
  let mut sys = System::new_all();

// First we update all information of our `System` struct.
sys.refresh_all();

// We display all disks' information:
println!("=> disks:");
for disk in sys.disks() {
    println!("{:?}", disk);
}

// Network interfaces name, data received and data transmitted:
// println!("=> networks:");
// for (interface_name, data) in sys.networks() {
//     println!("{}: {}/{} B", interface_name, data.received(), data.transmitted());
// }

// Components temperature:
println!("=> components:");
for component in sys.components() {
  println!("{}: {}°C", component.label(), component.temperature());
}

println!("=> system:");
// RAM and swap information:
println!("total memory: {} bytes", sys.total_memory());
println!("used memory : {} bytes", sys.used_memory());
println!("total swap  : {} bytes", sys.total_swap());
println!("used swap   : {} bytes", sys.used_swap());

// Display system information:
println!("System name:             {:?}", sys.name());
println!("System kernel version:   {:?}", sys.kernel_version());
println!("System OS version:       {:?}", sys.os_version());
println!("System host name:        {:?}", sys.host_name());

// Number of CPUs:
println!("NB CPUs: {:?}", sys.cpus());

let cpus: Vec<MyCpu> = sys.cpus().iter().map(|cpu| {
  MyCpu {
      // 这里初始化你的字段
      name: cpu.name().to_owned(),
      cpu_usage: cpu.cpu_usage().to_owned(),
      frequency: cpu.frequency().to_owned(),
      vendor_id: cpu.vendor_id().to_owned(),
      brand: cpu.brand().to_owned(),
  }
}).collect();

let disks: Vec<MyDisk> = sys.disks().iter().map(|disk| {
  MyDisk {
    name: disk.name().to_owned(),
    total_space: disk.total_space().to_owned(),
    available_space: disk.available_space().to_owned(),
  }
}).collect();

let sys_info = SysInfo {
  total_memory: sys.total_memory(),
  used_memory: sys.used_memory(),
  cpus,
  disks,
  system_os_version: sys.os_version().unwrap_or_else(|| "".to_owned()),
  system_host_name: sys.host_name().unwrap_or_else(|| "".to_owned()),
};

sys_info
  // println!("{}", serde_json::to_string(&sys).unwrap());
}