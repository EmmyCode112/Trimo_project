import { createContext, useContext, useEffect, useState } from "react";
import api from "@/services/api";

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  // const [groups, setGroups] = useState([
  //   {
  //     id: 1,
  //     name: "Team A",
  //     contacts: [
  //       {
  //         id: 10,
  //         firstName: "Margaret",
  //         lastName: "Alanira",
  //         email: "abujifinast@icloud.com",
  //         phone: "+234 813 201 1725",
  //       },
  //       {
  //         id: 9,
  //         firstName: "Sarah",
  //         lastName: "Okano",
  //         email: "penelope@gmail.com",
  //         phone: "+234 709 657 6467",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Newsletter Subscribers",
  //     contacts: [
  //       {
  //         id: 8,
  //         firstName: "Rebecca",
  //         lastName: "Nwachukwu",
  //         email: "akwabtom@gmail.com",
  //         phone: "+234 703 501 4280",
  //       },
  //       {
  //         id: 7,
  //         firstName: "Sarah",
  //         lastName: "Okano",
  //         email: "penelope@gmail.com",
  //         phone: "+234 709 657 6467",
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: "Newsletter Subscribers",
  //     contacts: [
  //       {
  //         id: 6,
  //         firstName: "Naomi",
  //         lastName: "Aganaba",
  //         email: "tanoribeau@gmail.com",
  //         phone: "+234 704 442 5317",
  //       },
  //     ],
  //   },
  //   {
  //     id: 19,
  //     name: "Newsletter Subscribers",
  //     contacts: [
  //       {
  //         id: 6,
  //         firstName: "Naomi",
  //         lastName: "Aganaba",
  //         email: "tanoribeau@gmail.com",
  //         phone: "+234 704 442 5317",
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     name: "Together",
  //     contacts: [
  //       {
  //         id: 4,
  //         firstName: "Naomi",
  //         lastName: "Aganaba",
  //         email: "tanoribeau@gmail.com",
  //         phone: "+234 704 442 5317",
  //       },
  //       {
  //         id: 3,
  //         firstName: "promise",
  //         lastName: "Eke",
  //         email: "andrew@triimo.com",
  //         phone: "+234 792 241 5655",
  //       },
  //     ],
  //   },
  //   {
  //     id: 5,
  //     name: "Newsletter Subscribers",
  //     contacts: [
  //       {
  //         id: 2,
  //         firstName: "Timo",
  //         lastName: "Eke",
  //         email: "andrew@triimo.com",
  //         phone: "+234 792 241 5655",
  //       },
  //     ],
  //   },
  //   {
  //     id: 6,
  //     name: "Team A",
  //     contacts: [
  //       {
  //         id: 1,
  //         firstName: "Timothy",
  //         lastName: "Eke",
  //         email: "andrew@triimo.com",
  //         phone: "+234 792 241 5655",
  //       },
  //     ],
  //   },
  // ]);

  const [groups, setGroups] = useState([]);
  const [createGroupError, setCreateGroupError] = useState("");
  const [createGroupLoading, setCreateGroupLoading] = useState(false);
  const [error, setError] = useState("");
  const createGroup = async (newGroup) => {
    try {
      setCreateGroupLoading(true);

      setCreateGroupError(""); // Clear previous errors from this function call
      setError(""); // Clear previous name errors
      const response = await api.post(
        `${baseUrl}/user/contact-groups/create`,
        newGroup
      );
      if (response.status === 200 || response.status === 201) {
        setCreateGroupError("");
      } else {
        throw new Error("Failed to create group");
        setCreateGroupError("Failed to create group");
      }
    } catch (error) {
      setCreateGroupError(
        error.response?.data?.err_msg || "Failed to create group"
      );
      const errorMessage =
        error.response?.data?.err_msg || "Failed to create group";
      if (error.response?.data?.errors?.name) {
        setError(error.response.data.errors.name[0]); // Assuming it's an array of messages
      } else {
        setError(errorMessage); // Fallback for other errors
      }
      console.error("Error creating group:", error);
    } finally {
      setCreateGroupLoading(false);
    }
  };

  const [fetchGroupsError, setFetchGroupsError] = useState("");
  const [fetchGroupsLoading, setFetchGroupsLoading] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setFetchGroupsLoading(true);
        const response = await api.get(`${baseUrl}/user/contact-groups`);
        console.log("response", response);
        if (response.status === 200 || response.status === 201) {
          setGroups(response.data.data?.data || []);
        } else {
          throw new Error("Failed to fetch groups");
        }
      } catch (error) {
        setFetchGroupsError(
          error.response?.data?.err_msg || "Failed to fetch groups"
        );
        console.error("Error fetching groups:", error);
      } finally {
        setFetchGroupsLoading(false);
      }
    };

    const authenticated = localStorage.getItem("accessToken");

    if (authenticated) {
      fetchGroups();
    }
  }, []);

  const [refetching, setRefetching] = useState(false);
  // Inside GroupProvider
  const RetryToFetchGroups = async () => {
    try {
      setRefetching(true);
      setFetchGroupsError(""); // Clear any previous errors
      const response = await api.get(`${baseUrl}/user/contact-groups`);
      if (response.status === 200 || response.status === 201) {
        console.log("Groups fetched successfully:", response);
        // MISSING: You need to update the 'groups' state here!
        setGroups(response.data.data?.data || []);
      } else {
        throw new Error("Failed to fetch groups");
      }
    } catch (error) {
      setFetchGroupsError(
        error.response?.data?.err_msg || "Failed to fetch groups"
      );
      console.error("Error fetching groups:", error);
    } finally {
      setRefetching(false);
    }
  };

  // delete group

  const [deleteGroupLoading, setDeleteGroupLoading] = useState(false);
  const [deleteGroupError, setDeleteGroupError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const deleteGroup = async (groupId) => {
    try {
      setDeleteGroupLoading(true);
      setDeleteGroupError(""); // Clear previous errors
      const response = await api.post(
        `${baseUrl}/user/contact-groups/delete/${groupId}`
      );
      if (response.status === 200 || response.status === 201) {
        setGroups((prevGroups) =>
          prevGroups.filter((group) => group.id !== groupId)
        );
        await RetryToFetchGroups(); // Refetch groups after deletion
      } else {
        throw new Error("Failed to delete group");
      }
    } catch (error) {
      console.error("Error deleting group:", error);
      setDeleteGroupError(error || "Failed to delete group");
      setDeleteError(error.response?.data?.err_msg || "Failed to delete group");
    } finally {
      setDeleteGroupLoading(false);
    }
  };

  const [moveError, setMoveError] = useState("");
  const [moveLoading, setMoveLoading] = useState(false);
  // In UseContact.jsx or wherever handleMoveToGroup is defined
  const handleMoveToGroup = async (groupId, contactIdsToAttach) => {
    // Accept groupId and an array of contact IDs
    try {
      setMoveLoading(true);
      setMoveError("");
      const response = await api.post(
        // Use dynamic groupId in the URL
        `${baseUrl}/user/contact-groups/${groupId}/attach-contacts`,
        {
          contact_ids: contactIdsToAttach, // Send the array of selected contact IDs
        }
      );
      // console.log("move response", response);
      if (response.status === 200 || response.status === 201) {
        // console.log("moved successfully via API");
        await RetryToFetchGroups();
        return response.data; // Return data if needed, e.g., actual count of moved contacts
      } else {
        throw new Error(
          response.data?.message || "Failed to attach contacts via API"
        );
      }
    } catch (err) {
      console.error("Error attaching contacts via API:", err);
      setMoveError(
        err.response?.data?.message || err.message || "Failed to move contacts"
      );
      throw err; // Re-throw to be caught by moveContactsToGroup
    } finally {
      setMoveLoading(false);
    }
  };

  const deleteContactFromGroup = async (groupId, contactIdsToDetach) => {
    // Renamed for clarity
    try {
      setDeleteGroupLoading(true);
      setDeleteError(""); // Clear error at the start of API call

      const response = await api.post(
        // Use dynamic groupId in the URL
        `${baseUrl}/user/contact-groups/${groupId}/detach-contacts`,
        {
          contact_ids: contactIdsToDetach, // Send the array of contact IDs
        }
      );

      console.log("delete contact from group res", response);
      if (response.status === 200 || response.status === 201) {
        console.log("Contacts detached successfully from group via API.");
        await RetryToFetchGroups(); // Refresh groups after successful detachment
        // If you also need to refresh individual contacts (e.g., if they update their group property)
        // you might need RetryToFetchContact() as well, depending on what it does.
      } else {
        // If the API returns a non-2xx status, treat it as an error
        throw new Error(
          response.data?.message || `API Error: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error detaching contacts via API:", error);
      setDeleteError(
        error.response?.data?.message ||
          error.response?.data?.error || // Common error key
          error.message ||
          "Failed to detach contacts."
      );
      throw error; // Re-throw to propagate to deleteSelectedContacts' catch block
    } finally {
      setDeleteGroupLoading(false);
    }
  };

  return (
    <GroupContext.Provider
      value={{
        groups,
        setGroups,
        createGroup,
        createGroupError,
        createGroupLoading,
        setRefetching,
        setCreateGroupError,
        setError,
        refetching,
        fetchGroupsError,
        fetchGroupsLoading,
        RetryToFetchGroups,
        error,
        deleteGroupLoading,
        setDeleteGroupLoading,
        deleteGroup,
        deleteGroupError,
        deleteError,
        setDeleteError,
        handleMoveToGroup,
        setMoveError,
        moveError,
        moveLoading,
        deleteContactFromGroup,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const useGroups = () => useContext(GroupContext);
