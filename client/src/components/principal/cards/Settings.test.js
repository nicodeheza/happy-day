import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Settings from './Settings';
import { Provider } from 'react-redux';
import generateStore from '../../../redux/store';
import {
    isPushNotificationSupported,
    registerServiceWorker,
    askUserPermission,
    createNotificationSubscription,
    postSubscription
  } from '../../../push-notifications'
import { SET_EMAIL_NOTIFICATION } from '../../../redux/const/emialNotificationConst';
  jest.mock('../../../push-notifications');

  describe("<Settings/>",()=>{
      global.fetch= jest.fn();
      const store= generateStore();
      
      beforeEach(()=>{
          fetch.mockClear();
          isPushNotificationSupported.mockClear();
          registerServiceWorker.mockClear();
          askUserPermission.mockClear();
          createNotificationSubscription.mockClear();
          postSubscription.mockClear();
      });
      it("if emailNotification  is true email switch must be on",()=>{
          store.dispatch({type:SET_EMAIL_NOTIFICATION, payload: true});

        const settings=render(
            <Provider store={store}>
                <Settings/>
            </Provider>
        );

          const switchBtn= settings.getByTestId('emialSettings');
          expect(switchBtn.childNodes[0]).not.toHaveClass('eOff');
      });
      it("if emailNotification is false email switch must be off",()=>{
        store.dispatch({type:SET_EMAIL_NOTIFICATION, payload: false});
        
        const settings=render(
            <Provider store={store}>
                <Settings/>
            </Provider>
        );

        const switchBtn= settings.getByTestId('emialSettings');
        expect(switchBtn.childNodes[0]).toHaveClass('eOff');
    });
    it("change email settings",()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve( {json: () => Promise.resolve({emailNotification: true})});
        });
        store.dispatch({type:SET_EMAIL_NOTIFICATION, payload: false});

        const settings=render(
            <Provider store={store}>
                <Settings/>
            </Provider>
        );

        const switchBtn= settings.getByTestId('emialSettings');
        fireEvent.click(switchBtn);
        expect(fetch).toBeCalledTimes(1);
        const emailNotification= store.getState().emailNotification.activate;
        expect(emailNotification).toBe(true);
    });
    it("enable browser notifications", async()=>{
        isPushNotificationSupported.mockImplementation(()=>true);
        askUserPermission.mockImplementation(()=> Promise.resolve('granted'));
        createNotificationSubscription.mockImplementation(()=> Promise.resolve({subscription:"subs"}));
        postSubscription.mockImplementation(()=>Promise.resolve("Notifications Activated"));

        store.dispatch({type:SET_EMAIL_NOTIFICATION, payload: false});

        const settings=render(
            <Provider  store={store}>
                <Settings/>
            </Provider>
        );

        const btn= settings.getByText('Activate');
        fireEvent.click(btn);
        
        await askUserPermission();
        await createNotificationSubscription();
        await postSubscription();
  
        const message= store.getState().message.text;
        expect(message).toBe('Notifications Activated');
    });
    it("push notification not supported",()=>{
        isPushNotificationSupported.mockImplementation(()=>false);

        store.dispatch({type:SET_EMAIL_NOTIFICATION, payload: false});

        const settings=render(
            <Provider store={store}>
                <Settings/>
            </Provider>
        );

        const btn= settings.getByText('Activate');
        fireEvent.click(btn);

        const message=store.getState().message.text;
        expect(message).toBe('Notifications are not supported by your browser');
    });
    it("don't have user permission", async()=>{
        isPushNotificationSupported.mockImplementation(()=>true);
        askUserPermission.mockImplementation(()=> Promise.resolve('denied'));

        store.dispatch({type:SET_EMAIL_NOTIFICATION, payload: false});
        
        const settings=render(
            <Provider store={store}>
                <Settings/>
            </Provider>
        );

        const btn= settings.getByText('Activate');
        fireEvent.click(btn);
        
        await askUserPermission();
    
        const message= store.getState().message.text;
        expect(message).toBe("Something went wrong, check your browser's notification settings and try again");
    });
  });
  