import React, { useEffect } from "react";
import { useLoadMutation } from "../../services/role";
import { useTypedDispatch, useTypedSelector } from "../../hooks";
import { RootState } from "../../store";
import { loadRoles } from "../../store/features/role/roleSlice";

const HomePage: React.FC = () => {
    const [load, {isLoading}] = useLoadMutation();
    const {roles, isLoaded} = useTypedSelector((state: RootState) => state.role);
    const dispatch = useTypedDispatch();
 
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const result = await load(null).unwrap();
                if(result.payload) {
                    dispatch(loadRoles(result.payload));
                }
            } catch (error) {
                console.error(error);
            }
        }

        if(!isLoaded) {
            fetchRoles();
        }
    }, []);

    return (
        <div>
            {isLoaded && roles ? (
                roles.map((role) => <h1 key={role.id}>{role.name}</h1>)
            ) : (
                <h1>Loading</h1>
            )}
        </div>
    );
};

export default HomePage;
