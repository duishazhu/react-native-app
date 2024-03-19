#!/bin/sh
if [[ "$CONFIGURATION" == "Release" ]]; then
  echo '[Release] remove DoraemonKit.bundle'
  rm -rf "${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/DoraemonKit.bundle"
fi
sed -i '' '/^\/\/#import/d' "${SRCROOT}/Pods/AlicloudUT/ut/UTMini.framework/Headers/UTTracker.h"

# node ../node_modules/@terminus/react-native-tms/dist/bin.js link
