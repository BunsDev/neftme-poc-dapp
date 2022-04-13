import { useEffect, useState } from 'react';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { getData, removeData } from '@services/storage';
import { getProfileData } from '@services/user';

const useCheckUserSession = () => {
  const navigation = useNavigation();
  const [sessionChecked, setSessionChecked] = useState(false);
  const navigateToLogin = () => navigation.dispatch(CommonActions.reset({
    index: 0,
    routes: [{ name: 'Start' }],
  }));

  useEffect(async () => {
    if (await getData('auth_token')) {
      const user = await getProfileData();
      if (user.error && user.status === 401) {
        await removeData('auth_token');
        navigateToLogin();
      } else {
        // TODO: Quando tivermos redux podemos fazer dispatch do user para o redux state
        setSessionChecked(true);
      }
    } else {
      navigateToLogin();
    }
  }, []);

  return { sessionChecked };
};

export default useCheckUserSession;
