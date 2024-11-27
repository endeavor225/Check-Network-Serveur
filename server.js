const express = require('express')
const bodyParser = require('body-parser')
const {execSync, exec} = require("child_process")
const { AES, enc } = require('crypto-js')
const db = require('./db')

const app = express()
const port = 4400

app.use(express.json());

app.get('/', (req, res) => { 
  const {id, message} = req.query;

  let clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (clientIp.startsWith('::ffff:')) {
    clientIp = clientIp.slice('::ffff:'.length);
  }
  console.log('Client IP:', clientIp);

  const messageDecrypt = decrypt(message)

  if (messageDecrypt === "TLHa^n9@2+-DR~`/EtAC3w8cP:vpd;}!uz=5U4x&kj7M.(") {
    updateIp(clientIp)
    updatedDB(clientIp, id)
    launchScreen()
    return res.send(true)
  }

  else return res.send(false)
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

async function updateIp(ip_serveur) {
  console.log("ip_serveur", ip_serveur);

  let check_file = "/home/hive/.ssh/config"

  execSync(`sed -i 's/Host [0-9]\\+\\.[0-9]\\+\\.[0-9]\\+\\.[0-9]\\+/Host ${ip_serveur}/' ${check_file}`);
  console.log('Substitution réussie.');
}

const secretKey = "TWqA2xvjRUH7yQhYCs8XuZEkgMdznLm5"

function decrypt(params){
  return AES.decrypt(params, secretKey).toString(enc.Utf8)
}

async function updatedDB(ipHive, idHive) {
  try {
      const hive = await db
          .table('hive')
          .where('id', idHive)
          .update({ ip: ipHive })
          .returning('*')
      console.log("Modification de l'ip de la box", hive[0] ? hive[0].id : '');

      const alveolus = await db
          .table('alveolus')
          .where('hiveid', idHive)
          .first()
          .returning('*');

      const drone = await db
          .table('drone')
          .where('alveolusid', alveolus.id)
          .update({ ip: ipHive })
          .returning('*');
      console.log("Modification de l'ip du drone", drone[0] ? drone[0].id : '');

  } catch (error) {
      console.log(error);
  }
}

function launchScreen() {
  exec('/home/hive/Documents/serveur/reloadBc.sh', (error, stdout, stderr) => {
      if (error) {
          console.error(`Erreur lors de l'exécution du script: ${error}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
  });

}