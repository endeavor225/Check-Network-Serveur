#!/bin/sh

# BootChecker
cd ~/hive/dev/SOTH/BootChecker/
screen -S bc -X quit
screen -S bc -d -m -L
screen -S bc -X exec ./bootChecker