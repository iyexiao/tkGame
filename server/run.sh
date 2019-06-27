#!/bin/bash
HOME_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd ${HOME_DIR}
output=`tsc --outDir debug --resolveJsonModule -t ES5 Hello.ts`
cd ${HOME_DIR}"/debug/server"
node Hello.js>${HOME_DIR}"/log.txt"
echo "run -succes ..."