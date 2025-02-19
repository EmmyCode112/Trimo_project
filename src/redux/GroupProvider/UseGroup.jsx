import { createContext, useContext, useState } from "react";

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Team A",
      contacts: [
        {
          id: 10,
          firstName: "Margaret",
          lastName: "Alanira",
          email: "abujifinast@icloud.com",
          phone: "+234 813 201 1725",
        },
        {
          id: 9,
          firstName: "Sarah",
          lastName: "Okano",
          email: "penelope@gmail.com",
          phone: "+234 709 657 6467",
        },
      ],
    },
    {
      id: 2,
      name: "Newsletter Subscribers",
      contacts: [
        {
          id: 8,
          firstName: "Rebecca",
          lastName: "Nwachukwu",
          email: "akwabtom@gmail.com",
          phone: "+234 703 501 4280",
        },
        {
          id: 7,
          firstName: "Sarah",
          lastName: "Okano",
          email: "penelope@gmail.com",
          phone: "+234 709 657 6467",
        },
      ],
    },
    {
      id: 3,
      name: "Newsletter Subscribers",
      contacts: [
        {
          id: 6,
          firstName: "Naomi",
          lastName: "Aganaba",
          email: "tanoribeau@gmail.com",
          phone: "+234 704 442 5317",
        },
      ],
    },
    {
        id: 19,
        name: "Newsletter Subscribers",
        contacts: [
          {
            id: 6,
            firstName: "Naomi",
            lastName: "Aganaba",
            email: "tanoribeau@gmail.com",
            phone: "+234 704 442 5317",
          },
        ],
      },
    {
      id: 4,
      name: "Together",
      contacts: [
        {
          id: 4,
          firstName: "Naomi",
          lastName: "Aganaba",
          email: "tanoribeau@gmail.com",
          phone: "+234 704 442 5317",
        },
        {
          id: 3,
          firstName: "promise",
          lastName: "Eke",
          email: "andrew@triimo.com",
          phone: "+234 792 241 5655",
        },
      ],
    },
    {
      id: 5,
      name: "Newsletter Subscribers",
      contacts: [
        {
          id: 2,
          firstName: "Timo",
          lastName: "Eke",
          email: "andrew@triimo.com",
          phone: "+234 792 241 5655",
        },
      ],
    },
    {
      id: 6,
      name: "Team A",
      contacts: [
        {
          id: 1,
          firstName: "Timothy",
          lastName: "Eke",
          email: "andrew@triimo.com",
          phone: "+234 792 241 5655",
        },
      ],
    }]);

  return (
    <GroupContext.Provider value={{ groups, setGroups }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroups = () => useContext(GroupContext);
