let validateEnv = function ()
{
  const presentButEmpty = ['DB_PASSWORD', 'DB_USER'];
  const nonEmptyEnvVars = ['JWT_SECRET', 'DB_NAME', 'MY_PORT'];
  let missingEnvVars = [];

  presentButEmpty.forEach(element => {
    if(!process.env.hasOwnProperty(element)){
      missingEnvVars.push(element);
    }
  });

  nonEmptyEnvVars.forEach(element => {
    if(!process.env[element]) {
      missingEnvVars.push(element);
    }
  });

  if(missingEnvVars.length) {
    console.log("Set missing env vars:", missingEnvVars);
    throw("Missing Env Vars:" + missingEnvVars);
  }
}

module.exports = validateEnv;
