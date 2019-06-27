#!/bin/bash

# 获取脚本路径
HOME_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${HOME_DIR}

python excel2ts.py ../../design/excel ../../client/tkProj/assets/scripts/db/