import { useState, useEffect } from "react";
import { getAllUsers } from "../../services/fetches";
import { User } from "@/types/types";

export const useUserList = () => {
    const [userList, setUserList] = useState<User[]>([]);

    useEffect(() => {
        const fetchUserList = async () => {
            try {
                const response = await getAllUsers();
                if ("users" in response.data) {
                    setUserList(response.data.users);
                }
            } catch (error) {
                console.error("Error fetching user list:", error);
            }
        };

        fetchUserList();
    }, []);

    return { userList };
};
