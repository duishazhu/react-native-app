/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <React/RCTLinkingManager.h>
#import "RNBootSplash.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <SDImageWebPCoder.h>

#if DEBUG
  #ifdef FB_SONARKIT_ENABLED
    #import <FlipperKit/FlipperClient.h>
    #import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
    #import <FlipperKitLayoutPlugin/SKDescriptorMapper.h>
    #import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
    #import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
    #import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
    #import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
  #endif
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"TmallMobile"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  UINavigationController *navc = [[UINavigationController alloc] initWithRootViewController:rootViewController];
  self.window.rootViewController = navc;
  [rootViewController.navigationController setNavigationBarHidden:YES animated:false];
  [self.window makeKeyAndVisible];
  [self initializeFlipper:application];
  [RNBootSplash initWithStoryboard:@"LaunchScreen" rootView:rootView];
  SDImageWebPCoder *webPCoder = [SDImageWebPCoder sharedCoder];
  [[SDImageCodersManager sharedManager] addCoder:webPCoder];
  return YES;
}

//设置loadingview，防止bundle加载过程中出现白屏现象00--00-0-
- (void) setLoadingView:(RCTRootView *) rootView{
  UIImageView *splashImage = [[UIImageView alloc]initWithFrame:[UIScreen mainScreen].bounds];
  [splashImage setContentMode:UIViewContentModeScaleAspectFill];
  [splashImage setImage:[UIImage imageNamed:@"Image"]];
  [rootView setLoadingView:splashImage];
}

- (void) initializeFlipper:(UIApplication *)application {
  #if DEBUG
    #ifdef FB_SONARKIT_ENABLED
      FlipperClient *client = [FlipperClient sharedClient];
      SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
      [client addPlugin: [[FlipperKitLayoutPlugin alloc] initWithRootNode: application withDescriptorMapper: layoutDescriptorMapper]];
      [client addPlugin: [[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
      [client addPlugin: [FlipperKitReactPlugin new]];
      [client addPlugin: [[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
      [client start];
    #endif
  #endif
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
  [RCTLinkingManager application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
  return YES;
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options
{
  [RCTLinkingManager application:app openURL:url options:options];
  return YES;
}

- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url
{
  return YES;
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
  [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}


@end
