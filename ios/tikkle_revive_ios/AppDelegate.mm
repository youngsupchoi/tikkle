#import "AppDelegate.h"
// Firebase 설정 23.10.20
#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>
// deeplink 관련 설정 23.10.16
#import <React/RCTLinkingManager.h> 

// Firebase Dynamic Links 관련 설정 23.10.27
#import <RNFBDynamicLinksAppDelegateInterceptor.h>

//알림 설정
#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>

// facebook sdk
#import <AuthenticationServices/AuthenticationServices.h>
#import <SafariServices/SafariServices.h>
#import <FBSDKCoreKit/FBSDKCoreKit-Swift.h>

//kakao sdk
#import <RNKakaoLogins.h>

//code push sdk
#import <CodePush/CodePush.h>
#import <AppCenterReactNative.h>
#import <AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes.h>

@implementation AppDelegate

// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
 [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
 [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}
// Required for localNotification event
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler
{
  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [[FBSDKApplicationDelegate sharedInstance] application:application
                       didFinishLaunchingWithOptions:launchOptions];

  if ([FIRApp defaultApp] == nil){
    [FIRApp configure];
  }
  
  #ifdef FB_SONARKIT_ENABLED
    InitializeFlipper(application);  
    
  #endif

  // App Center SDK 초기화
  [AppCenterReactNative register];  // App Center 기본 모듈
  [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];  // 애널리틱스 활성화
  [AppCenterReactNativeCrashes registerWithAutomaticProcessing];  // 크래시 리포팅 활성화



  // if ([FIRApp defaultApp] == nil) { // 추가 (line:35)
    // [FIRApp configure];
  // }

  self.moduleName = @"tikkle_revive_ios";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  // Firebase Dynamic Links 관련 설정 23.10.27
  [RNFBDynamicLinksAppDelegateInterceptor sharedInstance];

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
  
  // Define UNUserNotificationCenter
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;

  return YES;
}

//Called when a notification is delivered to a foreground app.
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [CodePush bundleURL]; // 이 부분을 수정했습니다.
#endif
}

//deep link & facdebook sdk 동시 사용을 위한 설정 23.12.06
- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  // 카카오 로그인 URL 처리
    if ([RNKakaoLogins isKakaoTalkLoginUrl:url]) {
      return [RNKakaoLogins handleOpenUrl:url];
    }

    // Facebook SDK 처리
    if ([[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options]) {
      return YES;
    }

    // Deep Link 처리
    if ([RCTLinkingManager application:app openURL:url options:options]) {
      return YES;
    }

    return NO;
}



// // deeplink 관련 설정 23.10.16
// - (BOOL)application:(UIApplication *)application
//    openURL:(NSURL *)url
//    options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
// {
//   return [RCTLinkingManager application:application openURL:url options:options];
// }


// - (BOOL)application:(UIApplication *)app
//             openURL:(NSURL *)url
//             options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
// {
//   return [[FBSDKApplicationDelegate sharedInstance]application:app
//                                                       openURL:url
//                                                       options:options];
// }

@end
