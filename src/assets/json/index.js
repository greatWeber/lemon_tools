const modules = import.meta.glob('./*.json');



async function getModule(){
  const jsonObj = {};
  for (const path in modules) {
    const mod = await modules[path]();
    let name = '';
    path.replace(/(\d+)\.json/g,($1,$2)=>{
      name = $2;
      console.log(name);
      jsonObj[name] = mod.default
    });
  }

  return jsonObj;
}

// const jsonObj = await getModule();

// console.log('jsonObj',jsonObj);

// export default jsonObj;

export default getModule;

