# Check-Network-Server (Server)

Application pour reconnaitre les ip du même reseau Jool-Box

## Installer les dépendances
```bash
yarn
# or
npm install
```

## Démarrez l'application en mode développement
```bash
yarn serve
```

## Commande pour compiler le code
```bash
yarn build
# or
pkg -t node18-linux-x64 -o server --public server.js 
```

## reloadBc.sh
Script bash pour redemarrer BootChecker

```bash
#!/bin/sh

cd ~/hive/dev/SOTH/BootChecker/
screen -S bc -X quit
screen -S bc -d -m -L
screen -S bc -X exec ./bootChecker
```

## Pour accorder les permissions au fichier reloadBc.sh
```bash
sudo chmod +x chemin-du-fichier/reloadBc.sh
```



