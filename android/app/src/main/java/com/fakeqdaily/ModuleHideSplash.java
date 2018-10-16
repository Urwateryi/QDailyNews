package com.fakeqdaily;

import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Description:
 * <p>
 * Author: yi.zhang
 * Time: 2018/4/20 0020
 * E-mail: yi.zhang@rato360.com
 */
public class ModuleHideSplash extends ReactContextBaseJavaModule {
    private Context context;

    public ModuleHideSplash(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    @Override
    public String getName() {
        return "ActivitySplash";
    }

    @ReactMethod
    public void show() {
        ActivitySplash.show(getCurrentActivity());
    }

    @ReactMethod
    public void hide() {
        ActivitySplash.hide(getCurrentActivity());
    }
}