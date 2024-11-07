import Routes from "./src/routes/Routes";
import GlobalStoreContext from "./src/store/GlobalStoreContext";
import AuthStoreProvider from "./src/store/AuthStoreContext";
import NotificationProvider from "./src/store/NotificationContext";

export default function App (){
  return (
    <NotificationProvider>
    <GlobalStoreContext>
      <AuthStoreProvider>
        <Routes />
      </AuthStoreProvider>
    </GlobalStoreContext>
    </NotificationProvider>
  );
}

