import { createContext, useContext, useState, useEffect } from "react";
import api from "@/services/api";
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
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchContacts = async () => {
      const userIsLoggedIn = localStorage.getItem("accessToken");
      if (userIsLoggedIn) {
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
      }
    };

    fetchContacts();
  }, []);

  console.log("contacts", contacts);

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
  // Inside UseContact.jsx (your ContactProvider)
  const importContact = async (fileToUpload) => {
    try {
      setCreateContactLoading(true);
      setCreateContactErrorMessage("");

      const formData = new FormData();

      // Create a new Blob with the correct MIME type if the original is wrong
      let fileToSend = fileToUpload; // fileToUpload is expected to be a File object here.

      if (
        fileToUpload.type !== "text/csv" && // If fileToUpload is not a File object, .type will be undefined
        fileToUpload.name.endsWith(".csv")
      ) {
        console.warn(
          "MIME type not text/csv for .csv file. Forcing to text/csv."
        );
        // Attempting to create a Blob from a non-Blob/non-File object can also be problematic
        fileToSend = new Blob([fileToUpload], { type: "text/csv" });
        // This property is not standard on Blob, might need a File constructor
        fileToSend.name = fileToUpload.name; // fileToUpload.name would still be undefined here
      }
      formData.append("csv_file", fileToSend);

      const response = await api.post(
        `${baseUrl}/user/contacts/import`,
        formData, // Send FormData
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      console.log("response", response);
      if (response.status === 200 || response.status === 201) {
        setContacts((prevContacts) => [...prevContacts, ...response.data.data]);
        setCreateContactErrorMessage("");
        await RetryToFetchContact(); // Refresh contacts after import
        // setCreateContactLoading(false); // This will be handled by the finally block. Redundant here.
      } else {
        throw new Error("Failed to import contacts");
      }
    } catch (error) {
      console.error("Error importing contacts:", error);
      // Check if the error is from the backend and has a specific message
      setCreateContactErrorMessage(
        error.response?.data?.message ||
          error.response?.data?.err_msg ||
          "Failed to import contacts"
      );
      setCreateContactError(error);
    } finally {
      // This is good practice to ensure loading state is always reset.
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
