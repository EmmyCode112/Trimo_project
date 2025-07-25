import { createContext, useContext, useState, useEffect } from "react";
import api from "@/services/api"; // Adjust the import path as necessary
const contactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [createContactError, setCreateContactError] = useState(null);
  const [noContact, setNoContact] = useState(null);
  const [createContactErrorMessage, setCreateContactErrorMessage] =
    useState("");
  const [createContactLoading, setCreateContactLoading] = useState(false);
  const [refetching, setRefetching] = useState(false);
  const baseUrl =
    import.meta.env.VITE_BASE_URL ||
    "https://triimo.unifiedpublisher.com/api/v1";

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const response = await api.get(`${baseUrl}/user/contacts`, {
          headers: {
            Accept: "application/json",
          },
        });
        // if (!response.ok) {
        //   throw new Error("Failed to fetch contacts");
        // }
        const data = await response.data;
        setContacts(data?.data?.data || []);
        setError(null); // Clear any previous errors
        console.log("Contacts fetched successfully:", response);
        console.log("data.data.data:", data.data.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setError(error.message || "Failed to fetch contacts");
        setNoContact(error.response.data?.msg || "Contacts not Available!");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const RetryToFetchContact = async () => {
    try {
      setRefetching(true);
      setError(null); // Clear any previous errors
      const response = await api.get(`${baseUrl}/user/contacts`, {
        headers: {
          Accept: "application/json",
        },
      });
      // if (!response.ok) {
      //   throw new Error("Failed to fetch contacts");
      // }
      const data = await response.data;
      setContacts(data?.data?.data || []);
      setError(null); // Clear any previous errors
      console.log("Contacts fetched successfully:", response);
      console.log("data.data.data:", data.data.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setError(error.message || "Failed to fetch contacts");
    } finally {
      setRefetching(false);
    }
  };

  // const createContact = async (contactData) => {
  //   try {
  //     setCreateContactLoading(true);
  //     setCreateContactErrorMessage("");
  //     const response = await api.post(
  //       `${baseUrl}/user/contacts/create`,
  //       contactData,
  //       {
  //         headers: {
  //           Accept: "application/json",
  //         },
  //       }
  //     );
  //     // if (!response.ok) {
  //     //   throw new Error("Failed to create contact");
  //     // }
  //     // const data = await response.data;
  //     console.log("response", response);
  //     // setContacts((prevContacts) => [...prevContacts, data?.data]);
  //     // console.log("Contact created successfully:", data);
  //     setCreateContactErrorMessage("");
  //   } catch (error) {
  //     console.error("Error creating contact:", error);
  //     setCreateContactError(error.message || "Failed to create contact");
  //     const phoneNumberError = error.response?.data?.err_msg?.phone_number;
  //     const emailError = error.response?.data?.err_msg?.email;
  //     setCreateContactErrorMessage(
  //       emailError
  //         ? emailError[0]
  //         : phoneNumberError
  //         ? phoneNumberError[0]
  //         : "An unexpected error occurred. please check you internet and try again."
  //     );
  //   } finally {
  //     setCreateContactLoading(false);
  //   }
  // };

  // deleteContact
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const deleteContact = async (contactId) => {
    try {
      setDeleteLoading(true);
      setDeleteError("");
      const response = await api.post(
        `${baseUrl}/user/contacts/delete/${contactId}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact.id !== contactId)
        );
        console.log("Contact deleted successfully:", response);
        return true; // ✅ success
      } else {
        throw new Error("Failed to delete contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      setDeleteError(error.message || "Failed to delete contact");
      return false; // ❌ failed
    } finally {
      setDeleteLoading(false);
    }
  };

  const importContact = async (contactData) => {
    try {
      setCreateContactLoading(true);
      setCreateContactErrorMessage("");
      const response = await api.post(
        `${baseUrl}/user/contacts/import`,
        contactData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.log("response", response);
      if (response.status === 200 || response.status === 201) {
        setContacts((prevContacts) => [...prevContacts, ...response.data.data]);
        setCreateContactErrorMessage("");
      } else {
        throw new Error("Failed to import contacts");
      }
    } catch (error) {
      console.error("Error importing contacts:", error);
      setCreateContactErrorMessage(
        error.response?.data?.err_msg || "Failed to import contacts"
      );
    } finally {
      setCreateContactLoading(false);
    }
  };

  return (
    <contactContext.Provider
      value={{
        contacts,
        setContacts,
        loading,
        error,
        RetryToFetchContact,
        refetching,
        // createContact,
        setCreateContactLoading,
        createContactLoading,
        createContactError,
        setCreateContactError,
        setCreateContactErrorMessage,
        createContactErrorMessage,
        deleteContact,
        deleteLoading,
        setDeleteLoading,
        noContact,
        deleteError,
        importContact,
      }}
    >
      {children}
    </contactContext.Provider>
  );
};

export const useContacts = () => useContext(contactContext);
