import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store/store"; // Adjust this path if necessary
import App from "./App";
import "./index.css"; // Adjust this path if necessary
import { GroupProvider } from "./redux/GroupProvider/UseGroup";
import { ContactProvider } from "./redux/ContactProvider/UseContact";
import { NotificationProvider } from "./redux/NotificationProvider/UseNotification";
import { CampaignModalProvider } from "./redux/UseCampaignModal";
import { RecipientsProvider } from "./redux/UseRecipient";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GroupProvider>
      <CampaignModalProvider>
        <ContactProvider>
          <NotificationProvider>
            <RecipientsProvider>
              {" "}
              {/* Wrap the app with RecipientsProvider */}
              <App />
            </RecipientsProvider>
          </NotificationProvider>
        </ContactProvider>
      </CampaignModalProvider>
    </GroupProvider>
  </Provider>
);
