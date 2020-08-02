import React from 'react';
import {AgGridReact} from 'ag-grid-react';

export const InventoryGrid = ({ rows, updateQuantity }) => {
    const gridOptions = {
        columnDefs: [
            {
                headerName: 'Product ID',
                field: 'id'
              },
              {
                  headerName: 'Product Name',
                  field: 'name',
                  filter: true
                },
                {
                  headerName: 'Quantity',
                  field: 'quantity',
                  sortable: true,
                  editable: true,
                  tooltipValueGetter: () => 'Please double click to edit'
                }
        ],
        tooltipShowDelay: 0,
        onCellValueChanged: params => {
            updateQuantity(params.data)
        }
    }
    return  (<div
            className="ag-theme-balham"
            style={{
                height: '900px',
                width: '100%'
            }}
        >
            <AgGridReact
                gridOptions={gridOptions}
                rowData={ rows }
                >
            </AgGridReact>
        </div>

    )
}
