
package com.terminus.tmall.utils;

import android.content.Context;
import android.os.Build;
import android.text.TextUtils;

import java.net.NetworkInterface;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;

/**
 * User : yh
 * Date : 2018/7/23
 */
public class NetInfoUtil {
    public static boolean  isWifiProxy(Context mContext){
        try {
            final boolean is_ics_or_later = Build.VERSION.SDK_INT >= Build.VERSION_CODES.ICE_CREAM_SANDWICH;
            String proxyAddress;
            int proxyPort;
            if (is_ics_or_later) {
                proxyAddress = System.getProperty("http.proxyHost");
                String portstr = System.getProperty("http.proxyPort");
                proxyPort = Integer.parseInt((portstr != null ? portstr : "-1"));
                System.out.println(proxyAddress + "~");
                System.out.println("port = " + proxyPort);
            } else {
                proxyAddress = android.net.Proxy.getHost(mContext);
                proxyPort = android.net.Proxy.getPort(mContext);
            }
            return (!TextUtils.isEmpty(proxyAddress)) && (proxyPort != -1);
        }catch (Throwable e) {
        }
        return false;
    }

    public static boolean isVpnUsed() {
        try {
            Enumeration niList = NetworkInterface.getNetworkInterfaces();
            List<NetworkInterface> lists = Collections.list(niList);
            if(niList != null) {
                for (NetworkInterface intf : lists) {
                    if(!intf.isUp() || intf.getInterfaceAddresses().size() == 0) {
                        continue;
                    }
                    if ("tun0".equals(intf.getName()) || "ppp0".equals(intf.getName())){
                        return true; // The VPN is up
                    }
                }
            }
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return false;
    }

    public static void netInfoChangeLiten(){

    }
}
