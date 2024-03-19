//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.terminus.tmall.module;

import android.annotation.SuppressLint;
import android.app.UiModeManager;
import android.os.Build;
import android.os.Build.VERSION;
import android.provider.Settings.Secure;
import androidx.annotation.Nullable;
import com.facebook.fbreact.specs.NativePlatformConstantsAndroidSpec;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.systeminfo.ReactNativeVersion;
import com.facebook.react.turbomodule.core.interfaces.TurboModule;
import java.util.HashMap;
import java.util.Map;

@ReactModule(
  name = "PlatformConstants"
)
@SuppressLint({"HardwareIds"})
public class AndroidInfoModule extends NativePlatformConstantsAndroidSpec implements TurboModule {
  public static final String NAME = "PlatformConstants";
  private static final String IS_TESTING = "IS_TESTING";

  public AndroidInfoModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  private String uiMode() {
    UiModeManager uiModeManager = (UiModeManager)this.getReactApplicationContext().getSystemService("uimode");
    switch(uiModeManager.getCurrentModeType()) {
      case 1:
        return "normal";
      case 2:
        return "desk";
      case 3:
        return "car";
      case 4:
        return "tv";
      case 5:
      default:
        return "unknown";
      case 6:
        return "watch";
    }
  }

  public String getName() {
    return "PlatformConstants";
  }

  @Nullable
  public Map<String, Object> getTypedExportedConstants() {
    HashMap<String, Object> constants = new HashMap();
    constants.put("Version", VERSION.SDK_INT);
    constants.put("Release", VERSION.RELEASE);
    constants.put("Serial", "");
    constants.put("Fingerprint", Build.FINGERPRINT);
    constants.put("Model", Build.MODEL);
    constants.put("Manufacturer", Build.MANUFACTURER);
    constants.put("Brand", Build.BRAND);
    constants.put("isTesting", "true".equals(System.getProperty("IS_TESTING")) || this.isRunningScreenshotTest());
    constants.put("reactNativeVersion", ReactNativeVersion.VERSION);
    constants.put("uiMode", this.uiMode());
    return constants;
  }

  @Override
  public boolean canOverrideExistingModule() {
    return true;
  }

  public String getAndroidID() {
    return Secure.getString(this.getReactApplicationContext().getContentResolver(), "android_id");
  }

  public void invalidate() {
  }

  private Boolean isRunningScreenshotTest() {
    try {
      Class.forName("com.facebook.testing.react.screenshots.ReactAppScreenshotTestActivity");
      return true;
    } catch (ClassNotFoundException var2) {
      return false;
    }
  }
}
