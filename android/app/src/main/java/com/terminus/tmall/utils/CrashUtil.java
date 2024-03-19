package com.terminus.tmall.utils;

public class CrashUtil {
    public static void crashHandler(){
        final Thread.UncaughtExceptionHandler mDefaultHandler = Thread.getDefaultUncaughtExceptionHandler();
        Thread.setDefaultUncaughtExceptionHandler(new Thread.UncaughtExceptionHandler() {
            @Override
            public void uncaughtException(Thread t, Throwable e) {
                mDefaultHandler.uncaughtException(t,e);
            }
        });
    }
}
