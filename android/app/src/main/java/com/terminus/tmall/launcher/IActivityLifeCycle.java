package com.terminus.tmall.launcher;

/**
 * User : yh
 * Date : 2018/5/14
 */
public interface IActivityLifeCycle {
    public void onCreate();
    public void onPause();
    public void onResume();
    public void onDestroy();
}
