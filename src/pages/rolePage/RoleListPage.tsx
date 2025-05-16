import React, { useRef, useState } from "react";
import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { Column, ColumnEditorOptions } from "primereact/column";
import {
    useCreateRoleMutation,
    useDeleteRoleMutation,
    useGetRolesQuery,
    useUpdateRoleMutation,
} from "../../services/role/role";
import { ProgressSpinner } from "primereact/progressspinner";
import { Role } from "../../services/role/types";
import { InputText } from "primereact/inputtext";
import { ContextMenu } from "primereact/contextmenu";
import { Button } from "primereact/button";
import { ApiResponse } from "../../types";

const RoleListPage: React.FC = () => {
    const { data, isError, isLoading, error } = useGetRolesQuery();
    const [selectedProduct, setSelectedProduct] = useState<Role | undefined>(
        undefined
    );
    const [roleName, setRoleName] = useState<string>("");
    const [updateRole] = useUpdateRoleMutation();
    const [deleteRole] = useDeleteRoleMutation();
    const [createRole] =
        useCreateRoleMutation();
    const cm = useRef<ContextMenu>(null);

    const menuModel = [
        {
            label: "Delete",
            icon: "pi pi-fw pi-times",
            command: () => deleteRoleHandler(selectedProduct),
        },
    ];

    const deleteRoleHandler = async (role: Role | undefined) => {
        if (role === undefined || role.name === "admin") {
            return;
        } else {
            deleteRole(role.id);
        }
    };

    if (isError) {
        console.log(error);
    }

    const createRoleHandler = async () => {
        const res = await createRole(roleName);
        if (!res.error) {
            setRoleName("");
        } else {
            if('data' in res.error) {
                const data = res.error.data as ApiResponse<null>;
                console.log(data.isSuccess);   
                console.log(data.message);   
            }
        }
    };

    const textEditor = (options: ColumnEditorOptions) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    options.editorCallback!(e.target.value)
                }
            />
        );
    };

    const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
        const newRole = {
            id: e.newData.id,
            name: e.newData.name,
        };

        await updateRole(newRole);
    };

    return (
        <div>
            {isLoading ? (
                <ProgressSpinner />
            ) : (
                data?.payload !== null &&
                data !== undefined && (
                    <>
                        <div className="card">
                            <ContextMenu
                                model={menuModel}
                                ref={cm}
                                onHide={() => setSelectedProduct(undefined)}
                            />
                            <DataTable
                                value={data.payload}
                                onContextMenuSelectionChange={(e) =>
                                    setSelectedProduct(e.value)
                                }
                                contextMenuSelection={selectedProduct}
                                onRowEditComplete={onRowEditComplete}
                                onContextMenu={(e) =>
                                    cm.current?.show(e.originalEvent)
                                }
                                dataKey="id"
                                editMode="row"
                                tableStyle={{ minWidth: "50rem" }}
                            >
                                <Column field="id" header="Id"></Column>
                                <Column
                                    field="name"
                                    header="Name"
                                    editor={(options) => textEditor(options)}
                                ></Column>
                                <Column
                                    rowEditor={(rowData: Role) =>
                                        rowData.name !== "admin"
                                    }
                                ></Column>
                            </DataTable>
                        </div>
                        <div>
                            <InputText
                                style={{ marginTop: "10px" }}
                                className="p-inputtext-sm"
                                type="text"
                                value={roleName}
                                onChange={(e) => setRoleName(e.target.value)}
                            />
                            <Button
                                onClick={createRoleHandler}
                                style={{ marginLeft: "5px" }}
                                size="small"
                                label="Add"
                            />
                        </div>
                    </>
                )
            )}
        </div>
    );
};

export default RoleListPage;
