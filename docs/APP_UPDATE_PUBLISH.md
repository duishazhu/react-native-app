# app 更新发版说明

该文档主要描述了 iOS 和 android 应用更新各大主流应用市场的详细步骤。
主要包含：App Store, android 市场（示例：腾讯应用宝, 小米应用市场）

## 材料准备

- 待发布 ipa/apk 包
- 新版本更新描述信息
- 新版本 app 展示图（可选）

## App Store

官方详细参考文档：[官方使用文档](https://help.apple.com/app-store-connect/#/dev910472ff2)

#### 更新发布

登录苹果发布网站[AppStoreConnect](https://itunesconnect.apple.com), 进行以下发布操作。

- 登陆发布网站：按步骤：登录->我的 app->待发布 app（例如：胜道体育）进入更新发布页面，发布页面如下
  ![](https://terminus-org.app.terminus.io/api/gittar/terminus-retail-mall/rn-template/raw/master/docs/images/7.jpg)

- 创建新版本发布：点击上图中`版本和平台`按钮, 选择创建新 iOS/TVOS 版本。
- 完善版本发布信息：创建新版本后，`iOS APP`选项下会出现新版本编辑页面。进入新版本的`App信息`,`准备提交`页面,填写和修改 app 相关信息：此版本的新增内容（必填）、App 预览和屏幕快照  (可选)等，如下图所示：

![](https://terminus-org.app.terminus.io/api/gittar/terminus-retail-mall/rn-template/raw/master/docs/images/8.jpg)

- 上传和添加待发布 ipa 包。
  建议使用 Application Loader 工具上传待发布的 ipa 包。

      1.如果您安装了Xcode，可以直接选择 `Xcode->Open DeveloperTool->Application loader`打开工具.
      2.上传完成后，会在`活动界面`显示当前的上传的ipa包。当系统处理完毕后，`准备页面`的构建版本选择出现添加按钮，选择添加上传的ipa包即可。

![](https://terminus-org.app.terminus.io/api/gittar/terminus-retail-mall/rn-template/raw/master/docs/images/9.jpg)

- 选择价格和销售范围（可选）
  点击主目录价格和销售范围，可选择售价和销售范围（可选），没有需求可不用编辑和更改。
  ![](https://terminus-org.app.terminus.io/api/gittar/terminus-retail-mall/rn-template/raw/master/docs/images/10.jpg)

- 提交审核。
  上传 ipa 成功后，点击`保存和提交以供审核`,选择最后的版权，广告的信息等：根据提示确认信息，如无则填选择否。完成后点击提交即可

  ![](https://terminus-org.app.terminus.io/api/gittar/terminus-retail-mall/rn-template/raw/master/docs/images/11.jpg)

**注意： 1.预览图：可选，但是如果旧预览图和新版本 APP 展示不一致，就必须替换新的预览图。 2.预览图尺寸选择：预览图尺寸可只使用`5.5 英寸视网膜显示屏`，其他可选。建议添加`5.5 英寸视网膜显示屏`和`5.8 英寸超视网膜显示屏` 3.上传 ipa 包：上传之前必须先创建好新的发布版本，且上传后有延迟，需等到苹果处理一段时间后，才能在上述图片选项`活动`中查看到到该版本； 4.上传 ipa 包：如果查看`活动`页面，长时间未发现新版，则请查看绑定邮箱，是否有 ipa 被拒的邮件信息**

## Android

android 市场大部分上架更新方法类似，区别是部分强制要求对 apk 包进行加固处理，类似腾讯应用宝、360 等，其他大部分市场则不需要好，以下选择一些市场进行说明：

### 腾讯应用宝

#### 更新发布

登录[腾讯开放平台](http://open.qq.com/login), 进行以下发布操作。

- 加固签名 apk。
  腾讯应用宝发布 app，需要先加固操作。 1.根据平台下载加固工具:[乐固加固](http://legu.qcloud.com/tool/index)。具体加固工具使用可参考下载包中的加固使用说明。
  **加固所需参数和签名会项目目录下的配置文件夹中提供！**
- 登陆发布网站：登录->选择对应 app(胜道体育)的更新安装包选项 进入发布页面

![](https://terminus-org.app.terminus.io/api/gittar/terminus-retail-mall/rn-template/raw/master/docs/images/12.jpg)

- 填写发布信息和 apk 包：点击更新安装包，上传最新的加固签名好的 apk 包，，并在`版本更新说明`中填写更新文案信息，如界面变化，则需要在主菜单`图标素材`选项下替换旧的展示图片。
- 修改其他选项（可选）
  可按照需求修改关键字，描述信息的运营选项
- 完成后，点击`提所有页面审核`即可

\*\*注意

1. apk 包必须先加固签名，类似市场还有 360 市场等
2. 当前版本更新介绍不能包含'最'等词\*\*

### 小米应用市场

#### 材料准备

- 待发布 apk 包
- 新版本更新描述信息
- 新版本 app 展示图（可选）

#### 发布

登录[小米开放平台](https://dev.mi.com/console/), 进行以下发布操作。

- 登陆发布网站：登录->管理控制台->小米应用商店->选择对应应用（胜道体育的）更新应用版本

![](https://terminus-org.app.terminus.io/api/gittar/terminus-retail-mall/rn-template/raw/master/docs/images/13.jpg)

- 上传 apk：点击立即上传，上传 apk

![](https://terminus-org.app.terminus.io/api/gittar/terminus-retail-mall/rn-template/raw/master/docs/images/14.jpg)

- 填写发布信息和 apk 包：
  上传 apk 文件后，进入一下编辑页面 1.进入`完善资料：应用信息`页面，可按照需求修改应用信息（可选），如无必要不需要修改，完成后点击页面底部下一步.
  ![](https://terminus-org.app.terminus.io/api/gittar/terminus-retail-mall/rn-template/raw/master/docs/images/15.jpg)
  ![](https://terminus-org.app.terminus.io/api/gittar/terminus-retail-mall/rn-template/raw/master/docs/images/16.jpg) 2.下一步进入`完善资料：选择语言`页面,点击填写资料进入编辑界面，并编辑和更新相关信息：主要是`更新日志`选项，其他按需求配置和填写。
  ![](https://terminus-org.app.terminus.io/api/gittar/terminus-retail-mall/rn-template/raw/master/docs/images/17.jpg)
  ![](https://terminus-org.app.terminus.io/api/gittar/terminus-retail-mall/rn-template/raw/master/docs/images/18.jpg)

- 完成后点击页面底部`保存并返回`回到`完善资料：选择语言`界面，点击`下一步`,即可完成提交工作

\*\*注意

1. 当前版本更新介绍不能包含'最'等词
2. apk 包不强制要求加固, 目前大部分市场都不需要\*\*

### 华为应用市场

#### 材料准备

- 待发布 apk 包
- 新版本更新描述信息
- 新版本 app 展示图（可选）

#### 发布

登录[华为开发者平台](http://developer.huawei.com/consumer/cn), 进行以下发布操作。

- 登陆发布网站：登录->管理中心->上架及推广服务->应用市场->选择对应应用（胜道体育）升级按钮 进入发布页面

![](https://terminus-org.app.terminus.io/api/gittar/terminus-retail-mall/rn-template/raw/master/docs/images/19.jpg)

- 上传 apk:点击`上传apk包`，选择上传后点击`下一步`进入`基础信息设置界面`.
- 在`基础信息设置`界面更新相关应用的描述信息和新版本信息：`新版本特性：`。同样可按照需求修改其他可选参数。完成后点击页面底部`下一步`,进入`分发设置界面`
  ![](https://terminus-org.app.terminus.io/api/gittar/terminus-retail-mall/rn-template/raw/master/docs/images/20.jpg)

- 在`分发设置界面`(可选)，选择应用的区域的费用等分发配置，该页面信息均为可选内容，完成后点击`下一步`完成信息确认后即可完成版本发布提交

\*\*注意

1. 当前版本更新介绍不能包含'最'等词\*\*
