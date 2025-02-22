// ContextProvider.js
import React, { createContext, useContext, useState } from 'react';

const RecipientsContext = createContext();

export const RecipientsProvider = ({ children }) => {
  const [recipients, setRecipients] = useState([
    { id: 1, firstName: 'Timothy', lastName: 'Ezike', email: 'andrew@xhotmail.com', phone: '+234 912 741 5555' },
    { id: 2, firstName: 'Michael', lastName: 'Aganbiaba', email: 'taniabusta@aol.com', phone: '+234 704 462 3277' },
    { id: 3, firstName: 'Philip', lastName: 'Obiano', email: 'penniecip@protonmail.com', phone: '+234 919 647 4567' },
    { id: 4, firstName: 'Rebecca', lastName: 'Ojo', email: 'owenricemsc@gmail.com', phone: '+234 708 310 7904' },
    { id: 5, firstName: 'Candice', lastName: 'Wu', email: 'candice@unitstudio.com', phone: 'Fullstack Developer' },
    { id: 6, firstName: 'Natal', lastName: 'Craig', email: 'natal@unitstudio.com', phone: 'UX Designer' }
  ]);

  return (
    <RecipientsContext.Provider value={{ recipients, setRecipients }}>
      {children}
    </RecipientsContext.Provider>
  );
};

export const useRecipients = () => useContext(RecipientsContext);
