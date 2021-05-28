import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Settings from './Settings';
import {principalContext} from '../Principal';
import {
    isPushNotificationSupported,
    registerServiceWorker,
    askUserPermission,
    createNotificationSubscription,
    postSubscription
  } from '../../../push-notifications'
  jest.mock('../../../push-notifications');

  describe("<Settings/>",()=>{
      global.fetch= jest.fn();
      const setEmailNotification= jest.fn();
      const setMessage= jest.fn();
      beforeEach(()=>{
          fetch.mockClear();
          isPushNotificationSupported.mockClear();
          registerServiceWorker.mockClear();
          askUserPermission.mockClear();
          createNotificationSubscription.mockClear();
          postSubscription.mockClear();
          setEmailNotification.mockClear();
          setMessage.mockClear();
      });
      it("if emailNotification  is true email switch must be on",()=>{
          const settings=render(
              <principalContext.Provider value={{
                emailNotification: true,
                setEmailNotification,
                setMessage
              }}>
                  <Settings/>
              </principalContext.Provider>
          );

          const switchBtn= settings.getByTestId('emialSettings');
          expect(switchBtn.childNodes[0]).not.toHaveClass('eOff');
      });
      it("if emailNotification is false email switch must be off",()=>{
        const settings=render(
            <principalContext.Provider value={{
              emailNotification: false,
              setEmailNotification,
              setMessage
            }}>
                <Settings/>
            </principalContext.Provider>
        );

        const switchBtn= settings.getByTestId('emialSettings');
        expect(switchBtn.childNodes[0]).toHaveClass('eOff');
    });
    it("change email settings",()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve( {json: () => Promise.resolve({emailNotification: true})});
        });
        const settings=render(
            <principalContext.Provider value={{
              emailNotification: false,
              setEmailNotification,
              setMessage
            }}>
                <Settings/>
            </principalContext.Provider>
        );

        const switchBtn= settings.getByTestId('emialSettings');
        fireEvent.click(switchBtn);
        expect(setEmailNotification).toBeCalledTimes(1);
        expect(fetch).toBeCalledTimes(1);
    });
    it("enable browser notifications", async()=>{
        isPushNotificationSupported.mockImplementation(()=>true);
        askUserPermission.mockImplementation(()=> Promise.resolve('granted'));
        createNotificationSubscription.mockImplementation(()=> Promise.resolve({subscription:"subs"}));
        postSubscription.mockImplementation(()=>Promise.resolve("Notifications Activated"));

        const settings=render(
            <principalContext.Provider value={{
              emailNotification: false,
              setEmailNotification,
              setMessage
            }}>
                <Settings/>
            </principalContext.Provider>
        );

        const btn= settings.getByText('Activate');
        fireEvent.click(btn);
        
        await askUserPermission();
        await createNotificationSubscription();
        await postSubscription();
  
        expect(setMessage).toBeCalled();
        expect(setMessage).toBeCalledWith('Notifications Activated');
    });
    it("push notification not supported",()=>{
        isPushNotificationSupported.mockImplementation(()=>false);
        const settings=render(
            <principalContext.Provider value={{
              emailNotification: false,
              setEmailNotification,
              setMessage
            }}>
                <Settings/>
            </principalContext.Provider>
        );

        const btn= settings.getByText('Activate');
        fireEvent.click(btn);

        expect(setMessage).toBeCalledWith('Notifications are not supported by your browser');
    });
    it("don't have user permission", async()=>{
        isPushNotificationSupported.mockImplementation(()=>true);
        askUserPermission.mockImplementation(()=> Promise.resolve('denied'));
        const settings=render(
            <principalContext.Provider value={{
              emailNotification: false,
              setEmailNotification,
              setMessage
            }}>
                <Settings/>
            </principalContext.Provider>
        );

        const btn= settings.getByText('Activate');
        fireEvent.click(btn);
        
        await askUserPermission();
        expect(setMessage).toBeCalledWith("Something went wrong, check your browser's notification settings and try again");
    });
  });
  