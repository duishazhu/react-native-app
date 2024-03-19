package com.terminus.tmall.common;

import android.app.Activity;
import android.app.Dialog;
import android.os.Bundle;
import android.os.Handler;
import androidx.annotation.NonNull;
import android.view.ViewGroup;
import android.widget.ImageView;

import com.terminus.tmall.R;

/**
 * User : yh
 * Date : 2018/5/14
 */
public class LaunchImageDialog extends Dialog{
    private static final String LAUNCH_IMAGE_NAME = "start_up";

    private Activity mActivity;

    public LaunchImageDialog(@NonNull Activity context) {
        super(context, R.style.DialogFullscreen);
        mActivity = context;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setCanceledOnTouchOutside(false);
        setCancelable(false);
    }

    @Override
    public void show() {
        int resId = getLaunchImageResource();
        if(resId == 0) {
            return;
        }
        super.show();
        ImageView imageView = new ImageView(mActivity);
        imageView.setScaleType(ImageView.ScaleType.FIT_XY);
        imageView.setImageResource(resId);
        ViewGroup.LayoutParams layoutParams = new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
        setContentView(imageView, layoutParams);
    }

    public void closeDialog(int timeout) {
        new Handler(mActivity.getMainLooper()).postDelayed(new Runnable() {
            @Override
            public void run() {
                dismiss();
            }
        }, timeout);
    }

    private int getLaunchImageResource(){
        String packageName = getContext().getPackageName();
        int resId = getContext().getResources().getIdentifier(
                LAUNCH_IMAGE_NAME,"mipmap", packageName
        );
        return resId;
    }
}
