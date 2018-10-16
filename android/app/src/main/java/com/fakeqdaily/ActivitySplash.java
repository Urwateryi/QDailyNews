package com.fakeqdaily;

import android.app.Activity;
import android.app.Dialog;

/**
 * Description:启动页
 * <p>
 * Author: yi.zhang
 * Time: 2018/4/20 0020
 * E-mail: yi.zhang@rato360.com
 */
public class ActivitySplash {
    private static Dialog mSplashDialog;

    // 显示启动页
    public static void show(final Activity activity) {
        mSplashDialog = new Dialog(activity, R.style.Dialog_Fullscreen); // 设置dialog全屏
        mSplashDialog.setContentView(R.layout.activity_launch); // 设置dialog内容
        mSplashDialog.setCancelable(false);
        mSplashDialog.show();
    }

    // 关闭启动页
    public static void hide(Activity activity) {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        if(mSplashDialog!=null){
        	mSplashDialog.dismiss();
            mSplashDialog = null;
        }
    }
}
