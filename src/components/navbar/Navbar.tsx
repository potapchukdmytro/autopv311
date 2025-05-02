import React from 'react'; 
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';

const Navbar: React.FC = () => {
    const items: MenuItem[] = [
        {
            label: 'File',
            icon: 'pi pi-file',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-plus'
                },
                {
                    label: 'Print',
                    icon: 'pi pi-print'
                }
            ]
        },
        {
            label: 'Search',
            icon: 'pi pi-search'
        },
        {
            separator: true
        },
        {
            label: 'Sync',
            icon: 'pi pi-cloud',
            items: [
                {
                    label: 'Import',
                    icon: 'pi pi-cloud-download'
                },
                {
                    label: 'Export',
                    icon: 'pi pi-cloud-upload'
                }
            ]
        }
    ];
    
    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    )
}

export default Navbar;