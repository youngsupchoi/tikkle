// 1. 필요한 뷰 스테이트 가져오기 (작명규칙: use + view이름 + State)
import {useNotificationViewState} from 'src/presentationLayer/viewState/mainStates/NotificationState';
import moment from 'moment';
// 2. 필요한 뷰 모델 가져오기 (topViewModel)
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';

// 3. 데이터 소스 또는 API 가져오기
import {getNoticeListData} from 'src/dataLayer/DataSource/Notification/GetNoticeListData';
import {deleteNoticeData} from 'src/dataLayer/DataSource/Notification/DeleteNoticeData';

// 4. 뷰 모델 hook 이름 변경하기 (작명규칙: use + view이름 + ViewModel)
export const useNotificationViewModel = () => {
  // 뷰 스테이트의 상태와 액션 가져오기
  const {ref, state, actions} = useNotificationViewState();
  const {topActions} = useTopViewModel();

  //6. 뷰 모델에서 사용할 함수 선언하기

  /**
   * NotificationScreen에서 나의 알림을 불러오는 함수
   */

  const loadData = async () => {
    await actions.setLoading(true);
    await getNoticeListData()
      .then(res => {
        return topActions.setStateAndError(res);
      })
      .then(res => {
        actions.setNotificationData(res.DSdata.info);
      });
    await actions.setLoading(false);
  };

  /**
   * NotificationScreen에서 나의 알림을 삭제하는 함수
   */
  async function noti_delete(index) {
    await actions.setRefreshing(true);
    try {
      // console.log(state.notificationData[index].id);
      await deleteNoticeData(state.notificationData[index].id)
        .then(res => {
          return topActions.setStateAndError(res);
        })
        .then(res => {
          console.log('Deleted');
        });
    } catch (error) {
      //에러 처리 필요 -> 정해야함
      console.log("[Error in MyPageViewModel's get_user_info]\n", error);
    }
  }

  // 안쓰는 함수 혹시 몰라서 킵 해둠
  const countUnreadNotifications = notifications => {
    let count = 0;
    for (const notification of notifications) {
      if (!notification.is_read) {
        count++;
      }
    }
    return count;
  };

  // 안쓰는 함수 혹시 몰라서 킵 해둠
  const unreadNotificationAmount = countUnreadNotifications(
    state.notificationsData,
  );

  // 안쓰는 함수 혹시 몰라서 킵 해둠
  const groupedNotifications = state.notificationsData.reduce(
    (result, notification) => {
      // Format the created_at to display in the header
      const formattedDate = notification.created_at;

      // Check if the created_at key exists in the result object
      if (result[formattedDate]) {
        // If it exists, add the notification to the existing array
        result[formattedDate].push(notification);
      } else {
        // If it doesn't exist, create a new array with the notification
        result[formattedDate] = [notification];
      }
      return result;
    },
    {},
  );

  // /**
  //  * timestamp를 비교해서 오늘, 어제, 그 외에는 날짜를 반환하는 함수
  //  * @param {string} created_at
  //  */
  // const formatDate = created_at => {
  //   const today = new Date();
  //   const notificationDate = new Date(created_at);

  //   if (isSameDay(today, notificationDate)) {
  //     return '오늘';
  //   } else if (isYesterday(today, notificationDate)) {
  //     return '어제';
  //   } else {
  //     const options = {month: 'short', day: 'numeric'};
  //     return notificationDate.toLocaleDateString(undefined, options);
  //   }
  // };

  // /**
  //  * 어제인지 확인하는 함수
  //  * @param {string (date)} date1
  //  * @param {string (date)} date2
  //  * @returns
  //  */
  // const isYesterday = (date1, date2) => {
  //   const yesterday = new Date(date1);
  //   yesterday.setDate(yesterday.getDate() - 1);
  //   return isSameDay(yesterday, date2);
  // };

  /**
   * 같은 날인지 확인하는 함수
   * @param {string (date)} date1
   * @param {string (date)} date2
   * @returns
   */
  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  //안쓰는 함수 혹시 몰라서 킵 해둠
  const formattedNotifications = state.notificationsData.map(notification => ({
    ...notification,
    formattedDate: actions.formatDate(notification.created_at),
  }));

  /**
   * 시간 차이를 계산하는 함수
   * @param {string (date)} dateString 2023-10-26 09:26:46
   * @returns
   */
  function timeSince(dateString) {
    const diff = moment().add(9, 'hours').diff(dateString, 'seconds');
    console.log('diff : ', diff);

    if (diff < 60) {
      return '방금 전';
    } else if (diff < 3600) {
      return moment().add(9, 'hours').diff(dateString, 'minutes') + ' 분 전';
    } else if (diff < 86400) {
      return moment().add(9, 'hours').diff(dateString, 'hours') + ' 시간 전';
    } else if (diff < 604800) {
      return moment().add(9, 'hours').diff(dateString, 'days') + ' 일 전';
    } else if (weeks < 3024000) {
      return moment().add(9, 'hours').diff(dateString, 'weeks') + ' 주 전';
    } else if (months < 36288000) {
      return moment().add(9, 'hours').diff(dateString, 'months') + ' 달 전';
    } else {
      return moment().add(9, 'hours').diff(dateString, 'years') + ' 년 전';
    }

    // const then = new Date(dateString);
    // const now = new Date();

    // const seconds = Math.floor((now - then) / 1000);
    // const minutes = Math.floor(seconds / 60);
    // const hours = Math.floor(minutes / 60);
    // const days = Math.floor(hours / 24);
    // const weeks = Math.floor(days / 7);
    // const months = Math.floor(days / 30.44); // Average number of days in a month
    // const years = Math.floor(days / 365.25); // Average number of days in a year considering leap year

    // if (seconds < 60) {
    //   return '방금 전';
    // } else if (minutes < 60) {
    //   return minutes + ' 분 전';
    // } else if (hours < 24) {
    //   return hours + ' 시간 전';
    // } else if (days < 7) {
    //   return days + ' 일 전';
    // } else if (weeks < 4) {
    //   return weeks + ' 주 전';
    // } else if (months < 12) {
    //   return months + ' 달 전';
    // } else {
    //   return years + ' 년 전';
    // }
  }

  //안쓰는 함수 혹시 몰라서 킵 해둠
  const backPress = () => {
    navigation.goBack();
  };

  /**
   * NotificationScreen에서 새로고침을 위한 함수
   */
  const onRefresh = async () => {
    actions.setRefreshing(true);
    // Call your data fetching functions here
    await loadData();
    // Add any other data fetching functions if needed
    actions.setRefreshing(false);
  };

  const onDeleteComplete = index => {
    noti_delete(index)
      .then(() => {
        loadData();
      })
      .catch(error => {
        actions.setRefreshing(false);
        console.log("[Error in MyPageViewModel's onDeleteComplete]\n", error);
      });
    actions.setRefreshing(false);
  };

  return {
    ref: {...ref},
    state: {
      ...state,
    },
    actions: {
      ...actions,
      loadData,
      countUnreadNotifications,
      unreadNotificationAmount,
      groupedNotifications,
      timeSince,
      backPress,
      noti_delete,
      onRefresh,
      onDeleteComplete,
    },
  };
};
