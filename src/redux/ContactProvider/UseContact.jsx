import { createContext, useContext, useState } from "react";

const contactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      firstName: "Timothy",
      lastName: "Eke",
      email: "andrew@triimo.com",
      phone: "+234 792 241 5655",
      group: "N/A",
    },
    {
      id: 2,
      firstName: "Naomi",
      lastName: "Aganaba",
      email: "tanoribeau@gmail.com",
      phone: "+234 704 442 5317",
      group: "N/A",
    },
    {
      id: 3,
      firstName: "Sarah",
      lastName: "Okano",
      email: "penelope@gmail.com",
      phone: "+234 709 657 6467",
      group: "N/A",
    },
    {
      id: 4,
      firstName: "Daniel",
      lastName: "Ojo",
      email: "owenorton@gmail.com",
      phone: "+234 806 310 3944",
      group: "N/A",
    },
    {
      id: 5,
      firstName: "Rebecca",
      lastName: "Nwachukwu",
      email: "akwabtom@gmail.com",
      phone: "+234 703 501 4280",
      group: "N/A",
    },
    {
      id: 6,
      firstName: "Margaret",
      lastName: "Alanira",
      email: "abujifinast@icloud.com",
      phone: "+234 813 201 1725",
      group: "N/A",
    },
  ]);

  return (
    <contactContext.Provider value={{ contacts, setContacts }}>
      {children}
    </contactContext.Provider>
  );
};

export const useContacts = () => useContext(contactContext);
