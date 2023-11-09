import {apiModel} from '../../APIModel/ApiModel';
import axios from 'axios';
import {FIREBASE_WEB_API_KEY} from '@env';

export async function CreateTikklingShareLink(user_name, tikkling_id) {
  try {
    const uriKey = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${FIREBASE_WEB_API_KEY}`;
    const result = await axios({
      method: 'post',
      url: uriKey,
      data: {
        dynamicLinkInfo: {
          domainUriPrefix: 'https://tikkle.lifoli.co.kr',
          link: `https://tikkle.lifoli.co.kr/tikkling/${tikkling_id}`,
          androidInfo: {
            androidPackageName: 'com.tikkle_revive_ios',
          },
          iosInfo: {
            iosBundleId: 'org.reactjs.native.example.tikkle-revive-ios',
            iosAppStoreId: '6471217574',
          },
          socialMetaTagInfo: {
            socialTitle: `${user_name}님의 티클링!`,
            socialDescription: `${user_name}님의 티클링을 확인해보세요!`,
            socialImageLink:
              'https://img.freepik.com/premium-psd/3d-cartoon-icon-gift-box-isolated-on-pink-background-3d-illustration_68971-1793.jpg',
          },
        },
        suffix: {
          option: 'SHORT',
        },
      },
    });

    if (result.status === 200) {
      return {
        DScode: 0,
        DSdata: {short_link: result.data.shortLink},
        DSmessage: '성공적으로 링크를 불러왓어요.',
      };
    } else {
      return {
        DScode: 1,
        DSdata: null,
        DSmessage: '링크를 불러오는데 실패했어요. 다시 시도해주세요.',
      };
    }
  } catch (error) {
    console.log(error);
  }
}
