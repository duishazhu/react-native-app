package com.terminus.tmall.launcher;

import android.app.Activity;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.terminus.tmall.common.LaunchImageDialog;

import java.lang.ref.WeakReference;
import java.lang.reflect.Field;

/**
 * User : yh
 * Date : 2018/5/14
 */
public class LauncherDelegate implements IActivityLifeCycle {

    private static final int DEFAULT_LAUNCH_TIME_OUT = 5000;

    private WeakReference<ReactRootView> mRootViewWeakReference;
    private WeakReference<ReactActivity> mReactActivityWeakReference;
    private LaunchImageDialog mLaunchImageDialog;
    private IJSBundle mIJSBundle;
    private boolean loadFinish = false;

    public LauncherDelegate(ReactActivity reactActivity, IJSBundle mJSBundleLoadCallBack) {
        mReactActivityWeakReference = new WeakReference<>(reactActivity);
        mIJSBundle = mJSBundleLoadCallBack;
    }

    public void showLaunchImageDialog(Activity activity) {
        mLaunchImageDialog = new LaunchImageDialog(activity);
        mLaunchImageDialog.show();
    }

    @Override
    public void onCreate() {
        ReactRootView rootView = getReactRootView();
        if (rootView == null && mLaunchImageDialog != null) {
            mLaunchImageDialog.closeDialog(DEFAULT_LAUNCH_TIME_OUT);
            return;
        }
        mRootViewWeakReference = new WeakReference<>(rootView);
        rootView.setOnHierarchyChangeListener(new ViewGroup.OnHierarchyChangeListener() {
            @Override
            public void onChildViewAdded(View parent, View child) {
                if(!loadFinish) {
                    closeLaunchImageDialog();
                }
                if (!loadFinish && mIJSBundle != null) {
                    mIJSBundle.onBundleLoadFinish();
                }
                loadFinish = true;
            }

            @Override
            public void onChildViewRemoved(View parent, View child) {

            }
        });
    }

    @Override
    public void onPause() {

    }

    @Override
    public void onResume() {

    }

    @Override
    public void onDestroy() {
        mRootViewWeakReference.clear();
        mReactActivityWeakReference.clear();
        mRootViewWeakReference = null;
        mReactActivityWeakReference = null;
        closeLaunchImageDialog();
    }

    public void closeLaunchImageDialog() {
        if(mLaunchImageDialog != null && mLaunchImageDialog.isShowing()) {
            mLaunchImageDialog.dismiss();
        }
        mLaunchImageDialog = null;
    }

    private ReactRootView getReactRootView() {
        if (mReactActivityWeakReference == null) {
            return null;
        }
        ReactActivity reactActivity = mReactActivityWeakReference.get();
        if (reactActivity == null) {
            return null;
        }
        try {
            Field field = ReactActivity.class.getDeclaredField("mDelegate");
            field.setAccessible(true);
            ReactActivityDelegate delegate = (ReactActivityDelegate) field.get(reactActivity);
            Field rootViewField = ReactActivityDelegate.class.getDeclaredField("mReactRootView");
            rootViewField.setAccessible(true);
            ReactRootView rootView = (ReactRootView) rootViewField.get(delegate);
            return rootView;
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return null;
    }
}
