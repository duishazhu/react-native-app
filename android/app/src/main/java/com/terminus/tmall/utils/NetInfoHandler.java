package com.terminus.tmall.utils;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.telephony.TelephonyManager;

public class NetInfoHandler {

    private final ConnectivityManager mConnectivityManager;
    private final ConnectBroadcastReceiver mBroadcastReceiver;
    private static final String CONNECTION_TYPE_BLUETOOTH = "bluetooth";
    private static final String CONNECTION_TYPE_CELLULAR = "cellular";
    private static final String CONNECTION_TYPE_ETHERNET = "ethernet";
    private static final String CONNECTION_TYPE_NONE = "none";
    private static final String CONNECTION_TYPE_UNKNOWN = "unknown";
    private static final String CONNECTION_TYPE_WIFI = "wifi";
    private static final String CONNECTION_TYPE_WIMAX = "wimax";

    private static final String EFFECTIVE_CONNECTION_TYPE_UNKNOWN = "unknown";
    private static final String EFFECTIVE_CONNECTION_TYPE_2G = "2g";
    private static final String EFFECTIVE_CONNECTION_TYPE_3G = "3g";
    private static final String EFFECTIVE_CONNECTION_TYPE_4G = "4g";

    private static final String CONNECTION_TYPE_NONE_DEPRECATED = "NONE";
    private static final String CONNECTION_TYPE_UNKNOWN_DEPRECATED = "UNKNOWN";

    private boolean mNoNetworkPermission = false;

    private String mConnectivityDeprecated = CONNECTION_TYPE_UNKNOWN_DEPRECATED;
    private String mConnectionType = CONNECTION_TYPE_UNKNOWN;
    private String mEffectiveConnectionType = EFFECTIVE_CONNECTION_TYPE_UNKNOWN;


    public NetInfoHandler(Context mContext){
        mBroadcastReceiver = new ConnectBroadcastReceiver();
        mConnectivityManager = (ConnectivityManager) mContext.getSystemService(Context.CONNECTIVITY_SERVICE);
        registerReceiver(mContext);
    }

    private void registerReceiver(Context mContext){
        IntentFilter filter = new IntentFilter();
        filter.addAction(ConnectivityManager.CONNECTIVITY_ACTION);
        mContext.registerReceiver(mBroadcastReceiver, filter);
    }

    public void onDestory(Context mContext){
        mContext.unregisterReceiver(mBroadcastReceiver);
    }

    private void updateNetInfoStatus(){
        String connectionType = CONNECTION_TYPE_UNKNOWN;
        String effectiveConnectionType = EFFECTIVE_CONNECTION_TYPE_UNKNOWN;

        try {
            NetworkInfo networkInfo = mConnectivityManager.getActiveNetworkInfo();
            if (networkInfo == null || !networkInfo.isConnected()) {
                connectionType = CONNECTION_TYPE_NONE;
            } else {
                int networkType = networkInfo.getType();
                switch (networkType) {
                    case ConnectivityManager.TYPE_BLUETOOTH:
                        connectionType = CONNECTION_TYPE_BLUETOOTH;
                        break;
                    case ConnectivityManager.TYPE_ETHERNET:
                        connectionType = CONNECTION_TYPE_ETHERNET;
                        break;
                    case ConnectivityManager.TYPE_MOBILE:
                    case ConnectivityManager.TYPE_MOBILE_DUN:
                        connectionType = CONNECTION_TYPE_CELLULAR;
                        effectiveConnectionType = getEffectiveConnectionType(networkInfo);
                        break;
                    case ConnectivityManager.TYPE_WIFI:
                        connectionType = CONNECTION_TYPE_WIFI;
                        break;
                    case ConnectivityManager.TYPE_WIMAX:
                        connectionType = CONNECTION_TYPE_WIMAX;
                        break;
                    default:
                        connectionType = CONNECTION_TYPE_UNKNOWN;
                        break;
                }
            }
        } catch (Throwable e) {
            mNoNetworkPermission = true;
            connectionType = CONNECTION_TYPE_UNKNOWN;
        }

        String currentConnectivity = getCurrentConnectionType();
        // It is possible to get multiple broadcasts for the same connectivity change, so we only
        // update and send an event when the connectivity has indeed changed.
        if (!connectionType.equalsIgnoreCase(mConnectionType) ||
                !effectiveConnectionType.equalsIgnoreCase(mEffectiveConnectionType) ||
                !currentConnectivity.equalsIgnoreCase(mConnectivityDeprecated)) {
            mConnectionType = connectionType;
            mEffectiveConnectionType = effectiveConnectionType;
            mConnectivityDeprecated = currentConnectivity;
        }
    }

    private String getCurrentConnectionType() {
        try {
            NetworkInfo networkInfo = mConnectivityManager.getActiveNetworkInfo();
            if (networkInfo == null || !networkInfo.isConnected()) {
                return CONNECTION_TYPE_NONE_DEPRECATED;
            } else if (ConnectivityManager.isNetworkTypeValid(networkInfo.getType())) {
                return networkInfo.getTypeName().toUpperCase();
            } else {
                return CONNECTION_TYPE_UNKNOWN_DEPRECATED;
            }
        } catch (Throwable e) {
            mNoNetworkPermission = true;
            return CONNECTION_TYPE_UNKNOWN_DEPRECATED;
        }
    }


    private String getEffectiveConnectionType(NetworkInfo networkInfo) {
        switch (networkInfo.getSubtype()) {
            case TelephonyManager.NETWORK_TYPE_1xRTT:
            case TelephonyManager.NETWORK_TYPE_CDMA:
            case TelephonyManager.NETWORK_TYPE_EDGE:
            case TelephonyManager.NETWORK_TYPE_GPRS:
            case TelephonyManager.NETWORK_TYPE_IDEN:
                return EFFECTIVE_CONNECTION_TYPE_2G;
            case TelephonyManager.NETWORK_TYPE_EHRPD:
            case TelephonyManager.NETWORK_TYPE_EVDO_0:
            case TelephonyManager.NETWORK_TYPE_EVDO_A:
            case TelephonyManager.NETWORK_TYPE_EVDO_B:
            case TelephonyManager.NETWORK_TYPE_HSDPA:
            case TelephonyManager.NETWORK_TYPE_HSPA:
            case TelephonyManager.NETWORK_TYPE_HSUPA:
            case TelephonyManager.NETWORK_TYPE_UMTS:
                return EFFECTIVE_CONNECTION_TYPE_3G;
            case TelephonyManager.NETWORK_TYPE_HSPAP:
            case TelephonyManager.NETWORK_TYPE_LTE:
                return EFFECTIVE_CONNECTION_TYPE_4G;
            case TelephonyManager.NETWORK_TYPE_UNKNOWN:
            default:
                return EFFECTIVE_CONNECTION_TYPE_UNKNOWN;
        }
    }

    private class ConnectBroadcastReceiver extends BroadcastReceiver {

        @Override
        public void onReceive(Context context, Intent intent) {
            if (intent.getAction().equals(ConnectivityManager.CONNECTIVITY_ACTION)) {
                updateNetInfoStatus();
            }
        }
    }
}
